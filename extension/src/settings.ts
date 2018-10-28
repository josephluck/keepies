import * as urlParse from "url-parse";

export interface App {
  origin: string;
}

export type SettingsKeys = "apps";

export interface Settings extends Record<SettingsKeys, any> {
  apps: App[];
}

const settingsKeys: SettingsKeys[] = ["apps"];

export function setSetting<K extends SettingsKeys>(key: K, value: Settings[K]) {
  return new Promise(resolve => {
    chrome.storage.sync.set(
      {
        [key]: value
      },
      resolve
    );
  });
}

function getAllSettings(): Promise<Settings> {
  return new Promise(resolve => {
    chrome.storage.sync.get(settingsKeys, settings => {
      console.log({ settings });
      resolve(settings as Settings);
    });
  });
}

export async function getSettings(): Promise<Settings> {
  const current = await getAllSettings();
  if (!current.apps) {
    await setSetting("apps", []);
  }
  return await getAllSettings();
}

export async function storeApp(url: string): Promise<Settings> {
  const current = await getAllSettings();
  const origin = urlParse(url, {}).origin;
  await setSetting("apps", [...current.apps, { origin: origin }]);
  return await getAllSettings();
}

export async function removeApp(app: App): Promise<Settings> {
  const current = await getAllSettings();
  await setSetting("apps", current.apps.filter(a => a.origin !== app.origin));
  return await getAllSettings();
}
