console.log("travelBloom.js loaded. . .");

// Calculate the size of the nav at runtime
function setNavHeightProp() {
  const nav = document.querySelector("nav");
  const navHeight = nav.offsetHeight;
  document.documentElement.style.setProperty("--nav-height", `${navHeight}px`);
}

// Call this function once when the script is loaded and then again anytime the page is resized:
setNavHeightProp();
window.addEventListener("resize", setNavHeightProp);


