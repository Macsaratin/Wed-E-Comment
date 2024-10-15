import httpAxios from "./HTTPaxios";

const OrderService = {
    getList: async () => {
        return await httpAxios.get('/order');
    }
}

export default OrderService;