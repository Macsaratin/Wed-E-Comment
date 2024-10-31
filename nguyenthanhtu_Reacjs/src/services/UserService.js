import httpAxios from "./HTTPaxios";

const UserService = {
    getList: async () => {
        return await httpAxios.post('/login');
    },
}

export default UserService;