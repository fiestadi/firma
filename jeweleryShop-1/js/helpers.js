class Helpers {
    constructor() {
    }

    //Метод для создания и показа карточек
    renderJewelery(data, selector) {
        const card = document.querySelector(selector);

        data.forEach(item => {
            card.innerHTML += `
            <div class="cards__product">
            <div class="cards__product-img">
                <img src="./images/prod.png" alt="">
            </div>
            <div class="cards__product-descr">
                ${item.title}
            </div>
            <div class="cards__product-btn">
                <button class="btn-jewelery">Добавить в корзину</button>
            </div>
        </div>
            `;
        });
    }

    //Метод для показа информации по товару
    renderCardInformation(data, selectorParentBtn, selectorBtn, selectorElem, selectorHideElement) {
        const cards = document.querySelectorAll(selectorParentBtn),
            element = document.querySelector(selectorElem),
            btn = document.querySelectorAll(selectorBtn),
            hideBlock = document.querySelector(selectorHideElement);

        cards.forEach(items => {
            items.addEventListener('click', (e) => {
                if (e.target && e.target.classList.contains('btn-jewelery')) {
                    btn.forEach((item, i) => {
                        if (e.target == item) {
                            hideBlock.style.display = 'none';
                            element.style.display = 'flex';
                            element.innerHTML = `
                            <div class="descr__img">
                                <img src="./images/prod.png" alt="">
                            </div>
                            <div class="descr__right">
                            <h2 class="descr__right-title">${data[i].title}</h2>
                            <p class="descr__right-text">${data[i].description}</p>
                            <div class="descr__right-total">
                                <div class="price">Price: <span>${data[i].price}</span></div>
                                <button class="btn-jewelery">Добавить в корзину</button>
                            </div>
                            </div>
                            <button class="go-back">&larr;</button>
                            `;
                        }
                    });
                }
            });
        });

        element.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('go-back')) {
                hideBlock.style.display = 'block';
                element.style.display = 'none';
            }
        })
    }

    //Метод по созданию и показа товара в корзине
    getProductsCart(dataProducts, dataCartUser, selectorCartCards) {
        const card = document.querySelector(selectorCartCards),
            userProducts = [];

        for (let i = 0; i < dataProducts.length; i++) {
            const productsItem = dataProducts[i];
            for (let j = 0; j < dataCartUser.length; j++) {
                const cartItem = dataCartUser[j];
                if (productsItem.id === cartItem.productId) {
                    userProducts.push(productsItem);
                    break;
                }
            }
        }
        // console.log(userProducts);
        userProducts.forEach((item, i) => {
            card.innerHTML += `
            <div class="cart__content">
                <div class="cart__content-img">
                    <img src=${item.image} alt="">
                </div>
                <div class="cart__content-descr">
                    ${item.title}
                </div>
                <div class="cart__content-sum">
                    <span class="price-prod">${item.price}</span> x <span class="quantity-prod">${dataCartUser[i].quantity}</span> = <span class="total-price">${item.price * dataCartUser[i].quantity}</span>
                </div>
                <div class="cart__content-btn">
                    <button class="plus">+</button>
                    <button class="minus">-</button>
                </div>
            </div>
            `;
        });
        let totalPriceElements = document.querySelectorAll('.total-price');
        let total = 0;

        totalPriceElements.forEach(item => {
            let price = Number(item.textContent)
            total += price;
        });
        document.querySelector('#total__price-products').textContent = total;
    }

    //Добавление товара в корзину из карточки

    addProductInCart(selectorCards) {
        let cards = document.querySelectorAll(selectorCards),
            obj = {};
    
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target && e.target.classList.contains('btn-jewelery')) {
                    obj = {
                        title: this.querySelector('.descr__right-title').textContent,
                        price: this.querySelector('.price span').textContent,
                        description: this.querySelector('.descr__right-text').textContent,
                        image: this.querySelector('.descr__img img').getAttribute('src'),
                        category: this.getAttribute('data-value')
                    };
                    console.log('Мой объект с данными', obj);
                    fetch('https://fakestoreapi.com/products', {
                        method: "POST",
                        body: JSON.stringify(obj)
                    })
                    .then(res => res.json())
                    .then(json => console.log('Ответ с сервера', json));
                }
            });
        });
    }

     //Добавление товара в корзину из корзины

    increaseItems(selectorCards) {
        let cards = document.querySelectorAll(selectorCards),
            obj = {};
    
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target && e.target.classList.contains('plus')) {
                    console.log(this.querySelector('.price-prod').textContent);
                    obj = {
                        title: this.querySelector('.cart__content-descr').textContent,
                        price: this.querySelector('.cart__content-sum .price-prod').textContent,
                        image: this.querySelector('.cart__content-img img').getAttribute('src'),
                    };
                    console.log('Мой объект с данными', obj);
                    fetch('https://fakestoreapi.com/products', {
                        method: "POST",
                        body: JSON.stringify(obj)
                    })
                    .then(res => res.json())
                    .then(json => console.log('Ответ с сервера', json));
                }
            });
        });
    }

    //Удаление товаров из корзины
    // deleteProduct(selectorCartCards, selectorBtns) {
    //     const cards = document.querySelectorAll(selectorCartCards),
    //         btns = document.querySelectorAll(selectorBtns);

    //     cards.forEach(card => {
    //         card.addEventListener('click', (e) => {
    //             if (e.target && e.target.classList.contains('minus')) {
    //                 btns.forEach(btn => {
    //                     if (e.target == btn) {
    //                         console.log('OKEY');
    //                         fetch('https://fakestoreapi.com/products/6', {
    //                             method: "DELETE"
    //                         })
    //                             .then(res => res.json())
    //                             .then(json => console.log(json));
    //                     }
    //                 });
    //             }
    //         });
    //     });
    // }

    deleteProduct(selectorCartWrapper) {
        try { const cartWrapper = document.querySelector(selectorCartWrapper); 

    cartWrapper.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('minus')) {
            const cartContent = e.target.closest('.cart__content');
            if (cartContent) {
                // console.log(this.querySelectorAll('.total-price'));

                    console.log(e.target);
                    fetch('https://fakestoreapi.com/products/6', {
                        method: "DELETE"
                    })
                    .then(res => res.json())
                    .then(json => console.log(json));
                }
            }
        });
    }catch(e){console.log('Error delet product');}
    }

}