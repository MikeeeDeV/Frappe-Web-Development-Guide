// Progress bar
const bar = document.getElementById("bar");
window.addEventListener("scroll", () => {
    bar.style.width =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100 +
        "%";
});

// Scroll reveal
const io = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("in");
                io.unobserve(e.target);
            }
        });
    },
    { threshold: 0.06 },
);
document.querySelectorAll(".section").forEach((el) => io.observe(el));

// Smooth, replayable details/summary transitions (open + close)
(function enhanceDetails() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll("details").forEach((details) => {
        if (details.__enhanced) return;
        details.__enhanced = true;

        const summary = details.querySelector("summary");
        if (!summary) return;

        // Collect direct children that are not the summary.
        const contentNodes = Array.from(details.children).filter(
            (c) => c.tagName.toLowerCase() !== "summary",
        );
        if (!contentNodes.length) return;

        const wrapper = document.createElement("div");
        wrapper.className = "details-body";
        details.insertBefore(wrapper, contentNodes[0]);
        contentNodes.forEach((n) => wrapper.appendChild(n));

        // Keep native accessibility relationship explicit.
        const panelId = `details-panel-${Math.random().toString(36).slice(2, 9)}`;
        wrapper.id = panelId;
        summary.setAttribute("aria-controls", panelId);
        summary.setAttribute("aria-expanded", details.open ? "true" : "false");

        const setExpanded = (open) => {
            summary.setAttribute("aria-expanded", open ? "true" : "false");
        };

        if (details.open) {
            wrapper.style.opacity = "1";
            wrapper.style.maxHeight = "none";
        } else {
            wrapper.style.opacity = "0";
            wrapper.style.maxHeight = "0px";
        }

        let isAnimating = false;

        const openDetails = () => {
            if (isAnimating || details.open) return;
            isAnimating = true;
            details.open = true;
            setExpanded(true);

            if (prefersReduced) {
                wrapper.style.opacity = "1";
                wrapper.style.maxHeight = "none";
                isAnimating = false;
                return;
            }

            wrapper.classList.remove("replay");
            wrapper.style.maxHeight = "0px";
            wrapper.style.opacity = "0";

            requestAnimationFrame(() => {
                wrapper.style.maxHeight = wrapper.scrollHeight + "px";
                wrapper.style.opacity = "1";
                wrapper.classList.add("replay");
            });

            const finishOpen = (e) => {
                if (e.propertyName !== "max-height") return;
                wrapper.style.maxHeight = "none";
                wrapper.removeEventListener("transitionend", finishOpen);
                isAnimating = false;
            };
            wrapper.addEventListener("transitionend", finishOpen);
        };

        const closeDetails = () => {
            if (isAnimating || !details.open) return;
            isAnimating = true;
            setExpanded(false);

            if (prefersReduced) {
                details.open = false;
                wrapper.style.opacity = "0";
                wrapper.style.maxHeight = "0px";
                isAnimating = false;
                return;
            }

            wrapper.classList.remove("replay");
            wrapper.style.maxHeight = wrapper.scrollHeight + "px";
            wrapper.style.opacity = "1";

            requestAnimationFrame(() => {
                wrapper.style.maxHeight = "0px";
                wrapper.style.opacity = "0";
            });

            const finishClose = (e) => {
                if (e.propertyName !== "max-height") return;
                details.open = false;
                wrapper.removeEventListener("transitionend", finishClose);
                isAnimating = false;
            };
            wrapper.addEventListener("transitionend", finishClose);
        };

        summary.addEventListener("click", (event) => {
            event.preventDefault();
            if (details.open) closeDetails();
            else openDetails();
        });
    });
})();
