<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{
    public function index()
    {
        $menu =Menu::where('status','!=',0)
            ->orderBy('table_id','ASC')
            ->select("id","name","status","link")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'menu'=>$menu
        ];
        return response()->json($result);
    }
    public function trash()
    {
        $menu =Menu::where('status','=',0)
            ->orderBy('table_id','ASC')
            ->select("id","name","status","link","table_id")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'menu'=>$menu
        ];
        return response()->json($result);
    }
    public function show($id)
    {
        $menu =Menu::find($id);
        if($menu==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'menu'=>$menu
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'menu'=>$menu
            ];
        }
        return response()->json($result);
    }
   public function store(StoreMenuRequest $request)
    {
        $menu = new Menu();
        $menu->name =  $request->name;
        $menu->table_id =  $request->table_id;
        $menu->link =  $request->link;
        $menu->status =  $request->status;
        $menu->type =  $request->type;
        $check_save = true;
        //upload file
        // $list_exten=['jpg','png','webp','gif'];
        // if ($request->hasFile('image')) {
        //     $exten = $request->image->extension();
        //     if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
        //         $fileName = date('YmdHis') . '.' . $exten;
        //         $request->image->move(public_path('image/menu'), $fileName);
        //         $menu->image = $fileName;
        //     }
        // }
        $menu->created_by = Auth::id() ?? 1;
        $menu->created_at =  date('Y-m-d H:i:s');

        if($check_save == true)
        {
            if($menu->save())
            {
                $result =[
                'status'=>true,
                'message'=>'Thêm thành công',
                'menu'=>$menu
                ];
            }
            else
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không thể thêm',
                    'menu'=>null
                ];
            }
        }
        // else
        // {
        //     $result =[
        //         'status'=>false,
        //         'message'=>'chưa chọn hình ảnh',
        //         'menu'=>null
        //     ];
        // }
        return response()->json($result);
    }

    public function update(UpdateMenuRequest $request, string $id)
    {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        // Cập nhật dữ liệu
        $menu->name =  $request->name;
        $menu->table_id =  $request->table_id;
        $menu->link =  $request->link;
        $menu->status =  $request->status;
        $menu->type =  $request->type;

        // if ($request->hasFile('image')) {
        //     $exten = $request->image->extension();
        //     if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
        //         $fileName = date('YmdHis') . '.' . $exten;
        //         $request->image->move(public_path('image/menu'), $fileName);
        //         $menu->image = $fileName;
        //     }
        // }
        $menu->created_at = date('Ymd H:i:s');
        $menu->created_by = Auth::id() ?? 1;
        $menu->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'menu' => $menu,
        ]);
    }

    public function status(string $id)
    {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $menu->status = ($menu->status == 1) ? 2 : 1;
        $menu->updated_at = date('Y-m-d H:i:s');
        $menu->updated_by = Auth::id() ?? 1;

        $menu->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'menu' => $menu,
        ]);
    }
    public function delete($id)
    {
        $menu = Menu::find($id);
        if($menu==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'menu'=>null
            ];
            return response()->json($result);
        }
        $menu->status = 0;
        $menu->updated_by =  1;
        $menu->updated_at =  date('Y-m-d H:i:s');
        if($menu->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'menu'=>$menu
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'menu'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $menu = Menu::find($id);
        if($menu==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'menu'=>null
            ];
            return response()->json($result);
        }
        $menu->status = 2;
        $menu->updated_by =  1;
        $menu->updated_at =  date('Y-m-d H:i:s');
        if($menu->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'menu'=>$menu
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'menu'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $menu = Menu::find($id);
        if($menu==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'menu'=>null
            ];
            return response()->json($result);
        }
        if($menu->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'menu'=>$menu
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'menu'=>null
            ];
        }
        return response()->json($result);
}

}