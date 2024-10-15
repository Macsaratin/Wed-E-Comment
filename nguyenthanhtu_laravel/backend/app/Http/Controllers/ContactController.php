<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use Illuminate\Support\Facades\Auth;



class ContactController extends Controller
{
    public function index()
    {
        $contact =Contact::where('status','!=',0)
            ->orderBy('replay_id','ASC')
            ->select("id","name","email","status")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'contact'=>$contact
        ];
        return response()->json($result);
    }
    public function trash()
    {
        $contact =Contact::where('status','=',0)
            ->orderBy('sort_order','ASC')
            ->select("id","name","image","status","slug","parent_id","description")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'contact'=>$contact
        ];
        return response()->json($result);
    }
    public function show($id)
    {
        $contact =Contact::find($id);
        if($contact==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'contact'=>$contact
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'contact'=>$contact
            ];
        }
        return response()->json($result);
    }
   public function store(StoreContactRequest $request)
    {
        $contact = new Contact();
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->title = $request->title;
        $contact->status = $request->status;
        $contact->replay_id = $request->replay_id;
        $contact->content = $request->input('content', null);
        $check_save = true;
        //upload file
        // $list_exten=['jpg','png','webp','gif'];
        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->image->move(public_path('image/contact'), $fileName);
                $contact->image = $fileName;
            }
        }
        $contact->created_by = Auth::id() ?? 1;
        $contact->created_at =  date('Y-m-d H:i:s');

        if($check_save == true)
        {
            if($contact->save())
            {
                $result =[
                'status'=>true,
                'message'=>'Thêm thành công',
                'contact'=>$contact
                ];
            }
            else
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không thể thêm',
                    'contact'=>null
                ];
            }
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'chưa chọn hình ảnh',
                'contact'=>null
            ];
        }
        return response()->json($result);
    }

    public function update(UpdatecontactRequest $request, string $id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        // Cập nhật dữ liệu
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->title = $request->title;
        $contact->status = $request->status;
        $contact->replay_id = $request->replay_id;
        $contact->content = $request->input('content', null);


        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->image->move(public_path('image/contact'), $fileName);
                $contact->image = $fileName;
            }
        }
        $contact->created_at = date('Ymd H:i:s');
        $contact->created_by = Auth::id() ?? 1;
        $contact->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'contact' => $contact,
        ]);
    }

    public function status(string $id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $contact->status = ($contact->status == 1) ? 2 : 1;
        $contact->updated_at = date('Y-m-d H:i:s');
        $contact->updated_by = Auth::id() ?? 1;

        $contact->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'contact' => $contact,
        ]);
    }
    public function delete($id)
    {
        $contact = Contact::find($id);
        if($contact==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'contact'=>null
            ];
            return response()->json($result);
        }
        $contact->status = 0;
        $contact->updated_by =  1;
        $contact->updated_at =  date('Y-m-d H:i:s');
        if($contact->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'contact'=>$contact
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'contact'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $contact = Contact::find($id);
        if($contact==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'contact'=>null
            ];
            return response()->json($result);
        }
        $contact->status = 2;
        $contact->updated_by =  1;
        $contact->updated_at =  date('Y-m-d H:i:s');
        if($contact->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'contact'=>$contact
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'contact'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $contact = Contact::find($id);
        if($contact==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'contact'=>null
            ];
            return response()->json($result);
        }
        if($contact->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'contact'=>$contact
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'contact'=>null
            ];
        }
        return response()->json($result);
}
}