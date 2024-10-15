import Home from '../pages/frontend/home';
// import Banner from '../pages/frontend/home/banner';
import Product from '../pages/frontend/product/Product';
import Quickreview from '../pages/frontend/product/Quickreview';



const RouterFrontend = [
    { path: "/", element: <Home /> },
    { path: "products", element: <Product /> },
    { path: "quickreview", element: <Quickreview /> },

];

export default RouterFrontend;
