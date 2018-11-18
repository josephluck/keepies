import {
  ALARM_POLL,
  messageRequestKeepie,
  messageActiveTabChanged
} from "./messages";
import { keepie, takeDueKeepies } from "./keepie";
import { addSeconds } from "date-fns";

function scheduleKeepies() {
  chrome.alarms.create(ALARM_POLL, {
    when: addSeconds(new Date(), 5).getTime(),
    periodInMinutes: 1
  });
}

function listenForKeepies() {
  chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === ALARM_POLL) {
      console.log("Background script received poll alarm");
      takeDueKeepies();
    }
  });
  chrome.runtime.onMessage.addListener(message => {
    console.log("Background script received message", { message });
    if (message && message.name) {
      if (message.name === messageRequestKeepie().name) {
        console.log("Background script received request keepie message");
        keepie();
      }
    }
  });
}

function listenForTabChange() {
  chrome.tabs.onActivated.addListener(async () => {
    console.log("Background script sending active tab changed message");
    chrome.runtime.sendMessage(messageActiveTabChanged());

    console.log(
      "Background script requesting due keepies due to active tab change"
    );
    takeDueKeepies();
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Background script received chrome onInstalled runtime event");
  scheduleKeepies();
  listenForKeepies();
  listenForTabChange();
});
