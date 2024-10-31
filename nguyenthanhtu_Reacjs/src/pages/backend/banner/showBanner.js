import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BannerService from '../../../services/BannerService';

const ShowBanner = () => {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();
    const [banner, setBanner] = useState(null); // To store banner information
    const [error, setError] = useState(''); // To store error messages

    useEffect(() => {
        // Fetch banner information based on ID
        const fetchBanner = async () => {
            try {
                const response = await BannerService.show(id); // Assuming 'show' returns a single banner
                setBanner(response.banner); // Assuming the API response structure contains 'data'
            } catch (error) {
                setError('Lỗi khi lấy thông tin banner.');
                console.error(error);
            }
        };
        fetchBanner();
    }, [id]);

    return (
        <div className="p-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {banner ? (
                <div className='flex flex-row'>
                    <div className='flex-shrink-0 pr-4'>
                        {banner.image ? (
                            <img src={`http://localhost:8000/images/banner/${banner.image}`} alt={banner.name} className="max-w-xs" />
                        ) : (
                            <p>Không có hình ảnh</p>
                        )}
                    </div>
                    <div className='flex-grow'>
                        <h1 className='text-2xl uppercase text-green-800 mb-4'>BANNER DETAILS</h1>
                        <h2 className='text-xl font-bold mb-2'>Tên Banner: {banner.name}</h2>
                        <p className='mb-2'><strong>Mô tả:</strong> {banner.description}</p>
                        <p className='mb-2'><strong>Link:</strong> <a href={banner.link} target='_blank' rel='noopener noreferrer'>{banner.link}</a></p>
                        <p className='mb-2'><strong>Vị trí:</strong> {banner.position}</p>
                        <p className='mb-2'><strong>Thứ tự:</strong> {banner.sort_order}</p>
                        <p className='mb-2'><strong>Trạng thái:</strong> {banner.status === '1' ? 'Xuất bản' : 'Chưa xuất bản'}</p>
                        <button
                            onClick={() => navigate('/admin/banner')}
                            className='bg-blue-500 text-white py-2 px-4 rounded'>
                            Quay lại danh sách
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center">Đang tải thông tin banner...</div>
            )}
        </div>
    );
};

export default ShowBanner;
