const hero = document.querySelector(".hero");
const product = document.querySelector(".hero-product");

if (hero && product) {

    hero.addEventListener("mousemove", (event) => {

        const rect = hero.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 18;
        const rotateX = (centerY - y) / 18;

        product.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.03, 1.03, 1.03)
        `;
    });


    hero.addEventListener("mouseleave", () => {

        product.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale3d(1, 1, 1)
        `;

    });

}
/* =========================
   FLOATING FRUITS PARALLAX
========================= */

/* =========================
   FRUITS PARALLAX
========================= */

const fruits = [
    {
        element: document.querySelector(".fruit-f"),
        speedX: 0.045,
        speedY: 0.030,
        rotate: 3
    },
    {
        element: document.querySelector(".fruit-p"),
        speedX: 0.065,
        speedY: 0.045,
        rotate: -4
    },
    {
        element: document.querySelector(".fruit-b"),
        speedX: 0.055,
        speedY: 0.040,
        rotate: 5
    },
    {
        element: document.querySelector(".fruit-m"),
        speedX: 0.080,
        speedY: 0.050,
        rotate: -5
    }
];

if (hero) {

    hero.addEventListener("mousemove", (event) => {

        const rect = hero.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const offsetX = x - centerX;
        const offsetY = y - centerY;

        fruits.forEach((fruit) => {

            if (!fruit.element) return;

            const moveX = offsetX * fruit.speedX;
            const moveY = offsetY * fruit.speedY;

            fruit.element.style.transform = `
                translate3d(${moveX}px, ${moveY}px, 0)
                rotate(${moveX / fruit.rotate}deg)
            `;

        });

    });

    hero.addEventListener("mouseleave", () => {

        fruits.forEach((fruit) => {

            if (!fruit.element) return;

            fruit.element.style.transform =
                "translate3d(0, 0, 0) rotate(0deg)";
        });

    });
}