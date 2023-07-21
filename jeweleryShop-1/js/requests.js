class APIRequests {
    constructor() {
        this.serverURI = "https://fakestoreapi.com";
        this.routes = {
            categories: '/products/categories',
            jewelery: '/products/category/jewelery',
            product: '/products/',
            carts: '/carts'
        };
    }

    getJewelery() {
        return fetch(this.serverURI + this.routes.jewelery)
            .then(res => res.json())
    }

    getProduct(id) {
        return fetch(this.serverURI + this.routes.product)
            .then(res => res.json())
    }

    getAllCarts() {
        return fetch(this.serverURI + this.routes.carts)
            .then(res => res.json())
    }

    add2Cart() {
        return fetch(this.serverURI + this.routes.carts, {
            method: "POST",
            body: JSON.stringify(
                {
                    userId: 5,
                    products: [{ productId: 5, quantity: 1 }, { productId: 1, quantity: 5 }]
                }
            )
        })
            .then(res => res.json())
    }



}