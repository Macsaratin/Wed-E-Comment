// ProductSaleShow.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const ProductSaleShow = () => {
    const { id } = useParams();
    const [productSale, setProductSale] = useState(null);

    useEffect(() => {
        const fetchProductSale = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/productsale/show/${id}`);
                setProductSale(response.productSale); // Adjust according to your API response structure
            } catch (error) {
                console.error('Error fetching product sale details:', error);
            }
        };
        fetchProductSale();
    }, [id]);

    if (!productSale) return <div>Loading...</div>;

    return (
        <div className='bg-white p-4 border rounded-lg'>
            <h1 className='text-2xl uppercase text-green-800'>Product Sale Details</h1>
            <p><strong>Price Sale:</strong> {productSale.price_sale}</p>
            <p><strong>Begin Date:</strong> {productSale.date_begin}</p>
            <p><strong>End Date:</strong> {productSale.date_end}</p>
            <p><strong>Status:</strong> {productSale.status === 1 ? 'Active' : 'Inactive'}</p>
            <p><strong>ID:</strong> {productSale.id}</p>
        </div>
    );
};

export default ProductSaleShow;
