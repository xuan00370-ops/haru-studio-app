#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const url = process.argv[2];
const outDir = path.resolve(process.argv[3] || ".codex-artifacts/ui-smoke/manual");
const timeoutMs = Number(process.env.PLAYWRIGHT_TIMEOUT_MS || 30000);
const failOnConsoleError = process.env.FAIL_ON_CONSOLE_ERROR === "1";

if (!url) {
  console.error("Usage: node playwright_smoke_capture.mjs <url> [out-dir]");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
const screenshotPath = path.join(outDir, "page.png");
const jsonPath = path.join(outDir, "playwright-smoke.json");
const summaryPath = path.join(outDir, "playwright-smoke-summary.md");

const result = {
  url,
  outDir,
  status: "UNKNOWN",
  screenshot: screenshotPath,
  metrics: { consoleErrors: 0, consoleWarnings: 0, pageErrors: 0, requestFailures: 0 },
  details: { console: [], pageErrors: [], requestFailures: [] },
  notes: [],
};

function truncate(s, n = 300) {
  return String(s ?? "").replace(/\s+/g, " ").slice(0, n);
}

function writeOutputs(exitCode = 0) {
  fs.writeFileSync(jsonPath, JSON.stringify(result, null, 2), "utf8");
  const md = [];
  md.push("# Playwright Smoke Summary", "");
  md.push(`- URL: \`${result.url}\``);
  md.push(`- Status: ${result.status}`);
  md.push(`- Screenshot: \`${result.screenshot}\``);
  md.push(`- JSON: \`${jsonPath}\``);
  md.push(`- Console errors: ${result.metrics.consoleErrors}`);
  md.push(`- Console warnings: ${result.metrics.consoleWarnings}`);
  md.push(`- Page errors: ${result.metrics.pageErrors}`);
  md.push(`- Request failures: ${result.metrics.requestFailures}`);
  md.push("");

  if (result.notes.length) {
    md.push("## Notes", "");
    for (const note of result.notes) md.push(`- ${note}`);
    md.push("");
  }

  if (result.details.pageErrors.length) {
    md.push("## Page Errors", "");
    for (const item of result.details.pageErrors) md.push(`- \`${truncate(item, 220)}\``);
    md.push("");
  }

  if (result.details.requestFailures.length) {
    md.push("## Request Failures", "");
    for (const item of result.details.requestFailures.slice(0, 10)) {
      md.push(`- \`${truncate(item, 220)}\``);
    }
    md.push("");
  }

  if (result.details.console.length) {
    md.push("## Console (errors/warnings)", "");
    for (const item of result.details.console.slice(0, 20)) {
      md.push(`- \`${truncate(`${item.type}: ${item.text}`, 220)}\``);
    }
    md.push("");
  }

  if (result.status === "PASS") {
    md.push("## Result", "", "- Smoke test completed without navigation/page errors.");
  } else if (result.status === "SKIPPED") {
    md.push("## Result", "", "- Smoke test skipped because Playwright is not available in this environment.");
  } else {
    md.push("## Result", "", "- Smoke test failed. Check the JSON and console/page errors above.");
  }

  fs.writeFileSync(summaryPath, md.join("\n"), "utf8");
  process.exit(exitCode);
}

async function main() {
  let playwright;
  try {
    playwright = await import("playwright");
  } catch (err) {
    result.status = "SKIPPED";
    result.notes.push("`playwright` package is not installed. Install it to enable browser smoke tests.");
    result.notes.push(`Import error: ${truncate(err?.message || err, 220)}`);
    writeOutputs(2);
    return;
  }

  const { chromium } = playwright;
  let browser;
  let context;
  let page;
  try {
    const channel = process.env.PLAYWRIGHT_CHANNEL;
    try {
      browser = channel
        ? await chromium.launch({ headless: true, channel })
        : await chromium.launch({ headless: true });
    } catch (err) {
      if (!channel) {
        result.notes.push("Default Chromium launch failed; retrying with local Chrome channel.");
        browser = await chromium.launch({ headless: true, channel: "chrome" });
      } else {
        throw err;
      }
    }

    context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    page = await context.newPage();

    page.on("console", (msg) => {
      const type = msg.type();
      if (type === "error") result.metrics.consoleErrors += 1;
      if (type === "warning") result.metrics.consoleWarnings += 1;
      if (type === "error" || type === "warning") {
        result.details.console.push({ type, text: msg.text() });
      }
    });

    page.on("pageerror", (error) => {
      result.metrics.pageErrors += 1;
      result.details.pageErrors.push(error?.stack || error?.message || String(error));
    });

    page.on("requestfailed", (req) => {
      result.metrics.requestFailures += 1;
      const failure = req.failure();
      result.details.requestFailures.push(
        `${req.method()} ${req.url()} :: ${failure?.errorText || "requestfailed"}`
      );
    });

    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: timeoutMs });
    result.notes.push(`Navigation response status: ${response?.status?.() ?? "n/a"}`);

    await page.waitForTimeout(1500);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const shouldFail =
      result.metrics.pageErrors > 0 ||
      (failOnConsoleError && result.metrics.consoleErrors > 0);

    result.status = shouldFail ? "FAIL" : "PASS";
    writeOutputs(shouldFail ? 1 : 0);
  } catch (err) {
    result.status = "FAIL";
    result.notes.push(`Runtime error: ${truncate(err?.stack || err?.message || err, 400)}`);
    try {
      if (page) await page.screenshot({ path: screenshotPath, fullPage: true });
    } catch {}
    writeOutputs(1);
  } finally {
    try {
      if (context) await context.close();
    } catch {}
    try {
      if (browser) await browser.close();
    } catch {}
  }
}

main();
