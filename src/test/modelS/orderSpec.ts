import { OrderModel } from "../../model/orderModel";
import { DashboardQueries } from "../../model/dashboardQueries";
import { User, UserModel } from "../../model/userModel";
import { Product, ProductModel } from "../../model/productModel";

const dashboardQueries = new DashboardQueries();
const userModel = new UserModel();
const orderModel = new OrderModel();
const productModel = new ProductModel();

describe("Order Model & Dashboard Query Test:", (): void => {
  let newUser: User;
  let newProduct: Product;
  beforeAll(async () => {
    const user: User = {
      username: "u3",
      first_name: "first",
      last_name: "last",
      password: "pass",
    };
    newUser = await userModel.create(user);
    const product: Product = {
        name: "p4",
        price: 20,
        category: "cag3",
    };
    newProduct = await productModel.create(product);
  });
  it("Index method is existed.", () => {
    expect(orderModel.index).toBeDefined();
  });

  it("Show method is existed.", (): void => {
    expect(orderModel.show).toBeDefined();
  });

  it("Create method is existed.", (): void => {
    expect(orderModel.create).toBeDefined();
  });

  it("AddProduct method is existed.", (): void => {
    expect(orderModel.addProduct).toBeDefined();
  })  

  it("Create, Show & AddProduct methods functionality: created and showed user ids of orders to be matched before and after adding product.", async (): Promise<void> => {
    const status = "open";
    const quantity = 20;

    const newOrder = await orderModel.create(status, Number(newUser.id));
    const listedOrder = await orderModel.show(newOrder.id as number);
    const addedProduct = await orderModel.addProduct(Number(newProduct.id),Number(newOrder.id),quantity)

    expect(listedOrder.user_id).toEqual(String(newUser.id));
    expect(Number(addedProduct.order_id)).toEqual(Number(listedOrder.id))
  });

  it("Index method functionality: listed order to be matched by user id.", async (): Promise<void> => {
    
    const listedOrder = await orderModel.index();

    expect(listedOrder[0].user_id).toEqual(String(newUser.id));
  });

  it("Dashboard..Current Order by User method: Should retrieve the open orders with same user id as given to.", async (): Promise<void> => {
    
    const currentOrder = await dashboardQueries.currentOrderByUser(Number(newUser.id));

    expect(currentOrder.user_id).toEqual(String(newUser.id));
    expect(currentOrder.status).toEqual('open');
  });
});
