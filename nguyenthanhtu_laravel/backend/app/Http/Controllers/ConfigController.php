<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Config;
use App\Http\Requests\StoreConfigRequest;
use App\Http\Requests\UpdateConfigRequest;
use Illuminate\Support\Facades\Auth;

class ConfigController extends Controller
{
    public function index()
    {
        $config =Config::where('status','!=',0)
            ->orderBy('site_name','ASC')
            ->select("id","email","phones","status","address","hotline")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'config'=>$config
        ];
        return response()->json($result);
    }
    public function trash()
    {
        $config =Config::where('status','=',0)
        ->orderBy('site_name','ASC')
        ->select("id","email","phones","status","address","hotline")
        ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'config'=>$config
        ];
        return response()->json($result);
    }
    public function show($id)
    {
        $config =Config::find($id);
        if($config==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'config'=>$config
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'config'=>$config
            ];
        }
        return response()->json($result);
    }
   public function store(StoreConfigRequest $request)
    {
        $config = new Config();
        $config->site_name = $request->site_name;
        $config->phones = $request->phones;
        $config->address = $request->address;
        $config->status = $request->status;
        $config->facebook = $request->facebook;
        $config->zalo = $request->zalo;
        $config->hotline = $request->hotline;
        $config->email = $request->email;

        $check_save = true;
        //upload file
        // $list_exten=['jpg','png','webp','gif'];
        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->image->move(public_path('image/config'), $fileName);
                $config->image = $fileName;
            }
        }
        $config->created_by = Auth::id() ?? 1;
        $config->created_at =  date('Y-m-d H:i:s');

        if($check_save == true)
        {
            if($config->save())
            {
                $result =[
                'status'=>true,
                'message'=>'Thêm thành công',
                'config'=>$config
                ];
            }
            else
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không thể thêm',
                    'config'=>null
                ];
            }
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'chưa chọn hình ảnh',
                'config'=>null
            ];
        }
        return response()->json($result);
    }

    public function update(UpdateConfigRequest $request, string $id)
    {
        $config = config::find($id);
        if (!$config) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        // Cập nhật dữ liệu
        $config->site_name = $request->site_name;
        $config->phones = $request->phones;
        $config->address = $request->address;
        $config->status = $request->status;
        $config->facebook = $request->facebook;
        $config->zalo = $request->zalo;
        $config->hotline = $request->hotline;
        $config->email = $request->email;


        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->image->move(public_path('image/config'), $fileName);
                $config->image = $fileName;
            }
        }
        $config->created_at = date('Ymd H:i:s');
        $config->created_by = Auth::id() ?? 1;
        $config->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'config' => $config,
        ]);
    }

    public function status(string $id)
    {
        $config = Config::find($id);
        if (!$config) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $config->status = ($config->status == 1) ? 2 : 1;
        $config->updated_at = date('Y-m-d H:i:s');
        $config->updated_by = Auth::id() ?? 1;

        $config->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'config' => $config,
        ]);
    }
    public function delete($id)
    {
        $config = Config::find($id);
        if($config==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'config'=>null
            ];
            return response()->json($result);
        }
        $config->status = 0;
        $config->updated_by =  1;
        $config->updated_at =  date('Y-m-d H:i:s');
        if($config->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'config'=>$config
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'config'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $config = Config::find($id);
        if($config==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'config'=>null
            ];
            return response()->json($result);
        }
        $config->status = 2;
        $config->updated_by =  1;
        $config->updated_at =  date('Y-m-d H:i:s');
        if($config->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'config'=>$config
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'config'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $config = Config::find($id);
        if($config==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'config'=>null
            ];
            return response()->json($result);
        }
        if($config->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'config'=>$config
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'config'=>null
            ];
        }
        return response()->json($result);
}

}