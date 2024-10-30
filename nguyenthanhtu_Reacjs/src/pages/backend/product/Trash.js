import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { GiNotebook } from "react-icons/gi";
import { MdOutlineRestore } from "react-icons/md";
import Productervice from '../../../services/ProductService';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Trash = () => {
    const [product, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await Productervice.getTrash();
                setProducts(result.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        })();
    }, []);

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/product/destroy/${id}`);
            setProducts(product.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const restoreProduct = async (id) => {
        try {
            await axios.get(`${API_BASE_URL}/product/restore/${id}`);
            setProducts(product.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error restoring product:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ SẢN PHẨM</h1>
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
                            <th scope="col" className='px-10'>Tên sản phẩm</th>
                            <th scope="col" className='px-40'>Chức năng</th>
                            <th scope="col" className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {product && product.length > 0 && product.map((products, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-center'>
                                        <input type='checkbox' />
                                    </td>
                                    <td>{products.name}</td>
                                    <td>{products.catname}</td>
                                    <td className='text-center text-3xl'>
                                        <button onClick={() => restoreProduct(products.id)} className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <MdOutlineRestore className='text-sm' />
                                        </button>
                                        <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <GiNotebook className='text-sm' />
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(products.id)}
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                        >
                                            <FaTrash className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='text-center'>{products.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Trash;
