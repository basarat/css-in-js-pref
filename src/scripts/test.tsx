import * as playwright from 'playwright';
import { performance } from 'perf_hooks';

async function main() {
  const url = 'http://localhost:3000';
  const rendersPerFramework = 100;
  const attempts = 10;

  const type = playwright.chromium;
  const browser = await type.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const measureFramework = async (framework: 'styled' | 'emotion') => {
    console.log('Testing:', framework);
    const start = performance.now();
    for (let index = 0; index < rendersPerFramework; index++) {
      await page.click(`#${framework}`);
      await page.waitForSelector('#root');
      await page.click('#none');
    }
    const end = performance.now();
    return end - start;
  }

  let totalStyled = 0;
  let totalEmotion = 0;

  for (let index = 0; index < attempts; index++) {
    console.log(`--- Attempt ${index + 1} ---`);
    totalStyled += await measureFramework('styled');
    totalEmotion += await measureFramework('emotion');
  }

  console.log('-- RESULTS ---');
  console.log('Average Styled:', totalStyled / (rendersPerFramework * attempts), 'ms');
  console.log('Average Emotion:', totalEmotion / (rendersPerFramework * attempts), 'ms');
  
  await browser.close();
}

main();