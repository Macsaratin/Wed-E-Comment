import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiShowAlt } from "react-icons/bi";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { Link } from 'react-router-dom';
import PostService from '../../../services/PostService';

const Postlist = () => {
    const [posts, setposts] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await PostService.getList();
            setposts(result.post);
        })();
    }, [])
    const statusPost = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/post/status/${id}`);
            setposts(posts.map(
                post => {
                    if (post.id === id) {
                        post.status = (post.status === 1) ? 0 : 1;
                    }
                    return post;
                }));
        } catch (error) {
            console.error('Error changing posts status:', error);
        }
    };
    const deletePost = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/post/delete/${id}`);
            setposts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting posts:', error);
        }
    };
    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ BAI VIET</h1>
                </div>
                <div className='flex gap-2 px-60 '>
                    <Link to="/admin/post/create" >
                        <div className='hover:text-blue-700'>Thêm</div>
                    </Link>
                    <Link to="/admin/post/trash" >
                        <div className='hover:text-blue-700'>Trash</div>
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
                            <th className='px-10'>Hình ảnh</th>
                            <th className='px-10'>Tên banner</th>
                            <th className='px-10'>Tên vị trí</th>
                            <th className='px-40'>Chức năng</th>
                            <th className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {posts &&
                            posts.length > 0 &&
                            posts.map((post, index) => {
                                var jsxStatus = ``;
                                if (post.status === 1) {
                                    jsxStatus = <button onClick={() => statusPost(post.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOn className='text-sm' />
                                    </button>;
                                }
                                else {
                                    jsxStatus = <button onClick={() => statusPost(post.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOff className='text-sm' />
                                    </button>;
                                }
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>
                                            <input type='checkbox' />
                                        </td>
                                        <td><img src={`http://localhost:8000/images/post/${post.thumbnail}`} alt={post.title} width="100" height="100" className='py-2' /></td>
                                        <td>{post.title}</td>
                                        <td>{post.topic_name}</td>
                                        <td className='text-center text-3xl'>
                                            {jsxStatus}
                                            <Link to={`/admin/post/show/${post.id}`} >
                                                <button className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                    <BiShowAlt className='text-sm' />
                                                </button>
                                            </Link>
                                            <Link to={`/admin/post/update/${post.id}`} >
                                                <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                    <GiNotebook className='text-sm' />
                                                </button>
                                            </Link>
                                            <button onClick={() => deletePost(post.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <FaTrash className='text-sm' />
                                            </button>
                                        </td>
                                        <td className='text-center'>{post.id}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Postlist;