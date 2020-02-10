export class ScrollMaster {
    constructor(defaultDuration, starters = '.smoothScroll') {
        this.starters = document.querySelectorAll(starters);        
        this.defaultDuration = defaultDuration;
    }

    init() {
        // Smooth Scroll Listener
        this.starters.forEach((starter) => {
            starter.addEventListener('click', () => {               
                let elementDuration = this.defaultDuration;
                if (starter.dataset.scrollDuration) elementDuration = starter.dataset.scrollDuration;
                const starterTarget = document.querySelector(starter.dataset.scrollTarget);
                this.smoothScroll(starterTarget, elementDuration);
            });
        });
    }


    smoothScroll(target, duration) {
        const startingPoint = window.pageYOffset;
        // Cílový bod
        const endingPoint = target.getBoundingClientRect().top;
        // počáteční čas je 0
        let startTime = null;

        function animation(timestamp) {
            // Když jsi na začátku, tak přiřad současný čas začátku
            if (!startTime) startTime = timestamp;
            // Čas co uplynul je současný čas minus počáteční, kterej se určí na začátku viz řádek hore
            const timeElapsed = timestamp - startTime;
            // vrátí hodnotu pozice v čase
            const run = easing(timeElapsed, startingPoint, endingPoint, duration);
            // Presun stranku na souřadnice
            window.scrollTo(0, run);
            // pokud uplynuly čas je menší než jak dlouho to má trvat, tak pořad delej tuhle animaci
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easing(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t + b;
            t -= 2;
            return -c / 2 * (t * t * t * t - 2) + b;
        }
        requestAnimationFrame(animation);
    }
}