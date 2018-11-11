import * as repng from "repng";
import * as fs from "fs";
import * as path from "path";
import { Icon } from "./components/logo";

async function generate() {
  return new Promise(async resolve => {
    const image = await repng(Icon, {
      width: 128,
      height: 128,
      cssLibrary: "styled-components",
      css: "https://use.fontawesome.com/releases/v5.5.0/css/all.css"
    });

    const outPath = path.join(__dirname, "./build/logo.png");
    const file = fs.createWriteStream(outPath);

    file.on("finish", () => {
      console.log("Done");
      process.exit();
    });

    image.on("readable", () => {
      console.log(`Saving file`);
    });

    image.on("error", err => {
      console.error("Error: " + err);
    });

    image.pipe(file);
  });
}

generate();
