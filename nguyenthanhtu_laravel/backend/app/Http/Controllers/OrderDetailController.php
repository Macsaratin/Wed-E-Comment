<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orderdetail;
use App\Http\Requests\StoreOrderDetailRequest;
use App\Http\Requests\UpdateOrderdetailRequest;
use Illuminate\Support\Facades\Auth;

class OrderDetailController extends Controller
{
    public function index()
    {
        $orderdetail =Orderdetail::where('status','!=',0)
            ->orderdetailBy('user_id','ASC')
            ->select("id","product_id","price","qty")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'orderdetail'=>$orderdetail
        ];
        return response()->json($result);
    }
    public function trash()
    {
        $orderdetail =Orderdetail::where('status','=',0)
            ->orderdetailBy('user_id','ASC')
            ->select("id","name","status","emal")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'orderdetail'=>$orderdetail
        ];
        return response()->json($result);
    }
    public function show($id)
    {
        $orderdetail =Orderdetail::find($id);
        if($orderdetail==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'orderdetail'=>$orderdetail
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'orderdetail'=>$orderdetail
            ];
        }
        return response()->json($result);
    }
    public function store(StoreOrderDetailRequest $request)
    {
        $orderdetail = new Orderdetail();
        $orderdetail->product_id = $request->product_id;
        $orderdetail->qty = $request->qty;
        $orderdetail->price = $request->price;


        
        // Optional: Handle file upload if necessary
        if ($request->hasFile('image')) {
            $request->validate(['image' => 'image|mimes:jpg,jpeg,png,gif,webp|max:2048']); // Add validation
            $fileName = date('YmdHis') . '.' . $request->image->extension();
            $request->image->move(public_path('images/Orderdetail'), $fileName);
            $orderdetail->image = $fileName;
        }
    
        // Set additional fields
        $orderdetail->created_by = Auth::id() ?? 1; // Fallback to 1 if no user is authenticated
        $orderdetail->created_at = now(); // Use Carbon's now() for better readability
    
        // Save the orderdetail
        if ($orderdetail->save()) {
            return response()->json([
                'status' => true,
                'message' => 'orderdetail added successfully',
                'orderdetail' => $orderdetail,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Failed to add orderdetail',
                'orderdetail' => null,
            ]);
        }
    }
    

    // public function update(UpdateOrderdetailRequest $request, string $id)
    // {
    //     $orderdetail = orderdetail::find($id);
    //     if (!$orderdetail) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Không tìm thấy dữ liệu',
    //         ]);
    //     }
    //     // Cập nhật dữ liệu
    //     $orderdetail->name =  $request->name;
    //     $orderdetail->user_id =  $request->user_id;
    //     $orderdetail->email =  $request->email;
    //     $orderdetail->status =  $request->status;
    //     $orderdetail->adress =  $request->adress;
    //     $orderdetail->phone =  $request->phone;

    //     // if ($request->hasFile('image')) {
    //     //     $exten = $request->image->extension();
    //     //     if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
    //     //         $fileName = date('YmdHis') . '.' . $exten;
    //     //         $request->image->move(public_path('image/orderdetail'), $fileName);
    //     //         $orderdetail->image = $fileName;
    //     //     }
    //     // }
    //     $orderdetail->created_at = date('Ymd H:i:s');
    //     $orderdetail->created_by = Auth::id() ?? 1;
    //     $orderdetail->save();

    //     return response()->json([
    //         'status' => true,
    //         'message' => 'Cập nhật thành công',
    //         'orderdetail' => $orderdetail,
    //     ]);
    // }

    public function status(string $id)
    {
        $orderdetail = orderdetail::find($id);
        if (!$orderdetail) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $orderdetail->status = ($orderdetail->status == 1) ? 2 : 1;
        $orderdetail->updated_at = date('Y-m-d H:i:s');
        $orderdetail->updated_by = Auth::id() ?? 1;

        $orderdetail->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'orderdetail' => $orderdetail,
        ]);
    }
    public function delete($id)
    {
        $orderdetail = orderdetail::find($id);
        if($orderdetail==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'orderdetail'=>null
            ];
            return response()->json($result);
        }
        $orderdetail->status = 0;
        $orderdetail->updated_by =  1;
        $orderdetail->updated_at =  date('Y-m-d H:i:s');
        if($orderdetail->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'orderdetail'=>$orderdetail
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'orderdetail'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $orderdetail = orderdetail::find($id);
        if($orderdetail==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'orderdetail'=>null
            ];
            return response()->json($result);
        }
        $orderdetail->status = 2;
        $orderdetail->updated_by =  1;
        $orderdetail->updated_at =  date('Y-m-d H:i:s');
        if($orderdetail->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'orderdetail'=>$orderdetail
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'orderdetail'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $orderdetail = orderdetail::find($id);
        if($orderdetail==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'orderdetail'=>null
            ];
            return response()->json($result);
        }
        if($orderdetail->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'orderdetail'=>$orderdetail
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'orderdetail'=>null
            ];
        }
        return response()->json($result);
}

}