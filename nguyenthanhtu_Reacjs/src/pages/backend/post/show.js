import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostService from '../../../services/PostService'; // Adjust service path

const ShowPost = () => {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();
    const [post, setPost] = useState(null); // To store post information
    const [error, setError] = useState(''); // To store error messages

    useEffect(() => {
        // Fetch post information based on ID
        const fetchPost = async () => {
            try {
                const response = await PostService.show(id); // Assuming 'show' returns a single post
                setPost(response.post); // Adjust based on your API response structure
            } catch (error) {
                setError('Lỗi khi lấy thông tin bài viết.');
                console.error(error);
            }
        };
        fetchPost();
    }, [id]);
    return (
        <div className="p-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {post ? (
                <div className='flex flex-col'>
                    <h1 className='text-2xl uppercase text-green-800 mb-4'>THÔNG TIN BÀI VIẾT</h1>
                    <div className='mb-2'>
                        <strong>Tiêu đề:</strong> {post.title}
                    </div>
                    <div className='mb-2'>
                        <strong>Nội dung:</strong> {post.content}
                    </div>
                    <div className='mb-2'>
                        <strong>Tác giả:</strong> {post.author} {/* Adjust if author field is different */}
                    </div>
                    <div className='mb-2'>
                        <strong>Ngày đăng:</strong> {new Date(post.created_at).toLocaleDateString()} {/* Adjust date formatting as needed */}
                    </div>
                    <div className='mb-2'>
                        <strong>Trạng thái:</strong> {post.status === '1' ? 'Xuất bản' : 'Chưa xuất bản'}
                    </div>
                    <button
                        onClick={() => navigate('/admin/post')} // Adjust path as needed
                        className='bg-blue-500 text-white py-2 px-4 rounded'>
                        Quay lại danh sách
                    </button>
                </div>
            ) : (
                <div className="text-center">Đang tải thông tin bài viết...</div>
            )}
        </div>
    );
};

export default ShowPost;
