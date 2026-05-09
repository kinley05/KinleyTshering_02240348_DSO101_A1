const request = require('supertest');
const { app } = require('../src/app');

describe('Todo API', () => {
  test('GET /todos returns array', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /todos adds a todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ task: 'Test task' });
    expect(res.statusCode).toBe(201);
    expect(res.body.task).toBe('Test task');
  });

  test('DELETE /todos/:id deletes a todo', async () => {
    const post = await request(app)
      .post('/todos')
      .send({ task: 'To be deleted' });
    const id = post.body.id;
    const res = await request(app).delete(`/todos/${id}`);
    expect(res.statusCode).toBe(200);
  });
});