import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { GiNotebook } from "react-icons/gi";
import { MdOutlineRestore } from "react-icons/md";
import PostService from '../../../services/PostService'; // Adjust import for PostService

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Trash = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await PostService.getTrash(); // Fetch posts from trash
                setPosts(result.post); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        })();
    }, []);

    const deletePost = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/post/destroy/${id}`);
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const restorePost = async (id) => {
        try {
            await axios.get(`${API_BASE_URL}/post/restore/${id}`);
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error restoring post:', error);
        }
    };

    // Filter posts to only include those with status === 0 (assuming this indicates deleted)
    const filteredPosts = posts.filter(post => post.status === 0);

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ BÀI VIẾT</h1>
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
                            <th scope="col" className='px-10'>Tiêu đề</th>
                            <th scope="col" className='px-40'>Chức năng</th>
                            <th scope="col" className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post, index) => {
                                const statusButton = post.status === 0 ? (
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
                                        <td>{post.title}</td>
                                        <td className='text-center text-3xl'>
                                            {statusButton}
                                            <button onClick={() => restorePost(post.id)} className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <MdOutlineRestore className='text-sm' />
                                            </button>
                                            <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <GiNotebook className='text-sm' />
                                            </button>
                                            <button
                                                onClick={() => deletePost(post.id)}
                                                className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            >
                                                <FaTrash className='text-sm' />
                                            </button>
                                        </td>
                                        <td className='text-center'>{post.id}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Không có bài viết nào trong thùng rác.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Trash;
