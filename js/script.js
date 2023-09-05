const currentTheme = document.documentElement.dataset.theme;
const newTheme = currentTheme === "light" ? "dark" : "light";
const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");

colorPreference.addEventListener("change", (event) => {
  const preferredTheme = event.matches ? "dark" : "light";
  document.documentElement.dataset.theme = preferredTheme;
  localStorage.removeItem("theme");
});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
});

const { encode, decode } = GPTTokenizer_p50k_base; // GPTTokenizer_p50k_base or GPTTokenizer_cl100k_base

const textArea = document.getElementById('textArea');
const clearButton = document.getElementById('clearButton');

clearButton.addEventListener('click', function() {
  textArea.value = "";
  clearButton.style.display = "none";
  tokenCount.innerHTML = "0&nbsp;TOKENS";
});``

const tokenCount = document.getElementById("tokenCount");

textArea.addEventListener('input', function() {
  const text = textArea.value;
  const encodedTokens = encode(text);
  const chunkSize = chunkInput.value;
  tokenCount.innerHTML = encodedTokens.length + "&nbsp;TOKENS";
  if (text != "") {
    clearButton.style.display = "block";
  } else {
    clearButton.style.display = "none";
  }

  console.log(chunkInput);
  console.log(chunkSize);
  console.log(encodedTokens.length);
  
  if (chunkSize != 0 && encodedTokens.length > chunkSize) {
    console.log("can split");
  }
});

textArea.addEventListener('focus', function() {
  this.parentElement.classList.add('focused');
});

textArea.addEventListener('blur', function() {
  this.parentElement.classList.remove('focused');
});

/*
// Check if the browser supports a particular pseudo-element
function supportsPseudoElement(pseudoEl) {
  const rule = `@supports (${pseudoEl}) { #supports-pseudo-element-check { position: absolute; } }`;
  const style = document.createElement('style');
  style.innerHTML = rule;
  document.head.appendChild(style);
  const supports = !!window.getComputedStyle(document.querySelector('#supports-pseudo-element-check')).position;
  document.head.removeChild(style);
  return supports;
}

// Check if browser supports ::-webkit-scrollbar and add class if true
if (supportsPseudoElement('::-webkit-scrollbar')) {
  textArea  .classList.add('webkit-scrollbar');
}*/




