// AddProductSale.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductSaleService from '../../../services/ProductSaleSerice'; // Adjust the path as needed
import ProductService from '../../../services/ProductService'; // Assuming you have a service for fetching products

function AddProductSale() {
    const [productSale, setProductSale] = useState({
        price_sale: '',
        status: '',
        date_begin: '',
        date_end: '',
        product_id: '',
    });
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductService.getList(); // Fetch the list of products
                setProducts(response.products); // Adjust according to your API response structure
            } catch (error) {
                setError('Không thể tải danh sách sản phẩm.');
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductSale(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await ProductSaleService.add(); // Pass the productSale data
            if (response.status) {
                navigate('/admin/productsale'); // Redirect to product sale list
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm sản phẩm.');
            console.error(error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Thêm Sản Phẩm Bán</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Chọn sản phẩm:</label>
                    <select
                        name="product_id"
                        value={productSale.product_id}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn sản phẩm</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.name} {/* Assuming each product has a 'name' field */}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Giá bán:</label>
                    <input
                        type="number"
                        name="price_sale"
                        value={productSale.price_sale}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Trạng thái:</label>
                    <select
                        name="status"
                        value={productSale.status}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn trạng thái</option>
                        <option value="1">Hoạt động</option>
                        <option value="0">Không hoạt động</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Ngày bắt đầu:</label>
                    <input
                        type="date"
                        name="date_begin"
                        value={productSale.date_begin}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Ngày kết thúc:</label>
                    <input
                        type="date"
                        name="date_end"
                        value={productSale.date_end}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Thêm sản phẩm bán
                </button>
            </form>
        </div>
    );
}

export default AddProductSale;
