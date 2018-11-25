import * as urlParse from "url-parse";
import { Models } from "./models";
import { Fixtures } from "./fixtures";
import { env } from "../env";

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
    chrome.storage.sync.get(null, settings => {
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

// NB: this should first check if there's a GitHub token in settings
export async function authenticateWithGitHub(): Promise<string> {
  const CALLBACK_URL = chrome.identity.getRedirectURL(); // NB: https://developer.chrome.com/apps/identity#method-launchWebAuthFlow
  const GITHUB_OAUTH_APP_ID = env.GITHUB_OAUTH_APP_ID; // NB: this is the github app client id available here: https://github.com/settings/applications/938404
  const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize/?client_id=${GITHUB_OAUTH_APP_ID}&redirect_uri=${encodeURIComponent(
    CALLBACK_URL
  )}&scope=repo`;

  return new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      {
        url: GITHUB_AUTH_URL,
        interactive: true
      },
      async redirectURL => {
        const query = redirectURL.substr(redirectURL.indexOf("#") + 1);
        const parts = query.split("&");
        const accessTokenQueryString = parts.find(part => {
          const kv = part.split("=");
          return kv[0] === "access_token";
        });
        if (accessTokenQueryString) {
          const token = accessTokenQueryString.split("=")[1];
          if (token) {
            await setSetting("gitHubToken", token);
          }
          resolve(token);
        } else {
          reject("GitHub authentication failed");
        }
      }
    );
  }) as any;
}

export async function getGitHubRepositories(
  gitHubToken: string
): Promise<Models.Repository[]> {
  console.log("Should fetch github repositories with", { gitHubToken });
  const request = await fetch("https://api.github.com/user/repos", {
    method: "GET",
    headers: new Headers({
      Authorization: `token ${gitHubToken}`
    })
  });
  const response = await request.json();
  console.log("Got github repositories", { response });
  return response;
}
