import { messageKeepieMade } from "./messages";
import { getSettings, Settings } from "./settings";

function determineFileName(tab: chrome.tabs.Tab): string {
  return ["keepies", tab ? tab.title : "", Date.now()]
    .filter(val => !!val)
    .map(val => val.toString())
    .map(val => val.split(" ").join("-"))
    .join("-");
}

function isUrlInApps(settings: Settings, url: string): boolean {
  return !!settings.apps.find(app => url.includes(app.url) || url === app.url);
}

export function getCurrentTab(): Promise<chrome.tabs.Tab> {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length) {
        resolve(tabs[0]);
      }
    });
  });
}

function getAllTabs(): Promise<chrome.tabs.Tab[]> {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true }, resolve);
  });
}

export async function capture() {
  const settings = await getSettings();
  getAllTabs().then(tabs =>
    tabs.map(tab => {
      if (isUrlInApps(settings, tab.url)) {
        chrome.tabs.captureVisibleTab(dataUrl => {
          chrome.downloads.download(
            {
              url: dataUrl,
              filename: `${determineFileName(tab)}.jpeg`
            },
            () => {
              chrome.runtime.sendMessage(messageKeepieMade());
            }
          );
        });
      }
    })
  );
}
