<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $user =User::where('status','!=',0)
            ->orderBy('id','ASC')
            ->select("id",'name','fullname','password','gender','thumbnail','email','phone','address')
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'user'=>$user
        ];
        return response()->json($result);
    }
    public function trash()
    {
        $user =User::where('status','=',0)
        ->orderBy('id','ASC')
        ->select("id","email","phone","status","address")
        ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'user'=>$user
        ];
        return response()->json($result);
    }
    public function show($id)
    {
        $user =User::find($id);
        if($user==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'user'=>$user
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'user'=>$user
            ];
        }
        return response()->json($result);
    }
   public function store(StoreUserRequest $request)
    {
        $user = new User();
        $user->site_name = $request->site_name;
        $user->phones = $request->phones;
        $user->address = $request->address;
        $user->status = $request->status;
        $user->facebook = $request->facebook;
        $user->zalo = $request->zalo;
        $user->hotline = $request->hotline;
        $user->email = $request->email;

        $check_save = true;
        //upload file
        // $list_exten=['jpg','png','webp','gif'];
        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->image->move(public_path('image/user'), $fileName);
                $user->image = $fileName;
            }
        }
        $user->created_by = Auth::id() ?? 1;
        $user->created_at =  date('Y-m-d H:i:s');

        if($check_save == true)
        {
            if($user->save())
            {
                $result =[
                'status'=>true,
                'message'=>'Thêm thành công',
                'user'=>$user
                ];
            }
            else
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không thể thêm',
                    'user'=>null
                ];
            }
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'chưa chọn hình ảnh',
                'user'=>null
            ];
        }
        return response()->json($result);
    }

    public function update(UpdateUserRequest $request, string $id)
    {
        $user = user::find($id);
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        // Cập nhật dữ liệu
        $user->site_name = $request->site_name;
        $user->phones = $request->phones;
        $user->address = $request->address;
        $user->status = $request->status;
        $user->facebook = $request->facebook;
        $user->zalo = $request->zalo;
        $user->hotline = $request->hotline;
        $user->email = $request->email;


        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->image->move(public_path('image/user'), $fileName);
                $user->image = $fileName;
            }
        }
        $user->created_at = date('Ymd H:i:s');
        $user->created_by = Auth::id() ?? 1;
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'user' => $user,
        ]);
    }

    public function status(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $user->status = ($user->status == 1) ? 2 : 1;
        $user->updated_at = date('Y-m-d H:i:s');
        $user->updated_by = Auth::id() ?? 1;

        $user->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'user' => $user,
        ]);
    }
    public function delete($id)
    {
        $user = User::find($id);
        if($user==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'user'=>null
            ];
            return response()->json($result);
        }
        $user->status = 0;
        $user->updated_by =  1;
        $user->updated_at =  date('Y-m-d H:i:s');
        if($user->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'user'=>$user
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'user'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $user = user::find($id);
        if($user==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'user'=>null
            ];
            return response()->json($result);
        }
        $user->status = 2;
        $user->updated_by =  1;
        $user->updated_at =  date('Y-m-d H:i:s');
        if($user->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'user'=>$user
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'user'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $user = User::find($id);
        if($user==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'user'=>null
            ];
            return response()->json($result);
        }
        if($user->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'user'=>$user
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'user'=>null
            ];
        }
        return response()->json($result);
}
public function login(Request $request)
{
    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json(['message' => 'Login successful', 'token' => $token, 'user' => $user], 200);
}
public function register(StoreUserRequest $request)
{
    $user = new User();
    $user->name = $request->name;
    $user->fullname = $request->fullname; // Include fullname if needed
    $user->phone = $request->phone;
    $user->email = $request->email;
    $user->address = $request->address;
    $user->gender = $request->gender;
    $user->password = bcrypt($request->password);
    $user->roles = 'customer';
    
    // Handle thumbnail upload
    if ($request->hasFile('thumbnail')) {
        $path = $request->file('thumbnail')->store('thumbnail', 'public');
        $user->thumbnail = $path;
    }
    $user->created_at = now();
    $user->created_by = Auth::id() ?? 1;
    $user->save();

    return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
}
}