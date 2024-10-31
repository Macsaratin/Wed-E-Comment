import httpAxios from "./HTTPaxios";

const BannerService = {
    getList: async () => {
        return await httpAxios.get('/banner');
    },
    getTrash: async () => {
        return await httpAxios.get('/banner/trash');
    },
    add: async (banner) => {
        const response = await httpAxios.post('/banner/store', banner);
        return response.data;
    },
    update: async (id, banner) => {
        return await httpAxios.post(`/banner/update/${id}`, banner);
    },
    show: async (id) => {
        return await httpAxios.get(`/banner/show/${id}`);
    },
}

export default BannerService;
