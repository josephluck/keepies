export const ALARM_CAPTURE = "KEEPIE_CAPTURE";

interface Message extends Record<string, any> {
  name: string;
}

export function messageKeepieMade(): Message {
  return {
    name: "KEEPIE_MADE"
  };
}
