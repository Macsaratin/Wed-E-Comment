<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {
        $category =Category::where('status','!=',0)
            ->orderBy('sort_order','ASC')
            ->select("id","name","image","status","slug","parent_id","description")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'category'=>$category
        ];
        return response()->json($result);
    }
    public function trash()
    {
        $category =Category::where('status','=',0)
            ->orderBy('sort_order','ASC')
            ->select("id","name","image","status","slug","parent_id","description")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'category'=>$category
        ];
        return response()->json($result);
    }
    public function show($id)
    {
        $category =Category::find($id);
        if($category==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'category'=>$category
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'category'=>$category
            ];
        }
        return response()->json($result);
    }
   public function store(StoreCategoryRequest $request)
    {
        $category = new Category();
        $category->name = $request->name;
        $category->slug = $request->slug;
        $category->parent_id = $request->parent_id;
        $category->status = $request->status;
        $category->description = $request->description;
        $category->sort_order = $request->sort_order;
        $check_save = true;
        //upload file
        // $list_exten=['jpg','png','webp','gif'];
        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->image->move(public_path('images/category'), $fileName);
                $category->image = $fileName;
            }
        }
        $category->created_by = Auth::id() ?? 1;
        $category->created_at =  date('Y-m-d H:i:s');

        if($check_save == true)
        {
            if($category->save())
            {
                $result =[
                'status'=>true,
                'message'=>'Thêm thành công',
                'category'=>$category
                ];
            }
            else
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không thể thêm',
                    'category'=>null
                ];
            }
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'chưa chọn hình ảnh',
                'category'=>null
            ];
        }
        return response()->json($result);
    }

    public function update(UpdateCategoryRequest $request, string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        // Cập nhật dữ liệu
        $category->name = $request->name;
        $category->slug = $request->slug;
        $category->parent_id = $request->parent_id;
        $category->status = $request->status;
        $category->description = $request->description;
        $category->sort_order = $request->sort_order;

        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->image->move(public_path('images/category'), $fileName);
                $category->image = $fileName;
            }
        }
        $category->created_at = date('Ymd H:i:s');
        $category->created_by = Auth::id() ?? 1;
        $category->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'category' => $category,
        ]);
    }

    public function status(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $category->status = ($category->status == 1) ? 2 : 1;
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = Auth::id() ?? 1;

        $category->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'category' => $category,
        ]);
    }
    public function delete($id)
    {
        $category = Category::find($id);
        if($category==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'category'=>null
            ];
            return response()->json($result);
        }
        $category->status = 0;
        $category->updated_by =  1;
        $category->updated_at =  date('Y-m-d H:i:s');
        if($category->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'category'=>$category
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
    public function restore($id)
    {

        $category = Category::find($id);
        if($category==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'category'=>null
            ];
            return response()->json($result);
        }
        $category->status = 2;
        $category->updated_by =  1;
        $category->updated_at =  date('Y-m-d H:i:s');
        if($category->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'category'=>$category
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
        $category = Category::find($id);
        if($category==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'category'=>null
            ];
            return response()->json($result);
        }
        if($category->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'category'=>$category
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'category'=>null
            ];
        }
        return response()->json($result);
}

}