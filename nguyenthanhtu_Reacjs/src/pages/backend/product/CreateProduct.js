import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandService from '../../../services/BrandService';
import CategoryService from '../../../services/CategoryService';
import ProductService from '../../../services/ProductService';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        brand_id: '',
        price: '',
        slug: '',
        pricesale: '',
        thumbnail: null,
        status: '1',
    });

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResult = await CategoryService.getList();
                setCategories(categoriesResult.category || []);

                const brandsResult = await BrandService.getList();
                setBrands(brandsResult.brand || []);
            } catch (error) {
                console.error('Error fetching categories or brands:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };

        // Tạo slug từ name
        if (name === 'name') {
            updatedData.slug = value.toLowerCase().replace(/ /g, '-');
        }

        setFormData(updatedData);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log('Selected file:', file); // Log the selected file
        setFormData({ ...formData, thumbnail: file });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();

        Object.keys(formData).forEach((key) => {
            payload.append(key, formData[key]);
        });

        try {
            await ProductService.add(payload);
            navigate('/admin/product');
        } catch (error) {
            console.error('Error creating product:', error.response?.data || error.message);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-6">Thêm sản phẩm</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2" htmlFor="name">Tên sản phẩm</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="slug">slug</label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="description">Mô tả</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="category_id">Danh mục</label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            required
                        >
                            <option value="">Chọn danh mục</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="brand_id">Thương hiệu</label>
                        <select
                            id="brand_id"
                            name="brand_id"
                            value={formData.brand_id}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            required
                        >
                            <option value="">Chọn thương hiệu</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="price">Giá</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="pricesale">Giá khuyến mãi</label>
                        <input
                            type="number"
                            id="pricesale"
                            name="pricesale"
                            value={formData.pricesale}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="thumbnail">Hình ảnh</label>
                        <input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            onChange={handleFileChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="status">Trạng thái</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        >
                            <option value="1">Xuất bản</option>
                            <option value="2">Chưa xuất bản</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                        Lưu
                    </button>
                    <button type="button" onClick={() => navigate('/admin/product')} className="bg-blue-500 text-white py-2 px-4 rounded ml-2">
                        Về danh sách
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
