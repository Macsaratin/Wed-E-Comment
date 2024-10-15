import httpAxios from "./HTTPaxios";

const ContactService = {
    getList: async () => {
        return await httpAxios.get('/contact');
    }
}

export default ContactService;