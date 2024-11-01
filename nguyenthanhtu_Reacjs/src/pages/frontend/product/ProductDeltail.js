import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../home/footer";
import Header from "../home/header";

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

    // States for post creation
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postSuccess, setPostSuccess] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/product/show/${id}`);
                setProduct(response.data.product);
                if (response.data.product.images.length > 0) {
                    setSelectedImage(response.data.product.images[0].thumbnail);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Error fetching product details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToBag = async () => {
        setIsAdding(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/cart/add`, { productId: product.id, quantity, image: selectedImage });
            if (response.data.status) {
                alert('Product added to bag successfully!');
            } else {
                alert('Failed to add product to bag.');
            }
        } catch (error) {
            console.error('Error adding product to bag:', error);
            alert('Error adding product to bag. Please try again later.');
        } finally {
            setIsAdding(false);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/post/create`, {
                title: postTitle,
                content: postContent,
            });
            if (response.data.status) {
                setPostSuccess('Post created successfully!');
                setPostTitle('');
                setPostContent('');
            } else {
                setPostSuccess('Failed to create post.');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            setPostSuccess('Error creating post. Please try again later.');
        }
    };

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;
    if (!product) return <div>No product found.</div>;

    const priceToUse = product.price_sale > 0 ? product.price_sale : product.price;
    const totalPrice = (priceToUse * quantity).toLocaleString('vi-VN');

    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-4 text-green-800">{product.name}</h1>
                    <div className="flex flex-wrap mb-4">
                        {product.images.length > 1 ? (
                            product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:8000/images/product/${image.thumbnail}`}
                                    alt={`${product.name} ${index + 1}`}
                                    className={`w-full max-w-xs rounded-lg mb-4 mr-4 cursor-pointer ${selectedImage === image.thumbnail ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => setSelectedImage(image.thumbnail)}
                                />
                            ))
                        ) : product.images.length === 1 ? (
                            <img
                                src={`http://localhost:8000/images/product/${product.images[0].thumbnail}`}
                                alt={product.name}
                                className="w-full max-w-xs rounded-lg mb-4"
                            />
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <p className="text-lg"><strong>Category:</strong> {product.catname}</p>
                        <p className="text-lg"><strong>Brand:</strong> {product.brandname}</p>
                        <p className="text-lg"><strong>Description:</strong> {product.description}</p>
                        <p className="text-lg"><strong>Price:</strong> {product.price.toLocaleString('vi-VN')} ₫</p>
                        {product.price_sale > 0 && (
                            <p className="text-lg text-red-600"><strong>Sale Price:</strong> {product.price_sale.toLocaleString('vi-VN')} ₫</p>
                        )}
                        <p className="text-lg"><strong>Total Price:</strong> {totalPrice} ₫</p>
                    </div>
                    <div className="flex items-center mb-4">
                        <button onClick={decreaseQuantity} className="bg-gray-300 text-black py-1 px-3 rounded-lg">-</button>
                        <span className="mx-4 text-lg">{quantity}</span>
                        <button onClick={increaseQuantity} className="bg-gray-300 text-black py-1 px-3 rounded-lg">+</button>
                    </div>
                    <button
                        onClick={addToBag}
                        className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isAdding}
                    >
                        {isAdding ? 'Adding...' : 'Add to Bag'}
                    </button>

                    {/* Post Creation Form */}
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
                <form onSubmit={handlePostSubmit} className="bg-gray-100 p-4 rounded-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700">Post Title:</label>
                        <input
                            type="text"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            required
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Post Content:</label>
                        <textarea
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            required
                            className="border p-2 rounded w-full"
                            rows="3"
                        ></textarea>
                    </div>
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                        Create Post
                    </button>
                    {postSuccess && <p className="mt-2 text-green-600">{postSuccess}</p>}
                </form>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetail;
