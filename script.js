document.addEventListener("DOMContentLoaded", function () {
  
  var container = document.querySelector("#unity-container");
  var canvas = document.querySelector("#unity-canvas");
  var loadingBar = document.querySelector("#unity-loading-bar");
  var progressBarFull = document.querySelector("#unity-progress-bar-full");
  var fullscreenButton = document.querySelector("#unity-fullscreen-button");
  var warningBanner = document.querySelector("#unity-warning");

  function unityShowBanner(msg, type) {
    function updateBannerVisibility() {
      warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }
    var div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type === 'error') {
      div.style = 'background: red; padding: 10px;';
    } else if (type === 'warning') {
      div.style = 'background: yellow; padding: 10px;';
      setTimeout(function () {
        if (warningBanner.contains(div)) {
          warningBanner.removeChild(div);
          updateBannerVisibility();
        }
      }, 5000);
    }
    updateBannerVisibility();
  }

  var buildUrl = "Build";
  var loaderUrl = buildUrl + "/Celestial Feasts WebGL.loader.js";
  var config = {
    dataUrl: "https://github.com/ItzSunBoi/CelestialFeasts/releases/download/Final/Celestial.Feasts.WebGL.data",
    frameworkUrl: buildUrl + "/Celestial Feasts WebGL.framework.js",
    codeUrl: buildUrl + "/Celestial Feasts WebGL.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "ItzSunBoi",
    productName: "Celestial Feasts",
    productVersion: "0.2",
    showBanner: unityShowBanner,
  };

  canvas.style.width = "960px";
  canvas.style.height = "600px";

  loadingBar.style.display = "block";

  var script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
      progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
      loadingBar.style.display = "none";

      if (fullscreenButton) {
        fullscreenButton.addEventListener("click", () => {
          unityInstance.SetFullscreen(1);
        });
      } else {
        console.error("Element #unity-fullscreen-button not found in the DOM.");
      }

    }).catch((message) => {
      alert(message);
    });
  };

  document.body.appendChild(script);

});
