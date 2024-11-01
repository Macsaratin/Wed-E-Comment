import httpAxios from "./HTTPaxios";

const PostService = {
    getList: async () => {
        return await httpAxios.get('/post');
    },
    getTrash: async () => {
        return await httpAxios.get('/post/trash');
    },
    show: async (id) => {
        return await httpAxios.get(`/post/show/${id}`);
    },
    update: async (id, post) => {
        console.log('Data to be post:', post);  // Debug log
        return await httpAxios.post(`/post/update/${id}`, post);
    },
    add: async (post) => {
        console.log('Data to be post:', post);  // Debug log
        return await httpAxios.post('/post/store', post);
    },
}

export default PostService;