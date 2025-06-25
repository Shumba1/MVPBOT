/* ==========================================================================
   BOTGospel Tier 1 Shared Script - FINAL (v1.1)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Render all Lucide icons.
  // Requires the Lucide library to be loaded in the HTML.
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    console.error("Lucide library not found. Icons will not be rendered.");
  }

  // 2. Trigger the page-load fade-in effect.
  // The initial state (opacity: 0) is set in shared-style.css.
  document.body.style.opacity = '1';

});