import React from "react";
import Banner from "./home/banner";
import Footer from "./home/footer";
import Header from "./home/header";
import Product from "./product/Product";
import ProductNew from "./product/Product_new";

const home = () => {
    return (
        <div>
            <Header />
            <div>
                <Banner />
            </div>
            <ProductNew />
            <Product />
            <Footer />
        </div>
    );
};
export default home;