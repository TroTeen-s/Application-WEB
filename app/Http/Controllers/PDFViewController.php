<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ItemRefund;
use App\Models\Product;
use App\Models\Refund;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Stripe\Exception\ApiErrorException;
use Stripe\StripeClient;
use Exception;


class PDFViewController extends Controller
{

    use ApiResponse;

}
