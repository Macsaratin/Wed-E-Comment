import React, { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService'; // Adjust the path

const Product = () => {
    const [products, setProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await ProductService.getList();
                setProducts(result.products); // Adjust according to your API response

                // Filter new products based on created_at date
                const currentDate = new Date();
                const filteredNewProducts = result.products.filter(product => {
                    const createdAt = new Date(product.created_at); // Use 'product' instead of 'products'
                    return (currentDate - createdAt) < 7 * 24 * 60 * 60 * 1000; // Products created in the last 7 days
                });
                setNewProducts(filteredNewProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="2xl:container 2xl:mx-auto">
            <div className="bg-gray-50 text-center lg:py-10 md:py-8 py-6">
                <p className="w-10/12 mx-auto md:w-full font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-center text-gray-800">Summer Collection Vol-1</p>
            </div>
            <div className="py-6 lg:px-20 md:px-6 px-4">
                <p className="font-normal text-sm leading-3 text-gray-600">Home / Shop by Category / Women</p>
                <hr className="w-full bg-gray-200 my-6" />

                <h2 className="font-semibold text-2xl leading-6 text-gray-800 mt-6">New Arrivals</h2>
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
                    {newProducts.map(product => (
                        <div key={product.id} className="relative">
                            <div className="absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50">
                                <p className="text-xs leading-3 text-gray-800">New</p>
                            </div>
                            <div className="relative group">
                                <div className="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                                <img className="w-full" src={`http://localhost:8000/images/products/${product.images[0].thumbnail}`} alt={product.name} />
                                <div className="absolute bottom-0 p-8 w-full opacity-0 group-hover:opacity-100">
                                    <button className="font-medium text-base leading-4 text-gray-800 bg-white py-3 w-full">Add to bag</button>
                                    <button className="bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-white">Quick View</button>
                                </div>
                            </div>
                            <p className="font-normal text-xl leading-5 text-gray-800 md:mt-6 mt-4">{product.name}</p>
                            <p className="font-semibold text-xl leading-5 text-gray-800 mt-4">${product.price}</p>
                        </div>
                    ))}
                </div>

                <h2 className="font-semibold text-2xl leading-6 text-gray-800 mt-12">All Products</h2>
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
                    {products.map(product => (
                        <div key={product.id} className="relative">
                            <div className="relative group">
                                <div className="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                                <img className="w-full" src={`http://localhost:8000/images/product/${product.images[0].thumbnail}`} alt={product.name} />
                                <div className="absolute bottom-0 p-8 w-full opacity-0 group-hover:opacity-100">
                                    <button className="font-medium text-base leading-4 text-gray-800 bg-white py-3 w-full">Add to bag</button>
                                    <button className="bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-white">Quick View</button>
                                </div>
                            </div>
                            <p className="font-normal text-xl leading-5 text-gray-800 md:mt-6 mt-4">{product.name}</p>
                            <p className="font-semibold text-xl leading-5 text-gray-800 mt-4">${product.price}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center">
                    <button className="hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 py-5 md:px-16 md:w-auto w-full lg:mt-28 md:mt-12 mt-10 text-white font-medium text-base leading-4">Load More</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
