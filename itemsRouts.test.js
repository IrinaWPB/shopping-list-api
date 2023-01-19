process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require('./app');
const items = require('./fakeDB');

let newItem = { name: "Milk", price: "$2.99" };

beforeEach(() => {
    items.push(newItem);
});

afterEach(() => {
    items.length = 0; //empty the items array
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ items : [newItem]});
    });
});

describe("Post /items", () => {
    test("Add a new item", async () => {
        const res = await request(app)
        .post("/items")
        .send({name : "Soda", price: "$1.99"});
        expect(res.status).toBe(201);
        expect(res.body).toEqual({ item : {
            name : "Soda",
            price : "$1.99"
        }});
    });
});

describe("GET /items/:name", function() {
    test("Gets a single item", async function() {
      const res = await request(app)
      .get(`/items/${newItem.name}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ item: newItem });
    });
  
    test("Responds with 404 if can't find item", async function() {
      const res = await request(app).get(`/items/bwrbw`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ error : {message: "Item not found",
                                 status: 404}});
    });
  });

describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
        const res = await request(app)
        .patch(`/items/${newItem.name}`)
        .send({
          name: "Milk",
          price: "$3.99"
        });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
        item: { name: "Milk", price: "$3.99" }
      });
    });
    test("Responds with 404 if item invalid", async function() {
        const res = await request(app)
        .patch(`/items/0`);
        // expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error : {message: "Item not found",
        status: 404}});
    });
  });

describe("DELETE /items/:name", function() {
    test("Deletes a single a cat", async function() {
        const res = await request(app).delete(`/items/${newItem.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
    });
});
 
