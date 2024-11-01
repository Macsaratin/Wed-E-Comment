import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiShowAlt } from "react-icons/bi";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";
import ContactService from '../../../services/ContactService';

const Contactlist = () => {
    const [contacts, setcontacts] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await ContactService.getList();
            setcontacts(result.contact);
        })();
    }, [])
    const statuscontact = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/contact/status/${id}`);
            setcontacts(contacts.map(contact => {
                if (contact.id === id) {
                    contact.status = (contact.status === 1) ? 0 : 1;
                }
                return contact;
            }));
        } catch (error) {
            console.error('Error changing contact status:', error);
        }
    };
    const deletecontact = async (id) => {
        try {
            await axios.get(`http://127.0.0.1:8000/api/contact/delete/${id}`);
            setcontacts(contacts.filter(contact => contact.id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };
    return (
        <div>
            <div className='flex flex-row justify-center items-center py-4 border rounded-lg mb-4 px-4 bg-white'>
                <div className='basis-1/2'>
                    <h1 className='text-2xl uppercase text-green-800'>QUẢN LÝ Danh Muc</h1>
                </div>
                <div className='flex gap-2 px-60 '>
                    <Link to="/admin/contact/trash" >
                        <div className='hover:text-blue-700'>xoá</div>
                    </Link>
                </div>
            </div>
            <div className='bg-white p-3 border rounder rounded-lg '>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='w-9'>
                                #
                            </th>
                            <th className='px-10'>Name</th>
                            <th className='px-10'>Tên vị trí</th>
                            <th className='px-40'>Chức năng</th>
                            <th className='px-10'>ID</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {contacts &&
                            contacts.length > 0 &&
                            contacts.map((contact, index) => {
                                var jsxStatus = ``;
                                if (contact.status === 1) {
                                    jsxStatus = <button onClick={() => statuscontact(contact.id)} className='bg-green-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOn className='text-sm' />
                                    </button>;
                                }
                                else {
                                    jsxStatus = <button onClick={() => statuscontact(contact.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                        <FaToggleOff className='text-sm' />
                                    </button>;
                                }
                                return (
                                    <tr key={index}>
                                        <td className='text-center'>
                                            <input type='checkbox' />
                                        </td>
                                        <td>{contact.name}</td>
                                        <td>{contact.content}</td>
                                        <td className='text-center text-3xl'>
                                            {jsxStatus}
                                            <Link to={`/admin/contact/show/${contact.id}`} >
                                                <button className='bg-sky-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                    <BiShowAlt className='text-sm' />
                                                </button>
                                            </Link>
                                            <Link to={`/admin/contact/reply/${contact.id}`} >
                                                <button className='bg-blue-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                    <GiNotebook className='text-sm' />
                                                </button>
                                            </Link>
                                            <button onClick={() => deletecontact(contact.id)} className='bg-red-500 py-1 px-2 mx-0.5 text-white rounded-md'>
                                                <FaTrash className='text-sm' />
                                            </button>
                                        </td>
                                        <td className='text-center'>{contact.id}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Contactlist;