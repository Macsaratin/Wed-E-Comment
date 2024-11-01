import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopicService from '../../../services/TopicService'; // Adjust the path as needed

function AddTopic() {
    const [topic, setTopic] = useState({
        name: '',
        slug: '',
        sort_order: '',
        description: '',
        status: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTopic(prevData => ({
            ...prevData,
            [name]: value,
            slug: name === 'name' ? value.toLowerCase().replace(/ /g, '-') : prevData.slug
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await TopicService.add(topic); // Call the store method in your TopicService
            if (response.status) {
                navigate('/admin/topic'); // Redirect to topic list
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm chủ đề.');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Thêm Chủ Đề Mới</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên chủ đề:</label>
                    <input
                        type="text"
                        name="name"
                        value={topic.name}
                        onChange={handleChange}
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
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Thứ tự:</label>
                    <input
                        type="number"
                        name="sort_order"
                        value={topic.sort_order}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Mô tả:</label>
                    <textarea
                        name="description"
                        value={topic.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={topic.status}
                        onChange={handleChange}
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
                    Thêm chủ đề
                </button>
            </form>
        </div>
    );
}

export default AddTopic;
