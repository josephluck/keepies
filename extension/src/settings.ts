export interface App {
  url: string;
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

function getAll(): Promise<Settings> {
  return new Promise(resolve => {
    chrome.storage.sync.get(settingsKeys, items => {
      console.log(items);
      resolve(items as Settings);
    });
  });
}

export function getSettings(): Promise<Settings> {
  return getAll().then(async current => {
    if (!current.apps) {
      await setSetting("apps", []);
    }
    return await getAll();
  });
}
