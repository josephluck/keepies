import * as faker from "faker";
import { Models } from "./models";
import { addMinutes } from "date-fns";

function app(override: Partial<Models.App> = {}): Models.App {
  return {
    icon: faker.random.boolean()
      ? "http://ku.90sjimg.com/element_pic/00/16/10/0957f9e2e0d69ac.jpg"
      : null,
    name: faker.lorem.word(),
    origin: faker.internet.url(),
    lastKeepieOn: faker.date.past().getTime(),
    nextKeepieDue: faker.date.future().getTime(),
    ...override
  };
}

function emptyApp(): Models.App {
  return {
    name: "",
    origin: "",
    lastKeepieOn: Date.now(),
    nextKeepieDue: nextKeepieDue()
  };
}

function nextKeepieDue(): number {
  return addMinutes(new Date(), 1).getTime();
}

export const Fixtures = {
  app,
  emptyApp,
  nextKeepieDue
};
