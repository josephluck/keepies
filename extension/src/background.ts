import {
  ALARM_KEEPIE,
  messageRequestKeepie,
  messageActiveTabChanged
} from "./messages";
import { keepie } from "./keepie";

function scheduleKeepies() {
  console.log("Scheduling keepies");
  chrome.alarms.create(ALARM_KEEPIE, {
    when: Date.now() + 5000,
    periodInMinutes: 1
  });
}

function listenForKeepies() {
  chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === ALARM_KEEPIE) {
      console.log("Keepie alarm received, beginning keepie");
      keepie();
    }
  });
  chrome.runtime.onMessage.addListener(message => {
    if (
      message &&
      message.name &&
      message.name === messageRequestKeepie().name
    ) {
      console.log("Keepie message received, beginning keepie");
      keepie();
    }
  });
}

function listenForTabChange() {
  chrome.tabs.onActivated.addListener(async () => {
    chrome.runtime.sendMessage(messageActiveTabChanged());
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Chrome runtime installed, instantiating app");
  scheduleKeepies();
  listenForKeepies();
  listenForTabChange();
});
