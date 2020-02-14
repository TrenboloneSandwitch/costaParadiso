require('magnific-popup');
global.$ = require('jquery');


export class Gallery {
    constructor(container, imgsSrcPreview, imgSrc, clsObject, lazy = true) {
        this.container = document.querySelector(container);
        this.imgsSrcPreview = imgsSrcPreview;
        this.imgSrc = imgSrc;
        this.clsObject = clsObject;
        this.lazy = lazy;
        this.galeryImages = [];
        this.initGallery();
    }

    /**
     * Inicializuj Galerii
     */
    initGallery() {
        // Cyklus pro všechny obrázky
        for (let i = 0; i < this.imgsSrcPreview.length; i++) {
            // Vytrvoř Element
            const galleryElement = this.createElement(i);
            // Vlož Element Do Kontejneru
            this.container.appendChild(galleryElement);
        }
        this.initPopUp();
    }

    /**
     * Inicializuj knihovnu magnificPop, která zajišťuje LightBox
     */
    initPopUp() {


        $(".gallery-container").magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    /**
     * Zkontroluj jestli je daná hodnota obsažena v řadě
     * @param {Řada na porovnání} arr
     * @param {Hledaná hodnota} val
     */
    checkIfValueIsInArray(arr, val) {
        return arr.some(arrVal => val === arrVal);
    }

    /**
     * Přiřaď prvku speciální třídu
     * @param {Číselná hodnota elementu } number
     */
    addClass(number) {
        let cls = '';
        let isEmpty = true;
        for (let key in this.clsObject) {
            if (this.checkIfValueIsInArray(this.clsObject[key], number)) {
                cls += key;
                isEmpty = false;
            };
        }
        return { cls, isEmpty };
    }

    /**
     * Vytvoř Element
     * @param {Pořadové číslo elementu v řadě} number
     */
    createElement(number) {
        const link = document.createElement('a');
        const div = document.createElement('div');
        const clsObj = this.addClass(number);

        if (!clsObj.isEmpty)  link.className = clsObj.cls;
        link.href = this.imgSrc[number];
        // Pokud Lazy Load, tak vlož placeholder, vlož url do data-imageSrc a přiřaď třídu
        // Pokud ne tak rovnou tam dej url obrázku
        if (this.lazy === true) {
            //div.style.backgroundImage = `url(./assets/gallery/placeholder.png)`;
            div.setAttribute('imageSrc', this.imgsSrcPreview[number]);
            div.className = 'lazy-background';
        } else div.style.backgroundImage = `url(${this.imgsSrcPreview[number]})`;

        link.appendChild(div);
        return link;
    }
}
