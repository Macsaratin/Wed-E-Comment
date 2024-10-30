import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const ProductShow = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/product/show/${id}`);
                setProduct(response.data.product); // Assuming the API returns the product in this format
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className='bg-white p-4 border rounded-lg'>
            <h1 className='text-2xl uppercase text-green-800'>{product.name}</h1>
            <img src={`http://localhost:8000/images/product/${product.images[0].thumbnail}`} alt={product.name} width="300" height="300" />
            <p><strong>Category:</strong> {product.catname}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Status:</strong> {product.status === 1 ? 'Active' : 'Inactive'}</p>
            <p><strong>ID:</strong> {product.id}</p>
        </div>
    );
};

export default ProductShow;
