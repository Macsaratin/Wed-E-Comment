import httpAxios from "./HTTPaxios";

const ProductSaleService = {
    getList: async () => {
        return await httpAxios.get('/productsale');
    },
    show: async (id) => {
        return await httpAxios.get(`/productsale/show/${id}`);
    },
    add: async () => {
        return await httpAxios.post('/productsale/store');
    },
    update: async (id) => {
        return await httpAxios.post(`/productsale/update/${id}`);
    },
}

export default ProductSaleService;