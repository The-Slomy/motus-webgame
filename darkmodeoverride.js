// Check if there's any override. If so, let the markup know by setting an attribute on the <html> element
const colorModeOverride = window.localStorage.getItem("color-mode");
const hasColorModeOverride = typeof colorModeOverride === "string";
if (hasColorModeOverride) {
  document.documentElement.setAttribute(
    "data-force-color-mode",
    colorModeOverride
  );
}
