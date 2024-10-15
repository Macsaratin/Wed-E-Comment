import httpAxios from "./HTTPaxios";

const OrderDetailService = {
    getList: async () => {
        return await httpAxios.get('/orderDetail');
    }
}

export default OrderDetailService;