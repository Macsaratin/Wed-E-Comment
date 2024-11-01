import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import BrandService from '../../../services/BrandService';
import CategoryService from '../../../services/CategoryService';
import ProductService from '../../../services/ProductService';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    // Filter states
    const [minPriceFilter, setMinPriceFilter] = useState('');
    const [maxPriceFilter, setMaxPriceFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await ProductService.getList();
                setProducts(result.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchBrands = async () => {
            try {
                const result = await BrandService.getList();
                if (Array.isArray(result.brand)) {
                    setBrands(result.brand);
                } else {
                    console.error("Brands response is not an array:", result.brand);
                }
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const result = await CategoryService.getList();
                if (Array.isArray(result.category)) {
                    setCategories(result.category);
                } else {
                    console.error("Categories response is not an array:", result.category);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchProducts();
        fetchBrands();
        fetchCategories();
    }, []);

    const addToCart = async (product) => {
        try {
            const response = await ProductService.getOrder({
                product_id: product.id,
                quantity: 1 // Adjust quantity as needed
            });
            console.log(response.data);
            alert('Product added to cart!');
        } catch (error) {
            console.error(`Error adding product ${product.id} to cart:`, error);
            alert('Failed to add product to cart.');
        }
    };

    // Function to handle filters
    const filteredProducts = products.filter(product => {
        const productPrice = parseFloat(product.price);
        const minPrice = parseFloat(minPriceFilter);
        const maxPrice = parseFloat(maxPriceFilter);

        const matchesPrice = (isNaN(minPrice) || productPrice >= minPrice) &&
            (isNaN(maxPrice) || productPrice <= maxPrice);
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        const matchesBrand = !brandFilter || product.brand === brandFilter;
        const matchesYear = !yearFilter || new Date(product.created_at).getFullYear() === parseInt(yearFilter);
        const matchesStatus = product.status === 1; // Check for status

        return matchesPrice && matchesCategory && matchesBrand && matchesYear && matchesStatus;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="2xl:container 2xl:mx-auto">
            <div className="bg-gray-50 text-center lg:py-10 md:py-8 py-6">
                <p className="w-10/12 mx-auto md:w-full font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-center text-gray-800">Product Collection</p>
            </div>

            {/* Filters */}
            <div className="py-6 lg:px-20 md:px-6 px-4">
                <div className="flex flex-wrap gap-4 mb-6">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPriceFilter}
                        onChange={e => setMinPriceFilter(e.target.value)}
                        className="border p-2"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPriceFilter}
                        onChange={e => setMaxPriceFilter(e.target.value)}
                        className="border p-2"
                    />
                    <select onChange={e => setCategoryFilter(e.target.value)} className="border p-2">
                        <option value="">Select Category</option>
                        {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))
                        ) : (
                            <option disabled>No Categories Available</option>
                        )}
                    </select>
                    <select onChange={e => setBrandFilter(e.target.value)} className="border p-2">
                        <option value="">Select Brand</option>
                        {Array.isArray(brands) && brands.length > 0 ? (
                            brands.map(brand => (
                                <option key={brand.id} value={brand.name}>{brand.name}</option>
                            ))
                        ) : (
                            <option disabled>No Brands Available</option>
                        )}
                    </select>
                    <select onChange={e => setYearFilter(e.target.value)} className="border p-2">
                        <option value="">Select Year</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2024">2024</option>
                    </select>
                </div>

                <h2 className="font-semibold text-2xl leading-6 text-gray-800 mt-12">All Products</h2>
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
                    {currentProducts.map(product => (
                        <div key={product.id} className="relative">
                            <div className="relative group">
                                <div className="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full"></div>
                                <img className="w-full" src={`http://localhost:8000/images/product/${product.images[0].thumbnail}`} alt={product.name} />
                                <div className="absolute bottom-0 p-8 w-full opacity-0 group-hover:opacity-100">
                                    <button
                                        className="font-medium text-base leading-4 text-gray-800 bg-white py-3 w-full"
                                        onClick={() => addToCart(product)} // Call addToCart here
                                    >
                                        Add to bag
                                    </button>
                                    <Link to={`/products/${product.id}`}>
                                        <button className="bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-white">Detail</button>
                                    </Link>
                                </div>
                            </div>
                            <p className="font-normal text-xl leading-5 text-gray-800 md:mt-6 mt-4">{product.name}</p>
                            <p className="font-semibold text-xl leading-5 mt-4">
                                {product.price && (
                                    <span className="text-green-600">
                                        {product.price.toLocaleString('vi-VN')} ₫
                                    </span>
                                )}
                                {product.price_sale && (
                                    <span className="text-red-600 ml-2">
                                        {product.price_sale.toLocaleString('vi-VN')} ₫
                                    </span>
                                )}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-6">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="mr-2 bg-gray-800 text-white py-2 px-4 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-gray-800">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="ml-2 bg-gray-800 text-white py-2 px-4 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
