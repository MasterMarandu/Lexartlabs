DROP TABLE  ProductoData;

DROP TABLE  Producto;

DROP TABLE  user_roles;

DROP TABLE  Roles;

DROP TABLE  Users;



CREATE TABLE Producto (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL
);

CREATE TABLE ProductoData (
    id SERIAL PRIMARY KEY,
    price DOUBLE PRECISION NOT NULL,
    color VARCHAR(50) NOT NULL,
    producto_id BIGINT,
    CONSTRAINT fk_producto FOREIGN KEY (producto_id) REFERENCES Producto(id) ON DELETE CASCADE
);

CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE user_roles (
    user_id BIGINT,
    role_id BIGINT,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE
);


INSERT INTO Roles (name) VALUES ('ROLE_ADMIN');
INSERT INTO Roles (name) VALUES ('ROLE_USER');


INSERT INTO Users (username, password) VALUES ('admin', '$2a$10$aIZH072mVsHAg9DPk4xqtOQA6IJicGCcKV73GmukMTayiKV7aTZiu');
INSERT INTO Users (username, password) VALUES ('user', '$2a$10$aIZH072mVsHAg9DPk4xqtOQA6IJicGCcKV73GmukMTayiKV7aTZiu1');


INSERT INTO user_roles (user_id, role_id) VALUES (1, 1); -- Admin con ROLE_ADMIN
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2); -- User con ROLE_USER

INSERT INTO Producto (name, brand, model) VALUES ('Xiaomi Redmi 9', 'Xiaomi', 'Redmi 9');
INSERT INTO Producto (name, brand, model) VALUES ('Iphone 14 Pro', 'Iphone', '14 Pro');

INSERT INTO ProductoData (price, color, producto_id) VALUES (10000, 'red', 1); -- Xiaomi Redmi 9
INSERT INTO ProductoData (price, color, producto_id) VALUES (10000, 'blue', 1); -- Xiaomi Redmi 9
INSERT INTO ProductoData (price, color, producto_id) VALUES (30000, 'silver', 2); -- Iphone 14 Pro
INSERT INTO ProductoData (price, color, producto_id) VALUES (30100, 'gold', 2); -- Iphone 14 Pro
