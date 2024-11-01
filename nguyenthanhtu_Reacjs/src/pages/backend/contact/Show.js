import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContactService from '../../../services/ContactService'; // Adjust service path

const ShowContact = () => {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();
    const [contact, setContact] = useState(null); // To store contact information
    const [error, setError] = useState(''); // To store error messages

    useEffect(() => {
        // Fetch contact information based on ID
        const fetchContact = async () => {
            try {
                const response = await ContactService.show(id); // Assuming 'show' returns a single contact
                setContact(response.contact); // Adjust based on your API response structure
            } catch (error) {
                setError('Lỗi khi lấy thông tin liên hệ.');
                console.error(error);
            }
        };
        fetchContact();
    }, [id]);

    return (
        <div className="p-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {contact ? (
                <div className='flex flex-col'>
                    <h1 className='text-2xl uppercase text-green-800 mb-4'>THÔNG TIN LIÊN HỆ</h1>
                    <div className='mb-2'>
                        <strong>Tên:</strong> {contact.name}
                    </div>
                    <div className='mb-2'>
                        <strong>Email:</strong> {contact.email}
                    </div>
                    <div className='mb-2'>
                        <strong>Số điện thoại:</strong> {contact.phone}
                    </div>
                    <div className='mb-2'>
                        <strong>Tiêu đề:</strong> {contact.title}
                    </div>
                    <div className='mb-2'>
                        <strong>Nội dung:</strong> {contact.content}
                    </div>
                    <div className='mb-2'>
                        <strong>Trạng thái:</strong> {contact.status === '1' ? 'Hoạt động' : 'Không hoạt động'}
                    </div>
                    <button
                        onClick={() => navigate('/admin/contact')} // Adjust path as needed
                        className='bg-blue-500 text-white py-2 px-4 rounded'>
                        Quay lại danh sách
                    </button>
                </div>
            ) : (
                <div className="text-center">Đang tải thông tin liên hệ...</div>
            )}
        </div>
    );
};

export default ShowContact;
