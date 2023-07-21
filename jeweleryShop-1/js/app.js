let jewelery = new APIRequests();
let helpers = new Helpers();

//Создание карточек товара
jewelery
    .getJewelery()
    .then(data => {
        try {
            helpers.renderJewelery(data, '.cards');
        } catch (e) { console.log('Error renderJewelery'); }
    });

//Создание блока описание товара
jewelery
    .getJewelery()
    .then(data => {
        // console.log(data);
        try {
            helpers.renderCardInformation(data, '.cards', '.btn-jewelery', '#descr__info', '#jewelery__block');
        } catch (e) { console.log('Error renderCardInformation'); }
    });

//Показ товаров корзины 1-го пользователя
jewelery.getProduct()
    .then(products => {
        return jewelery.getAllCarts()
            .then(cartItems => {
                let cartProd = cartItems[0].products;
                try {
                    helpers.getProductsCart(products, cartProd, '.container-wrapper')
                } catch (e) { console.log('Error renderCart'); }
            });
    })

//Добавление товара в корзину
helpers.addProductInCart('.descr');

//Добавление товара в корзину из корзины
helpers.increaseItems('.container-wrapper');

//Удаление из корзины
helpers.deleteProduct('.container-wrapper');
