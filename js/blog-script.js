let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    console.log("scroll");
    let currentScrollTop = document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop){
        header.style.top = "-56px"; 
    } else {
        header.style.top = "0";
    }
    lastScrollTop = currentScrollTop;
}, false);

const copies = document.querySelectorAll(".copy");

copies.forEach(copy => {
    copy.addEventListener("click", function() {
        if (this.dataset.locked === 'true') return;
        let nextSibling = this.nextElementSibling;
        while (nextSibling && !nextSibling.classList.contains("snippet")) {
            nextSibling = nextSibling.nextElementSibling;
        }
        if (nextSibling) {
            this.dataset.locked = 'true';
            this.innerText = "Copied!";
            this.classList.toggle("copied");
            navigator.clipboard.writeText(nextSibling.innerText);
            setTimeout(() => {
                this.classList.toggle("copied");
                this.innerText = "Copy";
                this.dataset.locked = 'false';
            }, 2000);
        }
    });
});

const preTags = document.querySelectorAll('pre[data-replicate]');

preTags.forEach(tag =>{
    let times = parseInt(tag.getAttribute('data-replicate'), 10);
    if (!isNaN(times)) {
        tag.innerText = (tag.innerText).repeat(times);
        const add = tag.getAttribute('data-add');
        if (add) {
            tag.innerText += add;
        }
    }
});