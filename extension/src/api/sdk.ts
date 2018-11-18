import * as urlParse from "url-parse";
import { Models } from "./models";
import { Fixtures } from "./fixtures";

const settingsKeys: Models.SettingsKeys[] = ["apps"];

export function setSetting<K extends Models.SettingsKeys>(
  key: K,
  value: Models.Settings[K]
) {
  console.log("Storing setting", { key, value });
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
      console.log("Retrieved settings", { settings });
      resolve(settings as Models.Settings);
    });
  });
}

export async function getSettings(): Promise<Models.Settings> {
  const current = await getAllSettings();
  if (!current.apps) {
    await setSetting("apps", []);
    return await getAllSettings();
  }
  return current;
}

export async function storeApp(
  app: Partial<Models.App>
): Promise<Models.Settings> {
  const current = await getAllSettings();
  const origin = urlParse(app.origin, {}).origin;
  const appToStore: Models.App = {
    ...Fixtures.emptyApp(),
    ...app,
    origin
  };
  await setSetting("apps", [...current.apps, appToStore]);
  const settings = await getAllSettings();
  console.log("Stored app", { app: appToStore, settings });
  return settings;
}

export async function removeApp(app: Models.App): Promise<Models.Settings> {
  const current = await getAllSettings();
  await setSetting("apps", current.apps.filter(a => a.origin !== app.origin));
  const settings = await getAllSettings();
  console.log("Removed app", { app, settings });
  return settings;
}
