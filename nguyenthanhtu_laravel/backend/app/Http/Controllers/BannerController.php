<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner;
use App\Http\Requests\StoreBannerRequest;
use App\Http\Requests\UpdateBannerRequest;
use Illuminate\Support\Facades\Auth;

class BannerController extends Controller
{
    public function index()
 {
        $banner = Banner::where('status','!=',0)
            ->orderBy('sort_order','ASC')
            ->select("id","name","link","image","description","status","position")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'banner'=>$banner
        ];
        return response()->json($result);
 }

 public function trash()
 {
     $banner = Banner::where('status','=',0)
         ->orderBy('sort_order','ASC')
         ->select("id","name","link","image","description","status","position")
         ->get();
     $result =[
         'status'=>true,
         'message'=>'Tải dữ liệu thành công',
         'banner'=>$banner
     ];
     return response()->json($result);
 }

 public function show($id)
 {
     $banner = Banner::find($id);
     if($banner==null)
     {
         $result =[
             'status'=>false,
             'message'=>'Không tìm thấy dữ liệu',
             'banner'=>$banner
         ];
     }
     else
     {
         $result =[
             'status'=>true,
             'message'=>'Tải dữ liệu thành công',
             'banner'=>$banner
         ];
     }
     return response()->json($result);
 }

//  public function store(StoreBannerRequest $request)
//  {
//         $banner = new Banner();
//         $banner->name =  $request->name;
//         $banner->link =  $request->link;
//         //upload file
//         $exten=$request->image->extension();
//         $imageName = date('YmdHis').".".$exten;
//         $request->image->move(public_path('images/banner'), $imageName);
//         $banner->image =  $imageName;
//        //end upload file
//         $banner->description =  $request->description;
//         $banner->position =  $request->position;
//         $banner->sort_order =  $request->sort_order;
//         $banner->created_by =  1;
//         $banner->created_at =  date('Y-m-d H:i:s');
//         $banner->status =  $request->status;
//         if($banner->save())
//         {
//             $result =[
//                 'status'=>true,
//                 'message'=>'Thêm thành công',
//                 'banner'=>$banner
//             ];
//         }
//         else
//         {
//             $result =[
//                 'status'=>false,
//                 'message'=>'Không thể thêm',
//                 'banner'=>null
//             ];
//         }
//         return response()->json($result);
// }

public function store(StoreBannerRequest $request)
    {
        $banner = new Banner();
        $banner->name = $request->name;
        $banner->link = $request->link;
        $banner->description = $request->description;
        $banner->position = $request->position ?? 'slideshow';
        $banner->sort_order = $request->sort_order;
        $banner->created_by = 1;
        $banner->created_at = now();
        $banner->status = $request->status; // Trạng thái được truyền từ yêu cầu

        // Xử lý hình ảnh
        if ($request->hasFile('image')) {
            $validatedImage = $request->validate([
                'image' => 'image|mimes:jpg,png,webp,gif|max:2048',
            ]);
            $imageName = time() . '.' . $validatedImage['image']->extension();
            $validatedImage['image']->move(public_path('images/banner'), $imageName);
            $banner->image = $imageName;
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Chưa chọn hình ảnh',
                'banner' => null
            ]);
        }

        if ($banner->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công',
                'banner' => $banner
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thêm',
                'banner' => null
            ]);
        }
    }
public function update(UpdateBannerRequest $request,$id)
    {
        $banner = Banner::find($id);
        if($banner==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tín',
                'banner'=>null
            ];
            return response()->json($result);
        }
        $banner->name =  $request->name;
        $banner->link =  $request->link;
        //upload file
        if($request->image)
        {
            $exten=$request->image->extension();
            $imageName = date('YmdHis').".".$exten;
            $request->image->move(public_path('images/banner'), $imageName);
            $banner->image =  $imageName;
        }
        //end upload
        $banner->description =  $request->description;
        $banner->position =  $request->position;
        $banner->sort_order =  $request->sort_order;
        $banner->updated_by =  1;
        $banner->updated_at =  date('Y-m-d H:i:s');
        $banner->status =  $request->status;
        if($banner->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Cập nhật thành công',
                'banner'=>$banner
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể cập nhật',
                'banner'=>null
            ];
        }
        return response()->json($result);
    }

    public function status($id)
    {
        $banner = Banner::find($id);
        if($banner==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'banner'=>null
            ];
            return response()->json($result);
        }
        $banner->status = ($banner->status==1)?2:1;
        $banner->updated_by =  1;
        $banner->updated_at =  date('Y-m-d H:i:s');
        if($banner->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'banner'=>$banner
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'banner'=>null
            ];
        }
        return response()->json($result);
    }
    public function delete($id)
    {
        $banner = Banner::find($id);
        if($banner==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'banner'=>null
            ];
            return response()->json($result);
        }
        $banner->status = 0;
        $banner->updated_by =  1;
        $banner->updated_at =  date('Y-m-d H:i:s');
        if($banner->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'banner'=>$banner
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'banner'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $banner = Banner::find($id);
        if($banner==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'banner'=>null
            ];
            return response()->json($result);
        }
        $banner->status = 2;
        $banner->updated_by =  1;
        $banner->updated_at =  date('Y-m-d H:i:s');
        if($banner->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'banner'=>$banner
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'banner'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $banner = Banner::find($id);
        if($banner==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'banner'=>null
            ];
            return response()->json($result);
        }
        if($banner->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'banner'=>$banner
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'banner'=>null
            ];
        }
        return response()->json($result);
}


}