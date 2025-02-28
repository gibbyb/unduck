import { bangs } from "./bang";
import "./global.css";

function noSearchDefaultPageRender() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
      <div class="content-container">
        <h1 class="bang-title">💣 Bang!</h1>
        <p>
          Add the following URL as a custom search engine to your browser in order to enable
          <a href="https://duckduckgo.com/bang.html" target="_blank">
            all of DuckDuckGo's bangs
          </a>
          right from your browser's search bar!
        </p>
        <div class="url-container"> 
          <input 
            type="text" 
            class="url-input"
            value="https://bang.gbrown.org?q=%s"
            readonly 
          />
          <button class="copy-button">
            <img src="/clipboard.svg" alt="Copy" />
          </button>
        </div>
        <h3 class="settings-title">How to add Bang! Search Engine</h3>
        <p style="margin-bottom: 8px; font-size: 14px;">
          Below are links to the search engine settings in your browser.
            <br />
          Copy the URL for the browser engine you are using & paste it into a new tab.
            <br />
          From there you should see an option to add a search engine. Copy the link above
          & fill out the form as follows.
        </p>
        <table class="form-table">
          <tr>
            <td><b>Name:</b></td>
            <td>Bang!</td>
          </tr>
          <tr>
            <td><b>Engine URL:</b></td>
            <td>https://bang.gbrown.org?q=%s</td>
          </tr>
          <tr>
            <td><b>Alias:</b></td>
            <td>@bang</td>
          </tr>
        </table>
        <div class="settings-links-container">
          <div class="browser-link-container">
            <img src="/firefox.svg" alt="Firefox" width="24" />
            <input
              type="text"
              readonly value="about:preferences#search" 
              class="firefox-textbox" 
              title="Click to copy Firefox settings URL"
            />
            <button class="copy-firefox">
              <img src="/clipboard.svg" alt="Copy" />
            </button>
          </div>
          <div class="browser-link-container">
            <img src="/chrome.svg" alt="Chrome" width="24" />
            <input
              type="text"
              readonly value="chrome://settings/searchEngines" 
              class="chrome-textbox"
              title="Click to copy Chrome settings URL"
            />
            <button class="copy-chrome">
              <img src="/clipboard.svg" alt="Copy" />
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const copyButton = app.querySelector<HTMLButtonElement>(".copy-button")!;
  const copyIcon = copyButton.querySelector("img")!;
  const urlInput = app.querySelector<HTMLInputElement>(".url-input")!;
  const copyFirefox = app.querySelector<HTMLInputElement>(".copy-firefox")!;
  const copyFirefoxIcon = copyFirefox.querySelector("img")!;
  const firefoxInput =  app.querySelector<HTMLInputElement>(".firefox-textbox")!;
  const copyChrome = app.querySelector<HTMLInputElement>(".copy-chrome")!;
  const copyChromeIcon = copyChrome.querySelector("img")!;
  const chromeInput =  app.querySelector<HTMLInputElement>(".chrome-textbox")!;

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(urlInput.value);
    copyIcon.src = "/clipboard-check.svg";
    setTimeout(() => {
      copyIcon.src = "/clipboard.svg";
    }, 2000);
  });

  copyFirefox.addEventListener("click", async () => {
    await navigator.clipboard.writeText(firefoxInput.value);
    copyFirefoxIcon.src = "/clipboard-check.svg";
    setTimeout(() => {
      copyFirefoxIcon.src = "/clipboard.svg";
    }, 2000);
  });

  copyChrome.addEventListener("click", async () => {
    await navigator.clipboard.writeText(chromeInput.value);
    copyChromeIcon.src = "/clipboard-check.svg";
    setTimeout(() => {
      copyChromeIcon.src = "/clipboard.svg";
    }, 2000);
  });
}

const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "sg";
const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG);

function getBangredirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    noSearchDefaultPageRender();
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBangredirectUrl();
  if (!searchUrl) return;
  window.location.replace(searchUrl);
}

doRedirect();
