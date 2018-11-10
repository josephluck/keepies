import { messageKeepieMade, messageRequestKeepie } from "./messages";
import { getSettings } from "./api/sdk";
import { Models } from "./api/models";

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

function isUrlInApps(settings: Models.Settings, url: string): boolean {
  return !!settings.apps.find(
    app => url.includes(app.origin) || url === app.origin
  );
}

export function getCurrentTab(): Promise<chrome.tabs.Tab> {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length) {
        console.log("Active tab found");
        resolve(tabs[0]);
      } else {
        console.log("No active tabs found");
      }
    });
  });
}

export async function keepie() {
  const settings = await getSettings();
  const tab = await getCurrentTab();
  if (isUrlInApps(settings, tab.url)) {
    console.log("Current tab is in stored apps, creating Keepie");
    chrome.tabs.captureVisibleTab(url => {
      if (url) {
        const downloadOpts = {
          filename: `${generateFileName(tab)}.jpeg`,
          url
        };
        console.log("Created Keepie, beginning to save to disk", downloadOpts);
        chrome.downloads.download(downloadOpts, () => {
          console.log("Keepie made and saved to disk");
          chrome.runtime.sendMessage(messageKeepieMade());
        });
      } else {
        console.log("No URL generated via captureVisibleTab");
      }
    });
  } else {
    console.log("Current tab is not in stored apps");
  }
}

export function requestKeepie() {
  chrome.runtime.sendMessage(messageRequestKeepie());
}
