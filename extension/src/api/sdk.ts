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
    // NB: null gets all settings
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

export async function storeChosenGitHubRepository(
  repository: Models.Repository
): Promise<Models.Settings> {
  await setSetting("chosenGitHubSyncRepo", repository);
  console.log("Stored chosen sync repository", { repository });
  return await getSettings();
}

export async function getGitHubRepositories(): Promise<Models.Repository[]> {
  const { gitHubAuthenticationToken } = await getSettings();
  console.log("Fetch user's GitHub repositories with", {
    gitHubAuthenticationToken
  });
  const request = await fetch(
    `https://api.github.com/user/repos?access_token=${gitHubAuthenticationToken}`,
    {
      method: "GET"
    }
  );
  const response = await request.json();
  console.log("Got user's GitHub repositories", { response });
  return response;
}

export async function authenticateWithGitHub() {
  return await authenticateWithGitHubOAuthApplication();
}

async function authenticateWithGitHubOAuthApplication(): Promise<string> {
  // NB: https://developer.chrome.com/apps/identity#method-launchWebAuthFlow
  const CALLBACK_URL = chrome.identity.getRedirectURL();
  // NB: used to test whether the callback URL from GitHub is correct
  const callbackMatcher = new RegExp(CALLBACK_URL + "[#?](.*)");
  // NB: this is the github app client id available here: https://github.com/settings/applications/938404
  const GITHUB_OAUTH_APP_ID = env.GITHUB_OAUTH_APP_ID;
  // NB: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#redirect-urls
  const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_OAUTH_APP_ID}&redirect_uri=${CALLBACK_URL}&scope=repo`;

  return new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      {
        url: GITHUB_AUTH_URL,
        interactive: true
      },
      async redirectURL => {
        const matches = redirectURL.match(callbackMatcher);
        if (matches && matches.length > 1) {
          const { code } = parseRedirectFragment(matches[1]);
          if (code) {
            // NB: github only gave us a access token - exchange it for an authentication token
            const accessToken = await exchangeGitHubAccessTokenForAuthToken(
              code
            );
            await setSetting("gitHubAuthenticationToken", accessToken);
            resolve(accessToken);
          } else {
            reject("Invalid redirectURL provided by GitHub");
          }
        } else {
          reject("Invalid redirectURL provided by GitHub");
        }
      }
    );
  }) as any;
}

async function exchangeGitHubAccessTokenForAuthToken(
  accessCode: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    console.log("Exchanging GitHub access token for authentication token", {
      accessCode
    });
    // NB: https://developer.chrome.com/apps/identity#method-launchWebAuthFlow
    const CALLBACK_URL = chrome.identity.getRedirectURL();
    // NB: these are GitHub app ids available here: https://github.com/settings/applications/938404
    const GITHUB_OAUTH_APP_ID = env.GITHUB_OAUTH_APP_ID;
    const GITHUB_OAUTH_APP_SECRET = env.GITHUB_OAUTH_APP_SECRET;
    // NB: this is the GitHub API for exchanging an access token for an auth token
    const GITHUB_AUTH_URL = `https://github.com/login/oauth/access_token?client_id=${GITHUB_OAUTH_APP_ID}&client_secret=${GITHUB_OAUTH_APP_SECRET}&redirect_uri=${CALLBACK_URL}&code=${accessCode}`;
    const request = await fetch(GITHUB_AUTH_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const { access_token } = await request.json();
    if (!access_token) {
      reject("No access_token provided by GitHub");
    }
    resolve(access_token);
  }) as any;
}

function parseRedirectFragment(fragment): Record<string, string> {
  let pairs = fragment.split(/&/);
  let values = {};

  pairs.forEach(pair => {
    const key = pair.split(/=/);
    values[key[0]] = key[1];
  });

  return values;
}
