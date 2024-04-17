const app = require('../app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index')
const endpoints = require('../endpoints.json')

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
describe('/api', ()=>{
    test("GET: sends the object 'endpoints'",()=>{
      return request(app)
      .get('/api')
      .then((response)=>{
        expect(response.body.endpoints).toEqual(endpoints)
        })
    })
})
describe('/api/articles/:article_id',()=>{
  test('GET:200 sends back a specific article to the client',()=>{
    return request(app)
    .get('/api/articles/1')
    .expect(200)
    .then((response)=>{
      expect(typeof response.body.article.article_id).toBe('number')
      expect(typeof response.body.article.title).toBe("string")
      expect(typeof response.body.article.topic).toBe("string")
      expect(typeof response.body.article.author).toBe("string")
      expect(typeof response.body.article.body).toBe("string")
      expect(typeof response.body.article.created_at).toBe('string')
      expect(typeof response.body.article.votes).toBe('number')
      expect(typeof response.body.article.article_img_url).toBe("string")
    })
  })
  test('GET:404 send appropriate status and error message when given a valid but non-existent id',()=>{
    return request(app)
    .get('/api/articles/44')
    .expect(404)
    .then((response)=>{
      expect(response.body.msg).toBe('article does not exist')
    })
  })
  test('GET:400 sends an appropriate status and error message when given an invalid id',()=>{
    return request(app)
    .get('/api/articles/hello')
    .expect(400)
    .then((response)=>{
      expect(response.body.msg).toBe('Bad request')
    })
  })
})
describe('/api/articles',()=>{
  test('GET:200 sends an array of all article objects',()=>{
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then((response)=>{
      const body = response.body
      expect(body.articles.length).toBe(13)
      body.articles.forEach((article)=>{
        expect(typeof article.article_id).toBe('number')
        expect(typeof article.title).toBe("string")
        expect(typeof article.topic).toBe("string")
        expect(typeof article.author).toBe("string")
        expect(typeof article.created_at).toBe('string')
        expect(typeof article.votes).toBe('number')
        expect(typeof article.article_img_url).toBe("string")
      })
    })
  })
  test('GET:200 should return an array of article objects with comment_count added',()=>{
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then((response)=>{
      const body = response.body
      body.articles.forEach((article)=>{
        expect(typeof article.comment_count).toBe("string")
      })
    })
  })
  test('GET:200 should return all articles in descending order by date/created_at',()=>{
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then((response)=>{
      const body = response.body
        expect(body.articles).toBeSortedBy('created_at',{
          descending: true
      })
    })
  })
})