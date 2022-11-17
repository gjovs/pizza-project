CREATE DATABASE db_pizzaria;

USE db_pizzaria;

CREATE TABLE
    tbl_user (
        id int not null primary key auto_increment,
        name varchar(256) not null,
        email varchar(256) not null,
        phone varchar(13) not null,
        cellphone varchar(15) not null,
        profile_picture varchar(256),
        password varchar(256) not null,
        unique index(email, id)
    );

CREATE TABLE
    tbl_customer (
        id int not null primary key auto_increment,
        user_id int,
        constraint FK_user_costumer foreign key (user_id) references tbl_user (id)
    );

CREATE TABLE
    tbl_admin (
        id int not null primary key auto_increment,
        user_id int,
        constraint FK_user_admin foreign key (user_id) references tbl_user(id)
    );

CREATE TABLE
    tbl_product (
        id int not null primary key auto_increment,
        name varchar(256),
        price DECIMAL(10, 2) not null,
        created_by int,
        CONSTRAINT FK_admin_product foreign key (created_by) references tbl_admin (id),
        unique index(id)
    );

CREATE TABLE
    tbl_picture (
        id int not null primary key auto_increment,
        picture_link varchar(256),
        unique index(id)
    );

CREATE TABLE
    tbl_pizza_type (
        id int not null primary key auto_increment,
        name varchar(50) not null,
        dimensions varchar(20) not null,
        unique index(id)
    );

CREATE TABLE
    tbl_ingredient (
        id int not null primary key auto_increment,
        name varchar(30) not null,
        unique index(id)
    );

CREATE TABLE
    tbl_pizza (
        id int not null primary key auto_increment,
        product_id int,
        pizza_type int,
        CONSTRAINT FK_product_pizza foreign key (product_id) references tbl_product(id),
        CONSTRAINT FK_pizza_type_pizza foreign key (pizza_type) references tbl_pizza_type(id),
        unique index(id)
    );

CREATE TABLE
    tbl_stuffing (
        id int not null primary key auto_increment,
        name varchar(256),
        unique index(id)
    );

CREATE table
    tbl_pizza_ingredient (
        id int not null primary key auto_increment,
        ingredient_id int,
        pizza_id int,
        CONSTRAINT FK_ingredient_pizza_ingredient foreign key(ingredient_id) references tbl_ingredient(id),
        CONSTRAINT FK_pizza_pizza_ingredient foreign key(pizza_id) references tbl_pizza(id),
        unique index(id)
    );

CREATE table
    tbl_product_pictures (
        id int not null primary key auto_increment,
        product_id int,
        picture_id int,
        CONSTRAINT FK_picture_product_pictures foreign key (picture_id) references tbl_picture (id),
        CONSTRAINT FK_product_product_pictures foreign key (product_id) references tbl_product (id)
    );

CREATE TABLE
    tbl_pizza_stuffing (
        id int not null primary key auto_increment,
        pizza_id int,
        stuffing_id int,
        CONSTRAINT FK_pizza_pizza_stugging foreign key(pizza_id) references tbl_pizza(id),
        CONSTRAINT FK_stuffing_pizza_stugging foreign key(stuffing_id) references tbl_stuffing(id),
        unique index(id)
    );

CREATE TABLE
    tbl_drink_type (
        id int not null primary key auto_increment,
        name varchar(50) not null,
        unique index(id)
    );

CREATE TABLE
    tbl_drink (
        id int not null primary key auto_increment,
        product_id int,
        drink_type_id int,
        CONSTRAINT FK_product_drink foreign key(product_id) references tbl_product(id),
        CONSTRAINT FK_drink_type_drink foreign key (drink_type_id) references tbL_drink_type(id),
        unique index(id)
    );

CREATE TABLE
    tbl_message (
        id int not null primary key auto_increment,
        name varchar(256) not null,
        email varchar(256) not null,
        phone varchar(13) not null,
        cellphone varchar(15) not null,
        sugestao_critica varchar(100) not null,
        content TEXT not null,
        unique index(id)
    );