import React, { useEffect, useState } from 'react';
import { BiShowAlt } from "react-icons/bi";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import ProductSaleSerice from '../../../services/ProductSaleSerice';

const ProductSale = () => {
    const [products, setproducts] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await ProductSaleSerice.getList();
            setproducts(result.productSale);
        })();
    }, [])
    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ SAN PHAM</h1>
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
                            <th className='px-10'>price_sale</th>
                            <th className='px-10'>begin</th>
                            <th className='px-10'>end</th>
                            <th className='px-40'>Chức năng</th>
                            <th className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {products &&
                            products.length > 0 &&
                            products.map((productSale, index) => {
                                var jsxStatus = ``;
                                if (productSale.status === 1) {
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
                                        <td>{productSale.price_sale}</td>
                                        <td className='p-4'>{productSale.date_begin}</td>
                                        <td>{productSale.date_end}</td>

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
                                        <td className='text-center'>{productSale.id}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductSale;