const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const People = require('../lib/model/People.js');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a person using POST on people', () => {
    return request(app)
      .post('/api/v1/peoples')
      .send({ name: 'Tom', age: 23, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pz0QzVkjFhBPzsy2OtPbfhedmBAmaq-xeg&usqp=CAU', snap: 'TomSnap', phone: '503-503-5031', insta: 'coolTom' })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Tom',
          age: 23,
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pz0QzVkjFhBPzsy2OtPbfhedmBAmaq-xeg&usqp=CAU',
          snap: 'TomSnap',
          phone: '503-503-5031',
          insta: 'coolTom',
      });
    });
  });

  it('get a list of people from table people using GET', async() => {
    const people = await Promise.all([
      People.insert({ name: 'Madie', age: 25, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pz0QzVkjFhBPzsy2OtPbfhedmBAmaq-xeg&usqp=CAU', snap: null, phone: null, insta: null}),
      People.insert({ name: 'Jade', age: 23, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pz0QzVkjFhBPzsy2OtPbfhedmBAmaq-xeg&usqp=CAU', snap: 'JadeIsCool', phone: null, insta: null}),
      People.insert({ name: 'E', age: 24, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pz0QzVkjFhBPzsy2OtPbfhedmBAmaq-xeg&usqp=CAU', snap: null, phone: null, insta: 'EIsTheBest'}),
    ]);

    return request(app)
      .get('/api/v1/peoples')
      .then((res) => {
        expect(res.body).toEqual(expect.arrayContaining(people))
      })
  })

  it('delets a person from people table using DELETE', async() => {
    const people = await Promise.all([
      People.insert({ name: 'Madie', age: 25, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pz0QzVkjFhBPzsy2OtPbfhedmBAmaq-xeg&usqp=CAU', snap: null, phone: null, insta: null}),
      People.insert({ name: 'Jade', age: 23, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pz0QzVkjFhBPzsy2OtPbfhedmBAmaq-xeg&usqp=CAU', snap: 'JadeIsCool', phone: null, insta: null}),
      People.insert({ name: 'E', age: 24, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0pz0QzVkjFhBPzsy2OtPbfhedmBAmaq-xeg&usqp=CAU', snap: null, phone: null, insta: 'EIsTheBest'}),
    ]);
    return request(app)
      .delete('/api/v1/peoples/madie')
      .then((res) => {
        expect(res.body).toEqual([])
      })
  })
});
