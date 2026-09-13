document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const modal =
        document.getElementById("flavorModal");

    const closeButton =
        document.getElementById("closeFlavorModal");

    const flavorSelection =
        document.querySelector(".flavor-selection");

    const addPackButton =
        document.querySelector(".add-family-pack-btn");

    const packTypeModal =
        document.getElementById("packTypeModal");

    const closePackType =
        document.getElementById("closePackType");

    const packTypeOptions =
        document.querySelectorAll(".pack-type-option");

   const familyCardsContainer =
    document.querySelector(".family-packages");


    // ==========================================
    // CART ELEMENTS
    // ==========================================

    const cartPanel =
        document.getElementById("cartPanel");

    const cartOverlay =
        document.getElementById("cartOverlay");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");

    const floatingCartBtn =
        document.getElementById("floatingCartBtn");

    const cartCloseBtn =
        document.getElementById("cartCloseBtn");

    const whatsappOrderBtn =
        document.getElementById("whatsappOrderBtn");

    const customerName =
        document.getElementById("customerName");

    const customerPhone =
        document.getElementById("customerPhone");

    const customerAddress =
        document.getElementById("customerAddress");

    const customerNotes =
        document.getElementById("customerNotes");

    const confirmCustomerBtn =
        document.getElementById("confirmCustomerBtn");

    const customerConfirmedMessage =
        document.getElementById(
            "customerConfirmedMessage"
        );


    // ==========================================
    // STATE
    // ==========================================

    let currentCard = null;

    let cart = [];

    let nextCardId = 1;

    let customerConfirmed = false;


    // ==========================================
    // FLAVORS
    // ==========================================

    const flavors = [

        // BASIC
        {
            name: "فانيليا",
            type: "basic"
        },

        {
            name: "مانجا",
            type: "basic"
        },

        {
            name: "فراولة",
            type: "basic"
        },

        {
            name: "توت",
            type: "basic"
        },

        {
            name: "ليمون",
            type: "basic"
        },

        {
            name: "لبان",
            type: "basic"
        },

        {
            name: "تفاح",
            type: "basic"
        },

        {
            name: "أناناس",
            type: "basic"
        },


        // PREMIUM
        {
            name: "شوكولاتة",
            type: "premium"
        },

        {
            name: "شوكولاتة دارك",
            type: "premium"
        },

        {
            name: "شوكولاتة بندق",
            type: "premium"
        },

        {
            name: "شوكولاتة سنيكرز",
            type: "premium"
        },

        {
            name: "شوكولاتة كيت كات",
            type: "premium"
        },

        {
            name: "نسكافيه",
            type: "premium"
        },

        {
            name: "لوتس",
            type: "premium"
        },

        {
            name: "أوريو",
            type: "premium"
        },

        {
            name: "زبادي فراولة",
            type: "premium"
        },

        {
            name: "زبادي توت",
            type: "premium"
        },

        {
            name: "زبادي كيوي",
            type: "premium"
        },

        {
            name: "زبادي مانجا",
            type: "premium"
        },

        {
            name: "زبادي تفاح",
            type: "premium"
        },

        {
            name: "زبادي أناناس",
            type: "premium"
        },

        {
            name: "زبادي عسل",
            type: "premium"
        },

        {
            name: "فستق",
            type: "premium"
        },

        {
            name: "مستكة فستق",
            type: "premium"
        },

        {
            name: "بندق",
            type: "premium"
        },

        {
            name: "فانيليا لوز",
            type: "premium"
        }

    ];
    
    // ==========================================
// GET PACK DATA
// ==========================================

function getPackData(card, flavorType) {

    if (!card || !flavorType) {
        return null;
    }


    const priceButton =
        card.querySelector(
            `.pack-price-option[data-flavor-type="${flavorType}"]`
        );


    if (!priceButton) {
        return null;
    }


    const packLabelElement =
        card.querySelector(".pack-label");


    const rawPackLabel =
        packLabelElement
            ? packLabelElement.textContent.trim()
            : "Family Pack";


    const typeLabel =
        flavorType === "premium"
            ? "PREMIUM"
            : "BASIC";


    const pack =
        /•\s*(BASIC|PREMIUM)$/i.test(rawPackLabel)
            ? rawPackLabel
            : `${rawPackLabel} • ${typeLabel}`;


    const priceElement =
        priceButton.querySelector("strong");


    const price =
        priceElement
            ? parseInt(
                priceElement.textContent.replace(
                    /[^\d]/g,
                    ""
                ),
                10
            )
            : 0;


    return {
        pack: pack,
        type: flavorType,
        price: price
    };
}
// ==========================================
// UPDATE CART UI
// ==========================================

function updateCartUI() {

    if (!cartItems || !cartTotal || !cartCount) {
        return;
    }


    // عدد المنتجات في السلة
    cartCount.textContent = cart.length;


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="cart-empty">

                <div class="cart-empty-icon">
                    🛒
                </div>

                <h3>
                    السلة فارغة
                </h3>

                <p>
                    اختار العبوات والنكهات
                    لإضافة طلبك هنا.
                </p>

            </div>
        `;


        cartTotal.innerHTML =
            `0 <small>EGP</small>`;


        if (whatsappOrderBtn) {

            whatsappOrderBtn.disabled = !(
                cart.length > 0 &&
                customerConfirmed
            );

        }


        return;
    }


    // ==========================================
    // RENDER CART ITEMS
    // ==========================================

    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach(function (item, index) {

        total += Number(item.price || 0);


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
                        ${
                            item.type === "premium"
                                ? "Premium"
                                : "Basic"
                        }
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
                    class="cart-remove-btn"
                    data-cart-index="${index}">
                    حذف
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    // ==========================================
    // TOTAL
    // ==========================================

    cartTotal.innerHTML =
        `${total} <small>EGP</small>`;


    // ==========================================
    // WHATSAPP BUTTON
    // ==========================================

    if (whatsappOrderBtn) {

        whatsappOrderBtn.disabled = !(
            cart.length > 0 &&
            customerConfirmed
        );

    }


    // ==========================================
    // REMOVE CART ITEMS
    // ==========================================

    document
        .querySelectorAll(".cart-remove-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(
                            button.dataset.cartIndex
                        );


                    removeCartItem(index);

                }
            );

        });

}
// ==========================================
// CUSTOMER DATA
// ==========================================

function invalidateCustomerConfirmation() {

    customerConfirmed = false;


    if (confirmCustomerBtn) {

        confirmCustomerBtn.classList.remove(
            "confirmed"
        );

        confirmCustomerBtn.textContent =
            "✓ تأكيد البيانات";

    }


    if (customerConfirmedMessage) {

        customerConfirmedMessage.classList.remove(
            "active"
        );

    }


    if (whatsappOrderBtn) {

        whatsappOrderBtn.disabled = true;

    }

}


// ==========================================
// CUSTOMER VALIDATION
// ==========================================

function validateCustomerData() {

    const name =
        customerName
            ? customerName.value.trim()
            : "";


    const phone =
        customerPhone
            ? customerPhone.value.trim()
            : "";


    const address =
        customerAddress
            ? customerAddress.value.trim()
            : "";


    // ==========================================
    // NAME
    // ==========================================

    if (!name) {

        alert(
            "من فضلك اكتب الاسم."
        );

        customerName?.focus();

        return false;

    }


    // ==========================================
    // PHONE
    // ==========================================

    if (!phone) {

        alert(
            "من فضلك اكتب رقم الموبايل."
        );

        customerPhone?.focus();

        return false;

    }


    const normalizedPhone =
        phone.replace(
            /\s+/g,
            ""
        );


    if (!/^01\d{9}$/.test(normalizedPhone)) {

        alert(
            "من فضلك اكتب رقم موبايل مصري صحيح مكون من 11 رقم."
        );

        customerPhone?.focus();

        return false;

    }


    // ==========================================
    // ADDRESS
    // ==========================================

    if (!address) {

        alert(
            "من فضلك اكتب عنوان التوصيل بالتفصيل."
        );

        customerAddress?.focus();

        return false;

    }


    return true;

}


// ==========================================
// CONFIRM CUSTOMER DATA
// ==========================================

if (confirmCustomerBtn) {

    confirmCustomerBtn.addEventListener(
        "click",
        function () {

            if (!validateCustomerData()) {
                return;
            }


            customerConfirmed = true;


            confirmCustomerBtn.classList.add(
                "confirmed"
            );


            confirmCustomerBtn.textContent =
                "✓ تم تأكيد البيانات";


            if (customerConfirmedMessage) {

                customerConfirmedMessage.classList.add(
                    "active"
                );

            }


            if (whatsappOrderBtn) {

                whatsappOrderBtn.disabled = !(
                    cart.length > 0 &&
                    customerConfirmed
                );

            }

        }
    );

}


// ==========================================
// CUSTOMER INPUT CHANGE
// ==========================================

[
    customerName,
    customerPhone,
    customerAddress,
    customerNotes

].forEach(function (input) {

    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        function () {

            if (customerConfirmed) {

                invalidateCustomerConfirmation();

            }

        }
    );

});
// ==========================================
// SHOW FLAVORS FOR CARD
// ==========================================

function showFlavorsForPack(card) {

    if (!card || !flavorSelection || !modal) {
        return;
    }


    const flavorType =
        card.dataset.flavorType;


    if (!flavorType) {
        return;
    }


    // حفظ الكارت الحالي
    currentCard = card;


    // ==========================================
    // RESET MODAL INLINE STYLES
    // ==========================================

    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    modal.style.pointerEvents = "auto";


    flavorSelection.style.display = "grid";
    flavorSelection.style.visibility = "visible";
    flavorSelection.style.opacity = "1";


    // ==========================================
    // FILTER FLAVORS
    // ==========================================

    const buttons =
        flavorSelection.querySelectorAll("button");


    buttons.forEach(function (button) {

        button.classList.remove("selected");


        if (
            button.dataset.type === flavorType
        ) {

            button.style.display = "block";
            button.style.visibility = "visible";
            button.style.opacity = "1";

        } else {

            button.style.display = "none";

        }

    });


    // ==========================================
    // OPEN MODAL
    // ==========================================

    modal.classList.add("active");

}
// ==========================================
// CLOSE FLAVOR MODAL
// ==========================================

function closeFlavorModal() {

    if (!modal) {
        return;
    }


    // إغلاق الـ Modal
    modal.classList.remove("active");

    modal.style.visibility = "hidden";
    modal.style.opacity = "0";
    modal.style.pointerEvents = "none";


    // إزالة Active من Basic / Premium
    if (currentCard) {

        currentCard
            .querySelectorAll(".pack-price-option")
            .forEach(function (button) {

                button.classList.remove("active");

            });

    }


    // إلغاء الكارت الحالي
    currentCard = null;

}


// ==========================================
// CLOSE WITH X
// ==========================================

if (closeButton) {

    closeButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            closeFlavorModal();

        }
    );

}


// ==========================================
// CLOSE BY CLICKING OUTSIDE
// ==========================================

if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeFlavorModal();

            }

        }
    );

}


// ==========================================
// CLOSE WITH ESCAPE
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("active")
        ) {

            closeFlavorModal();

        }

    }
);
// ==========================================
// CREATE FLAVOR BUTTONS
// ==========================================

if (flavorSelection) {

    flavorSelection.innerHTML = "";

    flavors.forEach(function (flavor) {

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = flavor.name;
        button.dataset.type = flavor.type;

        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            // لازم يكون فيه كارت حالي
            if (!currentCard) {
                console.log("NO CURRENT CARD");
                return;
            }

            const card = currentCard;

            console.log(
                "Selected:",
                flavor.name,
                "Card:",
                card
            );


            // ==========================================
            // GET SELECTED FLAVOR BOX
            // ==========================================

            const selectedFlavorText =
                card.querySelector(".selected-flavor");

            if (!selectedFlavorText) {
                console.log("NO SELECTED FLAVOR BOX");
                return;
            }


            // ==========================================
            // SELECT BUTTON
            // ==========================================

            flavorSelection
                .querySelectorAll("button")
                .forEach(function (item) {

                    item.classList.remove("selected");

                });

            button.classList.add("selected");


            // ==========================================
            // SAVE FLAVOR
            // ==========================================

            selectedFlavorText.dataset.flavorName =
                flavor.name;

            selectedFlavorText.dataset.flavorType =
                flavor.type;

            selectedFlavorText.classList.add(
                "has-selection"
            );


            // ==========================================
            // SHOW SELECTED FLAVOR
            // ==========================================

            selectedFlavorText.innerHTML = `

                <span>
                    النكهة المختارة:
                    ${flavor.name} ✅
                </span>

                <button
                    type="button"
                    class="remove-flavor-btn">
                    حذف النكهة ×
                </button>

            `;


            // ==========================================
            // SAVE TYPE ON CARD
            // ==========================================

            card.dataset.flavorType =
                flavor.type;


            // ==========================================
            // CREATE CART BUTTON
            // ==========================================

            let addToCartButton =
                card.querySelector(".add-to-cart-btn");


            if (!addToCartButton) {

                addToCartButton =
                    createCartButton(card);

                selectedFlavorText.insertAdjacentElement(
                    "afterend",
                    addToCartButton
                );

            }


            // ==========================================
            // REMOVE ACTIVE
            // ==========================================

            card
                .querySelectorAll(".pack-price-option")
                .forEach(function (priceButton) {

                    priceButton.classList.remove(
                        "active"
                    );

                });


            // ==========================================
            // CLOSE MODAL
            // ==========================================

            closeFlavorModal();

        });


        flavorSelection.appendChild(button);

    });

}

// ==========================================
// REMOVE SELECTED FLAVOR
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const removeButton =
            event.target.closest(
                ".remove-flavor-btn"
            );


        if (!removeButton) {
            return;
        }


        event.preventDefault();
        event.stopPropagation();


        const card =
            removeButton.closest(
                ".family-card"
            );


        if (!card) {
            return;
        }


        const selectedFlavorText =
            card.querySelector(
                ".selected-flavor"
            );


        if (!selectedFlavorText) {
            return;
        }


        // ==========================================
        // RESET FLAVOR
        // ==========================================

        selectedFlavorText.classList.remove(
            "has-selection"
        );


        selectedFlavorText.innerHTML =
            "لم يتم اختيار نكهة";


        delete selectedFlavorText.dataset.flavorName;

        delete selectedFlavorText.dataset.flavorType;


        // ==========================================
        // REMOVE ADD TO CART BUTTON
        // ==========================================

        const addButton =
            card.querySelector(
                ".add-to-cart-btn"
            );


        if (addButton) {
            addButton.remove();
        }


        // ==========================================
        // RESET CARD DATA
        // ==========================================

        delete card.dataset.flavorType;

        card.dataset.addedToCart =
            "false";


        // ==========================================
        // REMOVE ACTIVE
        // ==========================================

        card
            .querySelectorAll(
                ".pack-price-option"
            )
            .forEach(function (button) {

                button.classList.remove(
                    "active"
                );

            });


        // ==========================================
        // REMOVE CARD FROM CART
        // ==========================================

        const cardId =
            card.dataset.cardId;


        if (cardId) {

            cart =
                cart.filter(function (item) {

                    return item.cardId !== cardId;

                });

        }


        updateCartUI();

    }
);
// ==========================================
// BASIC / PREMIUM - OPEN FLAVORS
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const priceButton =
            event.target.closest(
                ".pack-price-option"
            );


        if (!priceButton) {
            return;
        }


        const card =
            priceButton.closest(
                ".family-card"
            );


        if (!card) {
            return;
        }


        const flavorType =
            priceButton.dataset.flavorType;


        if (!flavorType) {
            return;
        }


        // ==========================================
        // SET CURRENT CARD
        // ==========================================

        currentCard = card;


        card.dataset.flavorType =
            flavorType;


        // ==========================================
        // CHECK PRICE OPTIONS
        // ==========================================

        const priceButtons =
            card.querySelectorAll(
                ".pack-price-option"
            );


        // ==========================================
        // ORIGINAL CARD
        // BASIC + PREMIUM
        // ==========================================

        if (priceButtons.length > 1) {

            priceButtons.forEach(
                function (button) {

                    button.classList.remove(
                        "active"
                    );

                }
            );


            priceButton.classList.add(
                "active"
            );

        }


        // ==========================================
        // ADDED CARD
        // ONE OPTION ONLY
        // NEVER ACTIVE
        // ==========================================

        else {

            priceButton.classList.remove(
                "active"
            );

        }


        // ==========================================
        // OPEN FLAVOR MODAL
        // ==========================================

        showFlavorsForPack(card);

    }
);
// ==========================================
// ADD FAMILY PACK
// ==========================================

if (addPackButton && packTypeModal) {

    addPackButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            packTypeModal.classList.add("active");

        }
    );

}


// ==========================================
// CLOSE PACK TYPE MODAL
// ==========================================

if (closePackType) {

    closePackType.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            packTypeModal.classList.remove("active");

        }
    );

}


// ==========================================
// CLOSE BY CLICKING OUTSIDE
// ==========================================

if (packTypeModal) {

    packTypeModal.addEventListener(
        "click",
        function (event) {

            if (event.target === packTypeModal) {

                packTypeModal.classList.remove(
                    "active"
                );

            }

        }
    );

}

        

           /* =========================
   CREATE NEW FAMILY PACK
========================= */

if (packTypeModal) {
    packTypeModal.querySelectorAll(".pack-type-option").forEach(function (option) {

        option.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const packType = option.dataset.packType;
            
console.log("FAMILY CONTAINER:", familyCardsContainer);
console.log("PACK TYPE:", packType);
            let title = "";
            let label = "";
            let price = 0;
            let flavorType = "";

            switch (packType) {

                case "high-basic":
                    title = "المستوى العالي";
                    label = "HIGH LEVEL • BASIC";
                    price = 200;
                    flavorType = "basic";
                    break;

                case "high-premium":
                    title = "المستوى العالي";
                    label = "HIGH LEVEL • PREMIUM";
                    price = 250;
                    flavorType = "premium";
                    break;

                case "premium-basic":
                    title = "أعلى مستوى فاخر";
                    label = "PREMIUM COLLECTION • BASIC";
                    price = 300;
                    flavorType = "basic";
                    break;

                case "premium-premium":
                    title = "أعلى مستوى فاخر";
                    label = "PREMIUM COLLECTION • PREMIUM";
                    price = 350;
                    flavorType = "premium";
                    break;

                default:
                    return;
            }

            /* اقفل نافذة اختيار نوع العبوة */
            packTypeModal.classList.remove("active");

            /* إنشاء الكارت الجديد */
           const card = document.createElement("article");

card.className = "family-card added-family-card";

card.dataset.cardId = String(nextCardId++);
card.dataset.flavorType = flavorType;
card.dataset.addedToCart = "false";

card.innerHTML = `
    <div class="family-visual">

        <div class="family-tub">

            <div class="tub-lid"></div>

            <div class="tub-body">

                <span>
                    HAMDY
                </span>

                <strong>
                    ICE
                </strong>

                <small>
                    Ice Cream for all
                </small>

            </div>

        </div>

    </div>


    <div class="family-info">

        <span class="pack-label">
            ${label}
        </span>


        <h2>
            ${title}
        </h2>


        <p>
            اختار نكهتك المفضلة
            وشاركها مع العيلة.
        </p>


        <div class="pack-prices">

            <button
                type="button"
                class="pack-price-option"
                data-flavor-type="${flavorType}">

                <span>
                    ${
                        flavorType === "basic"
                            ? "النكهات الأساسية"
                            : "نكهات Premium"
                    }
                </span>

                <strong>
                    ${price}
                    <small>EGP</small>
                </strong>

            </button>

        </div>


        <div class="selected-flavor">
            لم يتم اختيار نكهة
        </div>


        <button
            type="button"
            class="remove-family-pack-btn">

            حذف العبوة ×

        </button>

    </div>
`;
            /* أضف الكارت للصفحة */
            if (familyCardsContainer) {
                familyCardsContainer.appendChild(card);
            }

            /* روح للكارت الجديد */
            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    });
}
          

          
// ==========================================
// REMOVE FAMILY PACK
// ==========================================

function removeFamilyPack(card) {

    if (!card) {
        return;
    }


    // ==========================================
    // REMOVE FROM CART
    // ==========================================

    const cardId =
        card.dataset.cardId;


    if (cardId) {

        cart =
            cart.filter(function (item) {

                return item.cardId !== cardId;

            });

    }


    // ==========================================
    // REMOVE CARD FROM PAGE
    // ==========================================

    card.remove();


    // ==========================================
    // UPDATE CART
    // ==========================================

    updateCartUI();

}


// ==========================================
// REMOVE FAMILY PACK BUTTON
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        const removeButton =
            event.target.closest(
                ".remove-family-pack-btn"
            );


        if (!removeButton) {
            return;
        }


        event.preventDefault();
        event.stopPropagation();


        const card =
            removeButton.closest(
                ".family-card"
            );


        if (!card) {
            return;
        }


        removeFamilyPack(card);

    }
);
// ==========================================
// CREATE ADD TO CART BUTTON
// ==========================================

function createCartButton(card) {

    if (!card) {
        return null;
    }


    // لو الزر موجود بالفعل
    const existingButton =
        card.querySelector(
            ".add-to-cart-btn"
        );


    if (existingButton) {
        return existingButton;
    }


    const button =
        document.createElement("button");


    button.type = "button";

    button.className =
        "add-to-cart-btn";


    button.textContent =
        "🛒 إضافة للعربة";


    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();


            addCardToCart(card);

        }
    );


    return button;

}


// ==========================================
// ADD CARD TO CART
// ==========================================

function addCardToCart(card) {

    if (!card) {
        return;
    }


    const selectedFlavor =
        card.querySelector(
            ".selected-flavor"
        );


    if (!selectedFlavor) {
        return;
    }


    const flavor =
        selectedFlavor.dataset.flavorName;


    const flavorType =
        selectedFlavor.dataset.flavorType ||
        card.dataset.flavorType;


    if (!flavor || !flavorType) {

        alert(
            "من فضلك اختار النكهة أولاً."
        );

        return;

    }


    // ==========================================
    // GET PACK DATA
    // ==========================================

    const packData =
        getPackData(
            card,
            flavorType
        );


    if (!packData) {

        alert(
            "حدث خطأ في بيانات العبوة."
        );

        return;

    }


    // ==========================================
    // CHECK IF ALREADY IN CART
    // ==========================================

    const cardId =
        card.dataset.cardId;


    const existingItem =
        cart.find(function (item) {

            return item.cardId === cardId;

        });


    if (existingItem) {

        // تحديث بيانات المنتج بدل التكرار
        existingItem.pack =
            packData.pack;

        existingItem.type =
            packData.type;

        existingItem.price =
            packData.price;

        existingItem.flavor =
            flavor;

    } else {

        // إضافة عنصر جديد
        cart.push({

            cardId: cardId,

            pack: packData.pack,

            type: packData.type,

            price: packData.price,

            flavor: flavor

        });

    }


    // ==========================================
    // MARK CARD AS ADDED
    // ==========================================

    card.dataset.addedToCart =
        "true";


    // ==========================================
    // UPDATE BUTTON
    // ==========================================

    const addButton =
        card.querySelector(
            ".add-to-cart-btn"
        );


    if (addButton) {

        addButton.textContent =
            "✓ تمت الإضافة للعربة";

        addButton.classList.add(
            "added"
        );

    }


    // ==========================================
    // UPDATE CART UI
    // ==========================================

    updateCartUI();


    // ==========================================
    // OPEN CART
    // ==========================================

    openCart();

}
// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    if (!cartPanel) {
        return;
    }


    cartPanel.classList.add(
        "open"
    );


    if (cartOverlay) {

        cartOverlay.classList.add(
            "show"
        );

    }


    updateCartUI();

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart() {

    if (cartPanel) {

        cartPanel.classList.remove(
            "open"
        );

    }


    if (cartOverlay) {

        cartOverlay.classList.remove(
            "show"
        );

    }

}


// ==========================================
// FLOATING CART BUTTON
// ==========================================

if (floatingCartBtn) {

    floatingCartBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            openCart();

        }
    );

}


// ==========================================
// CART CLOSE BUTTON
// ==========================================

if (cartCloseBtn) {

    cartCloseBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            closeCart();

        }
    );

}


// ==========================================
// CLOSE CART BY OVERLAY
// ==========================================

if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        function () {

            closeCart();

        }
    );

}


// ==========================================
// ESCAPE KEY
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeCart();

        }

    }
);
// ==========================================
// REMOVE CART ITEM
// ==========================================

function removeCartItem(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {
        return;
    }


    // الحصول على العنصر قبل حذفه
    const removedItem =
        cart[index];


    // حذف العنصر من السلة
    cart.splice(
        index,
        1
    );


    // ==========================================
    // RESET RELATED CARD
    // ==========================================

    if (removedItem && removedItem.cardId) {

        const card =
            document.querySelector(
                `.family-card[data-card-id="${removedItem.cardId}"]`
            );


        if (card) {

            card.dataset.addedToCart =
                "false";


            const addButton =
                card.querySelector(
                    ".add-to-cart-btn"
                );


            if (addButton) {

                addButton.textContent =
                    "🛒 إضافة للعربة";

                addButton.classList.remove(
                    "added"
                );

            }

        }

    }


    // ==========================================
    // UPDATE CART
    // ==========================================

    updateCartUI();


    // ==========================================
    // CLOSE CART IF EMPTY
    // ==========================================

    if (cart.length === 0) {

        closeCart();

    }

}
// ==========================================
// WHATSAPP ORDER
// ==========================================

if (whatsappOrderBtn) {

    whatsappOrderBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            // ==========================================
            // CHECK CART
            // ==========================================

            if (cart.length === 0) {

                alert(
                    "السلة فارغة. من فضلك أضف عبوة أولاً."
                );

                return;

            }


            // ==========================================
            // CHECK CUSTOMER DATA
            // ==========================================

            if (!validateCustomerData()) {
                return;
            }


            // ==========================================
            // CHECK CONFIRMATION
            // ==========================================

            if (!customerConfirmed) {

                alert(
                    "من فضلك أكد بيانات العميل أولاً."
                );

                return;

            }


            // ==========================================
            // CUSTOMER DATA
            // ==========================================

            const name =
                customerName
                    ? customerName.value.trim()
                    : "";


            const phone =
                customerPhone
                    ? customerPhone.value.trim()
                    : "";


            const address =
                customerAddress
                    ? customerAddress.value.trim()
                    : "";


            const notes =
                customerNotes
                    ? customerNotes.value.trim()
                    : "";


            // ==========================================
            // BUILD ORDER MESSAGE
            // ==========================================

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


            // ==========================================
            // CART ITEMS
            // ==========================================

            cart.forEach(
                function (item, index) {

                    message +=
                        `%0A${index + 1}. ${item.pack}%0A`;

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


            // ==========================================
            // TOTAL
            // ==========================================

            const total =
                cart.reduce(
                    function (sum, item) {

                        return sum +
                            Number(item.price || 0);

                    },
                    0
                );


            message +=
                `%0A💰 *الإجمالي: ${total} EGP*`;


            // ==========================================
            // WHATSAPP NUMBER
            // ==========================================

            const whatsappNumber =
                "201093957907";


            // ==========================================
            // OPEN WHATSAPP
            // ==========================================

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${message}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}
// ==========================================
// INITIALIZE
// ==========================================

updateCartUI();


// ==========================================
// INITIAL CARD STATES
// ==========================================

if (familyCardsContainer) {

    const cards =
        familyCardsContainer.querySelectorAll(
            ".family-card"
        );


    cards.forEach(function (card) {

        // إعطاء ID للكروت الأصلية
        if (!card.dataset.cardId) {

            card.dataset.cardId =
                String(nextCardId++);

        }


        // الحالة الافتراضية
        if (!card.dataset.addedToCart) {

            card.dataset.addedToCart =
                "false";

        }

    });

}


// ==========================================
// RESET FLAVOR MODAL STATE
// ==========================================

if (modal) {

    modal.classList.remove(
        "active"
    );

    modal.style.visibility =
        "hidden";

    modal.style.opacity =
        "0";

    modal.style.pointerEvents =
        "none";

}


if (packTypeModal) {

    packTypeModal.classList.remove(
        "active"
    );

}


currentCard = null;

});