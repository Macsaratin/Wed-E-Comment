import httpAxios from "./HTTPaxios";

const PostService = {
    getList: async () => {
        return await httpAxios.get('/post');
    }
}

export default PostService;