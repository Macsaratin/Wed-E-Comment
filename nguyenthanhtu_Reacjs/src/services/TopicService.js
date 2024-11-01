import httpAxios from "./HTTPaxios";

const TopicService = {
    getList: async () => {
        return await httpAxios.get('/topic');
    },
    getTrash: async () => {
        return await httpAxios.get('/topic/trash');
    },
    show: async (id) => {
        return await httpAxios.get(`/topic/show/${id}`);
    },
    update: async (id, topic) => {
        console.log('Data to be topic:', topic);  // Debug log
        return await httpAxios.post(`/topic/update/${id}`, topic);
    },
    add: async (topic) => {
        console.log('Data to be topic:', topic);  // Debug log
        return await httpAxios.post('/topic/store', topic);
    },
}

export default TopicService;