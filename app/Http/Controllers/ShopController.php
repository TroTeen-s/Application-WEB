<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ItemRefund;
use App\Models\Product;
use App\Models\Refund;
use App\Traits\ApiResponse;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient;
use PDF;
use App\Models\Payment;

use App\Models\Invoice;
use LaravelDaily\Invoices\Invoice as InvoiceDocument;
use LaravelDaily\Invoices\Classes\Party;
use LaravelDaily\Invoices\Classes\InvoiceItem;

use Codedge\Fpdf\Fpdf\Fpdf;


class ShopController extends Controller
{
    use ApiResponse;
    private $fpdf;
 

    public function __construct()
    {
    }

    public function productList(): JsonResponse
    {
        $products = Product::query()->where([
            'active' => true
        ])->get();

        if ($products) {
            return $this->success("Liste des produits", $products);
        }

        return $this->fail("Erreur de traitement");
    }

    public function productInfo(int $productId): JsonResponse
    {
        $product = Product::query()->firstWhere(['id' => $productId]);

        if ($product) {
            return $this->success("Infos du produit $productId", $product);
        }

        return $this->fail("Erreur de traitement");
    }

    public function getProductById(Request $request): JsonResponse
    {
        if (!$request->has('productIDs')) {
            return $this->fail('paramètre productIDs manquant');
        }

        $productIDs = $request->input("productIDs");
        $products = Product::query()->findMany($productIDs);

        foreach ($products as $product) {
            $product->setHidden(['created_at', 'updated_at']);
        }

        return $this->success("voici les infos des produits demandés", $products);
    }

    public function buyCart(Request $request): JsonResponse
    {
        $user = auth()->user();
        if (!$request->has('productIDs')) {
            return $this->fail('paramètre productIDs manquant');
        }

        $productIDs = $request->input("productIDs");
        $products = Product::query()->findMany($productIDs);

        $price = 0;
        $cart = new Cart(['user_id' => $user->id]);
        $cart->save();

        foreach ($products as $product) {
            $item = $product->getOneAvailableForPurchase();
            if (empty($item)) {
                return $this->fail("erreur dans la récupération d'un item pour " . $product->name);
            }
            $cart->items()->attach($item, ['item_price' => $product->price]);
            $price += $product->price;
        }

        $cart->save();

        $stripe = new StripeClient(getenv('STRIPE_PRIVATE'));

        try {
            $checkout_session = $stripe->checkout->sessions->create(array_filter([
                'mode' => 'payment',
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => 'Panier',
                        ],
                        'unit_amount' => $price * 100,
                    ],
                    'quantity' => 1,
                ]],
                "billing_address_collection" => "required",

                'success_url' => getenv('APP_URL') . '/account/purchases',
                'cancel_url' => getenv('APP_URL'),
                'customer' => $user->id_stripe ?? '',
            ]));

            $cart->checkout_id = $checkout_session->id;
            $cart->save();

        } catch (ApiErrorException $e) {
            return $this->fail('erreur', $e->getMessage());
        }


        return $this->success('redirection', ['redirect' => $checkout_session->url]);
    }

    public function getAllCartsInfo(): JsonResponse
    {
        $carts = Cart::query()
            ->where(['bought' => true, 'user_id' => auth()->id()])
            ->get();

        if (empty($carts)) {
            return $this->fail('aucun panier correspondant');
        }

        $carts->each(function ($cart) {
            $cart->setAppends(['payment', 'itemNumber']);
        });

        return $this->success('alors', $carts);

    }

    public function getCartInfo($id): JsonResponse
    {
        $cart = Cart::query()->firstWhere('id', $id);

        if (empty($cart)) {
            return $this->fail('aucun panier correspondant', ['id' => $id]);
        }

        return $this->success('informations sur l\'achat', $cart->setAppends(['payment', 'itemNumber', 'items']));

    }

    public function initDocument($id)
    {
    
    $data = Payment::query()
    ->where(['user_id' => $id])
    ->get();


    $pdf = new FPDF( 'P', 'mm', 'A4' );
    // on sup les 2 cm en bas
    $pdf->SetAutoPagebreak(False);
    $pdf->SetMargins(0,0,0);

    $num_page = 1; $limit_inf = 0; $limit_sup = 18;
 
        $pdf->AddPage();
        
        // logo : 80 de largeur et 55 de hauteur
        // $pdf->Image('EASYSCOOTER', 10, 10, 80, 55);
        $pdf->SetLineWidth(0.1); $pdf->SetFillColor(192); $pdf->Rect(120, 15, 85, 8, "DF");
        $pdf->SetXY( 10, 15 ); $pdf->SetFont( "Arial", "B", 12 ); $pdf->Cell( 85, 8, "EASYSCOOTER", 1, 0, 'C');

        // n° page en haute à droite
        $pdf->SetXY( 120, 5 ); $pdf->SetFont( "Arial", "B", 12 ); $pdf->Cell( 160, 8, $num_page . '/' . 1, 0, 0, 'C');
        
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
        $pdf->Cell( 60, 8, $data[0]["billing_address_city"] . ", " . $data[0]["billing_address_line"] . ", " . $data[0]["billing_address_postal_code"], 0, 0, '');
       
        
        // si derniere page alors afficher total
        if ($num_page == 1)
        {
            // les totaux, on n'affiche que le HT. le cadre après les lignes, demarre a 213
            $pdf->SetLineWidth(0.1); $pdf->SetFillColor(192); $pdf->Rect(5, 213, 90, 8, "DF");
            // HT, la TVA et TTC sont calculés après
            $nombre_format_francais = "Total HT : " . $data[0]["amount"] . " €";
            $pdf->SetFont('Arial','',10); $pdf->SetXY( 95, 213 ); $pdf->Cell( 63, 8, $data[0]["amount"], 0, 0, 'C');
            // en bas à droite
            $pdf->SetFont('Arial','B',8); $pdf->SetXY( 181, 227 ); $pdf->Cell( 24, 6, $data[0]["amount"], 0, 0, 'R');

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
        $pdf->SetXY( 145, 96 ); $pdf->SetFont('Arial','B',8); $pdf->Cell( 13, 8, "Qte", 0, 0, 'C');
        // $pdf->SetXY( 156, 96 ); $pdf->SetFont('Arial','B',8); $pdf->Cell( 22, 8, "PU HT", 0, 0, 'C');
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
            // $pdf->SetXY( 7, $y+9 ); $pdf->Cell( 140, 5, $data[0]["amount"], 0, 0, 'L');
            // // qte
            // $pdf->SetXY( 145, $y+9 ); $pdf->SetXY( 7, $y+9 ); $pdf->Cell( 140, 5, $data->amount, 0, 0, 'L');
            // // PU
            // $nombre_format_francais = number_format($data['pu'], 2, ',', ' ');
            // $pdf->SetXY( 158, $y+9 ); $pdf->Cell( 18, 5, $nombre_format_francais, 0, 0, 'R');
            // // Taux
            // $nombre_format_francais = number_format($data['taux_tva'], 2, ',', ' ');
            // $pdf->SetXY( 177, $y+9 ); $pdf->Cell( 10, 5, $nombre_format_francais, 0, 0, 'R');
            // total
            $nombre_format_francais = number_format($data[0]["amount"], 2, ',', ' ');
            $pdf->SetXY( 187, $y+9 ); $pdf->Cell( 18, 5, $nombre_format_francais, 0, 0, 'R');
            
            $pdf->Line(5, $y+14, 205, $y+14);
            
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

            $nombre_format_francais = "Net à payer TTC : " . $data[0]["amount"] . " euros";
            $pdf->SetFont('Arial','B',12); $pdf->SetXY( 5, 213 ); $pdf->Cell( 90, 8, $nombre_format_francais, 0, 0, 'C');
            // en bas à droite
            $pdf->SetFont('Arial','B',8); $pdf->SetXY( 181, 239 ); $pdf->Cell( 24, 6, $data[0]["amount"], 0, 0, 'R');
            // TVA
            $nombre_format_francais = "Total TVA : " . number_format($tot_tva, 2, ',', ' ') . " euros";
            $pdf->SetFont('Arial','',10); $pdf->SetXY( 158, 213 ); $pdf->Cell( 47, 8, $nombre_format_francais, 0, 0, 'C');
            // en bas à droite
            // $pdf->SetFont('Arial','B',8); $pdf->SetXY( 181, 233 ); $pdf->Cell( 24, 6, 2022, 0, 0, 'R');
        }

        // **************************
        // pied de page
        // **************************
        $pdf->SetLineWidth(0.1); $pdf->Rect(5, 260, 200, 6, "D");
        $pdf->SetXY( 1, 260 ); $pdf->SetFont('Arial','',7);
        $pdf->Cell( $pdf->GetPageWidth(), 7, "Clause de réserve de propriété (loi 80.335 du 12 mai 1980) : Les marchandises vendues demeurent notre propriété jusqu'au paiement intégral de celles-ci.", 0, 0, 'C');
        
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

    $pdf->Output("I", $nom_file);
    exit;
    }


    public function initRefund(Request $request): JsonResponse
    {
        //        return $this->success('loli', $request->all());
        if (!$request->has(['item_ids', 'cart_id'])) {
            return $this->fail("item ids missing", [$request->all()]);
        }

        $itemIds = $request->input('item_ids');
        $cartID = $request->input('cart_id');

        $cart = Cart::query()->find($cartID);
        $cartUser = $cart->user;

        if ($cartUser->id !== auth()->id()) {
            return $this->fail('not your purchase !');
        }

        $refund = new Refund([
            'reason' => $request->input('reason') ?? 'not specified',
            'cart_id' => $cartID,
            'amount' => 0.00
        ]);

        $total = 0;

        if ($refund->save()) {
            foreach ($itemIds as $itemID) {
                $item = CartItem::query()->firstWhere([
                    'cart_id' => $cartID,
                    'item_id' => $itemID
                ]);

                $total += $item->item_price;

                $refundItem = new ItemRefund([
                    'refund_id' => $refund->id,
                    'item_id' => $itemID
                ]);

                $refundItem->save();
            }
            $refund->amount = $total;
            $refund->save();
            return $this->success('refund created');
        }

        return $this->fail('refund creation failed');
    }

    public function getAllRefunds(): JsonResponse
    {
        $refunds = Refund::all();
        return $this->success('les retours demandés', $refunds);
    }

    /**
     * @throws ApiErrorException
     */
    public function issueRefund(int $refund_id): JsonResponse
    {
        if (empty($refund_id) && $refund_id !== 1) {
            return $this->fail('need refund id');
        }

        $refund = Refund::query()->where('id', $refund_id)->first();
        $cart = $refund->cart()->get()->first();
        $payment = $cart->payment()->get()->first();

        $stripe = new StripeClient(getenv('STRIPE_PRIVATE'));

        try {
            $refundRequest = $stripe->refunds->create(
                ['payment_intent' => $payment->id_stripe, 'amount' => $refund->amount * 100]
            );
        } catch (ApiErrorException $e) {
            return $this->fail('erreur stripe: ', [$e->getMessage(), $refund]);
        }

        $refund->refunded = true;
        $refund->status = 'closed';
        $refund->save();

        return $this->success('les infos', [$refund, $cart, $payment, $refundRequest]);

    }

    public function updateRefund(Request $request, int $refund_id): JsonResponse
    {
        $refundParams = $request->all();

        $refundParams['status'] = $refundParams['validated'] ? 'validated' : 'refused';


        $refund = Refund::query()->where('id', $refund_id)->update($refundParams);

        if ($refund) {
            return $this->success('updated successfully', $refund);
        } else {
            return $this->fail('update failed');
        }
    }
}
