import Cart from '../pages/frontend/cart/CartMenu';
import Contact from '../pages/frontend/contact/Contact';
import Home from '../pages/frontend/home';
import About from '../pages/frontend/home/AboutUs';
import Login from '../pages/frontend/login/Login';
import Product from '../pages/frontend/product/Product';
import ProductNew from '../pages/frontend/product/Product_new';
import ProductSale from '../pages/frontend/product/Product_sale';
import ProductDetail from '../pages/frontend/product/ProductDeltail';

const RouterFrontend = [
    { path: "/", element: <Home /> },
    {
        path: "/products/",
        children: [
            { path: "", element: <Product /> },
            { path: ":id", element: <ProductDetail /> },
        ]
    },
    {
        path: "/new/",
        children: [
            { path: "", element: <ProductNew /> },
            { path: ":id", element: <ProductDetail /> },
        ]
    },
    {
        path: "/sale", // Thêm dấu "/" ở đầu đường dẫn
        element: <ProductSale />
    },
    {
        path: "/cart", // Thêm dấu "/" ở đầu đường dẫn
        element: <Cart />
    },
    {
        path: "/contact", // Thêm dấu "/" ở đầu đường dẫn
        element: <Contact />
    },
    {
        path: "/login", // Thêm đường dẫn cho trang Login
        element: <Login />
    },
    {
        path: "/about", // Thêm đường dẫn cho trang Giới Thiệu
        element: <About />
    },
];

export default RouterFrontend;
