import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ShowBanner = () => {
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();
    const [banners, setBanner] = useState({}); // Để lưu thông tin banner
    const [error, setError] = useState(''); // Biến để lưu lỗi nếu có

    useEffect(() => {
        // Gọi API để lấy thông tin banner dựa trên ID
        const fetchBanner = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/banner/show/${id}`);
                setBanner(response.banner);
            } catch (error) {
                setError('Lỗi khi lấy thông tin banner.');
            }
        };
        fetchBanner();
    }, [id]);

    return (
        <div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {banners && banners.length > 0 &&
                banners.map((banner, index) => {
                    (
                        <div>
                            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                                <div className='basis-1/2'>
                                    <h1 className='text-2xl uppercase text-green-800'>BANNER DETAILS</h1>
                                </div>
                            </div>
                            <div className='border rounded-lg p-4 bg-white'>
                                <h2 className='text-xl font-bold mb-2'>Tên Banner: {banner.name}</h2>
                                <p className='mb-2'><strong>Mô tả:</strong> {banner.description}</p>
                                <p className='mb-2'><strong>Link:</strong> <a href={banner.link} target='_blank' rel='noopener noreferrer'>{banner.link}</a></p>
                                <p className='mb-2'><strong>Vị trí:</strong> {banner.position}</p>
                                <p className='mb-2'><strong>Thứ tự:</strong> {banner.sort_order}</p>
                                <p className='mb-2'><strong>Trạng thái:</strong> {banner.status === '1' ? 'Xuất bản' : 'Chưa xuất bản'}</p>
                                <div className='mb-4'>
                                    <strong>Hình ảnh:</strong>
                                    <div>
                                        {banner.image ? (
                                            <img src={`http://localhost:8000/images/banner/${banner.image}`} alt={banner.name} className="max-w-xs mt-2" />
                                        ) : (
                                            <p>Không có hình ảnh</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/admin/banner')}
                                    className='bg-blue-500 text-white py-2 px-4 rounded'>
                                    Quay lại danh sách
                                </button>
                            </div>
                        </div>
                    )
                }
                )
            }
        </div>
    );
};

export default ShowBanner;