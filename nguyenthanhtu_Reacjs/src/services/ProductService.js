import httpAxios from "./HTTPaxios";

const ProductService = {
    getList: async () => {
        return await httpAxios.get('/product');
    },
    add: async (product) => {
        console.log('Data to be sent:', product);
        const response = await httpAxios.post('/product/store', product);
        console.log('Response from API:', response);
        return response.data;
    },
    update: async (id, product) => {
        console.log('Data to be sent:', product);
        const response = await httpAxios.post(`/product/update/${id}`, product);
        console.log('Response from API:', response);
        return response.data;
    },

    show: async (id, product) => {
        console.log('Data to be show:', product);
        return await httpAxios.get(`/product/show/${id}`, product);
    },
    getTrash: async () => {
        return await httpAxios.get('/product/trash');
    },
    delete: async (id) => {
        try {
            return await httpAxios.delete(`/product/destroy/${id}`);
        } catch (error) {
            console.error(`Error deleting product with ID ${id}:`, error);
            throw error;
        }
    },
    restore: async (id) => {
        try {
            return await httpAxios.post(`/product/restore/${id}`);
        } catch (error) {
            console.error(`Error restoring product with ID ${id}:`, error);
            throw error;
        }
    },
    getDeleted: async (id) => {
        try {
            return await httpAxios.get(`/product/delete/${id}`);
        } catch (error) {
            console.error("Error fetching deleted product list:", error);
            throw error;
        }
    },
    product_new: async () => {
        try {
            return await httpAxios.get(`/products`);
        } catch (error) {
            console.error("Error fetching new products:", error);
            throw error;
        }
    },
    getOrder: async (id, product) => {
        try {
            const response = await httpAxios.post(`/product/cart-list`, product);
            return response.data;
        } catch (error) {
            console.error(`Error showing product with ID ${id}:`, error);
            throw error;
        }
    },
}
export default ProductService;
