document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("header");
    const menuBtn = document.getElementById("menu_boton");
    const backdrop = document.getElementById("backdrop");

    const useIcon = menuBtn.querySelector("use");

    new Typed("#typed-text", {
        strings: [
            "Freelance",
            "Desarrollador Full Stack",
            "Ingeniería Electrónica",
            "Programador"
        ],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault(); // solo si el destino existe
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Si estamos en móvil, cerrar header y backdrop
                if (window.innerWidth < 1024) {
                    header.classList.add("hidden");
                    backdrop.classList.add("hidden");

                    useIcon.setAttribute("xlink:href", "/recursos/assets/svg/sprite.svg#burger");
                }
            }
        });
    });


    menuBtn.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
            header.classList.toggle("hidden");
            backdrop.classList.toggle("hidden");

            // Cambiar icono
            const isMenuOpen = !header.classList.contains("hidden");

            useIcon.setAttribute("xlink:href", isMenuOpen 
                ? "/recursos/assets/svg/sprite.svg#close" 
                : "/recursos/assets/svg/sprite.svg#burger");
        }
    });

    // Cerrar el menú si se hace clic en el backdrop
    backdrop.addEventListener("click", () => {
        header.classList.add("hidden");
        backdrop.classList.add("hidden");

        useIcon.setAttribute("xlink:href", "/recursos/assets/svg/sprite.svg#burger");
    });

});





