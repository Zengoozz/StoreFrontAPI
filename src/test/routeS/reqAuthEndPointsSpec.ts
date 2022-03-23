import request from "supertest";
import express from "express";
import userRoutes from "../../handler/userHandler";
import productRoutes from "../../handler/productHandler";
import orderRoutes from "../../handler/orderHandler";
import dashboardRoutes from "../../handler/dashboardHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

userRoutes(app);
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.listen(5000);

describe("Authentication Test", () => {
  let token = "";
  const user = {
    username: "user44",
    first_name: "last",
    last_name: "first",
    password: "156",
  };
  it("create user with no authentication required", (done: (
    e?: string
  ) => void) => {
    request(app)
      .post("/users/")
      .send(user)
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        if (typeof res.body === "string") {
          token = res.body;
          done();
        } else {
          done("failed to sign in");
        }
      })
      .catch((err) => {
        done(err);
      });
  });

  it("create product with authenticated access", (done: (
    e?: string
  ) => void) => {
    request(app)
      .post("/products/")
      .send({
        name: "name",
        price: 20,
        category: "cag3",
      })
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("create order and add Product to it with authenticated access", (done: (
    e?: string
  ) => void) => {
    request(app)
      .post("/orders/1")
      .send({
        status: "open",
      })
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        request(app)
          .post(`/orders/${res.body.id}/products/`)
          .send({
            product_id: 1,
            quantity: 20,
          })
          .set("Accept", "application/json")
          .set("Authorization", "Bearer " + token)
          .expect("Content-Type", /json/)
          .expect(201)
          .then((res) => {
            done();
          })
          .catch((err) => {
            done(err);
          });
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Users/index retrieving status response with authenticated access", (): void => {
    request(app)
      .get("/users/")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(200);
  });

  it("Orders/index retrieving status response with authenticated access", (): void => {
    request(app)
      .get("/orders/")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(200);
  });

  it("User/show retrieving status response with authenticated access", (): void => {
    request(app)
      .get("/users/1")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(200);
  });

  it("Order/show retrieving with authenticated access", (): void => {
    request(app)
      .get("/orders/1")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(200);
  });

  it("Current Order retrieving with authenticated access", (): void => {
    request(app)
      .get("/currentOrder/1")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(200);
  });
});
