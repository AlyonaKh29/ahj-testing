import { test, describe, expect, beforeAll, afterAll } from "@jest/globals";
import puppetteer from "puppeteer";
import { fork } from "child_process";

describe("Testing the card validator widget", () => {
  const url = "http://localhost:8088";
  let browser;
  let page;
  let server;

  beforeAll(async () => {
    return new Promise((resolve, reject) => {
      server = fork(`${__dirname}/e2e.server.js`);

      server.on("message", (msg) => {
        if (msg === "ready") {
          resolve();
        }
      });

      server.on("error", (err) => {
        reject(err);
      });

      server.on("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`Server exited with code ${code}`));
        }
      });
    }).then(async () => {  
      browser = await puppetteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
        ],
        slowMo: 50,
      });
      page = await browser.newPage();
    });
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('valid "МИР" card number', async () => {
    await page.goto(url);
    await page.type(".cardInput", "2201382000000039");
    await page.click(".button");
    const textResult = await page.$eval(".result", (el) => el.innerText);
    expect(textResult.toLowerCase()).toContain("да");

    const activeLogos = await page.$$eval(".logo.active", (logos) =>
      logos.map((el) => el.getAttribute("data-name")),
    );
    expect(activeLogos).toContain("МИР");
    expect(activeLogos).toEqual(["МИР"]);
  }, 30000);

  test("invalid card number", async () => {
    await page.goto(url);
    await page.type(".cardInput", "1234567890123456");
    await page.click(".button");
    const textResult = await page.$eval(".result", (el) => el.innerText);
    expect(textResult.toLowerCase()).toContain("нет");
    const activeLogos = await page.$$eval(".logo.active", (logos) =>
      logos.map((l) => l.getAttribute("data-name")),
    );
    expect(activeLogos.length).toBe(0);
  }, 30000);
});
