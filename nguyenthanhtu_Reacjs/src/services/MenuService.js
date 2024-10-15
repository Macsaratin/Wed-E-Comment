import httpAxios from "./HTTPaxios";

const MenuService = {
    getList: async () => {
        return await httpAxios.get('/menu');
    }
}

export default MenuService;