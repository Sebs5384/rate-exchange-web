export function setElementVisibility(selector, visibility) {
  if (visibility === "hidden") {
    document.querySelector(selector).classList.add("hidden");
  }
  if (visibility === "visible") {
    document.querySelector(selector).classList.remove("hidden");
  }
}
