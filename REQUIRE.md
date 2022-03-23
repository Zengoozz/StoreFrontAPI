
## API Endpoints
#### Products
- Index >> ("/Products/") [GET REQUEST]
- Show >> ("/Products/:id") [GET REQUEST]
- Create [token required] >> ("/Products/") [POST REQUEST]
- Products by category (args: product category) >> ("/Products/category/:category") [GET REQUEST]

#### Users
- Index [token required] >> ("/users/") [GET REQUEST]
- Show [token required] >> ("/users/:id") [GET REQUEST]
- Create >> ("/users/") [POST REQUEST]

#### Orders
- Index [token required] >> ("/orders/") [GET REQUEST]
- Show [token required] >> ("/orders/:id") [GET REQUEST]
- Create N[token required] >> ("/orders/:user_id") [POST REQUEST]
- AddProduct [token required] >> ("/orders/:id/products/") [POST REQUEST]
- Current Order by user (args: user id)[token required] >> ("/currentOrder/:user_id") [GET REQUEST]

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

