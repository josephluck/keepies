import * as urlParse from "url-parse";
import { Models } from "./models";
import { Fixtures } from "./fixtures";

const settingsKeys: Models.SettingsKeys[] = ["apps"];

export function setSetting<K extends Models.SettingsKeys>(
  key: K,
  value: Models.Settings[K]
) {
  return new Promise(resolve => {
    chrome.storage.sync.set(
      {
        [key]: value
      },
      resolve
    );
  });
}

function getAllSettings(): Promise<Models.Settings> {
  return new Promise(resolve => {
    chrome.storage.sync.get(settingsKeys, settings => {
      console.log({ settings });
      resolve(settings as Models.Settings);
    });
  });
}

export async function getSettings(): Promise<Models.Settings> {
  const current = await getAllSettings();
  if (!current.apps) {
    await setSetting("apps", []);
  }
  return await getAllSettings();
}

export async function storeApp(
  app: Partial<Models.App>
): Promise<Models.Settings> {
  const current = await getAllSettings();
  const origin = urlParse(app.origin, {}).origin;
  await setSetting("apps", [
    ...current.apps,
    {
      ...Fixtures.emptyApp(),
      ...app,
      origin
    }
  ]);
  return await getAllSettings();
}

export async function removeApp(app: Models.App): Promise<Models.Settings> {
  const current = await getAllSettings();
  await setSetting("apps", current.apps.filter(a => a.origin !== app.origin));
  return await getAllSettings();
}
