<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PushNotificationsController extends Controller
{
    use ApiResponse;


    public function sendNotificationsToAllSubscribedUsers(Request $request): JsonResponse
    {
        if ($request->has("message")) {
            $message = $request->get("message");
        } else {
            return $this->fail("Message manquant !", $request->all());
        }

        $content = (object)[
            'app_id' => getenv('ONESIGNAL_APP_ID'),
            'contents' => [
                "en" => $message,
                "fr" => $message
            ],
            "included_segments" => [
                "Subscribed Users"
            ],
            "name" => "ALERTE A LA NOTIFICATION BAHAHAHA"
        ];

        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => 'Basic ' . getenv('ONESIGNAL_APP_REST'),
            'Content-Type' => 'application/json'
        ])
            ->post('https://onesignal.com/api/v1/notifications', $content);

        return $this->success("Euh coucou ?", $response->body());
    }
}
