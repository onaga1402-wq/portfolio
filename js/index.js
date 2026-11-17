
const themeToggler = document.getElementById("theme-toggle-button");
const htmlElement = document.documentElement;
const settingsIcon = document.getElementById("settings-toggle");
const sideBar = document.getElementById("settings-sidebar");
const closeIcon = document.getElementById("close-settings");
const fontButtons = document.querySelectorAll(".font-option");
const colorsContainer = document.getElementById("theme-colors-grid");
const resetBtn = document.getElementById("reset-settings");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const heroSection = document.getElementById("hero-section");
const scrollToTopButton = document.getElementById("scroll-to-top");
const filterButtons = document.getElementById("portfolio-filters");
const filterContainer = document.querySelectorAll("#portfolio-filters button");
const portfolioDivs = document.querySelectorAll("#portfolio-grid .portfolio-item");
const carousel = document.getElementById("testimonials-carousel");
const cards = document.querySelectorAll("#testimonials-carousel .testimonial-card");
const nextBtn = document.getElementById("next-testimonial");
const prevBtn = document.getElementById("prev-testimonial");
const indicators = document.querySelectorAll(".carousel-indicator");
const body = document.body;


let currentIndex = 0;
let currentCards = 3;




const handleThemeToggle = () => {
    htmlElement.classList.toggle("dark");
};
const openSideBar = () => {
    sideBar.classList.remove("translate-x-full");
    settingsIcon.style.right = '20rem';
};
const closeSideBar = () => {
    sideBar.classList.add("translate-x-full");
    settingsIcon.style.right = '0';
}
const handleFontButtonClick = (e) => {
    const button = e.target.closest('button');
    if (button !== null) {
        const fontName = button.dataset.font;
        body.classList.remove("font-alexandria", "font-cairo", "font-tajawal");
        body.classList.add(`font-${fontName}`);
        for (let i = 0; i < fontButtons.length; i++) {//Reset Button
            fontButtons[i].classList.remove("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
            fontButtons[i].classList.add("border-slate-200", "dark:border-slate-700");
        }
        

        button.classList.remove("border-slate-200", "dark:border-slate-700");
        button.classList.add("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
    }
}
const handleFontColorChange = (e) => {
    const button = e.target.closest('button');
    if (button !== null) {
        const primaryColor = button.dataset.primary;
        const secondaryColor = button.dataset.secondary;
        htmlElement.style.setProperty("--color-primary", primaryColor);
        htmlElement.style.setProperty("--color-secondary", secondaryColor);
        htmlElement.style.setProperty("--color-accent", secondaryColor);
        for (let i = 0; i < colorOptions.length; i++) {
            colorOptions[i].classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
        }
        button.classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
    }
}
const resetSiteTheme = () => {
    closeSideBar();
    document.querySelector("button[data-font='tajawal']").click();
    document.querySelector("button[data-primary='#6366f1']").click();
}
const handleScrollSpy = () => {
    const scrollPosition = window.scrollY + 10;
    let currentSectionID = "";
    for (let i = 0; i < sections.length; i++) {
        const sectionOffsetTop = sections[i].offsetTop;
        const sectionHeight = sections[i].offsetHeight;
        const sectionOffsetBotton = sectionOffsetTop + sectionHeight;
        if (scrollPosition > sectionOffsetTop && scrollPosition < sectionOffsetBotton) {
            currentSectionID = sections[i].getAttribute("id");
        }
    }
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
        if (navLinks[i].getAttribute("href") === `#${currentSectionID}`) {
            navLinks[i].classList.add("active");
        }
    }
}
const handleScrollToTop = () => {
    const scrollPosition = window.scrollY;
    const heroSectionHeight = heroSection.offsetHeight;
    if (scrollPosition > heroSectionHeight) {
        scrollToTopButton.classList.remove("opacity-0", "invisible");
        scrollToTopButton.classList.add("opacity-100", "visible");
    }
    else {
        scrollToTopButton.classList.add("opacity-0", "invisible");
        scrollToTopButton.classList.remove("opacity-100", "visible");
    }
}
const navigateToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
const handleFilterButtonClick = (e) => {
    const button = e.target.closest("button");
    if (button !== null) {
        const filter = button.dataset.filter;
        
        

        filterContainer.forEach((btn) => {
            btn.classList.remove("active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white", "shadow-lg", "shadow-primary/50")
            if (btn.dataset.filter === filter) {
                btn.classList.add("active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white", "shadow-lg", "shadow-primary/50")
            }
        })
     
        

        portfolioDivs.forEach(function (item) {
            const category = item.dataset.category;
            item.style.opacity = 0;
            item.style.transform = 'scale(0.95)'; 
            setTimeout(function () {
                if (filter === "all" || category === filter) {
                    item.classList.remove("hidden");
                    setTimeout(function () {
                        item.style.opacity = 1;
                        item.style.transform = 'scale(1)';
                    }, 50);
                }
                else {
                    item.classList.add("hidden");
                }
            }, 300);
        })
    }
}
const handleCarouselChange = () => {
    const offset = currentIndex * (100 / currentCards);
    console.log(offset);
    carousel.style.transform = `translateX(${offset}%)`;
}
const updateCarouselShownCards = () => {
    if (window.innerWidth >= 1024) {
        currentCards = 3;
    }
    else if (window.innerWidth >= 768) {
        currentCards = 2;
    }
    else {
        currentCards = 1;
    }
}


handleScrollSpy();
updateCarouselShownCards();



themeToggler.addEventListener("click", () => {
    handleThemeToggle();
});
settingsIcon.addEventListener("click", () => {
    openSideBar();
});
closeIcon.addEventListener("click", () => {
    closeSideBar();
})
fontButtons.forEach(function (button) {
    button.addEventListener("click", (e) => {
        handleFontButtonClick(e);
    });
})
colorsContainer.addEventListener('click', (e) => {
    handleFontColorChange(e);
});
resetBtn.addEventListener("click", () => {
    resetSiteTheme();
})
scrollToTopButton.addEventListener("click", () => {
    navigateToTop();
})
filterButtons.addEventListener("click", (e) => {
    handleFilterButtonClick(e)
})
nextBtn.addEventListener("click", () => {
    const maxIndex = cards.length - currentCards;
    if (currentIndex < maxIndex) {
        currentIndex++;
    }
    else {
        currentIndex = 0;
    }
    handleCarouselChange();
});
prevBtn.addEventListener("click", () => {
    if (currentIndex <= 0) {
        currentIndex = cards.length - currentCards;
    }
    else {
        currentIndex--;
    }
    handleCarouselChange();
})
indicators.forEach(function (indicator) {
    indicator.addEventListener("click", () => {
        const index = indicator.dataset.index;
        console.log(index);
        currentIndex = index;
        handleCarouselChange();
    })
})



window.addEventListener("scroll", () => {
    handleScrollSpy();
    handleScrollToTop();
})
window.addEventListener("resize", () => {
    updateCarouselShownCards();
})