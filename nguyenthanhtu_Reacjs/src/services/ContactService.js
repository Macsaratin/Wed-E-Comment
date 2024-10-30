import httpAxios from "./HTTPaxios";

const ContactService = {
    getList: async () => {
        return await httpAxios.get('/contact');
    },
    postMess: async (id, contact) => {
        return await httpAxios.post(`/contact/reply/${id}`, contact);
    },
}

export default ContactService;