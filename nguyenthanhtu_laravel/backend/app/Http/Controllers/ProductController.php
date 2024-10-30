<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductStore;
use App\Models\ProductImage;
use App\Models\ProductSale;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('images')
            ->where('products.status', '!=', 0)
            ->orderBy('products.id', 'ASC')
            ->join('product_images', 'products.id', '=', 'product_images.product_id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->join('brands', 'products.brand_id', '=', 'brands.id')
            ->select(
                "products.id",
                "products.name",
                "products.status",
                "categories.name as catname",
                "brands.name as brandname",
                "products.price",
                "product_images.thumbnail",
                "products.created_at",
            )
            ->get();
            foreach ($products as $product) {
                $product->thumbnail = url('images/product/' . $product->thumbnail); 
            }
    
        return response()->json([
            'status' => true,
            'message' => 'Tải danh sách sản phẩm thành công',
            'products' => $products,
        ]);
    }
    

    public function store(StoreProductRequest $request)
    {
        $product = new Product();
        $product->fill($request->all());
        $product->created_by = 1;
        $product->created_at = now();
    
        // Save product once with all data
        if ($product->save()) {
            if ($request->hasFile('thumbnail')) {
                $images = []; 
    
                foreach ($request->file('thumbnail') as $file) {
                    $fileName = date('YmdHis') . '_' . uniqid() . '.' . $file->extension();
                    $file->move(public_path('images/product'), $fileName);
    
                    // Prepare image data for batch insertion
                    $images[] = [
                        'product_id' => $product->id,
                        'thumbnail' => $fileName,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                ProductImage::insert($images);
            }
    
            // Respond with success and the created product data
            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công',
                'products' => $product,
            ]);
        }
    
        // Respond with failure if the product save failed
        return response()->json([
            'status' => false,
            'message' => 'Không thể thêm',
            'products' => null,
        ]);
    }
    

    public function show($id)
{
    // Fetch the product with its images
    $product = Product::with('images')->find($id);
    
    // Check if the product exists and is active
    if (!$product || $product->status == 0) {
        return response()->json([
            'status' => false,
            'message' => 'Sản phẩm không tồn tại hoặc đã bị vô hiệu hóa'
        ], 404);
    }
    
    // Return the product details
    return response()->json([
        'status' => true,
        'product' => $product // Make sure to use 'product' instead of 'products' for clarity
    ]);
}

public function update(UpdateProductRequest $request, $id)
{
    $product = Product::find($id);
    if (!$product) {
        return response()->json([
            'status' => false,
            'message' => 'Không tìm thấy thông tin',
            'product' => null
        ]);
    }

    // Fill the product with request data
    $product->fill($request->except('thumbnail')); // Exclude 'thumbnail' from fill

    // Update the user ID and timestamp
    $product->updated_by = Auth::id(); // Current user ID
    $product->updated_at = now();

    // Handle file uploads
    if ($request->hasFile('thumbnail')) {
        // Handle the image uploads
        $thumbnails = $request->file('thumbnail');
        $thumbnailPaths = [];

        foreach ($thumbnails as $thumbnail) {
            // Save each file and store the path
            $path = $thumbnail->store('images/product', 'public'); // Adjust path as needed
            $thumbnailPaths[] = $path;
        }

        // Clear old images (optional)
        $product->images()->delete(); 

        // Create new image entries
        foreach ($thumbnailPaths as $path) {
            $product->images()->create(['thumbnail' => $path]); // Create new image entries
        }
    }

    // Save the product
    if ($product->save()) {
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'product' => $product
        ]);
    }

    return response()->json([
        'status' => false,
        'message' => 'Không thể cập nhật',
        'product' => null
    ]);
}


    public function delete($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'product' => null,
            ]);
        }

        $product->status = 0;
        $product->updated_by = Auth::id(); // Current user ID
        $product->updated_at = now();

        if ($product->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thay đổi thành công',
                'product' => $product
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không thể thay đổi',
            'product' => null
        ]);
    }

    public function status($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'products' => null
            ]);
        }

        $product->status = ($product->status == 1) ? 2 : 1;
        $product->updated_by = Auth::id(); // Current user ID
        $product->updated_at = now();

        if ($product->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thay đổi thành công',
                'product' => $product
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không thể thay đổi',
            'product' => null
        ]);
    }

    public function restore($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'product' => null
            ]);
        }

        $product->status = 2;
        $product->updated_by = Auth::id(); // Current user ID
        $product->updated_at = now();

        if ($product->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thay đổi thành công',
                'product' => $product
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không thể thay đổi',
            'product' => null
        ]);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'product' => null
            ]);
        }

        if ($product->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa thành công',
                'product' => $product
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không thể xóa',
            'product' => null
        ]);
    }

    public function trash()
    {
     $product = Product::where('status','=',0)
         ->orderBy('created_at','ASC')
         ->select("id","name","status")
         ->get();
     $result =[
         'status'=>true,
         'message'=>'Tải dữ liệu thành công',
         'products'=>$product
     ];
     return response()->json($result);
    }
    
    public function product_new($limit)
    {
        $subproductstore = ProductStore::select('product_id', DB::raw('SUM(qty) as qty')) 
            ->groupBy('product_id');
        
        $products = Product::where('products.status', '=', 1)
            ->joinSub($subproductstore, 'product_stores', function ($join) {
                $join->on('products.id', '=', 'product_stores.product_id');
            })
            ->leftJoin('product_sales', function($join){
                $today = Carbon::now()->format('Y-m-d H:i:s');
                $join->on('products.id', '=', 'product_sales.product_id')
                     ->where([
                         ['product_sales.date_begin', '<=', $today],
                         ['product_sales.date_end', '>=', $today],
                         ['product_sales.status', '=', 1]
                     ]);
            })
            ->with('images')
            ->orderBy('products.created_at', 'DESC')
            ->select('products.id', 'products.name', 'products.price', 'products.slug', 'product_sales.price_sale')
            ->limit($limit)
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Lấy dữ liệu thành công',
            'products' => $products,
        ]);
    }
}