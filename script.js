document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector("#unity-container");
  const canvas = document.querySelector("#unity-canvas");
  const loadingBar = document.querySelector("#unity-loading-bar");
  const progressBarFull = document.querySelector("#unity-progress-bar-full");
  const fullscreenButton = document.querySelector("#unity-fullscreen-button");
  const warningBanner = document.querySelector("#unity-warning");

  function unityShowBanner(msg, type) {
    function updateBannerVisibility() {
      warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }
    const div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type === 'error') {
      div.style = 'background: red; padding: 10px;';
    } else if (type === 'warning') {
      div.style = 'background: yellow; padding: 10px;';
      setTimeout(() => {
        if (warningBanner.contains(div)) {
          warningBanner.removeChild(div);
          updateBannerVisibility();
        }
      }, 5000);
    }
    updateBannerVisibility();
  }

  const buildUrl = "Build";
  const loaderUrl = `${buildUrl}/${encodeURIComponent("Celestial Feasts WebGL.loader.js")}`;
  const config = {
    dataUrl: "https://pub-c21989cda46e41b1881058890255fe03.r2.dev/" + encodeURIComponent("Celestial Feasts WebGL.data"),
    frameworkUrl: `${buildUrl}/${encodeURIComponent("Celestial Feasts WebGL.framework.js")}`,
    codeUrl: `${buildUrl}/${encodeURIComponent("Celestial Feasts WebGL.wasm")}`,
    streamingAssetsUrl: "StreamingAssets",
    companyName: "ItzSunBoi",
    productName: "Celestial Feasts",
    productVersion: "0.2",
    showBanner: unityShowBanner,
  };

  canvas.style.width = "960px";
  canvas.style.height = "600px";
  loadingBar.style.display = "block";
  progressBarFull.style.width = "0%";

  const script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
      const clamped = Math.max(0, Math.min(1, progress));
      progressBarFull.style.width = `${clamped * 100}%`;
    }).then((unityInstance) => {
      loadingBar.style.display = "none";

      if (fullscreenButton) {
        fullscreenButton.addEventListener("click", () => {
          unityInstance.SetFullscreen(1);
        });
      } else {
        console.warn("Fullscreen button not found.");
      }
    }).catch((message) => {
      unityShowBanner(`❌ Unity failed to load: ${message}`, "error");
    });
  };

  document.body.appendChild(script);
});
