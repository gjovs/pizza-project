export interface IPizza {
  product_id: number;
  pizza_type_id: number;
  stuffing_id: number;
}

export interface IPizzaType {}

export interface IStuffing {}

export class Pizza {
  async save() {}
  async index() {}
  async show() {}
  async update() {}
  async delete() {}

  /*TYPES*/
  async savePizzaTypes() {}

  async getPizzaTypes() {}

  async updatePizzaTypes() {}

  async deletePizzaTypes() {}

  /*STUFFINGS*/
  async savePizzaStuffing() {}

  async getPizzaStuffing() {}

  async updatePizzaStuffing() {}

  async deletePizzaStuffing() {}
}
