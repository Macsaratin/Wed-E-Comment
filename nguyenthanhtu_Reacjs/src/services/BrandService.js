import httpAxios from "./HTTPaxios";

const BrandService = {
    getList: async () => {
        return await httpAxios.get('/brand');
    },
    getTrash: async () => {
        return await httpAxios.get('/brand/trash');
    },
    add: async (brand) => {
        console.log('Data to be sent:', brand);
        const response = await httpAxios.post('brand/store', brand);
        console.log('Response from API:', response);
        return response.data;
    },
    update: async (id, brand) => {
        console.log('Data to be updated:', brand);  // Debug log
        return await httpAxios.post(`/brand/update/${id}`, brand);
    },
    show: async (id) => {
        return await httpAxios.get(`/brand/show/${id}`);
    },
}

export default BrandService;