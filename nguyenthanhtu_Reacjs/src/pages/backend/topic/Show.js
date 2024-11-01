import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopicService from '../../../services/TopicService'; // Adjust the path as needed

function ShowTopic() {
    const { id } = useParams();
    const [topic, setTopic] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const response = await TopicService.show(id);
                setTopic(response.topic);
            } catch (error) {
                setError('Lỗi khi lấy thông tin chủ đề.');
                console.error(error);
            }
        };

        fetchTopic();
    }, [id]);

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    if (!topic) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader">Đang tải...</div> {/* You can implement a spinner here */}
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Chủ đề: {topic.name}</h2>
            <p className="text-gray-600 mb-2">ID: {topic.id}</p>
            <p className="text-gray-800 mb-4">{topic.slug}</p>
            <p className="text-gray-600 mb-2">sort_order: {topic.sort_order}</p>
            <div className="text-gray-600">
                <h3 className="font-semibold">Nội dung:</h3>
                <p>{topic.description}</p>
            </div>
            <div className="mt-4">
                <strong>Trạng thái: </strong>
                {topic.status === 1 ? 'Hoạt động' : 'Không hoạt động'}
            </div>
            <button
                onClick={() => navigate('/admin/topic')}
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition'>
                Quay lại danh sách
            </button>
        </div>
    );
}

export default ShowTopic;
