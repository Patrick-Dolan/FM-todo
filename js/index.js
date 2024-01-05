// UI logic
function setDarkTheme() {
  document.getElementById("theme-switcher-icon").src = "../images/icon-sun.svg";

  // Set background
  document.documentElement.style.setProperty('--background-image', 'url(./images/bg-mobile-dark.jpg)');
  document.documentElement.style.setProperty('--background-image-desktop', 'url(./images/bg-desktop-dark.jpg)');
  document.documentElement.style.setProperty('--background-color', 'hsl(235, 21%, 11%)');

  // Set colors
  document.documentElement.style.setProperty('--secondary-accent-color-light', 'hsl(235, 21%, 11%)');

  // List colors
  document.documentElement.style.setProperty('--surface-background-color', 'hsl(235, 24%, 19%)');
  document.documentElement.style.setProperty('--list-item-text', 'hsl(0, 0%, 98%)');
  document.documentElement.style.setProperty('--text-secondary', 'hsl(233, 14%, 35%)');
}

function setLightTheme() {
  document.getElementById("theme-switcher-icon").src = "../images/icon-moon.svg";

  // Set background
  document.documentElement.style.setProperty('--background-image', 'url(./images/bg-mobile-light.jpg)');
  document.documentElement.style.setProperty('--background-image-desktop', 'url(./images/bg-desktop-light.jpg)');
  document.documentElement.style.setProperty('--background-color', 'hsl(0, 0%, 98%)');
  
  // Set colors
  document.documentElement.style.setProperty('--secondary-accent-color-light', 'hsl(236, 33%, 92%)');

  // List colors
  document.documentElement.style.setProperty('--surface-background-color', 'hsl(0, 0%, 98%)');
  document.documentElement.style.setProperty('--list-item-text', 'hsl(235, 19%, 35%)');
  document.documentElement.style.setProperty('--text-secondary', 'hsl(236, 9%, 61%)');

}

function toggleTheme() {
  localStorage.setItem("theme", localStorage.getItem("theme") === "dark" ? "light" : "dark");
  let updatedTheme = localStorage.getItem("theme");
  if (updatedTheme == "dark") {
    setDarkTheme();
  } else {
    setLightTheme();
  }
}

function initializeTheme() {
  let currentTheme = localStorage.getItem("theme");

  // Set Default theme to light if it hasn't been set yet
  if (currentTheme == null) {
    localStorage.setItem("theme", "light");
    currentTheme = "light";
  }
  if (currentTheme == "dark") {
    setDarkTheme();
  } else {
    setLightTheme();
  }
  console.log("Theme initialized: ", currentTheme);
}

// Add event listeners on page load
window.addEventListener('load', () => {
  initializeTheme();
  document.getElementById("theme-switcher").addEventListener("click", () => toggleTheme());
});