import { Product, ProductModel } from "../../model/productModel";

const model = new ProductModel();

describe("Product Model Test:", (): void => {
  it("Index method is existed.", (): void => {
    expect(model.index).toBeDefined();
  });

  it("Show method is existed.", (): void => {
    expect(model.show).toBeDefined();
  });

  it("Show by category method is existed.", (): void => {
    expect(model.showByCat).toBeDefined();
  });

  it("Create method is existed.", (): void => {
    expect(model.create).toBeDefined();
  });

  it("Create & Show methods functionality: created product and retrieved product names to be matched.", async (): Promise<void> => {
    const product: Product = {
      name: "p1",
      price: 20,
      category: "cag1",
    };
    const newProduct = await model.create(product);
    const listedProduct = await model.show(newProduct.id as number);

    expect(listedProduct.name).toEqual(product.name);
  });

  it("Index method functionality: listed products to be existed and indexed.", async (): Promise<void> => {
    const product: Product = {
      name: "p2",
      price: 20,
      category: "cag2",
    };
    const newProduct = await model.create(product);
    const listedProduct = await model.index();

    expect(listedProduct).toEqual([
      { id: 1, name: "p4", price: 20, category: "cag3" },
      { id: 2, name: "p1", price: 20, category: "cag1" },
      { id: 3, name: "p2", price: 20, category: "cag2" },
    ]);
  });

  it("Show by Category method functionality: listed product to be matched by asked category.", async (): Promise<void> => {
    const product: Product = {
      name: "p3",
      price: 20,
      category: "cag1",
    };
    const newProduct = await model.create(product);
    const listedProduct = await model.showByCat("cag1");

    expect(listedProduct).toEqual([
      { id: 2, name: "p1", price: 20, category: "cag1" },
      { id: 4, name: "p3", price: 20, category: "cag1" },
    ]);
  });
});
