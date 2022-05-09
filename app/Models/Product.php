<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'price',
        'description',
        'image_path',
    ];

    private function GetAllItems(){
       return item::query()->Where('product_id',$this->id)->count();
    }

    use HasFactory;
}
