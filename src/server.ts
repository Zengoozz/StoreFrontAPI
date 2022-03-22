import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./handler/productHandler";
import userRoutes from "./handler/userHandler";
import orderRoutes from "./handler/orderHandler";
import dashboardRoutes from "./handler/dashboardHandler";

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req: express.Request, res: express.Response): void => {
  res.status(300).send(`Please choose one of the following services:
    http://localhost:3000/products/,
    http://localhost:3000/users/,
    http://localhost:3000/orders/`);
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.listen(port, (): void => {
  console.log(`app's running at http://localhost: ${port}`);
});

export default app;
