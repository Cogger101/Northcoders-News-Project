const app = require('../app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index')

beforeEach(()=> seed(data))
afterAll(()=> db.end())

describe("/api/topics", () => {
    test('GET:200 sends an array of all topics', ()=>{
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response)=> {
            expect(response.body.topics.length).toBe(3)
            response.body.topics.forEach((topic)=>{
                expect(typeof topic.slug).toBe('string')
                expect(typeof topic.description).toBe('string')
            })
        })
    })
})