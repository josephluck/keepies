export namespace Models {
  export interface App {
    icon?: string;
    name: string;
    origin: string;
  }

  export type SettingsKeys = "apps";

  export interface Settings extends Record<SettingsKeys, any> {
    apps: Models.App[];
  }
}
