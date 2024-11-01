import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostService from '../../../services/PostService'; // Adjust import for PostService
import TopicService from '../../../services/TopicService'; // Adjust import for TopicService

function EditPost() {
    const { id } = useParams();
    const [post, setPost] = useState({
        title: '',
        topic_id: '',
        content: '',
        description: '',
        thumbnail: null,
        status: '',
        type: '',
    });
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch post data when component mounts
        const fetchPost = async () => {
            try {
                const response = await PostService.show(id); // Fetch post by ID
                setPost(response.post); // Adjust based on your API response structure
            } catch (error) {
                setError('Lỗi khi lấy thông tin bài viết.');
                console.error(error);
            }
        };

        const fetchTopics = async () => {
            try {
                const result = await TopicService.getList(); // Fetch topics
                setTopics(result.topic || []);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };

        fetchPost();
        fetchTopics();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost({
            ...post,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setPost({
            ...post,
            thumbnail: e.target.files[0], // Set thumbnail
        });
    };

    const handleUpdatePost = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // Create FormData for image upload
        formData.append('title', post.title);
        formData.append('topic_id', post.topic_id);
        formData.append('content', post.content);
        formData.append('description', post.description);
        formData.append('thumbnail', post.thumbnail);
        formData.append('status', post.status);
        formData.append('type', post.type);

        try {
            await PostService.update(id, formData); // Update post via API
            navigate('/admin/post'); // Redirect to post list
        } catch (error) {
            setError('Có lỗi xảy ra khi cập nhật bài viết.');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Cập nhật bài viết</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleUpdatePost} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tiêu đề:</label>
                    <input
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Chọn Chuyên Mục:</label>
                    <select
                        name="topic_id"
                        value={post.topic_id}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn chuyên mục</option>
                        {topics.map(topic => (
                            <option key={topic.id} value={topic.id}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Nội dung:</label>
                    <textarea
                        name="content"
                        value={post.content}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Mô tả:</label>
                    <textarea
                        name="description"
                        value={post.description}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Hình thu nhỏ:</label>
                    <input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={post.status}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn trạng thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Không hoạt động</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Loại:</label>
                    <input
                        type="text"
                        name="type"
                        value={post.type}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Cập nhật bài viết
                </button>
            </form>
        </div>
    );
}

export default EditPost;
