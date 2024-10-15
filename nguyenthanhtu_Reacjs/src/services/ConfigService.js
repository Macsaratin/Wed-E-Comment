import httpAxios from "./HTTPaxios";

const ConfigService = {
    getList: async () => {
        return await httpAxios.get('/config');
    }
}

export default ConfigService;