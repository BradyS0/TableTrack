import { generateTemplate } from "../../utils";
let loadingTimeout;

const loader = {};

function createLoader() {
  let oldLoader = document.getElementById("load-ico");
  if (oldLoader) return;
  
  oldLoader = generateTemplate(`
        <div id="load-ico">
        <div class="load-wrap">
        <img id="logo-table" src="assets/split-logo/table.png" alt="tableTrack loading animation" width="85px"/>
        <img id="logo-tracker" src="assets/split-logo/track2.png" alt="tableTrack loading animation" width="65px"/>
        </div>
        </div>
      `);
  document.body.appendChild(oldLoader);
}

loader.showLoading = () => {
  createLoader();
  loadingTimeout = setTimeout(() => {
    document.getElementById("load-ico").classList.add("active");
  }, 250); // delay spinner to prevent flicker
};

loader.hideLoading = () => {
  clearTimeout(loadingTimeout);
  document.getElementById("load-ico").classList.remove("active");
};

export default loader;
