let loadingTimeout;

const loader = {}
loader.showLoading = ()=> {
  loadingTimeout = setTimeout(() => {
    document.getElementById("load-ico").classList.add("active");
  }, 150); // delay spinner to prevent flicker
}

loader.hideLoading = ()=> {
  clearTimeout(loadingTimeout);
  document.getElementById("load-ico").classList.remove("active");
}

export default loader;