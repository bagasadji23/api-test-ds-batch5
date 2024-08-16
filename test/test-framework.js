const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs');

const assert = chai.assert
const should = chai.should


describe('API Test for "restful-api.dev"', () => {
    const LINK_URL = "https://api.restful-api.dev/"
    it('Test - Get All objects', async () => {
        const response = await request(LINK_URL)
        .get("objects")
        //console.log(response.statusCode);
        //console.log(response.body);

        //assertion
        assert.equal(response.statusCode, 200)
        assert.equal(response.body[0].name, "Google Pixel 6 Pro")
        assert.equal(response.body[0].data.color, "Cloudy White")  
    });

    it('Test - Post Store Object', async () => {
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
               "year": 2019,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB"
            }
         }
        const response = await request(LINK_URL)
        .post("objects")
        .send(body)

        //console.log(response.statusCode);
        //console.log(response.body);

        //assertion
        should(response.statusCode == 201)
        
        const schemaPath = "resources/jsonSchema/post-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)

    });
});
