import express from "express";
import { isAuthenticated } from "../middlewares/authenticate";
import { ProductModel, Product } from "../model/productModel";

const model = new ProductModel();

const productRoutes = (app: express.Application): void => {
  app.get("/products/", index),
    app.get("/products/:id", show),
    app.get("/products/category/:category", showByCat);
  app.post("/products/", isAuthenticated, create);
};

const index = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const products = await model.index();
    res.json(products);
  } catch (err) {
    res.json(err);
  }
};

const show = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const product = await model.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.json(
      `No existed product found with id: ${req.params.id}. Error: ${err}`
    );
  }
};

const showByCat = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const products = await model.showByCat(req.params.category);
  res.json(products);
};

const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const newProduct = await model.create(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default productRoutes;
