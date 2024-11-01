import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiShowAlt } from "react-icons/bi";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { Link } from 'react-router-dom';
import TopicService from '../../../services/TopicService';

const Topiclist = () => {
    const [topics, settopics] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await TopicService.getList();
            settopics(result.topic);
        })();
    }, [])
    const statustopic = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/topic/status/${id}`);
            settopics(topics.map(
                topic => {
                    if (topic.id === id) {
                        topic.status = (topic.status === 1) ? 0 : 1;
                    }
                    return topic;
                }));
        } catch (error) {
            console.error('Error changing topics status:', error);
        }
    };
    const deletetopic = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/topic/delete/${id}`);
            settopics(topics.filter(topic => topic.id !== id));
        } catch (error) {
            console.error('Error deleting topic:', error);
        }
    };
    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ CHU DE</h1>
                </div>
                <div className='flex gap-2 px-60 '>
                    <Link to="/admin/topic/create" >
                        <div className='hover:text-blue-700'>Thêm</div>
                    </Link>
                    <Link to="/admin/topic/trash" >
                        <div className='hover:text-blue-700'>Thùng rác</div>
                    </Link>
                </div>
            </div>
            <div className='bg-white p-3 border rounder rounded-lg '>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='w-9'>
                                #
                            </th>
                            <th className='px-10'>name</th>
                            <th className='px-10'>Tên vị trí</th>
                            <th className='px-40'>Chức năng</th>
                            <th className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {topics &&
                            topics.length > 0 &&
                            topics.map((topic, index) => {
                                var jsxStatus = ``;
                                if (topic.status === 1) {
                                    jsxStatus = <button onClick={() => statustopic(topic.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOn className='text-sm' />
                                    </button>;
                                }
                                else {
                                    jsxStatus = <button onClick={() => statustopic(topic.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOff className='text-sm' />
                                    </button>;
                                }
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>
                                            <input type='checkbox' />
                                        </td>
                                        <td>{topic.name}</td>
                                        <td>{topic.sort_order}</td>
                                        <td className='text-center text-3xl'>
                                            {jsxStatus}
                                            <Link to={`/admin/topic/show/${topic.id}`} >
                                                <button className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                    <BiShowAlt className='text-sm' />
                                                </button>
                                            </Link>
                                            <Link to={`/admin/topic/update/${topic.id}`} >
                                                <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                    <GiNotebook className='text-sm' />
                                                </button>
                                            </Link>
                                            <button onClick={() => deletetopic(topic.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <FaTrash className='text-sm' />
                                            </button>
                                        </td>
                                        <td className='text-center'>{topic.id}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Topiclist;