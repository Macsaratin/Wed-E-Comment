<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductStore;
use App\Http\Requests\StoreProductStoreRequest;
use App\Http\Requests\UpdateProductStoreRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
class ProductStoreController extends Controller
{
    public function index()
{
    $productStore = Product::where('products.status', '!=', 0)
        ->join('categories', 'products.category_id', '=', 'categories.id')
        ->join('brands', 'products.brand_id', '=', 'brands.id')
        ->join('product_stores', 'products.id', '=', 'product_stores.product_id')
        ->with('images')
        ->orderBy('product_stores.created_at', 'DESC')
        ->select("products.id", "products.name", "products.status", "categories.name as catname", "brands.name as brandname", "product_stores.price_root", "product_stores.qty")
        ->get();

    $result = [
        'status' => true,
        'message' => 'Tải danh sách sản phẩm thành công',
        'productStore' => $productStore,
        'total' => count($productStore)
    ];

    return response()->json($result);
}      public function trash()
    {
        $productStore =ProductStore::where('status','=',0)
            ->orderBy('product_id','ASC')
            ->select("id","status","price","qty")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'productStore'=>$productStore
        ];
        return response()->json($result);
    }
    public function show($id)
    {
        $productStore =ProductStore::find($id);
        if($productStore==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'productStore'=>$productStore
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'productStore'=>$productStore
            ];
        }
        return response()->json($result);
    }
   public function store(StoreProductStoreRequest $request)
    {
        $productStore = new ProductStore();
        $productStore->price_root =  $request->price_root;
        $productStore->status =  $request->status;
        $productStore->qty =  $request->qty;
        $productStore->product_id =  $request->product_id;
        $check_save = true;
        //upload file
        // $list_exten=['jpg','png','webp','gif'];
        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->image->move(public_path('image/productStore'), $fileName);
                $productStore->image = $fileName;
            }
        }
        $productStore->created_by = Auth::id() ?? 1;
        $productStore->created_at =  date('Y-m-d H:i:s');

        if($check_save == true)
        {
            if($productStore->save())
            {
                $result =[
                'status'=>true,
                'message'=>'Thêm thành công',
                'productStore'=>$productStore
                ];
            }
            else
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không thể thêm',
                    'productStore'=>null
                ];
            }
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'chưa chọn hình ảnh',
                'productStore'=>null
            ];
        }
        return response()->json($result);
    }

    public function update(UpdateproductStoreRequest $request, string $id)
    {
        $productStore = ProductStore::find($id);
        if (!$productStore) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        // Cập nhật dữ liệu
        $productStore->price_root =  $request->price_root;
        $productStore->status =  $request->status;
        $productStore->qty =  $request->qty;
        $productStore->product_id =  $request->product_id;

        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->image->move(public_path('image/productStore'), $fileName);
                $productStore->image = $fileName;
            }
        }
        $productStore->created_at = date('Ymd H:i:s');
        $productStore->created_by = Auth::id() ?? 1;
        $productStore->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'productStore' => $productStore,
        ]);
    }

    public function status(string $id)
    {
        $productStore = ProductStore::find($id);
        if (!$productStore) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $productStore->status = ($productStore->status == 1) ? 2 : 1;
        $productStore->updated_at = date('Y-m-d H:i:s');
        $productStore->updated_by = Auth::id() ?? 1;

        $productStore->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'productStore' => $productStore,
        ]);
    }
    public function delete($id)
    {
        $productStore = ProductStore::find($id);
        if($productStore==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'productStore'=>null
            ];
            return response()->json($result);
        }
        $productStore->status = 0;
        $productStore->updated_by =  1;
        $productStore->updated_at =  date('Y-m-d H:i:s');
        if($productStore->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'productStore'=>$productStore
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'productStore'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $productStore = ProductStore::find($id);
        if($productStore==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'productStore'=>null
            ];
            return response()->json($result);
        }
        $productStore->status = 2;
        $productStore->updated_by =  1;
        $productStore->updated_at =  date('Y-m-d H:i:s');
        if($productStore->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'productStore'=>$productStore
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'productStore'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $productStore = ProductStore::find($id);
        if($productStore==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'productStore'=>null
            ];
            return response()->json($result);
        }
        if($productStore->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'productStore'=>$productStore
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'productStore'=>null
            ];
        }
        return response()->json($result);
}

}