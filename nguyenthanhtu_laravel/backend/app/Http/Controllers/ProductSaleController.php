<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductSale;
use App\Http\Requests\StoreProductSaleRequest;
use App\Http\Requests\UpdateProductSaleRequest;
use Illuminate\Support\Facades\Auth;

class ProductSaleController extends Controller
{
    public function index()
    {
        $productSale =ProductSale::where('product_sales.status','!=',0)
            ->orderBy('product_sales.product_id','ASC')
            ->join ('products','products.id','=','product_sales.product_id')
            ->select("product_sales.id","product_sales.price_sale",
            "product_sales.status","product_sales.date_begin","product_sales.date_end",
            "products.name as productname")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'productSale'=>$productSale
        ];
        return response()->json($result);
    }
    public function trash()
    {
        $productSale =ProductSale::where('status','=',0)
            ->orderBy('product_id','ASC')
            ->select("id","price_sale","status","date_begin","date_end")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'productSale'=>$productSale
        ];
        return response()->json($result);
    }
    public function show($id)
    {
        $productSale =ProductSale::find($id);
        if($productSale==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'productSale'=>$productSale
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'productSale'=>$productSale
            ];
        }
        return response()->json($result);
    }
   public function store(StoreProductSaleRequest $request)
    {
        $productSale = new ProductSale();
        $productSale->price_sale =  $request->price_sale;
        $productSale->status =  $request->status;
        $productSale->date_begin =  $request->date_begin;
        $productSale->date_end =  $request->date_end;
        $productSale->product_id =  $request->product_id;
        $check_save = true;        
        $productSale->created_by = Auth::id() ?? 1;
        $productSale->created_at =  date('Y-m-d H:i:s');
        if($check_save == true)
        {
            if($productSale->save())
            {
                $result =[
                'status'=>true,
                'message'=>'Thêm thành công',
                'productSale'=>$productSale
                ];
            }
            else
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không thể thêm',
                    'productSale'=>null
                ];
            }
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'chưa chọn hình ảnh',
                'productSale'=>null
            ];
        }
        return response()->json($result);
    }

    public function update(UpdateproductSaleRequest $request, string $id)
    {
        $productSale = ProductSale::find($id);
        if (!$productSale) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        // Cập nhật dữ liệu
        $productSale->name =  $request->name;
        $productSale->price_sale =  $request->price_sale;
        $productSale->status =  $request->status;
        $productSale->date_begin =  $request->date_begin;
        $productSale->date_end =  $request->date_end;
        $productSale->product_id =  $request->product_id;


        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->image->move(public_path('image/productSale'), $fileName);
                $productSale->image = $fileName;
            }
        }
        $productSale->created_at = date('Ymd H:i:s');
        $productSale->created_by = Auth::id() ?? 1;
        $productSale->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'productSale' => $productSale,
        ]);
    }

    public function status(string $id)
    {
        $productSale = ProductSale::find($id);
        if (!$productSale) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $productSale->status = ($productSale->status == 1) ? 2 : 1;
        $productSale->updated_at = date('Y-m-d H:i:s');
        $productSale->updated_by = Auth::id() ?? 1;

        $productSale->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'productSale' => $productSale,
        ]);
    }
    public function delete($id)
    {
        $productSale = ProductSale::find($id);
        if($productSale==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'productSale'=>null
            ];
            return response()->json($result);
        }
        $productSale->status = 0;
        $productSale->updated_by =  1;
        $productSale->updated_at =  date('Y-m-d H:i:s');
        if($productSale->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'productSale'=>$productSale
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'productSale'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $productSale = ProductSale::find($id);
        if($productSale==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'productSale'=>null
            ];
            return response()->json($result);
        }
        $productSale->status = 2;
        $productSale->updated_by =  1;
        $productSale->updated_at =  date('Y-m-d H:i:s');
        if($productSale->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'productSale'=>$productSale
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'productSale'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $productSale = ProductSale::find($id);
        if($productSale==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'productSale'=>null
            ];
            return response()->json($result);
        }
        if($productSale->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'productSale'=>$productSale
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'productSale'=>null
            ];
        }
        return response()->json($result);
}

}