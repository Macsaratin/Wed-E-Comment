<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'name', 'slug', 'category_id', 'brand_id', 'content', 'price', 'description', 'status'
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}