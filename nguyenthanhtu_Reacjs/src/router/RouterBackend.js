// ----- Banner
import CreateBanner from '../pages/backend/banner/BannerCreate';
import EditBanner from '../pages/backend/banner/BannerEdit';
import BannerList from '../pages/backend/banner/BannerList';
import ShowBanner from '../pages/backend/banner/showBanner';
import TrashBanner from '../pages/backend/banner/Trash';
// /---Brand
import CreateBrand from '../pages/backend/brand/BrandCreate';
import Brandlist from '../pages/backend/brand/Brandlist';
import TrashBrand from '../pages/backend/brand/Trash';

// /----Category
import Categories from '../pages/backend/category/Categorylish';
import CreateCategory from '../pages/backend/category/CreateCategory';
import EditCategory from '../pages/backend/category/EditCategory';
import TrashCategories from '../pages/backend/category/Trash';
// ---
import Config from '../pages/backend/config/Configlist';
import Dashboard from '../pages/backend/dashboard/index';
import Menu from '../pages/backend/menu/Menulist';
import Post from '../pages/backend/post/Postlist';
// ----------Product
import CreateProduct from '../pages/backend/product/CreateProduct';
import Product from '../pages/backend/product/Productlist';
import ShowProduct from '../pages/backend/product/ProductShow';
import TrashProduct from '../pages/backend/product/Trash';
import UpdateProduct from '../pages/backend/product/UpdateProduct';


// --------------

import ProductImage from '../pages/backend/productimage/ProductImagelist';
import ProductPrice from '../pages/backend/productprice/ProductSale';
import ProductStore from '../pages/backend/productstore/ProductStore';
import Topic from '../pages/backend/topic/Topiclist';



const RouterBackend = [
    { path: "/admin", element: <Dashboard /> },
    {
        path: "banner",
        children: [
            { path: "", element: <BannerList /> },
            { path: "trash", element: <TrashBanner /> },
            { path: "create", element: <CreateBanner /> },
            { path: "show", element: <ShowBanner /> },
            { path: "edit", element: <EditBanner /> },
        ],
    },
    {
        path: "brand",
        children: [
            { path: "", element: <Brandlist /> },
            { path: "trash", element: <TrashBrand /> },
            { path: "create", element: <CreateBrand /> },
        ],
    },
    {
        path: "category",
        children: [
            { path: "", element: <Categories /> },
            { path: "trash", element: <TrashCategories /> },
            { path: "create", element: <CreateCategory /> },
            { path: "edit", element: <EditCategory /> },
        ],
    },

    {
        path: "product",
        children: [
            { path: "", element: <Product /> },
            { path: "create", element: <CreateProduct /> },
            { path: "trash", element: <TrashProduct /> },
            { path: "show/:id", element: <ShowProduct /> },
            { path: "update/:id", element: <UpdateProduct /> },
        ],
    },
    { path: "productimage", element: <ProductImage /> },
    { path: "productsale", element: <ProductPrice /> },
    { path: "productstore", element: <ProductStore /> },
    { path: "menu", element: <Menu /> },
    { path: "config", element: <Config /> },
    { path: "post", element: <Post /> },
    { path: "topic", element: <Topic /> },
];

export default RouterBackend;
