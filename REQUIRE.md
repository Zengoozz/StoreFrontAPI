
## API Endpoints
#### Products
- Index >> ("/Products/")
- Show >> ("/Products/:id")
- Create [token required] >> ("/Products/")
- Products by category (args: product category) >> ("/Products/category/:category")

#### Users
- Index [token required] >> ("/users/")
- Show [token required] >> ("/users/:id")
- Create >> ("/users/")

#### Orders
- Index [token required] >> ("/orders/")
- Show [token required] >> ("/orders/:id")
- Create N[token required] >> ("/orders/:user_id")
- AddProduct [token required] >> ("/orders/:id/products/")
- Current Order by user (args: user id)[token required] >> ("/currentOrder/:user_id")

## Data Shapes
#### Product
-  id >> Primary Key
- name >> VARCHAR
- price >> INTEGER
- category >> VARCHAR

#### User
- id >> Primary Key
- username >> VARCHAR
- firstName >> VARCHAR
- lastName >> VARCHAR
- password [hashing required] >> VARCHAR

#### Orders
- id >> Primary Key
- status >> VARCHAR
- user_id >> BIGINT Foreign key for users table

#### Products Join Orders
- id >> Primary Key 
- product_id >> BIGINT Foreign key for products table
- quantity >> INTEGER
- order_id >> BIGINT Foreign key for orders table

