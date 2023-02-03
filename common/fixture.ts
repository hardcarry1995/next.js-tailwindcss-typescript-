import { faker } from "@faker-js/faker";
import { IItem } from "./types";

const _createRandomItem = (): IItem => {
  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.animals(),
    price: parseFloat(faker.commerce.price(0, 1000, 2)),
  };
};

export const items: IItem[] = [
  _createRandomItem(),
  _createRandomItem(),
  _createRandomItem(),
  _createRandomItem(),
  _createRandomItem(),
  _createRandomItem(),
  _createRandomItem(),
  _createRandomItem(),
  _createRandomItem(),
  _createRandomItem(),
];
