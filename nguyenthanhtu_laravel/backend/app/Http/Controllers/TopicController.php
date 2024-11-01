<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Topic;
use App\Http\Requests\StoreTopicRequest;
use App\Http\Requests\UpdateTopicRequest;
use Illuminate\Support\Facades\Auth;

class TopicController extends Controller
{
    public function index()
    {
        $topic = Topic::where('status','!=',0)
            ->orderBy('sort_order','ASC')
            ->select("id","name","status","sort_order")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'topic'=>$topic
        ];
        return response()->json($result);
    }
    public function trash()
    {
        $topic =Topic::where('status','=',0)
            ->orderBy('sort_order','ASC')
            ->select("id","name","status","slug")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'topic'=>$topic
        ];
        return response()->json($result);
    }
    public function show($id)
    {
        $topic =Topic::find($id);
        if($topic==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'topic'=>$topic
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'topic'=>$topic
            ];
        }
        return response()->json($result);
    }
    public function store(StoreTopicRequest $request)
    {
        $topic = new Topic();
        $topic->name =  $request->name;
        $topic->slug =  $request->slug;
        $topic->sort_order =  $request->sort_order;
        $topic->description =  $request->description;
        $topic->status =  $request->status;
        $check_save = true;
        $topic->created_by = Auth::id() ?? 1;
        $topic->created_at =  date('Y-m-d H:i:s');

        if($check_save == true)
        {
            if($topic->save())
            {
                $result =[
                'status'=>true,
                'message'=>'Thêm thành công',
                'topic'=>$topic
                ];
            }
            else
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không thể thêm',
                    'topic'=>null
                ];
            }
        }
        return response()->json($result);
    }

    public function update(UpdateTopicRequest $request, string $id)
    {
        $topic = Topic::find($id);
        if (!$topic) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ], 404);
        }
    
        // Update topic data
        $topic->name = $request->name;
        $topic->slug = $request->slug;
        $topic->description = $request->description;
        $topic->status = $request->status;
        $topic->sort_order = $request->sort_order;
        $topic->updated_at = now(); // Use the current timestamp for updated_at
        $topic->created_by = Auth::id() ?? 1; // You may want to change this if the creator should remain unchanged
        $topic->save();
    
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'topic' => $topic,
        ]);
    }
    

    public function status(string $id)
    {
        $topic = Topic::find($id);
        if (!$topic) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $topic->status = ($topic->status == 1) ? 2 : 1;
        $topic->updated_at = date('Y-m-d H:i:s');
        $topic->updated_by = Auth::id() ?? 1;

        $topic->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'topic' => $topic,
        ]);
    }
    public function delete($id)
    {
        $topic = Topic::find($id);
        if($topic==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'topic'=>null
            ];
            return response()->json($result);
        }
        $topic->status = 0;
        $topic->updated_by =  1;
        $topic->updated_at =  date('Y-m-d H:i:s');
        if($topic->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'topic'=>$topic
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'topic'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $topic = Topic::find($id);
        if($topic==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'topic'=>null
            ];
            return response()->json($result);
        }
        $topic->status = 2;
        $topic->updated_by =  1;
        $topic->updated_at =  date('Y-m-d H:i:s');
        if($topic->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'topic'=>$topic
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'topic'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $topic = Topic::find($id);
        if($topic==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'topic'=>null
            ];
            return response()->json($result);
        }
        if($topic->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'topic'=>$topic
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'topic'=>null
            ];
        }
        return response()->json($result);
}

}