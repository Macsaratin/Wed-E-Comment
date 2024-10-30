import httpAxios from "./HTTPaxios";

const BannerService = {
    getList: async () => {
        return await httpAxios.get('/banner');
    },
    getTrash: async () => {
        return await httpAxios.get('/banner/trash');
    },

    // Thêm một banner mới
    add: async (banner) => {
        console.log('Data to be sent:', banner);
        const response = await httpAxios.post('/banner/store', banner);
        console.log('Response from API:', response);
        return response.data;
    },
    update: async (id, banner) => {
        console.log('Data to be updated:', banner);  // Debug log
        return await httpAxios.post(`banner/update/${id}`, banner);
    },
}

export default BannerService;