import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { GiNotebook } from "react-icons/gi";
import { MdOutlineRestore } from "react-icons/md";

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Trash = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await axios.get(`${API_BASE_URL}/product/trash`);
                setProducts(result.data.product); // Ensure you're accessing the right property
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/product/destroy/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const restoreProduct = async (id) => {
        try {
            await axios.get(`${API_BASE_URL}/product/restore/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error restoring product:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ SẢN PHẨM ĐÃ XOÁ</h1>
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
                            <th scope="col" className='px-10'>Hình ảnh</th>
                            <th scope="col" className='px-10'>Tên sản phẩm</th>
                            <th scope="col" className='px-40'>Chức năng</th>
                            <th scope="col" className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {products && products.length > 0 && products.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-center'>
                                        <input type='checkbox' />
                                    </td>
                                    <td>
                                        <img
                                            src={`http://localhost:8000/images/product/${product.image}`}
                                            alt={product.name}
                                            width="100"
                                            height="100"
                                            className='py-2'
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td className='text-center text-3xl'>
                                        <button onClick={() => restoreProduct(product.id)} className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <MdOutlineRestore className='text-sm' />
                                        </button>
                                        <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <GiNotebook className='text-sm' />
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                        >
                                            <FaTrash className='text-sm' />
                                        </button>
                                    </td>
                                    <td className='text-center'>{product.id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Trash;