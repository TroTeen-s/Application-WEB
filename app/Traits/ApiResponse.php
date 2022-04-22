<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{

    /**
     * Send a success response back
     *
     * @param mixed $message Message to identify the treatment outcome
     * @param mixed $data Data to be sent back to the client
     * @param mixed $code Status code of the Response
     * @return JsonResponse A Json serialized piece of data
     */
    protected function success(string $message, mixed $data = null, int $code = 200):JsonResponse
    {
        return response()->json([
            'success' => 'true',
            'message' => $message,
            'data' => $data
        ], $code);
    }

    /**
     * Send a fail response back
     *
     * @param mixed $message Message to identify the treatment outcome
     * @param mixed|null $data Data to be sent back to the client
     * @param mixed $code Status code of the Response
     * @return JsonResponse A Json serialized piece of data
     */
    protected function fail(string $message, mixed $data=null, int $code = 400):JsonResponse
    {
        return response()->json([
            'success' => 'false',
            'message' => $message,
            'data' => $data
        ], $code);
    }
}
