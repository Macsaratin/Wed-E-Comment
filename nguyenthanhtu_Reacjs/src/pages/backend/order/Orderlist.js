import React, { useEffect, useState } from 'react';
import { BiShowAlt } from "react-icons/bi";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import OrderService from '../../../services/OrderService';

const Orderlist = () => {
    const [orders, setorders] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await OrderService.getList();
            setorders(result.order);
        })();
    }, [])
    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ DON HANG</h1>
                </div>
                <div className='flex gap-2 px-60 '>
                    <div className='hover:text-blue-700'>Thêm</div>
                    <div className='hover:text-blue-700'>xoá</div>
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
                        {orders &&
                            orders.length > 0 &&
                            orders.map((order, index) => {
                                var jsxStatus = ``;
                                if (order.status === 1) {
                                    jsxStatus = <button className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOn className='text-sm' />
                                    </button>;
                                }
                                else {
                                    jsxStatus = <button className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOff className='text-sm' />
                                    </button>;
                                }
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>
                                            <input type='checkbox' />
                                        </td>
                                        <td>sjhuh</td>
                                        <td>{order.name}</td>
                                        <td>{order.content}</td>
                                        <td className='text-center text-3xl'>
                                            {jsxStatus}<button className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <BiShowAlt className='text-sm' />
                                            </button>
                                            <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <GiNotebook className='text-sm' />
                                            </button>
                                            <button className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <FaTrash className='text-sm' />
                                            </button>
                                        </td>
                                        <td className='text-center'>{order.id}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Orderlist;