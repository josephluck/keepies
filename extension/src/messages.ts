export const ALARM_POLL = "KEEPIE_KEEPIE";

interface Message extends Record<string, any> {
  name: string;
}

export function messageKeepieMade(): Message {
  return {
    name: "KEEPIE_MADE"
  };
}

export function messageRequestKeepie(): Message {
  return {
    name: "REQUEST_KEEPIE"
  };
}

export function messageActiveTabChanged(): Message {
  return {
    name: "ACTIVE_TAB_CHANGED"
  };
}
