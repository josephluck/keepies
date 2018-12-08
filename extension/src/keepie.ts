import { messageKeepieMade, messageRequestKeepie } from "./messages";
import {
  getSettings,
  setSetting,
  syncKeepieWithGitHub,
  downloadKeepie,
  captureVisibleTab,
  areImagesDifferent
} from "./api/sdk";
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
  const {
    apps,
    gitHubAuthenticationToken,
    chosenGitHubSyncRepo,
    lastCaptureDataUrl
  } = await getSettings();

  const tab = await getCurrentTab();
  const app = getAppFromUrl(apps, tab.url);

  console.log("Starting keepie capture of", { app, tab });

  if (app) {
    const dataUrl = await captureVisibleTab();
    const imageIsDifferentFromLastTime = await areImagesDifferent(
      dataUrl,
      lastCaptureDataUrl
    );
    if (imageIsDifferentFromLastTime) {
      const filename = `${generateFileName(tab)}.png`;
      const gitHubFileContents = dataUrl.replace(/data:image\/png;base64,/, "");
      await downloadKeepie(filename, dataUrl);
      if (gitHubAuthenticationToken && chosenGitHubSyncRepo) {
        await syncKeepieWithGitHub(filename, gitHubFileContents, app.name);
      }
      await setSetting("lastCaptureDataUrl", dataUrl);
      await setSetting(
        "apps",
        apps.map(a => {
          if (a.origin === app.origin) {
            const updatedApp: Models.App = {
              ...a,
              numberOfKeepiesMade: a.numberOfKeepiesMade + 1,
              lastKeepieOn: Date.now(),
              nextKeepieDue: Fixtures.nextKeepieDue()
            };
            return updatedApp;
          } else {
            return a;
          }
        })
      );
      console.log("Keepie made, updating settings with new times", {
        settings: await getSettings()
      });
      chrome.runtime.sendMessage(messageKeepieMade());
    }
  } else {
    console.warn("App not found", { app });
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

export function makeStringFileSafe(str: string): string {
  return replaceWhiteSpace(str)
    .toLowerCase()
    .replace(/[\W_]+/g, "-");
}

function generateFileName(tab: chrome.tabs.Tab): string {
  return makeStringFileSafe(
    ["keepies", Date.now(), tab ? tab.title : ""].filter(val => !!val).join("-")
  );
}

function getAppFromUrl(apps: Models.App[], url: string): Models.App {
  return apps.find(app => url.includes(app.origin) || url === app.origin);
}
