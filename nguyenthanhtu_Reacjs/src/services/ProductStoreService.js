import httpAxios from "./HTTPaxios";

const ProductStoreService = {
    getList: async () => {
        return await httpAxios.get('/productstore');
    }
}

export default ProductStoreService;