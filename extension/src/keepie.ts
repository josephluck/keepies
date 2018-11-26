import { messageKeepieMade, messageRequestKeepie } from "./messages";
import { getSettings, setSetting, syncKeepieWithGitHub } from "./api/sdk";
import { Models } from "./api/models";
import { Fixtures } from "./api/fixtures";

export function getCurrentTab(): Promise<chrome.tabs.Tab> {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length) {
        resolve(tabs[0]);
      } else {
        console.warn("Could not find a active tab in the current window");
      }
    });
  });
}

export async function keepie() {
  const settings = await getSettings();
  const tab = await getCurrentTab();
  const app = getAppFromUrl(settings, tab.url);
  console.log("Starting keepie capture of", { app, tab });
  if (app) {
    chrome.tabs.captureVisibleTab(url => {
      if (url) {
        const filename = `${generateFileName(tab)}.jpeg`;
        const base64Image = url.replace(/data:image\/jpeg;base64,/, "");
        chrome.downloads.download(
          {
            filename,
            url
          },
          async () => {
            await setSetting(
              "apps",
              settings.apps.map(a =>
                a.origin === app.origin
                  ? {
                      ...a,
                      lastKeepieOn: Date.now(),
                      nextKeepieDue: Fixtures.nextKeepieDue()
                    }
                  : a
              )
            );
            console.log("Keepie made, updating settings with new times", {
              settings: await getSettings()
            });
            if (
              settings.gitHubAuthenticationToken &&
              settings.chosenGitHubSyncRepo
            ) {
              await syncKeepieWithGitHub(filename, base64Image);
            }
            chrome.runtime.sendMessage(messageKeepieMade());
          }
        );
      }
    });
  }
}

export async function takeDueKeepies() {
  const settings = await getSettings();
  const dueApps = settings.apps.filter(app => {
    console.log("Determining if app is ready for keepie", {
      app,
      dueIn: `${(app.nextKeepieDue - Date.now()) / 1000}s`
    });
    return app.nextKeepieDue < Date.now();
  });
  console.log("Taking due keepies", { apps: settings.apps, dueApps });
  dueApps.forEach(dueApp => {
    console.log("Requesting keepie of due app", { dueApp });
    keepie();
  });
}

export function requestKeepie() {
  chrome.runtime.sendMessage(messageRequestKeepie());
}

function replaceWhiteSpace(str) {
  return str
    .toString()
    .split(" ")
    .join("_");
}

function generateFileName(tab: chrome.tabs.Tab): string {
  return ["keepies", tab ? tab.title : "", Date.now()]
    .filter(val => !!val)
    .map(replaceWhiteSpace)
    .join("-")
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase();
}

function getAppFromUrl(settings: Models.Settings, url: string): Models.App {
  return settings.apps.find(
    app => url.includes(app.origin) || url === app.origin
  );
}
