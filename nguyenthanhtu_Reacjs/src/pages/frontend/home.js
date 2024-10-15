import React from "react";
import Banner from "./home/banner";
import Footer from "./home/footer";
import Header from "./home/header";
import Product from "./product/Product";

const home = () => {
    return (
        <div>
            <Header />
            <div>
                <Banner />
            </div>
            <Product />
            <Footer />
        </div>
    );
};
export default home;