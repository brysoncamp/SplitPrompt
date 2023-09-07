const currentTheme = document.documentElement.dataset.theme;
const newTheme = currentTheme === "light" ? "dark" : "light";
const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");

const headerText = "this is helping chatgpt to make sure it responds appropriately to multiple messages and can process them in a way that i deem to be just acceptable enough";

const promptContainer = document.querySelector('.prompt-selection');
const promptTextareas = document.getElementById('promptTextareas');

const copyButton = document.querySelector(".copy-button");

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
});

function calculateSplitSizes(L, C, O) {
  let n = 1;
  while (L > n * (C - O)) {
    console.log(n);
      n++;
  }
  const total = n * O + L;
  const baseSize = Math.floor(total / n);
  let remainder = total - n * baseSize;
  const splitSizes = new Array(n).fill(baseSize - O);
  for (let i = 0; i < splitSizes.length && remainder > 0; i++) {
      splitSizes[i]++;
      remainder--;
  }
  return splitSizes;
}

const tokenCount = document.getElementById("tokenCount");

function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
          return;
      }
      lastCall = now;
      return func.apply(this, args);
  };
}

textArea.addEventListener('input', throttle(function() {
  const text = textArea.value;
  const encodedTokens = encode(text);
  const chunkSize = chunkInput.value;
  tokenCount.innerHTML = encodedTokens.length + "&nbsp;TOKENS";
  if (text != "") {
    clearButton.style.display = "block";
  } else {
    clearButton.style.display = "none";
  }

  if (chunkSize != 0 && encodedTokens.length > chunkSize && chunkSize > 30) {
    console.log(encodedTokens.length, chunkSize);
    const splitSizes = calculateSplitSizes(encodedTokens.length, chunkSize, 30);
    console.log("split sizes", splitSizes)
    promptContainer.innerHTML = "";
    promptTextareas.innerHTML = "";
    for (let i = 0; i < splitSizes.length; i++) {
      const newDiv2 = document.createElement('div');
      newDiv2.className = "prompt-textarea";
      const startIndex = splitSizes.slice(0, i).reduce((acc, val) => acc + val, 0);
      const endIndex = startIndex + splitSizes[i];
      const tokenChunk = encodedTokens.slice(startIndex, endIndex);
      newDiv2.innerText = decode(tokenChunk);


      const newDiv = document.createElement('div');
      newDiv.textContent = `PROMPT ${i + 1}`;
      newDiv.addEventListener('click', function() {

        const promptAreas = document.querySelectorAll(".prompt-textarea");
        promptAreas.forEach((area, j) => {
            if (j === i) {
                area.classList.add("seen");
            } else {
                area.classList.remove("seen");
            }
        });


        const prompts = document.querySelectorAll('.prompt-option-unselected, .prompt-option-selected');

        const currentSelected = document.querySelector('.prompt-option-selected');
        if (currentSelected) {
            currentSelected.className = 'prompt-option-unselected';
        }
        this.className = 'prompt-option-selected';
        const containerRect = promptContainer.getBoundingClientRect();
        if (i > 0) {
            const leftNeighbor = prompts[i - 1].getBoundingClientRect();
            if (leftNeighbor.left < containerRect.left) {
                promptContainer.scrollLeft -= (containerRect.left - leftNeighbor.left + 8);
            }
        }
        if (i < prompts.length - 1) {
            const rightNeighbor = prompts[i + 1].getBoundingClientRect();
            if (rightNeighbor.right > containerRect.right) {
                promptContainer.scrollLeft += (rightNeighbor.right - containerRect.right + 28);
            }
        }

        copyButton.innerText = `COPY ${i + 1}/${prompts.length}`;

      });
      if (i === 0) {
        newDiv.className = 'prompt-option-selected';
        const startIndex = splitSizes.slice(0, i).reduce((acc, val) => acc + val, 0);
        const endIndex = startIndex + splitSizes[i];
        const tokenChunk = encodedTokens.slice(startIndex, endIndex);
        //promptTextarea.value = decode(tokenChunk);
        newDiv2.classList.add("seen");
        copyButton.innerText = `COPY 1/${splitSizes.length}`;
      } else {
        newDiv.className = 'prompt-option-unselected';
      }
      promptContainer.appendChild(newDiv);
      promptTextareas.appendChild(newDiv2);
    }
  }
}, 300));


textArea.addEventListener('focus', function() {
  this.parentElement.classList.add('focused');
});

textArea.addEventListener('blur', function() {
  this.parentElement.classList.remove('focused');
});





/*
// Get all prompt options
const prompts = document.querySelectorAll('.prompt-option-unselected, .prompt-option-selected');
// Add click event to each prompt option
prompts.forEach((prompt, index) => {
    prompt.addEventListener('click', function() {
        const currentSelected = document.querySelector('.prompt-option-selected');
        if (currentSelected) {
            currentSelected.className = 'prompt-option-unselected';
        }
        this.className = 'prompt-option-selected';
        const containerRect = promptContainer.getBoundingClientRect();
        if (index > 0) {
            const leftNeighbor = prompts[index - 1].getBoundingClientRect();
            if (leftNeighbor.left < containerRect.left) {
                promptContainer.scrollLeft -= (containerRect.left - leftNeighbor.left + 8);
            }
        }
        if (index < prompts.length - 1) {
            const rightNeighbor = prompts[index + 1].getBoundingClientRect();
            if (rightNeighbor.right > containerRect.right) {
                promptContainer.scrollLeft += (rightNeighbor.right - containerRect.right + 28);
            }
        }
    });
});*/


if (!('ontouchstart' in window)) {
  promptContainer.addEventListener('wheel', function(event) {
      this.scrollLeft += event.deltaY;
      event.preventDefault();
  }, { passive: false });
}






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


const outputContainer = document.querySelector('.output-container');

outputContainer.addEventListener('mouseover', function(e) {
    const isOverPromptContainer = e.target.closest('.prompt-container');
    const isPromptContainerVisible = getComputedStyle(promptContainer).display !== "none";
    if (isOverPromptContainer && isPromptContainerVisible) {
        outputContainer.style.cursor = "default";
        copyButton.classList.remove("hover");
        outputContainer.style.backgroundColor = "#f6f6f6";
        console.log("here");
    } else {
        console.log("Hovering over output-container but not visible prompt-container");
        outputContainer.style.cursor = "pointer";

        copyButton.classList.add("hover");

      
        outputContainer.style.backgroundColor = "#e6e6e6";
    }
});


// Remove style when mouse exits output-container
outputContainer.addEventListener('mouseout', function() {
    outputContainer.style.cursor = "default";
    copyButton.classList.remove("hover");
    outputContainer.style.backgroundColor = "#f6f6f6";
});

outputContainer.addEventListener('mousedown', function(e) {
  const isOverPromptContainer = e.target.closest('.prompt-container');
  const isPromptContainerVisible = getComputedStyle(promptContainer).display !== "none";

  //const isOverVerticalScrollbar = e.clientX - outputContainer.getBoundingClientRect().left > outputContainer.clientWidth;
  const rect = outputContainer.getBoundingClientRect();
    
  const isOnVerticalScrollbar = (e.clientX - rect.left) > outputContainer.clientWidth && outputContainer.scrollWidth > outputContainer.clientWidth;
                                
  console.log(isOnVerticalScrollbar)
  console.log('^^^^^');


  if (!(isOverPromptContainer && isPromptContainerVisible)) {
    copyButton.classList.remove("hover");
  

    /*
    const match = copyButton.innerText.match(/(\d+)\//);
    const number = match ? parseInt(match[1], 10) : null;
    console.log(splitSizes);
    console.log(number);
    console.log(splitSizes.length);
    if (number && number < splitSizes.length) {
      copyButton.innerText = `COPY ${number+1}/${splitSizes.length}`;
    }*/
  }
})
outputContainer.addEventListener('mouseup', function(e) {
  const isOverPromptContainer = e.target.closest('.prompt-container');
  const isPromptContainerVisible = getComputedStyle(promptContainer).display !== "none";
  
  if (!(isOverPromptContainer && isPromptContainerVisible)) {
    copyButton.classList.add("hover");
    const selected = document.querySelector(".prompt-option-selected");
    const nextSelected = selected.nextElementSibling;
    const selectedPrompt = document.querySelector(".seen");

    if (nextSelected) {
      selected.className = "prompt-option-unselected";
      nextSelected.className = "prompt-option-selected";

      selectedPrompt.classList.remove("seen");
      selectedPrompt.nextElementSibling.classList.add("seen");

      const match = selected.innerText.match(/PROMPT (\d+)/);
      const number = match ? parseInt(match[1], 10) : null;
      
      if (number !== null) {
        copyButton.innerText = `COPY ${number+1}/${promptContainer.childElementCount}`;
      }

      const prompts = document.querySelectorAll('.prompt-option-unselected, .prompt-option-selected');
      const i = Array.from(prompts).indexOf(nextSelected);

      const currentSelected = document.querySelector('.prompt-option-selected');
      if (currentSelected) {
          currentSelected.className = 'prompt-option-unselected';
      }
      nextSelected.className = 'prompt-option-selected';

      const containerRect = promptContainer.getBoundingClientRect();

      if (i > 0) {
          const leftNeighbor = prompts[i - 1].getBoundingClientRect();
          if (leftNeighbor.left < containerRect.left) {
              promptContainer.scrollLeft -= (containerRect.left - leftNeighbor.left + 8);
          }
      }

      if (i < prompts.length - 1) {
          const rightNeighbor = prompts[i + 1].getBoundingClientRect();
          if (rightNeighbor.right > containerRect.right) {
              promptContainer.scrollLeft += (rightNeighbor.right - containerRect.right + 28);
          }
      }
    }
  }
});
