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
        $products = Product::with('images') // Eager load images
            ->where('products.status', '!=', 0)
            ->orderBy('products.id', 'ASC')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->join('brands', 'products.brand_id', '=', 'brands.id')
            ->select(
                "products.id",
                "products.name",
                "products.status",
                "categories.name as catname",
                "brands.name as brandname",
                "products.price",
            )
            ->get();
    
        return response()->json([
            'status' => true,
            'message' => 'Tải danh sách sản phẩm thành công',
            'products' => $products,
        ]);
    }
    
    
    public function store(StoreProductRequest $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->slug = $request->slug;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->content = $request->input('content', null);
        $product->price = $request->price;
        $product->description = $request->description;
        $product->status = $request->status;
        $product->created_by = 1; // Current user ID
        $product->created_at = now();
    
        if ($product->save()) {
            // Save multiple images
            if ($request->hasFile('thumbnail')) {
                foreach ($request->file('thumbnail') as $file) {
                    $fileName = date('YmdHis') . '_' . uniqid() . '.' . $file->extension();
                    $file->move(public_path('images/product'), $fileName);
                    
                    ProductImage::create([
                        'product_id' => $product->id,
                        'thumbnail' => $fileName,
                    ]);
                }
            }
    
            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công',
                'product' => $product,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thêm',
                'product' => null,
            ]);
        }
    }
    

    public function show($id)
    {
        $products = Product::find($id);

        if (!$products || $products->status == 0) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm không tồn tại hoặc đã bị vô hiệu hóa'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'products' => $products
        ]);
    }

    public function update(UpdateProductRequest $request,$id)
    {
        $product = Product::find($id);
        if($product==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tín',
                'product'=>null
            ];
            return response()->json($result);
        }
        $product->name = $request->name;
        $product->slug = $request->slug;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->status = $request->status;
        $product->updated_at =  date('Y-m-d H:i:s');
        $product->status =  $request->status;
        if($product->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Cập nhật thành công',
                'product'=>$product
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể cập nhật',
                'product'=>null
            ];
        }
        return response()->json($result);
    }
    public function delete($id)
    {
        $product = Product::find($id);
        if($product==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'products'=>null
            ];
            return response()->json($result);
        }
        $product->status = 0;
        $product->updated_by =  1;
        $product->updated_at =  date('Y-m-d H:i:s');
        if($product->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'products'=>$product
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'products'=>null
            ];
        }
        return response()->json($result);
    }
    public function status($id)
    {
        $products = Product::find($id);
        if($products==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'products'=>null
            ];
            return response()->json($result);
        }
        $products->status = ($products->status==1)?2:1;
        $products->updated_by =  1;
        $products->updated_at =  date('Y-m-d H:i:s');
        if($products->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'products'=>$products
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'products'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $product = Product::find($id);
        if($product==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'product'=>null
            ];
            return response()->json($result);
        }
        $product->status = 2;
        $product->updated_by =  1;
        $product->updated_at =  date('Y-m-d H:i:s');
        if($product->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'product'=>$product
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'category'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $product = Product::find($id);
        if($product==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'product'=>null
            ];
            return response()->json($result);
        }
        if($product->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'product'=>$product
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'product'=>null
            ];
        }
        return response()->json($result);
}
public function trash()
{
    $products = Product::where('status', '=', 0)
        ->join('product_images', 'products.id', '=', 'product_images.product_id')
        ->orderBy('products.created_at', 'DESC') // Order by creation date or another relevant field
        ->select("products.id", "products.name", "product_images.thumbnail", "products.status") // Adjust fields as necessary
        ->get();
    
    // Prepare the response
    $result = [
        'status' => true,
        'message' => 'Tải dữ liệu thành công',
        'product' => $products 
    ];
    
    return response()->json($result);
}


    public function product_new($limit){
    $subproductstore = ProductStore::select('product_id', DB::raw('SUM(qty) as qty')) 
    ->groupBy('products_id');
    $products = Product::where('products.status', '=', 1)
    ->joinSub ($subproductstore, 'product_stores', function ($join) {
        $join -> on('products.id','=','product_stores.product_id');
        })
    ->leftJoin('product_sales',function($join){
        $today=Carbon::now()-> format('Y-md H:i:s');
        $join->on('products.id','=','product_sales.product_id')
        ->where([
            ['product_sales.date_begin','<=',$today],
            ['product_sales.date_end','>=',$today],
            ['product_sales.status','=',1]
        ]);
    })
    ->with('images')
    ->orderBy('products.created_at','DESC')
    ->select('products.id','products.name','products.price','products.slug','product_sales.price_sale')
    ->limit($limit)
    ->get();
    $result=[
        'status'=>true,
        'message'=>'Lấy dữ liệu thành công',
        'products'=>$products,
    ];
    return response()->json($result);
    }
}