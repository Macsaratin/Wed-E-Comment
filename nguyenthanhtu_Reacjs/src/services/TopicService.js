import httpAxios from "./HTTPaxios";

const TopicService = {
    getList: async () => {
        return await httpAxios.get('/topic');
    }
}

export default TopicService;