import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiShowAlt } from "react-icons/bi";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";
import CategoryService from '../../../services/CategoryService';


const Categorylish = () => {
    const [categories, setcategories] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await CategoryService.getList();
            setcategories(result.category);
        })();
    }, [])
    const statuscategory = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/category/status/${id}`);
            setcategories(categories.map(
                category => {
                    if (category.id === id) {
                        category.status = (category.status === 1) ? 0 : 1;
                    }
                    return category;
                }));
        } catch (error) {
            console.error('Error changing category status:', error);
        }
    };
    const deletecategory = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/category/delete/${id}`);
            setcategories(categories.filter(category => category.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };
    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ Danh muc</h1>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/category/create" className="text-sm  ml-2">Create</Link>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/category/trash" className="text-sm  ml-2">Trash</Link>
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
                            <th className='px-10'>Tên category</th>
                            <th className='px-40'>Chức năng</th>
                            <th className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {categories &&
                            categories.length > 0 &&
                            categories.map((category, index) => {
                                var jsxStatus = ``;
                                if (category.status === 1) {
                                    jsxStatus = <button onClick={() => statuscategory(category.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOn className='text-sm' />
                                    </button>;
                                }
                                else {
                                    jsxStatus = <button onClick={() => statuscategory(category.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOff className='text-sm' />
                                    </button>;
                                }
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>
                                            <input type='checkbox' />
                                        </td>
                                        <td><img src={`http://localhost:8000/images/category/${category.image}`} alt={category.name} width="100" height="100" className='py-2' /></td>
                                        <td>{category.name}</td>
                                        <td className='text-center text-3xl'>
                                            {jsxStatus}<button className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <BiShowAlt className='text-sm' />
                                            </button>
                                            <Link to="/admin/category/edit" className="text-sm  ml-2">
                                                <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                    <GiNotebook className='text-sm' />
                                                </button>
                                            </Link>
                                            <button onClick={() => deletecategory(category.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <FaTrash className='text-sm' />
                                            </button>
                                        </td>
                                        <td className='text-center'>{category.id}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Categorylish;