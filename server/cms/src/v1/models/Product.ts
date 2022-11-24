export interface IProduct {
  name: string;
  price: number;
  owner_id: number;
  status_id: number | null;
}

export class Product {
  async save(): Promise<number> {
    return 1;
  }
  async show() {}

  async update() {}
  async delete() {}
  async index() {}

  async getPizzas() {}

  async getBebidas() {}
}
