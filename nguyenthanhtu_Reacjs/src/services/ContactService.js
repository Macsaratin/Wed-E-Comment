import httpAxios from "./HTTPaxios";

const ContactService = {
    getList: async () => {
        return await httpAxios.get('/contact');
    },
    postMess: async (contact) => {
        return await httpAxios.post(`/contact/store`, contact);
    },
    show: async (id) => {
        return await httpAxios.get(`/contact/show/${id}`);
    },
    reply: async (id, content) => {
        return await httpAxios.post(`/contact/reply/${id}`, content);
    },
    getTrash: async () => {
        return await httpAxios.get('/contact/trash');
    },

}

export default ContactService;