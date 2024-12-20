import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiShowAlt } from "react-icons/bi";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";
import ProductService from '../../../services/ProductService';

const Productlist = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await ProductService.getList();
            setProducts(result.products);
        };
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/product/delete/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const toggleProductStatus = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/product/status/${id}`);
            setProducts(products.map(product => {
                if (product.id === id) {
                    product.status = product.status === 1 ? 0 : 1;
                }
                return product;
            }));
        } catch (error) {
            console.error('Error changing product status:', error);
        }
    };

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ SẢN PHẨM</h1>
                </div>
                <div className='flex gap-2 px-60'>
                    <div className='basis-1/2 text-right'>
                        <Link to="/admin/product/create" className="text-sm ml-2">Create</Link>
                    </div>
                    <div className='hover:text-blue-700'>
                        <Link to="/admin/product/trash" className="text-sm ml-2">Trash</Link>
                    </div>
                </div>
            </div>
            <div className='bg-white p-3 border rounded-lg'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='w-9'>#</th>
                            <th className='px-10'>Hình ảnh</th>
                            <th className='px-10'>Tên sản phẩm</th>
                            <th className='px-40'>Chức năng</th>
                            <th className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {products.length > 0 && products.map((product, index) => (
                            <tr key={product.id}>
                                <td className='text-center'>
                                    <input type='checkbox' />
                                </td>
                                <td>
                                    <img
                                        src={`http://localhost:8000/images/product/${product.images[0]?.thumbnail}`}
                                        alt={product.name}
                                        width="100"
                                        height="100"
                                        className='py-2'
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td className='text-center text-3xl'>
                                    <button
                                        onClick={() => toggleProductStatus(product.id)}
                                        className={`py-1 px-2 mx-0.5 text-white rounded-md ${product.status === 1 ? 'bg-green-500' : 'bg-red-500'}`}
                                    >
                                        {product.status === 1 ? <FaToggleOn className='text-sm' /> : <FaToggleOff className='text-sm' />}
                                    </button>
                                    <Link to={`/admin/product/show/${product.id}`} className="text-sm ml-2">
                                        <button className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <BiShowAlt className='text-sm' />
                                        </button>
                                    </Link>
                                    <Link to={`/admin/product/update/${product.id}`} className="text-sm ml-2">
                                        <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                            <GiNotebook className='text-sm' />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                    >
                                        <FaTrash className='text-sm' />
                                    </button>
                                </td>
                                <td className='text-center'>{product.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Productlist;
