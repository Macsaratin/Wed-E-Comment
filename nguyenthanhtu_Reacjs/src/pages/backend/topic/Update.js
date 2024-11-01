import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopicService from '../../../services/TopicService'; // Adjust the import path as needed

function UpdateTopic() {
    const { id } = useParams(); // Get the topic ID from the URL
    const [topic, setTopic] = useState({
        name: '',
        slug: '',
        sort_order: '',
        description: '',
        status: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await TopicService.show(id); // Fetch topic data by ID
                setTopic(response.topic); // Adjust based on your API response structure
            } catch (error) {
                setError('Lỗi khi lấy thông tin chủ đề.');
                console.error(error);
            }
        };
        fetchTopic();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTopic({
            ...topic,
            [name]: value,
            slug: name === 'name' ? value.toLowerCase().replace(/ /g, '-') : topic.slug // Update slug dynamically
        });
    };

    const handleUpdateTopic = async (e) => {
        e.preventDefault();
        try {
            await TopicService.update(id, topic); // Update topic via API
            navigate('/admin/topic'); // Redirect to topic list or wherever appropriate
        } catch (error) {
            setError('Có lỗi xảy ra khi cập nhật chủ đề.');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Cập nhật chủ đề</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleUpdateTopic} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên chủ đề:</label>
                    <input
                        type="text"
                        name="name"
                        value={topic.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Slug:</label>
                    <input
                        type="text"
                        name="slug"
                        value={topic.slug}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Mô tả:</label>
                    <textarea
                        name="description"
                        value={topic.description}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Thứ tự:</label>
                    <input
                        type="number"
                        name="sort_order"
                        value={topic.sort_order}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={topic.status}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn trạng thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Không hoạt động</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Cập nhật chủ đề
                </button>
            </form>
        </div>
    );
}
export default UpdateTopic;
