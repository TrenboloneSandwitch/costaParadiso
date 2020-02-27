export class Lazy{
    constructor(){
        this.lazyBackgroundImages = document.querySelectorAll('.lazy-background');
        this.lazyImgs = document.querySelectorAll('.lazy-img');
        this.lazyLoadingBackground();
        this.lazyLoading();
    }

    /**
     * Lazy Loaduj pozadí obrázku
     */
    lazyLoadingBackground() {
        if ("IntersectionObserver" in window) {
            let backgroundObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    // Pokud je element ve viewportu tak =>
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        // Změň obrázek
                        target.style.backgroundImage = `url(${target.dataset.imageSrc})`;
                        // Vyruš sledování prvku, protože obrázek už změněn
                        backgroundObserver.unobserve(target);
                    }
                });
            });
            // PřiřaĎ požadavek na sledování pro element
            this.lazyBackgroundImages.forEach( lazyBackground => {
                backgroundObserver.observe(lazyBackground);
            });
        }
    }

    lazyLoading() {
        if ("IntersectionObserver" in window) {
            let imgObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    // Pokud je element ve viewportu tak =>
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        // Změň obrázek
                        target.src = target.dataset.imageSrc;
                        // Vyruš sledování prvku, protože obrázek už změněn
                        imgObserver.unobserve(target);
                    }
                });
            });
            // PřiřaĎ požadavek na sledování pro element
            this.lazyImgs.forEach( lazyImg => {
                imgObserver.observe(lazyImg);
            });
        }
    }

}
