const hero = document.querySelector(".hero");
const product = document.querySelector(".hero-product");


/* =========================
   OFFERS + CART
========================= */

const offerFlavorModal =
    document.getElementById("offerFlavorModal");

const closeOfferFlavorModalBtn =
    document.getElementById("closeOfferFlavorModal");

const offerFlavorSelection =
    document.getElementById("offerFlavorSelection");

const offerFlavorDescription =
    document.getElementById("offerFlavorDescription");

const offerCartPanel =
    document.getElementById("offerCartPanel");

const offerCartOverlay =
    document.getElementById("offerCartOverlay");

const offerCartItems =
    document.getElementById("offerCartItems");

const offerCartTotal =
    document.getElementById("offerCartTotal");

const offerCartCount =
    document.getElementById("offerCartCount");

const offerFloatingCartBtn =
    document.getElementById("offerFloatingCartBtn");

const offerCartCloseBtn =
    document.getElementById("offerCartCloseBtn");

const offerConfirmCustomerBtn =
    document.getElementById("offerConfirmCustomerBtn");

const offerCustomerConfirmedMessage =
    document.getElementById("offerCustomerConfirmedMessage");

const offerWhatsappOrderBtn =
    document.getElementById("offerWhatsappOrderBtn");

const offerCustomerName =
    document.getElementById("offerCustomerName");

const offerCustomerPhone =
    document.getElementById("offerCustomerPhone");

const offerCustomerAddress =
    document.getElementById("offerCustomerAddress");

const offerCustomerNotes =
    document.getElementById("offerCustomerNotes");


let offerCart = [];

let selectedOffer = null;

let offerCustomerConfirmed = false;


/* =========================
   OFFER FLAVORS
========================= */

const offerFlavors = {

    basic: [
        "فانيليا",
        "مانجا",
        "فراولة",
        "توت",
        "ليمون",
        "لبان",
        "تفاح",
        "أناناس",

        "شوكولاتة",
        "شوكولاتة دارك",
        "شوكولاتة بندق",
        "شوكولاتة سنيكرز",
        "شوكولاتة كيت كات",
        "نسكافيه",
        "لوتس",
        "أوريو",
        "زبادي فراولة",
        "زبادي توت",
        "زبادي كيوي",
        "زبادي مانجا",
        "زبادي تفاح",
        "زبادي أناناس",
        "زبادي عسل",
        "فستق",
        "مستكة فستق",
        "بندق",
        "فانيليا لوز"
    ],

    premium: [
        "فانيليا",
        "مانجا",
        "فراولة",
        "توت",
        "ليمون",
        "لبان",
        "تفاح",
        "أناناس",

        "شوكولاتة",
        "شوكولاتة دارك",
        "شوكولاتة بندق",
        "شوكولاتة سنيكرز",
        "شوكولاتة كيت كات",
        "نسكافيه",
        "لوتس",
        "أوريو",
        "زبادي فراولة",
        "زبادي توت",
        "زبادي كيوي",
        "زبادي مانجا",
        "زبادي تفاح",
        "زبادي أناناس",
        "زبادي عسل",
        "فستق",
        "مستكة فستق",
        "بندق",
        "فانيليا لوز"
    ]

};


/* =========================
   OPEN OFFER FLAVORS
========================= */

document.querySelectorAll(".offer-btn").forEach(function (button) {

    button.addEventListener("click", function () {
    console.log("OFFER CLICKED", button.dataset.offerType);
    console.log("FLAVOR BOX:", offerFlavorSelection);

        const type =
            button.dataset.offerType;

        const price =
            Number(button.dataset.offerPrice);

        selectedOffer = {
            type: type,
            price: price
        };

        offerFlavorSelection.innerHTML = "";

        const flavors =
            offerFlavors[type] || [];
            console.log("FLAVORS:", flavors);

        offerFlavorDescription.textContent =
            type === "premium"
                ? "اختار نكهة Premium للعرض"
                : "اختار نكهتك الأساسية للعرض";


        flavors.forEach(function (flavor) {

            const flavorButton =
                document.createElement("button");

            flavorButton.type = "button";

            flavorButton.textContent =
                flavor;

            flavorButton.addEventListener(
                "click",
                function () {

                    addOfferToCart(
                        flavor
                    );

                    closeOfferFlavorModal();

                }
            );

            offerFlavorSelection.appendChild(
                flavorButton
            );

        });


        offerFlavorModal.classList.add("active");
console.log("MODAL OPENING");
        offerFlavorModal.style.visibility =
            "visible";

        offerFlavorModal.style.opacity =
            "1";

        offerFlavorModal.style.pointerEvents =
            "auto";

    });

});


/* =========================
   CLOSE FLAVOR MODAL
========================= */

function closeOfferFlavorModal() {

    if (!offerFlavorModal) {
        return;
    }

    offerFlavorModal.classList.remove(
        "active"
    );

    offerFlavorModal.style.visibility =
        "hidden";

    offerFlavorModal.style.opacity =
        "0";

    offerFlavorModal.style.pointerEvents =
        "none";

    selectedOffer = null;

}

if (closeOfferFlavorModalBtn) {

    closeOfferFlavorModalBtn.addEventListener(
        "click",
        closeOfferFlavorModal
    );

}

if (offerFlavorModal) {

    offerFlavorModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                offerFlavorModal
            ) {

                closeOfferFlavorModal();

            }

        }
    );

}


/* =========================
   ADD OFFER TO CART
========================= */

function addOfferToCart(flavor) {

    if (!selectedOffer) {
        return;
    }

    const offerName =
        selectedOffer.type === "premium"
            ? "عرض Premium — كرتونة المستوى الأعلى"
            : "عرض المستوى العالي — كرتونة الآيس كريم";


    offerCart.push({

        id: Date.now(),

        pack: offerName,

        type: selectedOffer.type,

        flavor: flavor,

        price: selectedOffer.price

    });


    updateOfferCartUI();

    openOfferCart();

}


/* =========================
   UPDATE CART
========================= */

function updateOfferCartUI() {

    offerCartCount.textContent =
        offerCart.length;


    if (offerCart.length === 0) {

        offerCartItems.innerHTML = `

            <div class="cart-empty">

                <div class="cart-empty-icon">
                    🛒
                </div>

                <h3>
                    السلة فارغة
                </h3>

                <p>
                    اختار العرض والنكهة
                    لإضافة طلبك هنا.
                </p>

            </div>

        `;

        offerCartTotal.innerHTML =
            `0 <small>EGP</small>`;

        return;

    }


    offerCartItems.innerHTML = "";

    let total = 0;


    offerCart.forEach(
        function (item, index) {

            total +=
                Number(item.price);


            const cartItem =
                document.createElement("div");

            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-info">

                    <span class="cart-item-number">
                        ${index + 1}
                    </span>

                    <div>

                        <strong>
                            ${item.pack}
                        </strong>

                        <p>
                            النكهة: ${item.flavor}
                        </p>

                        <small>
                            ${item.type === "premium"
                                ? "Premium"
                                : "Basic"}
                        </small>

                    </div>

                </div>


                <div class="cart-item-side">

                    <strong>
                        ${item.price}
                        <small>EGP</small>
                    </strong>

                    <button
                        type="button"
                        class="offer-cart-remove-btn"
                        data-id="${item.id}">
                        حذف
                    </button>

                </div>

            `;


            offerCartItems.appendChild(
                cartItem
            );

        }
    );


    offerCartTotal.innerHTML =
        `${total} <small>EGP</small>`;


    document
        .querySelectorAll(
            ".offer-cart-remove-btn"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    offerCart =
                        offerCart.filter(
                            function (item) {
                                return item.id !== id;
                            }
                        );

                    updateOfferCartUI();

                }
            );

        });


    if (offerWhatsappOrderBtn) {

        offerWhatsappOrderBtn.disabled =
            !offerCustomerConfirmed;

    }

}


/* =========================
   OPEN CART
========================= */

function openOfferCart() {

    if (!offerCartPanel) {
        return;
    }

    offerCartPanel.classList.add(
        "open"
    );

    if (offerCartOverlay) {

        offerCartOverlay.classList.add(
            "show"
        );

    }

}


/* =========================
   CLOSE CART
========================= */

function closeOfferCart() {

    if (offerCartPanel) {

        offerCartPanel.classList.remove(
            "open"
        );

    }

    if (offerCartOverlay) {

        offerCartOverlay.classList.remove(
            "show"
        );

    }

}


if (offerFloatingCartBtn) {

    offerFloatingCartBtn.addEventListener(
        "click",
        openOfferCart
    );

}


if (offerCartCloseBtn) {

    offerCartCloseBtn.addEventListener(
        "click",
        closeOfferCart
    );

}


if (offerCartOverlay) {

    offerCartOverlay.addEventListener(
        "click",
        closeOfferCart
    );

}


/* =========================
   CUSTOMER DATA
========================= */

function invalidateOfferCustomer() {

    offerCustomerConfirmed =
        false;

    if (offerConfirmCustomerBtn) {

        offerConfirmCustomerBtn.classList.remove(
            "confirmed"
        );

        offerConfirmCustomerBtn.textContent =
            "✓ تأكيد البيانات";

    }

    if (offerCustomerConfirmedMessage) {

        offerCustomerConfirmedMessage.classList.remove(
            "active"
        );

    }

    if (offerWhatsappOrderBtn) {

        offerWhatsappOrderBtn.disabled =
            true;

    }

}


[
    offerCustomerName,
    offerCustomerPhone,
    offerCustomerAddress,
    offerCustomerNotes

].forEach(function (input) {

    if (!input) {
        return;
    }

    input.addEventListener(
        "input",
        invalidateOfferCustomer
    );

});


/* =========================
   CONFIRM CUSTOMER
========================= */

if (offerConfirmCustomerBtn) {

    offerConfirmCustomerBtn.addEventListener(
        "click",
        function () {

            const name =
                offerCustomerName.value.trim();

            const phone =
                offerCustomerPhone.value.trim();

            const address =
                offerCustomerAddress.value.trim();


            if (!name) {

                alert(
                    "من فضلك اكتب الاسم."
                );

                offerCustomerName.focus();

                return;

            }


            if (!/^01\d{9}$/.test(
                phone.replace(/\s+/g, "")
            )) {

                alert(
                    "من فضلك اكتب رقم موبايل مصري صحيح مكون من 11 رقم."
                );

                offerCustomerPhone.focus();

                return;

            }


            if (!address) {

                alert(
                    "من فضلك اكتب عنوان التوصيل بالتفصيل."
                );

                offerCustomerAddress.focus();

                return;

            }


            offerCustomerConfirmed =
                true;


            offerConfirmCustomerBtn.classList.add(
                "confirmed"
            );

            offerConfirmCustomerBtn.textContent =
                "✓ تم تأكيد البيانات";


            offerCustomerConfirmedMessage.classList.add(
                "active"
            );


            offerWhatsappOrderBtn.disabled =
                offerCart.length === 0;

        }
    );

}


/* =========================
   SEND WHATSAPP ORDER
========================= */

if (offerWhatsappOrderBtn) {

    offerWhatsappOrderBtn.addEventListener(
        "click",
        function () {

            if (offerCart.length === 0) {

                alert(
                    "السلة فارغة."
                );

                return;

            }


            if (!offerCustomerConfirmed) {

                alert(
                    "من فضلك أكد بيانات العميل أولاً."
                );

                return;

            }


            const name =
                offerCustomerName.value.trim();

            const phone =
                offerCustomerPhone.value.trim();

            const address =
                offerCustomerAddress.value.trim();

            const notes =
                offerCustomerNotes.value.trim();


            let message =
                "🍦 *طلب جديد من Hamdy Ice*%0A%0A";


            message +=
                "👤 *بيانات العميل*%0A";

            message +=
                `الاسم: ${name}%0A`;

            message +=
                `الموبايل: ${phone}%0A`;

            message +=
                `العنوان: ${address}%0A`;


            if (notes) {

                message +=
                    `ملاحظات: ${notes}%0A`;

            }


            message +=
                "%0A🛒 *تفاصيل الطلب*%0A";


            offerCart.forEach(
                function (item, index) {

                    message +=
                        `%0A${index + 1}. ${item.pack}%0A`;

                    message +=
                        `الحجم: 2 جالون = 6 لتر%0A`;

                    message +=
                        `النكهة: ${item.flavor}%0A`;

                    message +=
                        `النوع: ${
                            item.type === "premium"
                                ? "Premium"
                                : "Basic"
                        }%0A`;

                    message +=
                        `السعر: ${item.price} EGP%0A`;

                }
            );


            const total =
                offerCart.reduce(
                    function (sum, item) {

                        return sum +
                            Number(item.price);

                    },
                    0
                );


            message +=
                `%0A💰 *الإجمالي: ${total} EGP*`;


            const whatsappURL =
                `https://wa.me/201093957907?text=${message}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


/* =========================
   INITIALIZE OFFER CART
========================= */

updateOfferCartUI();

console.log("OFFER JS WORKING");
console.log("OFFER BUTTONS:", document.querySelectorAll(".offer-btn").length);