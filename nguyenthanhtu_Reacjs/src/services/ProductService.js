import httpAxios from "./HTTPaxios";

const ProductService = {
    getList: async () => {
        return await httpAxios.get('/product');
    },
    add: async (product) => {
        console.log('Data to be sent:', product);
        const response = await httpAxios.post('product/store', product);
        console.log('Response from API:', response);
        return response.data;
    },
    update: async (id, product) => {
        console.log('Data to be updated:', product);  // Debug log
        return await httpAxios.post(`product/update/${id}`, product);
    },
    getTrash: async () => {
        return await httpAxios.get('/product/trash');
    },
}

export default ProductService;