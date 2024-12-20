import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../../../services/ProductService';

const ProductSale = () => {
    const [saleProducts, setSaleProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        const fetchSaleProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await ProductService.product_sale(productsPerPage);
                const today = new Date();
                const filteredProducts = result.products.filter(product =>
                    product.price_sale > 0 &&
                    new Date(product.date_begin) <= today &&
                    new Date(product.date_end) >= today
                );
                setSaleProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching sale products:", error);
                setError("Failed to fetch sale products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchSaleProducts();
    }, []);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = saleProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(saleProducts.length / productsPerPage);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="2xl:container 2xl:mx-auto">
            <div className="bg-gray-50 text-center lg:py-10 md:py-8 py-6">
                <p className="w-10/12 mx-auto md:w-full font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800">Sale Products</p>
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
                {currentProducts.map(products => (
                    <div key={products.id} className="relative">
                        <div className="absolute top-0 left-0 py-2 px-4 bg-white bg-opacity-50">
                            <p className="text-xs leading-3 text-gray-800">Sale</p>
                        </div>
                        <div className="relative group">
                            <img className="w-full" src={`http://localhost:8000/images/product/${products.images[0].thumbnail}`} alt={products.name} />
                            <div className="absolute bottom-0 p-8 w-full opacity-0 group-hover:opacity-100">
                                <button className="font-medium text-base leading-4 text-gray-800 bg-white py-3 w-full">Add to bag</button>
                                <Link to="/products/quickview">
                                    <button className="bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-white">Quick View</button>
                                </Link>
                            </div>
                        </div>
                        <p className="font-normal text-xl leading-5 text-gray-800 md:mt-6 mt-4">{products.name}</p>
                        <p className="font-semibold text-xl leading-5 text-gray-800 mt-4">{products.price || products.price_sale}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded-l-md disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded-r-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductSale;
