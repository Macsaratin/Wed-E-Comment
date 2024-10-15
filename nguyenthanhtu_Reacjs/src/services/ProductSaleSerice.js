import httpAxios from "./HTTPaxios";

const ProductSaleService = {
    getList: async () => {
        return await httpAxios.get('/productsale');
    }
}

export default ProductSaleService;