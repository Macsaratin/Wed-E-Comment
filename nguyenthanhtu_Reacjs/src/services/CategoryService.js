import httpAxios from "./HTTPaxios";

const CategoryService = {
    getList: async () => {
        return await httpAxios.get('/category');
    },
    getTrash: async () => {
        return await httpAxios.get('/category/trash');
    },
    add: async (category) => {
        console.log('Data to be sent:', category);
        const response = await httpAxios.post('category/store', category);
        console.log('Response from API:', response);
        return response.data;
    },
    update: async (id, category) => {
        console.log('Data to be updated:', category);  // Debug log
        return await httpAxios.post(`category/update/${id}`, category);
    },
}

export default CategoryService;