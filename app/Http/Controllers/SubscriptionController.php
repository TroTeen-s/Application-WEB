<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Fidelity;
use App\Models\Invoice;
use App\Models\Package;
use App\Models\PackageUser;
use App\Models\Payment;
use App\Models\User;
use App\Traits\ApiResponse;
use Carbon\Carbon;
use Codedge\Fpdf\Fpdf\Fpdf;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe;
use Stripe\BillingPortal\Session;
use Stripe\Event;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient;
use Stripe\Subscription;

class SubscriptionController extends Controller
{
    use ApiResponse;

    /**
     * Ajoute un abonnement, utilisé depuis le dashboard
     * @param Request $req
     * @return JsonResponse
     */
    function addSubscription(Request $req): JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }

        $subscription = new Package();
        $subscription->name = $req->input('name');
        $subscription->price = $req->input('price');
        $subscription->max_trips = $req->input('max_trips');
        $subscription->frequency = $req->input('frequency');
        $subscription->is_subscription = true;


        try {
            $stripe = new StripeClient(getenv('STRIPE_PRIVATE'));

            $stripeSubscriptions = $stripe->products->create([
                'name' => 'Abonnements Troteen\'s ' . $subscription->name,
            ]);

            $subscriptionPrice = $stripe->prices->create([
                'unit_amount' => $subscription->price * 100,
                'currency' => 'eur',
                'recurring' => ['interval' => $subscription->frequency],
                'product' => $stripeSubscriptions->id,
                'nickname' => $subscription->name
            ]);

            $subscription->id_stripe = $subscriptionPrice->id;

            $subscription->save();

        } catch (ApiErrorException $e) {
            return $this->fail("erreur API Stripe", $e->getMessage());
        }

        $subscription->refresh();

        return $this->success("Produit ajouté avec succès", $subscription);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }

        if (empty($request->all())) {
            return $this->fail("pas d'option envoyées");
        }

        $abonnement = Package::query()->find($id);

        if (empty($abonnement)) {
            return $this->fail("Abonnement pas trouvé");
        }

        $success = $abonnement->update($request->all());
        if (!$success) {
            return $this->fail("Erreur");
        } else {
            return $this->success("abonnement mis à jour avec succès", $request->all());
        }
    }




    public function subscribe(Request $request): JsonResponse
    {
        $params = $request->all();
        $idPackage = $params['id_package'];
        $user = auth()->user();

        $package = Package::query()->find($idPackage);

        $user->packages()->attach($package, ['active' => false, 'trip_number' => 0, 'payment_status_stripe' => false]);

        $user = auth()->user();

        $subscription = PackageUser::query()->where('user_id', $user->id)->get();

        return $this->success('ok ?', $subscription);

    }


    public function initDocument($id)
    {

        $invoice = Invoice::query()->firstWhere("id", $id);

        $data = Payment::query()->firstWhere("id_invoice_stripe", $invoice->id_stripe)->get();

        $subscriptions = PackageUser::query()->firstWhere('id_stripe', $invoice->id_subscription);

        $package = Package::query()->firstWhere("id", $subscriptions->package_id);

        $v = 0;

        $pdf = new FPDF('P', 'mm', 'A4');
        // on sup les 2 cm en bas
        $pdf->SetAutoPagebreak(False);
        $pdf->SetMargins(0, 0, 0);

        $num_page = 1;

        $pdf->AddPage();

        // logo : 80 de largeur et 55 de hauteur
        // $pdf->Image('EASYSCOOTER', 10, 10, 80, 55);
        $pdf->SetLineWidth(0.1);
        $pdf->SetFillColor(192);
        $pdf->Rect(120, 15, 85, 8, "DF");
        $pdf->SetXY(10, 15);
        $pdf->SetFont("Arial", "B", 12);
        $pdf->Cell(85, 8, "EASYSCOOTER", 1, 0, 'C');

        // n° page en haute à droite
        $pdf->SetXY(120, 5);
        $pdf->SetFont("Arial", "B", 12);
        $pdf->Cell(160, 8, $num_page . '/' . 1, 0, 0, 'C');

        // n° facture, date echeance et reglement et obs

        // $champ_date = date_create($row[0]); $annee = date_format($champ_date, 'Y');
        $num_fact = "FACTURE N " . $data[0]["id"];
        $pdf->SetLineWidth(0.1); $pdf->SetFillColor(192); $pdf->Rect(120, 15, 85, 8, "DF");
        $pdf->SetXY( 120, 15 ); $pdf->SetFont( "Arial", "B", 12 ); $pdf->Cell( 85, 8, $num_fact, 0, 0, 'C');

        // nom du fichier final
        $nom_file = "fact_" . 2022 . ".pdf";

        // date facture
        // $champ_date = date_create($row[0]); $date_fact = date_format($champ_date, 'd/m/Y');
        $pdf->SetFont('Arial','',11); $pdf->SetXY( 122, 30 );
        $pdf->Cell( 60, 8, $data[0]["billing_address_city"] . ", " . $data[0]["billing_address_line"], 0, 0, '');
        $pdf->SetXY( 60, 15 ); $pdf->SetFont( "Arial", "B", 10 ); $pdf->Cell( 135, 50, $data[0]["billing_address_postal_code"], 0, 0, 'C');

        // si derniere page alors afficher total
        if ($num_page == 1)
        {
            // les totaux, on n'affiche que le HT. le cadre après les lignes, demarre a 213
            $pdf->SetLineWidth(0.1); $pdf->SetFillColor(192); $pdf->Rect(5, 213, 90, 8, "DF");
            // HT, la TVA et TTC sont calculés après
            $nombre_format_francais = "Total HT : " . $package->price . " €";
            $pdf->SetFont('Arial','',10); $pdf->SetXY( 95, 213 ); $pdf->Cell( 63, 8, $package->price, 0, 0, 'C');
            // en bas à droite
            $pdf->SetFont('Arial','B',8); $pdf->SetXY( 181, 227 ); $pdf->Cell( 24, 6, $package->price, 0, 0, 'R');

            // trait vertical cadre totaux, 8 de hauteur -> 213 + 8 = 221
            $pdf->Rect(5, 213, 200, 8, "D"); $pdf->Line(95, 213, 95, 221); $pdf->Line(158, 213, 158, 221);

            // reglement
            $pdf->SetXY( 5, 225 ); $pdf->Cell( 38, 5, "Mode de Reglement :", 0, 0, 'R'); $pdf->Cell( 55, 5, "Carte Bancaire", 0, 0, 'L');
            // echeance
            // $champ_date = date_create($row[7]); $date_ech = date_format($champ_date, 'd/m/Y');
            $pdf->SetXY( 5, 230 ); $pdf->Cell( 38, 5, "Date Echeance :", 0, 0, 'R'); $pdf->Cell( 38, 5, "11/07/2025", 0, 0, 'L');
        }

        // observations
        $pdf->SetFont( "Arial", "", 10 ); $pdf->SetXY( 10, 30 ) ; $pdf->MultiCell(190, 4, "Paiement :". $data[0]["payment_date"], 0, "L");
        $pdf->SetFont( "Arial", "BU", 10 ); $pdf->SetXY( 10, 90 ) ; $pdf->Cell($pdf->GetStringWidth("Observations"), 0, "Observations", 0, "L");
        // $pdf->SetFont( "Arial", "", 10 ); $pdf->SetXY( 5, 78 ) ; $pdf->MultiCell(190, 4, "Txt", 0, "L");

        // adr fact du client

        $pdf->SetFont('Arial','B',11); $x = 110 ; $y = 50;
        $pdf->SetXY( $x, $y ); $pdf->Cell( 100, 8, "EasyScooter", 0, 0, ''); $y += 4;
        if ("text") { $pdf->SetXY( $x, $y ); $pdf->Cell( 100, 8, "SARL", 0, 0, ''); $y += 4;}
        if ("text") { $pdf->SetXY( $x, $y ); $pdf->Cell( 100, 8, "2 Place des Celestins", 0, 0, ''); $y += 4;}
        if ("text") { $pdf->SetXY( $x, $y ); $pdf->Cell( 100, 8, "69001 Lyon", 0, 0, ''); $y += 4;}
        // if ("text" || "text") { $pdf->SetXY( $x, $y ); $pdf->Cell( 100, 8, "text" . ' ' ."text" , 0, 0, ''); $y += 4;}
        // if ("text") { $pdf->SetXY( $x, $y ); $pdf->Cell( 100, 8, 'N° TVA Intra : ' . "text", 0, 0, '');}

        // ***********************
        // le cadre des articles
        // ***********************
        // cadre avec 18 lignes max ! et 118 de hauteur --> 95 + 118 = 213 pour les traits verticaux
        $pdf->SetLineWidth(0.1); $pdf->Rect(5, 95, 200, 118, "D");
        // cadre titre des colonnes
        $pdf->Line(5, 105, 205, 105);
        // les traits verticaux colonnes
        $pdf->Line(145, 95, 145, 213); $pdf->Line(158, 95, 158, 213); $pdf->Line(176, 95, 176, 213); $pdf->Line(187, 95, 187, 213);
        // titre colonne
        $pdf->SetXY( 1, 96 ); $pdf->SetFont('Arial','B',8); $pdf->Cell( 140, 8, "Libelle", 0, 0, 'C');
        // $pdf->SetXY( 145, 96 ); $pdf->SetFont('Arial','B',8); $pdf->Cell( 13, 8, "Frequency", 0, 0, 'C');
        $pdf->SetXY( 156, 96 ); $pdf->SetFont('Arial','B',8); $pdf->Cell( 22, 8, "Frequency", 0, 0, 'C');
        // $pdf->SetXY( 177, 96 ); $pdf->SetFont('Arial','B',8); $pdf->Cell( 10, 8, "TVA", 0, 0, 'C');
        $pdf->SetXY( 185, 96 ); $pdf->SetFont('Arial','B',8); $pdf->Cell( 22, 8, "TOTAL TTC", 0, 0, 'C');

        // les articles
        $pdf->SetFont('Arial','',8);
        $y = 97;
        // 1ere page = LIMIT 0,18 ;  2eme page = LIMIT 18,36 etc...
        // $sql = 'select libelle,qte,pu,taux_tva FROM ligne_facture where id_facture=' .$var_id_facture . ' order by libelle';
        // $sql .= ' LIMIT ' . $limit_inf . ',' . $limit_sup;
        // $res = mysqli_query($mysqli, $sql)  or die ('Erreur SQL : ' .$sql .mysqli_connect_error() );


            // libelle
            $pdf->SetXY( 7, $y+9 ); $pdf->Cell( 140, 5, "Abonnement : ".$package->name . "                         " .$subscriptions->current_period_start."  -  ".$subscriptions->current_period_end  , 0, 0, 'L');
            // // qte
            // $pdf->SetXY( 150, $y+9 ); $pdf->Cell( 140, 5, $package->frequency, 0, 0, 'L');
            // // PU
            $pdf->SetXY( 156, $y+9 ); $pdf->Cell( 18, 5, $package->frequency, 0, 0, 'R');
            // // Taux
            // $nombre_format_francais = number_format($data['taux_tva'], 2, ',', ' ');
            // $pdf->SetXY( 177, $y+9 ); $pdf->Cell( 10, 5, $nombre_format_francais, 0, 0, 'R');
            // total
            // $nombre_format_francais = number_format(1, 2, ',', ' ');
            $pdf->SetXY( 187, $y+9 ); $pdf->Cell( 18, 5, $package->price, 0, 0, 'R');

            $pdf->Line(5, $y+14, 205, $y+14);

            $v += 1;
            $y += 6;


        // mysqli_free_result($res);

        // si derniere page alors afficher cadre des TVA
        if (1)
        {
            // le detail des totaux, demarre a 221 après le cadre des totaux
            $pdf->SetLineWidth(0.1); $pdf->Rect(130, 221, 75, 24, "D");
            // les traits verticaux
            $pdf->Line(147, 221, 147, 245);
            // les traits horizontaux pas de 6 et demarre a 221
            $pdf->Line(130, 227, 205, 227);
            // les titres
            $pdf->SetFont('Arial','B',8); $pdf->SetXY( 181, 221 ); $pdf->Cell( 24, 6, "TOTAL", 0, 0, 'C');
            $pdf->SetFont('Arial','',8);
            // $pdf->SetXY( 105, 221 ); $pdf->Cell( 25, 6, "Taux TVA", 0, 0, 'R');
            $pdf->SetXY( 105, 227 ); $pdf->Cell( 25, 6, "Total HT", 0, 0, 'R');
            // $pdf->SetXY( 105, 233 ); $pdf->Cell( 25, 6, "Total TVA", 0, 0, 'R');
            $pdf->SetXY( 105, 239 ); $pdf->Cell( 25, 6, "Total TTC", 0, 0, 'R');

            // les taux de tva et HT et TTC
            $col_ht = 0; $col_tva = 0; $col_ttc = 0;
            $taux = 0; $tot_tva = 0; $tot_ttc = 0;
            $x = 130;
            // $sql = 'select taux_tva,sum( round(pu * qte,2) ) tot_ht FROM ligne_facture where id_facture=' .$var_id_facture . ' group by taux_tva order by taux_tva';
            // while ($data =  mysqli_fetch_assoc($res))
            // {
            //     $pdf->SetXY( $x, 221 ); $pdf->Cell( 17, 6, $data['taux_tva'] . ' %', 0, 0, 'C');
            //     $taux = $data['taux_tva'];

                // $nombre_format_francais = number_format($data['tot_ht'], 2, ',', ' ');
                // $pdf->SetXY( $x, 227 ); $pdf->Cell( 17, 6, $nombre_format_francais, 0, 0, 'R');
                // $col_ht = $data['tot_ht'];

            //     $col_tva = $col_ht - ($col_ht * (1-($taux/100)));
            //     $nombre_format_francais = number_format($col_tva, 2, ',', ' ');
            //     $pdf->SetXY( $x, 233 ); $pdf->Cell( 17, 6, $nombre_format_francais, 0, 0, 'R');

            $col_ttc = $col_ht + $col_tva;
                $nombre_format_francais = number_format($col_ttc, 2, ',', ' ');
                $pdf->SetXY( $x, 239 ); $pdf->Cell( 17, 6, $nombre_format_francais, 0, 0, 'R');

            //     $tot_tva += $col_tva ; $tot_ttc += $col_ttc;

            //     $x += 17;
            // }
            // mysqli_free_result($res);

            $nombre_format_francais = "Net à payer TTC : " . $package->price . " euros";
            $pdf->SetFont('Arial','B',12); $pdf->SetXY( 5, 213 ); $pdf->Cell( 90, 8, $nombre_format_francais, 0, 0, 'C');
            // en bas à droite
            $pdf->SetFont('Arial','B',8); $pdf->SetXY( 181, 239 ); $pdf->Cell( 24, 6, $package->price, 0, 0, 'R');
            // TVA
            $nombre_format_francais = "Total TVA : " . number_format($tot_tva, 2, ',', ' ') . " euros";
            $pdf->SetFont('Arial','',10); $pdf->SetXY( 158, 213 ); $pdf->Cell( 47, 8, $nombre_format_francais, 0, 0, 'C');
            // en bas à droite
            // $pdf->SetFont('Arial','B',8); $pdf->SetXY( 181, 233 ); $pdf->Cell( 24, 6, 2022, 0, 0, 'R');
        }

        // **************************
        // pied de page
        // **************************
        $pdf->SetLineWidth(0.1);
        $pdf->Rect(5, 260, 200, 6, "D");
        $pdf->SetXY(1, 260);
        $pdf->SetFont('Arial', '', 7);
        $pdf->Cell($pdf->GetPageWidth(), 7, "Clause de reserve de propriete (loi 80.335 du 12 mai 1980) : Les marchandises vendues demeurent notre propriete jusqu'au paiement integral de celles-ci.", 0, 0, 'C');

        // $y1 = 270;
        // //Positionnement en bas et tout centrer
        // $pdf->SetXY( 1, $y1 ); $pdf->SetFont('Arial','B',10);
        // $pdf->Cell( $pdf->GetPageWidth(), 5, "REF BANCAIRE : FR76 xxx - BIC : xxxx", 0, 0, 'C');

        // $pdf->SetFont('Arial','',10);

        // $pdf->SetXY( 1, $y1 + 4 );
        // $pdf->Cell( $pdf->GetPageWidth(), 5, "NOM SOCIETE", 0, 0, 'C');

        // $pdf->SetXY( 1, $y1 + 8 );
        // $pdf->Cell( $pdf->GetPageWidth(), 5, "ADRESSE 1 + CP + VILLE", 0, 0, 'C');

        // $pdf->SetXY( 1, $y1 + 12 );
        // $pdf->Cell( $pdf->GetPageWidth(), 5, "Tel + Mail + SIRET", 0, 0, 'C');

        // $pdf->SetXY( 1, $y1 + 16 );
        // $pdf->Cell( $pdf->GetPageWidth(), 5, "Adresse web", 0, 0, 'C');

        // // par page de 18 lignes
        // $num_page++; $limit_inf += 18; $limit_sup += 18;

        $rand = rand(1, 100000);


        $pdf->Output($nom_file, 'F', true);
        $pdf->Output("I", $nom_file);
        exit;

    }


    public function createSubscriptionCheckout(Request $request): JsonResponse
    {
        $params = $request->all();

        $YOUR_DOMAIN = getenv('APP_URL');

        $user = auth()->user();

        if ($user->subscribed) {
            return $this->fail("Vous êtes déjà abonné");
        }

        if (isset($params['name'])) {
            $package = Package::query()->firstWhere('name', $params['name']);

            try {
                $stripe = new StripeClient(getenv('STRIPE_PRIVATE'));

                $checkout_session = $stripe->checkout->sessions->create(array_filter([
                    'line_items' => [[
                        'price' => $package->id_stripe,
                        'quantity' => 1,
                    ]],
                    'mode' => 'subscription',
                    "billing_address_collection" => "required",

                    'success_url' => $YOUR_DOMAIN . '/account/subscriptions',
                    'cancel_url' => $YOUR_DOMAIN,
                    'customer' => $user->id_stripe ?? '',
                    'subscription_data' => [
                        'metadata' => [
                            'cancel_at' => Carbon::now()->addYear()
                        ]
                    ]

                ]));

                return $this->success('redirection', ['redirect' => $checkout_session->url]);
            } catch (ApiErrorException $e) {
                return $this->fail('erreur', $e->getMessage());
            }
        } else {
            return $this->fail("Nom du package manquant", ["params" => $params]);
        }

    }

    public function getAllSubscriptionsByUser(): JsonResponse
    {
        $user = auth()->user();

        $subscriptions = $user->subscriptions;

        $subscriptions->each(function ($order) {
            $order->setAppends(['package_name', 'last_payment']);
        });

        return $this->success("voici vos abonnements", $subscriptions);
    }

    public function getAllSubscriptionsForShop(): JsonResponse
    {
        $subscriptions = Package::query()->where("active", true)->get();

        return $this->success("voici vos abonnements", $subscriptions);
    }

    public function getAllSubscriptionsForDashboard(): JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }

        $subscriptions = Package::all();

        return $this->success("voici vos abonnements", $subscriptions);
    }

    public function getInvoicesFromSubscription(int $subscription_id): JsonResponse
    {
        $user = auth()->user();

        $invoices = $user->subscriptions->where('id', $subscription_id)->first()->invoices()->get();

        return $this->success("voici vos invoices", $invoices);
    }

    public function getSubscriptionsInfos(int $subscription_id): JsonResponse
    {
        $subscription = PackageUser::query()->firstWhere('id', $subscription_id);

        $subscription->setAppends(['package_name', 'invoices']);

        return $this->success("voici les informations de cet abonnements", $subscription);
    }

    /**
     * @throws ApiErrorException
     */
    public function cancelSubscription(int $subscription_id): JsonResponse
    {
        $subscription = PackageUser::query()->firstWhere('id', $subscription_id);

        try {
            Stripe\Stripe::setApiKey(getenv("STRIPE_PRIVATE"));

            $subscriptionStripe = Subscription::retrieve($subscription->id_stripe);
            $subscriptionStripe->cancel();

            $subscription->active = false;
            $subscription->canceled_at = Carbon::now();
            $subscription->save();
        } catch (ApiErrorException $e) {
            Log::error($e->getMessage());
            return $this->fail("problème, veuillez réessayer");
        }


        return $this->success("Abonnement canceled", $subscription);
    }

    public function checkoutWebhook(Request $request)
    {
        $params = $request->all();
        ob_start();
        var_dump($params);
        $event = Event::constructFrom($params);
        var_dump($params);
        error_log(ob_get_clean(), 4);

        switch ($event->type) {
            case 'customer.subscription.created':
                $this->createSubscription($event);
                break;

            case 'customer.subscription.updated':
                $this->updateSubscription($event);
                break;

            case 'invoice.paid':
                if ($event->data->object->subscription) {
                    $this->createInvoice($event);
                }
                break;

            case 'payment_intent.succeeded':
                $this->createPayment($event);
                break;

            case 'checkout.session.completed':
                if ($event->data->object->mode === 'payment')
                    $this->finishCart($event);
                break;

            default:
                break;
        }

        $this->success('webhook treadted by LOLIS');

    }

    public function createSubscription(Event $event)
    {

        try {
            $subscription = $event->data->object;

            $customerID = $subscription->customer;
            $user = User::query()->where('id_stripe', $customerID)->first();

            $package = $subscription->items->data[0]->plan->id;
            $package = Package::query()->where('id_stripe', $package)->first();


            $user->packages()->attach($package, [
                'id_stripe' => $subscription->id,
                'active' => ($subscription->active === 'active'),
                'created_at' => Carbon::createFromTimestamp($subscription->billing_cycle_anchor),
            ]);

        } catch (Exception $e) {
            Log::channel('errors')->info($e->getMessage());

        }
    }

    public function updateSubscription(Event $event)
    {

        try {
            $subscription = $event->data->object;
            $subscriptionInDB = PackageUser::query()->firstWhere('id_stripe', $subscription->id);

            if (!$subscriptionInDB->active && ($subscription->status == 'active')) {
                $subscriptionInDB->active = true;
            }

            $subscriptionInDB->current_period_start = Carbon::createFromTimestamp($subscription->current_period_start);
            $subscriptionInDB->current_period_end = Carbon::createFromTimestamp($subscription->current_period_end);
            $subscriptionInDB->created_at = Carbon::createFromTimestamp($subscription->created);
            $subscriptionInDB->cancel_at = $subscription->cancel_at ? Carbon::createFromTimestamp($subscription->cancel_at) : null;
            $subscriptionInDB->save();

        } catch (Exception $e) {
            Log::channel('errors')->info($e->getMessage());

        }
    }

    public function createInvoice(Event $event)
    {
        $invoiceReceived = $event->data->object;
        $subscriptionID = $invoiceReceived->subscription;
        $subscription = PackageUser::query()->firstWhere('id_stripe', $subscriptionID);
        $subscription->payment_status_stripe = $invoiceReceived->status;
        $subscription->save();

        $invoice = new Invoice([
            'id_subscription' => $subscriptionID,
            'total_price' => $invoiceReceived->amount_paid / 100,
            'date' => Carbon::now(),
            'billing_address' => $invoiceReceived->customer_address,
            'id_stripe' => $invoiceReceived->id,
        ]);
        $invoice->save();


    }

    public function createPayment(Event $event)
    {

        try {
            $paymentObject = $event->data->object;
            Log::channel('errors')->info('on est là heyyyyy');

            $user = User::query()->firstWhere('id_stripe', $paymentObject->customer);

            $payment = new Payment([
                'amount' => $paymentObject->amount / 100,
                'payment_date' => Carbon::createFromTimestamp($paymentObject->created),
                'billing_address_city' => $paymentObject->charges->data[0]->billing_details->address->city,
                'billing_address_line' => $paymentObject->charges->data[0]->billing_details->address->line1,
                'billing_address_postal_code' => $paymentObject->charges->data[0]->billing_details->address->postal_code,
                'card_number' => $paymentObject->charges->data[0]->payment_method_details->card->last4,
                'id_stripe' => $paymentObject->id,
                'id_invoice_stripe' => $paymentObject->charges->data[0]->invoice,
                'user_id' => $user->id,
            ]);
            $payment->save();

            if (stripos($paymentObject->description, "subscription") !== false) {
                $fidelityHistory = new Fidelity([
                    'amount' => $paymentObject->amount / 100 * 0.3,
                    'reason' => stripos($paymentObject->description, "subscription") !== false ? "Paiment pour l'abonnement" : "Paiment sur le site Troteen's",
                    'date' => Carbon::now(),
                    'payment_id' => $paymentObject->id,
                    'user_id' => $user->id,
                ]);
                $fidelityHistory->save();
                $user->fidelity_points += $paymentObject->amount / 100 * 0.3;
                $user->save();

                try {
                    PushNotificationsController::sendNotification("Paiement pour votre abonnement Ez_Scooter !", "Paiement effectué pour votre abonnement Ez_Scooter ! :)", $user->id);
                } catch (Exception $e) {

                }

            }


        } catch (Exception $e) {
            Log::channel('errors')->info($e->getMessage());
        }
    }

    public function linkCustomerPortal(): JsonResponse
    {

        $user = auth()->user();

        Stripe\Stripe::setApiKey(getenv("STRIPE_PRIVATE"));

        // Authenticate your user.
        try {
            $portalSession = Session::create([
                'customer' => $user->id_stripe,
                'return_url' => getenv("APP_URL") . '/account/subscriptions',
            ]);
        } catch (ApiErrorException $e) {
            return $this->fail('erreur stripe : ' . $e->getMessage());
        }

        return $this->success('redirection', ['redirect' => $portalSession->url]);

    }

    /**
     * @throws Exception
     */
    public function finishCart(Event $event): JsonResponse
    {
        $cart = Cart::query()->firstWhere('checkout_id', $event->data->object->id);
        $cart->save();
        $cart->update([
            'bought' => true,
            'payment_id' => $event->data->object->payment_intent
        ]);
        $itemsBought = $cart->items;

        $total = 0;

        foreach ($itemsBought as $item) {
            $item->bought = true;
            $item->available = false;
            $item->save();
            $total += $item->pivot->item_price;
        }

        // Rajout de 1 points par centaines d'euros dépensés.
        $centaines = floor($total / 100);

        // Formule pour récupérer les points de fidélité, 1€ = 0.3 points et 1 point par centaines d'euros
        $total = 0.3 * $total + $centaines;

        $fidelityHistory = new Fidelity([
            'amount' => $total,
            'reason' => "Achat sur la boutique",
            'date' => Carbon::now(),
            'payment_id' => $event->data->object->payment_intent,
            'user_id' => $cart->user_id,
        ]);

        $user = User::query()->find($cart->user_id);

        $user->fidelity_points += $total;
        $user->save();

        $fidelityHistory->save();

        try {
            PushNotificationsController::sendNotification("Achat terminé !", "Votre achat a bien été complété :)", $user->id);
            Log::error("requête réussie");
        } catch (Exception $e) {
            Log::error("requête pas réussie" . $e->getMessage());

        }

        return $this->success('test', $cart->items);
    }

    public function test(Request $request): JsonResponse
    {
        $cart = Cart::query()->firstWhere('id', $request->input('id'));

        return $this->success('alors', $cart->setAppends(['payment', 'itemNumber']));
    }
}
