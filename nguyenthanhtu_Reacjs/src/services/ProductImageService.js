import httpAxios from "./HTTPaxios";

const ProductImageService = {
    getList: async () => {
        return await httpAxios.get('/productimage');
    }
}

export default ProductImageService;