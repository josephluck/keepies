import * as faker from "faker";
import { Models } from "./models";

function app(override: Partial<Models.App> = {}): Models.App {
  return {
    icon: faker.random.boolean()
      ? "http://ku.90sjimg.com/element_pic/00/16/10/0957f9e2e0d69ac.jpg"
      : null,
    name: faker.lorem.word(),
    origin: faker.internet.url(),
    ...override
  };
}

function emptyApp(): Models.App {
  return {
    name: "",
    origin: ""
  };
}

export const Fixtures = {
  app,
  emptyApp
};
