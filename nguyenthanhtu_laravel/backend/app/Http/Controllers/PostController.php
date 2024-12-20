<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Support\Facades\Auth;


class PostController extends Controller
{
    public function index()
    {
        $post = Post::where('posts.status', '!=', 0)
            ->orderBy('posts.id', 'ASC')
            ->join('topic', 'posts.topic_id', '=', 'topic.id')
            ->select(
                'posts.id',
                'posts.title',
                'posts.status',
                'posts.content',
                'posts.thumbnail',
                'topic.name as topic_name'
            )
            ->get();
    
        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'post' => $post 
        ];
    
        return response()->json($result);
    }
    
    public function trash()
    {
        $post =Post::where('status','=',0)
            ->orderBy('topic_id','ASC')
            ->select("id","title","status","content",'description','type')
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'post'=>$post
        ];
        return response()->json($result);
    }
    public function show($id)
    {
        $post =Post::find($id);
        if($post==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'post'=>$post
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'post'=>$post
            ];
        }
        return response()->json($result);
    }
   public function store(StorePostRequest $request)
    {
        $post = new post();
        $post->title =  $request->title;
        $post->topic_id =  $request->topic_id;
        $post->content = $request->input('content', null);
        $post->status =  $request->status;
        $post->description =  $request->description;
        $post->type =  $request->type;
        $check_save = true;
        // upload file
        $list_exten=['jpg','png','webp','gif'];
        if ($request->hasFile('thumbnail')) {
            $exten = $request->thumbnail->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->thumbnail->move(public_path('images/post'), $fileName);
                $post->thumbnail = $fileName;
            }
        }
        $post->created_by = Auth::id() ?? 1;
        $post->created_at =  date('Y-m-d H:i:s');

        if($check_save == true)
        {
            if($post->save())
            {
                $result =[
                'status'=>true,
                'message'=>'Thêm thành công',
                'post'=>$post
                ];
            }
            else
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không thể thêm',
                    'post'=>null
                ];
            }
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'chưa chọn hình ảnh',
                'post'=>null
            ];
        }
        return response()->json($result);
    }

    public function update(UpdatePostRequest $request, string $id)
    {
        // Find the post by ID
        $post = Post::find($id);
        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
    
        // Update the post attributes
        $post->title = $request->title;
        $post->topic_id = $request->topic_id;
        $post->content = $request->input('content', null);
        $post->status = $request->status;
        $post->description = $request->description;
        $post->type = $request->type;
    
        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $exten = $request->thumbnail->extension();
            if (in_array($exten, ['jpg', 'jpeg', 'gif', 'png', 'webp'])) {
                // Create a unique file name
                $fileName = date('YmdHis') . '.' . $exten;
                // Move the uploaded file to the desired location
                $request->thumbnail->move(public_path('images/post'), $fileName);
                $post->thumbnail = $fileName; // Set the thumbnail field
            }
        }
    
        // Update the created_by and created_at fields
        $post->created_by = Auth::id() ?? 1;
        $post->created_at = now(); // Use Carbon's now() for better readability
    
        // Save the updated post
        $post->save();
    
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'post' => $post,
        ]);
    }
    

    public function status(string $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $post->status = ($post->status == 1) ? 2 : 1;
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = Auth::id() ?? 1;

        $post->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'post' => $post,
        ]);
    }
    public function delete($id)
    {
        $post = Post::find($id);
        if($post==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'post'=>null
            ];
            return response()->json($result);
        }
        $post->status = 0;
        $post->updated_by =  1;
        $post->updated_at =  date('Y-m-d H:i:s');
        if($post->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'post'=>$post
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'post'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $post = Post::find($id);
        if($post==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'post'=>null
            ];
            return response()->json($result);
        }
        $post->status = 2;
        $post->updated_by =  1;
        $post->updated_at =  date('Y-m-d H:i:s');
        if($post->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'post'=>$post
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'post'=>null
            ];
        }
        return response()->json($result);
}
public function destroy($id)
{
        $post = Post::find($id);
        if($post==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'post'=>null
            ];
            return response()->json($result);
        }
        if($post->delete())
        {
            $result =[
                'status'=>true,
                'message'=>'Xóa thành công',
                'post'=>$post
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể xóa',
                'post'=>null
            ];
        }
        return response()->json($result);
}

}