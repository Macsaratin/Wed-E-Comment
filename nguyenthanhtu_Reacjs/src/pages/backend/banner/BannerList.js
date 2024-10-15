import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiShowAlt } from "react-icons/bi";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";
import BannerService from '../../../services/BannerService';

const BannerList = () => {
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await BannerService.getList();
            setBanners(result.banner);
        })();
    }, [])
    const deleteBanner = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/banner/delete/${id}`);
            setBanners(banners.filter(banner => banner.id !== id));
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };
    const statusBanner = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/banner/status/${id}`);
            setBanners(banners.map(banner => {
                if (banner.id === id) {
                    banner.status = (banner.status === 1) ? 0 : 1;
                }
                return banner;
            }));
        } catch (error) {
            console.error('Error changing banner status:', error);
        }
    };
    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ BANNER</h1>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/banner/create" className="text-sm  ml-2">Create</Link>
                </div>
                <div className='basis-1/2 text-right'>
                    <Link to="/admin/banner/trash" className="text-sm  ml-2">Trash</Link>
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
                        {banners &&
                            banners.length > 0 &&
                            banners.map((banner, index) => {
                                var jsxStatus = ``;
                                if (banner.status === 1) {
                                    jsxStatus = <button onClick={() => statusBanner(banner.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOn className='text-sm' />
                                    </button>;
                                }
                                else {
                                    jsxStatus = <button onClick={() => statusBanner(banner.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOff className='text-sm' />
                                    </button>;
                                }
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>
                                            <input type='checkbox' />
                                        </td>
                                        <td><img src={`http://localhost:8000/images/banner/${banner.image}`} alt={banner.name} width="100" height="100" className='py-2' /></td>
                                        <td>{banner.name}</td>
                                        <td>{banner.position}</td>
                                        <td className='text-center text-3xl'>
                                            {jsxStatus}<button className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <BiShowAlt className='text-sm' />
                                            </button>
                                            <Link to="/admin/banner/edit" className="text-sm  ml-2">
                                                <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                    <GiNotebook className='text-sm' />
                                                </button></Link>

                                            <button onClick={() => deleteBanner(banner.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <FaTrash className='text-sm' />
                                            </button>
                                        </td>
                                        <td className='text-center'>{banner.id}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BannerList;