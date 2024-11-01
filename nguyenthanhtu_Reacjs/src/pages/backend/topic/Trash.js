import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { GiNotebook } from "react-icons/gi";
import { MdOutlineRestore } from "react-icons/md";
import TopicService from '../../../services/TopicService'; // Adjust import for TopicService

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Trash = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await TopicService.getTrash(); // Fetch topics from trash
                setTopics(result.topic); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        })();
    }, []);

    const deleteTopic = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/topic/destroy/${id}`);
            setTopics(topics.filter(topic => topic.id !== id));
        } catch (error) {
            console.error('Error deleting topic:', error);
        }
    };

    const restoreTopic = async (id) => {
        try {
            await axios.get(`${API_BASE_URL}/topic/restore/${id}`);
            setTopics(topics.filter(topic => topic.id !== id));
        } catch (error) {
            console.error('Error restoring topic:', error);
        }
    };

    // Filter topics to only include those with status === 0 (assuming this indicates deleted)
    const filteredTopics = topics.filter(topic => topic.status === 0);

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ CHỦ ĐỀ</h1>
                </div>
                <div className='flex gap-2 px-60'>
                    <div className='hover:text-blue-700'>Thêm</div>
                    <div className='hover:text-blue-700'>Xoá</div>
                </div>
            </div>
            <div className='bg-white p-3 border rounded-lg'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col" className='w-9'>#</th>
                            <th scope="col" className='px-10'>Tên chủ đề</th>
                            <th scope="col" className='px-40'>Chức năng</th>
                            <th scope="col" className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {filteredTopics.length > 0 ? (
                            filteredTopics.map((topic, index) => {
                                const statusButton = topic.status === 0 ? (
                                    <button className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOff className='text-sm' />
                                    </button>
                                ) : (
                                    <button className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOn className='text-sm' />
                                    </button>
                                );

                                return (
                                    <tr key={index}>
                                        <td className='text-center'>
                                            <input type='checkbox' />
                                        </td>
                                        <td>{topic.name}</td>
                                        <td className='text-center text-3xl'>
                                            {statusButton}
                                            <button onClick={() => restoreTopic(topic.id)} className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <MdOutlineRestore className='text-sm' />
                                            </button>
                                            <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <GiNotebook className='text-sm' />
                                            </button>
                                            <button
                                                onClick={() => deleteTopic(topic.id)}
                                                className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            >
                                                <FaTrash className='text-sm' />
                                            </button>
                                        </td>
                                        <td className='text-center'>{topic.id}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Không có chủ đề nào trong thùng rác.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Trash;
