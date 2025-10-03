// import puppeteer from "puppeteer";
// import { fork } from 'child_process';

// let browser;
// let serverProcess;

// function waitForServerReady(childProcess) {
//   return new Promise((resolve, reject) => {
//     const timeout = setTimeout(() => {
//       reject(new Error('Timeout waiting for server ready'));
//     }, 30000);

//     childProcess.on('message', (msg) => {
//       if (msg === 'ready') {
//         clearTimeout(timeout);
//         resolve();
//       }
//     });

//     childProcess.on('error', (err) => {
//       clearTimeout(timeout);
//       reject(err);
//     });

//     childProcess.on('exit', (code) => {
//       clearTimeout(timeout);
//       reject(new Error(`Child process exited with code ${code}`));
//     });
//   });
// }

// beforeAll(async () => {
//   serverProcess = fork(`${__dirname}/e2e.server.js`);
//   await waitForServerReady(serverProcess);
//   browser = await puppeteer.launch({
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     headless: true,
//     slowMo: 50,
//   });
// });

// afterAll(async () => {
//   if (browser) {
//     await browser.close();
//   }
//   if (serverProcess) {
//     serverProcess.kill('SIGINT');
//   }
// });
