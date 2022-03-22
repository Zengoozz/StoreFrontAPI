//import app from "../../server";
import supertest from "supertest";
import app from "../../server";

describe("EndPoints", (): void => {
  const request = supertest(app);
  let token = "";

  it("Homepage endpoint response status", async (): Promise<void> => {
    const response = await request.get("/");
    expect(response.status).toEqual(300);
  });

  it("Product endpoint response status", async (): Promise<void> => {
    const response = await request.get("/products/");
    expect(response.status).toEqual(200);
  });

  it("Products by Category endpoint response status", async (): Promise<void> => {
    const response = await request.get("/Products/category/1");
    expect(response.status).toEqual(200);
  });

  it("User endpoint response status for Unauthenticated access", async (): Promise<void> => {
    const response = await request.get("/users/");
    expect(response.status).toEqual(401);
  });

  it("Order endpoint response status for Unauthenticated access", async (): Promise<void> => {
    const response = await request.get("/orders/");
    expect(response.status).toEqual(401);
  });

  it("Current Order endpoint response status for Unauthenticated access", async (): Promise<void> => {
    const response = await request.get("/currentOrder/1");
    expect(response.status).toEqual(401);
  });

  
});
