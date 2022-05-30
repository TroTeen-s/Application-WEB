<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MailController extends Controller
{
    public static function send($templateId, $to, $params) 
    {
        $config = \SendinBlue\Client\Configuration::getDefaultConfiguration()->setApiKey('api-key', ENV('SENDINBLUE'));
        $apiInstance = new \SendinBlue\Client\Api\TransactionalEmailsApi(
            new \GuzzleHttp\Client(),
            $config
        );

        $sendSmtpEmail = new \SendinBlue\Client\Model\SendSmtpEmail(); 
        $sendSmtpEmail["sender"] = new \SendinBlue\Client\Model\SendSmtpEmailSender(["name"=>env("SENDINBLUE_NAME"), "email"=>env("SENDINBLUE_EMAIL")]);
        $sendSmtpEmail["to"] = [new \SendinBlue\Client\Model\SendSmtpEmailTo($to)];
        $sendSmtpEmail["templateId"] = $templateId;
        $sendSmtpEmail["params"] = $params;
        $sendSmtpEmail["replyTo"] = new \SendinBlue\Client\Model\SendSmtpEmailReplyTo(["email"=> env("SENDINBLUE_EMAIL")]);
        $result = $apiInstance->sendTransacEmail($sendSmtpEmail);
    }
}
