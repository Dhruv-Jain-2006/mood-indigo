/* ================= HERO LOAD FADE ================= */

const heroContent = document.getElementById("heroContent");
const heroBg = document.getElementById("heroBg");

window.addEventListener("load", () => {
    heroContent.classList.remove("opacity-0", "translate-y-10");
});


/* ================= SCROLL PARALLAX ================= */

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    heroBg.style.transform = `scale(${1.05 + scrollY * 0.0003})`;

    const heroOpacity = Math.max(1 - scrollY / 500, 0);
    heroContent.style.opacity = heroOpacity;
});


/* ================= NAVBAR SMOOTH SCROLL ================= */

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* ================= HOME CLICK SCROLL ================= */

const homeLink = document.getElementById("homeLink");

homeLink?.addEventListener("click", (e) => {
    e.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ================= HOME SCROLL FIX ================= */

document.addEventListener("DOMContentLoaded", () => {
    const homeNav = document.getElementById("homeNav");

    if (homeNav) {
        homeNav.addEventListener("click", (e) => {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

/* ================= MOBILE MENU TOGGLE ================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn?.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });
});


/* ================= NAVBAR SCROLL BACKGROUND ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        navbar.classList.add(
            "bg-indigoDeep/80",
            "backdrop-blur-md",
            "shadow-lg"
        );
    } else {
        navbar.classList.remove(
            "bg-indigoDeep/80",
            "backdrop-blur-md",
            "shadow-lg"
        );
    }
});


/* ================= SCROLL REVEAL FOR MOOD GRID ================= */

const moodGrid = document.getElementById("moodGrid");

const observer = new IntersectionObserver(
    ([entry]) => {
        if (entry.isIntersecting) {
            moodGrid.classList.remove("opacity-0", "translate-y-8");
        }
    },
    { threshold: 0.4 }
);

observer.observe(moodGrid);


/* ================= MOOD SELECTION ================= */

const moodCards = document.querySelectorAll(".mood-card");
const plannerSection = document.getElementById("planner");

moodCards.forEach(card => {
    card.addEventListener("click", () => {

        moodCards.forEach(c => c.classList.remove("mood-selected"));
        card.classList.add("mood-selected");

        const mood = card.dataset.mood;

        const colors = {
            peace: "#1A1B3A",
            curiosity: "#20245A",
            wonder: "#2A1F4A",
            adventure: "#1F2F4A"
        };

        plannerSection.style.backgroundColor = colors[mood];
    });
});


/* ================= CONTINUE BUTTON ================= */

const continueWrap = document.getElementById("continueWrap");
const continueBtn = document.getElementById("continueBtn");

moodCards.forEach(card => {
    card.addEventListener("click", () => {
        continueWrap.classList.remove("opacity-0", "translate-y-6");
    });
});


/* ================= STEP 2: MEANING REVEAL ================= */

const meaningStep = document.getElementById("meaningStep");
const meaningTitle = document.getElementById("meaningTitle");
const meaningText = document.getElementById("meaningText");

function showMeaningStep() {

    const meanings = {
        peace: {
            title: "A quiet place within the world",
            text: "Soft horizons, slow mornings, and journeys that let your mind finally breathe."
        },
        curiosity: {
            title: "Paths waiting to be discovered",
            text: "Winding streets, hidden cafés, and moments that gently surprise your soul."
        },
        wonder: {
            title: "Where time feels larger than life",
            text: "Golden skies, endless views, and feelings that stay long after the journey ends."
        },
        adventure: {
            title: "Step beyond the familiar",
            text: "Wild landscapes, bold choices, and stories written far from comfort."
        }
    };

    const selected = document.querySelector(".mood-selected")?.dataset.mood;
    if (!selected) return;

    meaningTitle.textContent = meanings[selected].title;
    meaningText.textContent = meanings[selected].text;

    /* --- make element exist in layout --- */
    meaningStep.classList.remove("hidden");

    /* --- allow browser to render, then fade in --- */
    requestAnimationFrame(() => {
        meaningStep.classList.remove("opacity-0");
    });

    /* --- move to Step 3 after pause --- */
    setTimeout(showCountryStep, 2200);
}

/* ================= STEP 3: COUNTRY TRANSITION ================= */

const countryStep = document.getElementById("countryStep");

function showCountryStep() {
    meaningStep.classList.add("opacity-0");

    setTimeout(() => {
        countryStep.classList.remove("opacity-0", "pointer-events-none");

        /* mobile: scroll into view */
        if (window.innerWidth < 768) {
            countryStep.scrollIntoView({ behavior: "smooth" });
        }
    }, 400);
}


/* ================= CONTINUE CLICK FLOW ================= */

continueBtn.addEventListener("click", () => {

    const isMobile = window.innerWidth < 768;

    /* ---------- MOBILE FLOW ---------- */
    if (isMobile) {
        showMeaningStep(); // show instantly
        meaningStep.scrollIntoView({ behavior: "smooth" });
        return;
    }

    /* ---------- DESKTOP CINEMATIC ---------- */

    moodGrid.style.opacity = "0";
    continueWrap.style.opacity = "0";

    moodGrid.style.transform = "translateY(20px)";
    continueWrap.style.transform = "translateY(20px)";

    setTimeout(showMeaningStep, 400);
});

/* ================= RESPONSIVE STATE RESET ================= */

function resetPlannerState() {
    /* ----- Step 1 visible again ----- */
    moodGrid.style.opacity = "";
    moodGrid.style.transform = "";

    /* hide Continue button properly */
    continueWrap.classList.add("opacity-0", "translate-y-6");

    /* remove any previous mood selection */
    document
        .querySelectorAll(".mood-card")
        .forEach(card => card.classList.remove("mood-selected"));

    /* ----- hide Step 2 & 3 ----- */
    meaningStep.classList.add("hidden", "opacity-0", "pointer-events-none");
    countryStep.classList.add("hidden", "opacity-0", "pointer-events-none");
}

/* ================= RESPONSIVE RESET ================= */

let lastIsMobile = window.innerWidth < 768;

function resetPlannerState() {
    /* ----- Step 1 visible again ----- */
    moodGrid.style.opacity = "";
    moodGrid.style.transform = "";

    /* hide Continue button */
    continueWrap.classList.add("opacity-0", "translate-y-6");

    /* remove selected mood */
    document.querySelectorAll(".mood-card")
        .forEach(card => card.classList.remove("mood-selected"));

    /* ----- hide Step 2 & 3 ----- */
    meaningStep.classList.add("opacity-0", "pointer-events-none");
    countryStep.classList.add("opacity-0", "pointer-events-none");
}

/* listen for breakpoint crossing only */
window.addEventListener("resize", () => {
    const isMobile = window.innerWidth < 768;

    if (isMobile !== lastIsMobile) {
        resetPlannerState();
        lastIsMobile = isMobile;
    }
});

/* ================= STEP 4A — COUNTRY SELECTION ================= */

const countryCards = document.querySelectorAll(".country-card");

countryCards.forEach(card => {
    card.addEventListener("click", () => {

        // remove highlight from all
        countryCards.forEach(c => {
            c.classList.remove("ring-2", "ring-lavenderMist");
            c.style.opacity = "0.5";
            c.style.transform = "scale(0.98)";
        });

        // highlight selected
        card.classList.add("ring-2", "ring-lavenderMist");
        card.style.opacity = "1";
        card.style.transform = "scale(1.02)";
    });
});

/* ================= STEP 4B — ITINERARY REVEAL ================= */

const itineraryStep = document.getElementById("itineraryStep");
const itineraryTitle = document.getElementById("itineraryTitle");
const itineraryDays = document.getElementById("itineraryDays");

/* simple static itineraries for now */
const itineraries = {
    Iceland: [
        ["Reykjavík Harbour", "Sun Voyager", "Geo Pool"],
        ["Þingvellir", "Gullfoss", "Secret Lagoon"],
        ["Glacier Lagoon", "Diamond Beach", "Vík Beach"]
    ],
    Japan: [
        ["Sensō-ji", "River Walk", "TeamLab"],
        ["Bamboo Grove", "Zen Garden", "Gion"],
        ["Fushimi Inari", "Philosopher Path", "Onsen"]
    ],
    "New Zealand": [
        ["Queenstown Lake", "Gondola", "Bob’s Peak"],
        ["Milford Sound", "Mirror Lakes", "Alpine Drive"],
        ["Hooker Valley", "Tasman Glacier", "Tekapo Stars"]
    ]
};

countryCards.forEach(card => {
    card.addEventListener("click", () => {

        const country =
            card.querySelector(".country-title")?.textContent ||
            card.textContent.trim();

        const days = itineraries[country];
        if (!days) return;

        /* ---------- set title ---------- */
        itineraryTitle.textContent = `Your 3-day journey in ${country}`;

        /* ---------- build day cards ---------- */
        itineraryDays.innerHTML = days.map((places, i) => `
            <div class="itinerary-card">
                <div class="itinerary-day">DAY ${i + 1}</div>
                <div>${places.join(" • ")}</div>
            </div>
        `).join("");

        /* ---------- reveal itinerary ---------- */
        itineraryStep.classList.remove("opacity-0", "translate-y-8");

        /* ---------- cinematic scroll to itinerary ---------- */
        setTimeout(() => {
            itineraryStep.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 150);

        /* ---------- NOW hide the intro heading ---------- */
        const plannerIntro = document.getElementById("plannerIntro");
        plannerIntro?.remove();
    });
});

const contactForm = document.getElementById("contactForm");
const successMsg = document.getElementById("contactSuccess");

if (contactForm && successMsg) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // stop page jump

        // show message
        successMsg.classList.remove("opacity-0");
        successMsg.classList.add("opacity-100");
        // reset form
        contactForm.reset();
        // fade away after 3 seconds
        setTimeout(() => {
            successMsg.classList.remove("opacity-100");
            successMsg.classList.add("opacity-0");
        }, 2000);
    });
}