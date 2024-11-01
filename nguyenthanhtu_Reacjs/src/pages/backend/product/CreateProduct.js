import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandService from '../../../services/BrandService';
import CategoryService from '../../../services/CategoryService';
import ProductService from '../../../services/ProductService';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        slug: '',
        category_id: '',
        brand_id: '',
        description: '',
        content: '',
        status: '1',
        thumbnail: [],
    });

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');
    const [searchBrand, setSearchBrand] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResult = await CategoryService.getList();
                setCategories(categoriesResult.category || []);
                setFilteredCategories(categoriesResult.category || []);
                const brandsResult = await BrandService.getList();
                setBrands(brandsResult.brand || []);
                setFilteredBrands(brandsResult.brand || []);
            } catch (error) {
                console.error('Error fetching categories or brands:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredCategories(categories.filter(category =>
            category.name.toLowerCase().includes(searchCategory.toLowerCase())
        ));
    }, [searchCategory, categories]);

    useEffect(() => {
        setFilteredBrands(brands.filter(brand =>
            brand.name.toLowerCase().includes(searchBrand.toLowerCase())
        ));
    }, [searchBrand, brands]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
            slug: name === 'name' ? value.toLowerCase().replace(/ /g, '-') : prevData.slug
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevData => ({ ...prevData, thumbnail: files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key === 'thumbnail') {
                formData.thumbnail.forEach((file, index) => {
                    payload.append(`thumbnail[${index}]`, file);
                });
            } else {
                payload.append(key, formData[key]);
            }
        });

        console.log("FormData content before sending:");
        payload.forEach((value, key) => console.log(key, value));

        try {
            const result = await ProductService.add(payload);
            if (result.data.status) {
                setFormData({
                    name: '',
                    price: '',
                    slug: '',
                    category_id: '',
                    brand_id: '',
                    description: '',
                    content: '',
                    status: '1',
                    thumbnail: [],
                });
                navigate('/admin/product');
            } else {
                setErrors(result.data.errors || {});
                alert(result.data.message);
            }
        } catch (error) {
            console.error('Error adding product:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-2xl font-bold mb-6">Thêm sản phẩm</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { id: 'name', label: 'Tên sản phẩm', type: 'text', value: formData.name },
                        { id: 'price', label: 'Giá mua', type: 'number', value: formData.price },
                        { id: 'slug', label: 'Slug', type: 'text', value: formData.slug },
                    ].map(({ id, label, type, value }) => (
                        <div key={id}>
                            <label htmlFor={id} className="block mb-2">{label}</label>
                            <input
                                id={id}
                                name={id}
                                type={type}
                                value={value}
                                onChange={handleChange}
                                className="border rounded p-2 w-full"
                                required
                            />
                            {errors[id] && <span className="text-red-500">{errors[id]}</span>}
                        </div>
                    ))}
                    <div>
                        <label htmlFor="category_id" className="block mb-2">Danh mục</label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            required
                        >
                            <option value="">Chọn danh mục</option>
                            {filteredCategories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="brand_id" className="block mb-2">Thương hiệu</label>
                        <select
                            id="brand_id"
                            name="brand_id"
                            value={formData.brand_id}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            required
                        >
                            <option value="">Chọn thương hiệu</option>
                            {filteredBrands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2">Mô tả</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                        {errors.description && <span className="text-red-500">{errors.description}</span>}
                    </div>
                    <div>
                        <label htmlFor="content" className="block mb-2">Nội dung</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                        {errors.content && <span className="text-red-500">{errors.content}</span>}
                    </div>
                    <div>
                        <label htmlFor="thumbnail" className="block mb-2">Hình ảnh</label>
                        <input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            multiple
                            onChange={handleFileChange}
                            className="border rounded p-2 w-full"
                        />
                        {errors.thumbnail && <span className="text-red-500">{errors.thumbnail}</span>}
                    </div>
                    <div>
                        <label htmlFor="status" className="block mb-2">Trạng thái</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        >
                            <option value="1">Xuất bản</option>
                            <option value="0">Ẩn</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Lưu</button>
                    <button type="button" onClick={() => navigate('/admin/product')} className="bg-blue-500 text-white py-2 px-4 rounded ml-2">Về danh sách</button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
