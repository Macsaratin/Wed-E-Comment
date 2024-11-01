import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { GiNotebook } from "react-icons/gi";
import { MdOutlineRestore } from "react-icons/md";
import ContactService from '../../../services/ContactService';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const Trash = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await ContactService.getTrash(); // Fetch contacts from trash
                setContacts(result.contact); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        })();
    }, []);

    const deleteContact = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/contact/destroy/${id}`);
            setContacts(contacts.filter(contact => contact.id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const restoreContact = async (id) => {
        try {
            await axios.get(`${API_BASE_URL}/contact/restore/${id}`);
            setContacts(contacts.filter(contact => contact.id !== id));
        } catch (error) {
            console.error('Error restoring contact:', error);
        }
    };

    // Filter contacts to only include those with status === 0
    const filteredContacts = contacts.filter(contact => contact.status === 0);

    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ LIÊN HỆ</h1>
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
                            <th scope="col" className='px-10'>Tên liên hệ</th>
                            <th scope="col" className='px-40'>Chức năng</th>
                            <th scope="col" className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map((contact, index) => {
                                const statusButton = contact.status === 0 ? (
                                    <button className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOff className='text-sm' />
                                    </button>
                                ) : (
                                    <button className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOn className='text-sm' />
                                    </button>
                                );

                                return (
                                    <tr key={index}>
                                        <td className='text-center'>
                                            <input type='checkbox' />
                                        </td>
                                        <td>{contact.name}</td>
                                        <td className='text-center text-3xl'>
                                            {statusButton}
                                            <button onClick={() => restoreContact(contact.id)} className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <MdOutlineRestore className='text-sm' />
                                            </button>
                                            <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <GiNotebook className='text-sm' />
                                            </button>
                                            <button
                                                onClick={() => deleteContact(contact.id)}
                                                className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'
                                            >
                                                <FaTrash className='text-sm' />
                                            </button>
                                        </td>
                                        <td className='text-center'>{contact.id}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Không có liên hệ nào trong thùng rác.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Trash;
