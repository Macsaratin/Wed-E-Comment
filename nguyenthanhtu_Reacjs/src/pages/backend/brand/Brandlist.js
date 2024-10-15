import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiShowAlt } from "react-icons/bi";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";
import BrandService from '../../../services/BrandService';


const Brandlist = () => {
    const [brands, setbrands] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await BrandService.getList();
            setbrands(result.brand);
        })();
    }, [])
    const deletebrand = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/brand/delete/${id}`);
            setbrands(brands.filter(brand => brand.id !== id));
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    };
    const statusbrand = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/brand/status/${id}`);
            setbrands(brands.map(brand => {
                if (brand.id === id) {
                    brand.status = (brand.status === 1) ? 0 : 1;
                }
                return brand;
            }));
        } catch (error) {
            console.error('Error changing brand status:', error);
        }
    };
    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ Brand</h1>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/brand/create" className="text-sm  ml-2">Create</Link>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/brand/trash" className="text-sm  ml-2">Trash</Link>
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
                            <th className='px-10'>Tên brand</th>
                            <th className='px-10'>Tên vị trí</th>
                            <th className='px-40'>Chức năng</th>
                            <th className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {brands &&
                            brands.length > 0 &&
                            brands.map((brand, index) => {
                                var jsxStatus = ``;
                                if (brand.status === 1) {
                                    jsxStatus = <button onClick={() => statusbrand(brand.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOn className='text-sm' />
                                    </button>;
                                }
                                else {
                                    jsxStatus = <button onClick={() => statusbrand(brand.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOff className='text-sm' />
                                    </button>;
                                }
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>
                                            <input type='checkbox' />
                                        </td>
                                        <td><img src={`http://localhost:8000/images/brand/${brand.image}`} alt={brand.name} width="100" height="100" className='py-2' /></td>
                                        <td>{brand.name}</td>
                                        <td>{brand.position}</td>
                                        <td className='text-center text-3xl'>
                                            {jsxStatus}<button className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <BiShowAlt className='text-sm' />
                                            </button>
                                            <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <GiNotebook className='text-sm' />
                                            </button>
                                            <button onClick={() => deletebrand(brand.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <FaTrash className='text-sm' />
                                            </button>
                                        </td>
                                        <td className='text-center'>{brand.id}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Brandlist;