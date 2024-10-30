import React, { useState } from 'react';
import ContactService from '../../../services/ContactService';

const ContactForm = ({ id }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        title: '',
        content: '',
        replay_id: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await ContactService.postMess(id, formData);
            setMessage('Your message has been sent successfully!');
            setFormData({ name: '', email: '', phone: '', title: '', content: '', replay_id: '' });
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while sending your message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Reply to Contact</h2>
            {message && <p className="mb-4 text-center text-red-600">{message}</p>}
            <form onSubmit={handleSubmit}>
                {['name', 'email', 'phone', 'title'].map((field) => (
                    <div className="mb-4" key={field}>
                        <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                            type={field === 'email' ? 'email' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                        />
                    </div>
                ))}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white p-2 rounded hover:bg-blue-600`}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
