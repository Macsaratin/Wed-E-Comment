import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContactService from '../../../services/ContactService'; // Adjust the service path as necessary

const ReplyContact = () => {
    const { id } = useParams(); // Get the contact ID from URL
    const navigate = useNavigate();
    const [replyContent, setReplyContent] = useState(''); // State for reply content
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state
    const [successMessage, setSuccessMessage] = useState(''); // Success message state

    const handleChange = (e) => {
        setReplyContent(e.target.value); // Update reply content
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Set loading state
        setError(''); // Reset error state
        setSuccessMessage(''); // Reset success message

        try {
            await ContactService.reply(id, { content: replyContent }); // Send reply content
            setSuccessMessage('Reply sent successfully!'); // Set success message
            setReplyContent(''); // Clear reply content
        } catch (error) {
            setError('Error sending reply. Please try again.'); // Set error message
            console.error(error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Reply to Contact</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Your Reply:</label>
                    <textarea
                        name="replyContent"
                        value={replyContent}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full p-2 ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded hover:bg-blue-600`}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Reply'}
                </button>
            </form>
            <button
                onClick={() => navigate('/admin/contact')} // Navigate back to contact list
                className="mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
                Back to Contacts
            </button>
        </div>
    );
};

export default ReplyContact;
