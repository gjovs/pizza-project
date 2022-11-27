import User from "../User";
import Product from "../Product";
import { Decimal } from "@prisma/client/runtime";
import Pizza from "../Pizza";
import PizzaRecheio from "../PizzaRecheio";
import util from "util";
import Promocao from "../Promocao";
import Bebida from "../Bebida";

const LOG_OPTIONS = { showHidden: false, depth: null, colors: true };

const testUser = async () => {
  console.table(await User.index());

  const userId = await User.save({
    id: -1,
    profile_picture: "",
    name: "Joao",
    email: "joao@gmail.com",
    cellphone: "11985728938",
    isAdmin: false,
    password: "123",
  });

  console.table(await User.show(userId));

  await User.update({
    id: userId,
    profile_picture: "",
    name: "Joao",
    email: "joaoEmailAtualizado@gmail.com",
    cellphone: "11985728938",
    isAdmin: false,
    password: "123",
  });

  console.table(await User.show(userId));

  const products = await User.getUserProducts(1);

  console.log(products[0].product);

  await User.delete(userId);

  console.log(await User.show(userId));
};

// testUser();

const testProduct = async () => {
  const users = await User.index();

  console.log(await Product.index());

  const productId = await Product.save({
    id: -1,
    created_by: users[0].id,
    likes: 0,
    price: new Decimal(12.99),
    name: "Chá Preto",
  });

  console.log(await Product.show(productId));

  await Product.update({
    id: productId,
    price: new Decimal(14.99),
    created_by: users[0].id,
    name: "Chá Preto",
    likes: 0,
  });

  console.log(await Product.show(productId));

  await Promocao.save({
    id: -1,
    product_id: productId,
    off_value: new Decimal(20),
  });

  console.log("ADDING SALE_OFF", Promocao.index());

  await Product.delete(productId);

  console.log("delete", await Product.show(productId));
};

// testProduct();

const testPizza = async () => {
  console.log(await Pizza.index());

  const pizzaTypes = await Pizza.getPizzaTypes();

  const recheios = await PizzaRecheio.index();

  const tipo = pizzaTypes[0].name;
  const recheio = recheios[0].name;

  const pizzaName = recheio + " " + tipo;

  const productId = await Product.save({
    id: -1,
    created_by: 1,
    likes: 0,
    name: pizzaName,
    price: new Decimal(25.99),
  });

  await Promocao.save({
    id: -1,
    off_value: new Decimal(10),
    product_id: productId,
  });

  const pizza = await Pizza.save({
    id: -1,
    pizza_type_id: pizzaTypes[0].id,
    product_id: productId,
  });

  await PizzaRecheio.savePizzaWithStuffing({
    id: -1,
    pizza_id: pizza.id,
    stuffing_id: recheios[0].id,
  });

  console.log("Pizzas em Promocão", await Promocao.getSaleOffPizzas());

  console.log(util.inspect(await Pizza.index(), LOG_OPTIONS));

  console.log(util.inspect(await Pizza.show(pizza.id), LOG_OPTIONS));

  await Pizza.delete(pizza.id);
};
// testPizza();

const testDrinks = async () => {
  console.log("Tipos de bebidas", await Bebida.getBebidaTypes());

  const productId = await Product.save({
    id: -1,
    created_by: 2,
    likes: 0,
    name: "Chá Preto",
    price: new Decimal(5.99),
  });

  const bebida = await Bebida.save({
    id: -1,
    product_id: productId,
    volume: 250,
    drink_type_id: 2,
  });

  console.log(await Bebida.show(bebida.id));

  await Bebida.update({
    id: bebida.id,
    volume: 500,
    drink_type_id: bebida.drink_type_id,
    product_id: bebida.product_id,
  });

  console.log("updated", await Bebida.show(bebida.id));

  await Bebida.delete(bebida.id);

  console.log("deleted", await Bebida.show(bebida.id));
};

// testDrinks();
