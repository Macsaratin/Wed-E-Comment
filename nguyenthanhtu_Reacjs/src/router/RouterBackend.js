// ----- Banner
import CreateBanner from '../pages/backend/banner/BannerCreate';
import EditBanner from '../pages/backend/banner/BannerEdit';
import BannerList from '../pages/backend/banner/BannerList';
import ShowBanner from '../pages/backend/banner/showBanner';
import TrashBanner from '../pages/backend/banner/Trash';
// /---Brand
import CreateBrand from '../pages/backend/brand/BrandCreate';
import EditBrand from '../pages/backend/brand/BrandEdit';
import Brandlist from '../pages/backend/brand/Brandlist';
import ShowBrand from '../pages/backend/brand/Show';
import TrashBrand from '../pages/backend/brand/Trash';
// /----Category
import Categories from '../pages/backend/category/Categorylish';
import CreateCategory from '../pages/backend/category/CreateCategory';
import EditCategory from '../pages/backend/category/EditCategory';
import ShowCategories from '../pages/backend/category/Show';
import TrashCategories from '../pages/backend/category/Trash';
// ---
import Config from '../pages/backend/config/Configlist';
//-----contact
import Contact from '../pages/backend/contact/Contactlist';
import ReplyContact from '../pages/backend/contact/Reply';
import ShowContact from '../pages/backend/contact/Show';
import TrashContact from '../pages/backend/contact/Trash';

//---------
import Dashboard from '../pages/backend/dashboard/index';
import Menu from '../pages/backend/menu/Menulist';

// ----------Product
import CreateProduct from '../pages/backend/product/CreateProduct';
import Product from '../pages/backend/product/Productlist';
import ShowProduct from '../pages/backend/product/ProductShow';
import TrashProduct from '../pages/backend/product/Trash';
import UpdateProduct from '../pages/backend/product/UpdateProduct';
// --------------
import CreatePost from '../pages/backend/post/Create';
import Postlist from '../pages/backend/post/Postlist';
import ShowPost from '../pages/backend/post/show';
import TrashPost from '../pages/backend/post/Trash';
import EditPost from '../pages/backend/post/Update';
//---Sale
import CreateProductPrice from '../pages/backend/productprice/Create';
import ProductSale from '../pages/backend/productprice/ProductSale';
import ShowProductPrice from '../pages/backend/productprice/Show';
import TrashProductPrice from '../pages/backend/productprice/Trash';
import UpdateProductPrice from '../pages/backend/productprice/Update';
//----------
import ProductStore from '../pages/backend/productstore/ProductStore';
//--------
import CreateTopic from '../pages/backend/topic/Create';
import ShowTopic from '../pages/backend/topic/Show';
import Topic from '../pages/backend/topic/Topiclist';
import TrashTopic from '../pages/backend/topic/Trash';
import EditTopic from '../pages/backend/topic/Update';
//------------login
// import LoginAdmin from '../pages/backend/Login';

const RouterBackend = [
    // { path: "/login", element: <LoginAdmin /> },
    { path: "/admin", element: <Dashboard /> },
    {
        path: "banner/",
        children: [
            { path: "", element: <BannerList /> },
            { path: "trash", element: <TrashBanner /> },
            { path: "create", element: <CreateBanner /> },
            { path: "show/:id", element: <ShowBanner /> },
            { path: "update/:id", element: <EditBanner /> },
        ],
    },
    {
        path: "brand/",
        children: [
            { path: "", element: <Brandlist /> },
            { path: "trash", element: <TrashBrand /> },
            { path: "create", element: <CreateBrand /> },
            { path: "update/:id", element: <EditBrand /> },
            { path: "show/:id", element: <ShowBrand /> },


        ],
    },
    {
        path: "category",
        children: [
            { path: "", element: <Categories /> },
            { path: "trash", element: <TrashCategories /> },
            { path: "create", element: <CreateCategory /> },
            { path: "update/:id", element: <EditCategory /> },
            { path: "show/:id", element: <ShowCategories /> },
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
    {
        path: "productsale",
        children: [
            { path: "", element: <ProductSale /> },
            { path: "create", element: <CreateProductPrice /> },
            { path: "trash", element: <TrashProductPrice /> },
            { path: "show/:id", element: <ShowProductPrice /> },
            { path: "update/:id", element: <UpdateProductPrice /> },
        ]
    },
    { path: "productstore", element: <ProductStore /> },
    { path: "menu", element: <Menu /> },
    { path: "config", element: <Config /> },
    //--------post
    {
        path: "post/",
        children: [
            { path: "", element: <Postlist /> },
            { path: "trash", element: <TrashPost /> },
            { path: "create", element: <CreatePost /> },
            { path: "update/:id", element: <EditPost /> },
            { path: "show/:id", element: <ShowPost /> },
        ]
    },
    //---------
    {
        path: "topic",
        children: [
            { path: "", element: <Topic /> },
            { path: "show/:id", element: <ShowTopic /> },
            { path: "create", element: <CreateTopic /> },
            { path: "update/:id", element: <EditTopic /> },
            { path: "trash", element: <TrashTopic /> },
        ]
    },
    //--------contact
    {
        path: "contact",
        children: [
            { path: "", element: <Contact /> },
            { path: 'show/:id', element: <ShowContact /> },
            { path: 'reply/:id', element: <ReplyContact /> },
            { path: 'trash', element: <TrashContact /> },
        ]
    }
];

export default RouterBackend;
