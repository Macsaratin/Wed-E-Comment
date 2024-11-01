import React, { useEffect, useState } from 'react';
import ContactService from '../../../services/ContactService';

const ContactForm = ({ id }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        title: '',
        content: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
            script.async = true;
            script.defer = true;
            script.onerror = () => {
                console.error('Error loading Google Maps script');
                setMessage('Failed to load the map. Please try again later.');
            };
            document.body.appendChild(script);
        };

        const initMap = () => {
            if (window.google && document.getElementById("map")) {
                const map = new window.google.maps.Map(document.getElementById("map"), {
                    center: { lat: 40.76, lng: -73.983 },
                    zoom: 15,
                    mapTypeId: "satellite",
                });
                map.setTilt(45);
            } else {
                console.error("Google Maps API not loaded or map element not found.");
            }
        };

        loadGoogleMapsScript();
        window.initMap = initMap;

        return () => {
            const script = document.querySelector(`script[src*="maps.googleapis.com"]`);
            if (script) {
                script.remove();
            }
        };
    }, []);

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
            setFormData({ name: '', email: '', phone: '', title: '', content: '' });
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while sending your message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex max-w-5xl mx-auto p-4">
            <div className="flex-1 pr-4">
                <div id="map" style={{ height: "400px", width: "100%" }}></div>
            </div>
            <div className="flex-1 bg-white shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                {message && <p className="mb-4 text-center text-red-600">{message}</p>}
                <form onSubmit={handleSubmit}>
                    {['name', 'email', 'phone', 'title'].map((field) => (
                        <div className="mb-4" key={field}>
                            <label className="block text-sm font-medium text-gray-700">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
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
        </div>
    );
};

export default ContactForm;
