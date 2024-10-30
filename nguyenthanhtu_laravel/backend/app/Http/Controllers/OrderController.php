<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $order =Order::where('status','!=',0)
            ->orderBy('user_id','ASC')
            ->select("id","name","status","email")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'order'=>$order
        ];
        return response()->json($result);
    }
    public function trash()
    {
        $order =Order::where('status','=',0)
            ->orderBy('user_id','ASC')
            ->select("id","name","status","emal")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'order'=>$order
        ];
        return response()->json($result);
    }
    public function show($id)
    {
        $order =Order::find($id);
        if($order==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'order'=>$order
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'order'=>$order
            ];
        }
        return response()->json($result);
    }
    public function store(StoreOrderRequest $request)
    {
        // Create a new order instance
        $order = new Order();
        
        // Fill order properties from request
        $order->name = $request->name;
        $order->user_id = $request->user_id;
        $order->email = $request->email;
        $order->status = $request->status;
        $order->address = $request->address; // Corrected the spelling
        $order->phone = $request->phone;
    
        // Optional: Handle file upload if necessary
        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'image|mimes:jpg,jpeg,png,gif,webp|max:2048', // Validation for image
            ]);
            
            $fileName = time() . '.' . $request->image->extension(); // Use time for unique filename
            $request->image->move(public_path('images/order'), $fileName);
            $order->image = $fileName;
        }
    
        // Set additional fields
        $order->created_by = $request->user()->id ?? 1; // Using user() method for better clarity
        $order->created_at = now(); // Use Carbon's now() for better readability
    
        // Save the order and return a response
        if ($order->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Order added successfully',
                'order' => $order,
            ], 201); // HTTP 201 Created
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Failed to add order',
            ], 500); // HTTP 500 Internal Server Error
        }
    }
    
    

    public function update(UpdateOrderRequest $request, string $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        // Cập nhật dữ liệu
        $order->name =  $request->name;
        $order->user_id =  $request->user_id;
        $order->email =  $request->email;
        $order->status =  $request->status;
        $order->adress =  $request->adress;
        $order->phone =  $request->phone;

        // if ($request->hasFile('image')) {
        //     $exten = $request->image->extension();
        //     if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
        //         $fileName = date('YmdHis') . '.' . $exten;
        //         $request->image->move(public_path('image/order'), $fileName);
        //         $order->image = $fileName;
        //     }
        // }
        $order->created_at = date('Ymd H:i:s');
        $order->created_by = Auth::id() ?? 1;
        $order->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'order' => $order,
        ]);
    }

    public function status(string $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $order->status = ($order->status == 1) ? 2 : 1;
        $order->updated_at = date('Y-m-d H:i:s');
        $order->updated_by = Auth::id() ?? 1;

        $order->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'order' => $order,
        ]);
    }
    public function delete($id)
    {
        $order = Order::find($id);
        if($order==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'order'=>null
            ];
            return response()->json($result);
        }
        $order->status = 0;
        $order->updated_by =  1;
        $order->updated_at =  date('Y-m-d H:i:s');
        if($order->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'order'=>$order
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'order'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $order = Order::find($id);
        if($order==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'order'=>null
            ];
            return response()->json($result);
        }
        $order->status = 2;
        $order->updated_by =  1;
        $order->updated_at =  date('Y-m-d H:i:s');
        if($order->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'order'=>$order
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'order'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $order = Order::find($id);
        if($order==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'order'=>null
            ];
            return response()->json($result);
        }
        if($order->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'order'=>$order
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'order'=>null
            ];
        }
        return response()->json($result);
}

}