import Post from "../model/post.js";

export const createPost = async (request, response) => {
    try {
        if (!request.body.categories) {
            request.body.categories = 'All';
        }

        if (!request.body.picture) {
            request.body.picture = '';
        }

        const post = new Post(request.body);
        await post.save();

        return response.status(200).json({ msg: "Post Saved Successfully" });
    } catch (error) {
        return response.status(500).json({ error });
    }
};
