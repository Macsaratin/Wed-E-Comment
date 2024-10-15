<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductImage;
use App\Models\Product;

use App\Http\Requests\StoreProductImageRequest;
use App\Http\Requests\UpdateProductImageRequest;
use Illuminate\Support\Facades\Auth;

class ProductImageController extends Controller
{
    public function index()
    {
        $productImages = ProductImage::with('product')->get(); // Giả sử bạn đã thiết lập quan hệ trong mô hình ProductImage
    
        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'productImages' => $productImages->map(function ($image) {
                return [
                    'id' => $image->id,
                    'thumbnail' => $image->thumbnail,
                ];
            }),
        ];
    
        return response()->json($result);
    }
    

    public function trash()
    {
        $productimage =ProductImage::where('id','!=',0)
            ->orderBy('product_id','ASC')
            ->select("id","thumbnail",)
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'productimage'=>$productimage
        ];
        return response()->json($result);
    }
    public function show($id)
    {
        $productimage =ProductImage::find($id);
        if($productimage==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'productimage'=>$productimage
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'productimage'=>$productimage
            ];
        }
        return response()->json($result);
    }
public function store(StoreProductImageRequest $request)
{
    $productimage = new ProductImage();
    $productimage->product_id = $request->product_id;

    if ($request->hasFile('thumbnail')) {
        $validatedImage = $request->validate([
            'thumbnail' => 'required|mimes:jpg,png,webp,gif,jpeg|max:2048',
        ]);
        $imageName = time() . '.' . $validatedImage['thumbnail']->extension();
        $validatedImage['thumbnail']->storeAs('images/product', $imageName);
        $productimage->thumbnail = $imageName;
    } else {
        return response()->json([
            'status' => false,
            'message' => 'Chưa chọn hình ảnh',
            'productimage' => null
        ]);
    }

    if ($productimage->save()) {
        return response()->json([
            'status' => true,
            'message' => 'Thêm thành công',
            'productimage' => $productimage
        ]);
    } else {
        return response()->json([
            'status' => false,
            'message' => 'Không thể thêm',
            'productimage' => null
        ]);
    }
}

public function update(UpdateProductImageRequest $request, string $id)
{
    $productimage = ProductImage::find($id);
    if (!$productimage) {
        return response()->json([
            'status' => false,
            'message' => 'Không tìm thấy dữ liệu',
        ]);
    }

    $productimage->product_id = $request->product_id;

    if ($request->hasFile('thumbnail')) {
        $exten = $request->thumbnail->extension();
        if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
            $fileName = date('YmdHis') . '.' . $exten;
            $request->thumbnail->move(public_path('images/productimage'), $fileName);
            $productimage->thumbnail = $fileName;
        }
    }

    $productimage->save();

    return response()->json([
        'status' => true,
        'message' => 'Cập nhật thành công',
        'productimage' => $productimage,
    ]);
}


    public function status(string $id)
    {
        $productimage = ProductImage::find($id);
        if (!$productimage) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $productimage->status = ($productimage->status == 1) ? 2 : 1;
        // $productimage->updated_at = date('Y-m-d H:i:s');
        // $productimage->updated_by = Auth::id() ?? 1;

        $productimage->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'productImage' => $productimage,
        ]);
    }
    public function delete($id)
    {
        $productimage = ProductImage::find($id);
        if($productimage==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'productImage'=>null
            ];
            return response()->json($result);
        }
        $productimage->status = 0;
        // $productimage->updated_by =  1;
        // $productimage->updated_at =  date('Y-m-d H:i:s');
        if($productimage->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'productimage'=>$productimage
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'productImage'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $productimage = ProductImage::find($id);
        if($productimage==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'productimage'=>null
            ];
            return response()->json($result);
        }
        $productimage->status = 2;
        // $productimage->updated_by =  1;
        // $productimage->updated_at =  date('Y-m-d H:i:s');
        if($productimage->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'productImage'=>$productimage
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'productimage'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $productimage = ProductImage::find($id);
        if($productimage==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'productImage'=>null
            ];
            return response()->json($result);
        }
        if($productimage->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'productimage'=>$productimage
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'productimage'=>null
            ];
        }
        return response()->json($result);
}
}