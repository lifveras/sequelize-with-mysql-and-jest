const app = require("../server");
const supertest = require("supertest");

function testJsonHeader(response) {
    expect(response.header["content-type"])
        .toEqual(expect.stringContaining('json'));
}

describe('Post endpoints', () => {

    it('Should get a post by id', async () =>{
        const response = await supertest(app)
                               .get('/api/posts/8');
        expect(response.status).toBe(200);
        testJsonHeader(response);
        expect(response.body.post.title).toBeDefined();
        expect(response.body.post.content).toBeDefined();
        expect(response.body.post.userId).toBeDefined();
    })

    it('Should create a new post', async () => {
        const newPost = {
            title: "My Post",
            content: "Content of my post",
            userId: 1
        };
        const response = await supertest(app)
                              .post('/api/posts')
                              .send(newPost);
        testJsonHeader(response);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('post');
        expect(response.body.post.title).toBeDefined();
        expect(response.body.post.title).toEqual(newPost["title"]);
        expect(response.body.post.content).toBeDefined();
        expect(response.body.post.content).toEqual(newPost["content"]);
        expect(response.body.post.userId).toBeDefined();
        expect(response.body.post.userId).toEqual(newPost["userId"]);
    }),

    it('Getting a list of post', async () => {
        const response = await supertest(app)
                              .get('/api/posts');
        testJsonHeader(response);
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('posts');
        expect(response.body.posts).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    author: expect.any(Object),
                    comments: expect.any(Object),
                })
                // Se você quiser comparar valores específicos.
                // expect.objectContaining({id:1}),
                // expect.objectContaining({id:2})
            ])
        );
    }),

    it('Deleting a post', async () => {
        const response = await supertest(app)
                              .delete('/api/posts/18');
        expect(response.statusCode).toBe(204);
    })
});