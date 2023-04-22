export class Menu {
    hamburger = document.querySelector(".hamburger");
    navMenu = document.querySelector(".nav-menu");

    constructor() {
        this.hamburger.addEventListener("click", this.mobileMenu.bind(this));
    }

    mobileMenu() {
        this.hamburger.classList.toggle("active");
        this.navMenu.classList.toggle("active");
    };
}