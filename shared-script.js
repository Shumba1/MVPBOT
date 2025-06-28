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

/* ==========================================================================
   COMMAND BAR DROPDOWN LOGIC (v4.4)
   ========================================================================== */
const menuButton = document.getElementById('battle-plan-btn');
const dropdownMenu = document.getElementById('battle-plan-dropdown');

if (menuButton && dropdownMenu) {
  menuButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click from bubbling up to document
    dropdownMenu.classList.toggle('active');
  });

  // Close the dropdown if clicking outside of it
  document.addEventListener('click', (event) => {
    if (dropdownMenu.classList.contains('active') && !menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.remove('active');
    }
  });
}