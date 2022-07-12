<?php

namespace App\Http\Controllers;

use App\Models\notification;
use App\Traits\ApiResponse;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PushNotificationsController extends Controller
{
    use ApiResponse;


    public function getAllNotifications(): JsonResponse
    {
        return $this->success("toutes les notifications", notification::all());
    }

    /**
     * @throws Exception
     */
    public function sendNotificationsToAllSubscribedUsers(Request $request): JsonResponse
    {
        if ($request->has("message") && $request->has("title")) {
            $message = $request->get("message");
            $title = $request->get("title");
        } else {
            return $this->fail("Message et/ou titre manquant !", $request->all());
        }

        try {
            $result = $this->sendNotification($title, $message);
        } catch (Exception $e) {
            return $this->fail($e->getMessage());
        }

        if ($result) {
            $notification = new notification(["title" => $title, "content" => $message]);
            $notification->save();
            return $this->success("Envoi de la notification avec succès");
        } else {
            return $this->fail("Erreur dans l'envoi de la notification");
        }
    }


    /**
     * @throws Exception
     */
    public function sendNotificationsToOneUser(string $title, string $message, int $targetUserID): JsonResponse
    {

        $result = $this->sendNotification($title, $message, $targetUserID);

        if ($result) {
            return $this->success("Envoi de la notification avec succès");
        } else {
            return $this->fail("Erreur dans l'envoi de la notification");
        }

    }

    /**
     * @param string $title Le titre de la notification à envoyer
     * @param string $message Le contenu de la notfication à envoyer
     * @param int|null $targetUserID L'id de l'utilisateur à target en cas d'une seule notification
     * @return bool true si la notification a bien été envoyé
     * @throws Exception
     */
    public static function sendNotification(string $title, string $message, int $targetUserID = null): bool
    {

        $content = [
            'app_id' => getenv('ONESIGNAL_APP_ID'),
            'contents' => [
                "en" => $message,
                "fr" => $message
            ],
            "name" => $title
        ];

        if ($targetUserID === null) {
            $content["included_segments"] = ["Subscribed Users"];
        } else {
            $content["include_external_user_ids"] = ["$targetUserID"];
        }

        $content = (object)$content;

        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Basic ' . getenv('ONESIGNAL_REST_ID'),
            'Content-Type' => 'application/json'
        ])
            ->withoutVerifying()
            ->post('https://onesignal.com/api/v1/notifications', $content);

        if ($response->successful()) {
            return true;
        } else {
            throw new Exception($response->body());
        }
    }
}
