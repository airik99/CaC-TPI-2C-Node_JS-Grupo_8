document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('email').addEventListener('input', function () {
        this.style.color = '#000';
    });

    document.getElementById('password').addEventListener('input', function () {
        this.style.color = '#000';
    });

    document.getElementById('nombre').addEventListener('input', function () {
        this.style.color = '#000';
    });

    document.getElementById('apellido').addEventListener('input', function () {
        this.style.color = '#000';
    });

    document.getElementById('passwordRep').addEventListener('input', function () {
        this.style.color = '#000';
    });

    var categoryNameInput = document.getElementById('category_name');
    var licenceNameInput = document.getElementById('licence_name');
    var productNameInput = document.getElementById('product_name');
    var productDescriptionInput = document.getElementById('product_description');
    var productSkuInput = document.getElementById('product_sku');
    var productPriceInput = document.getElementById('product_price');
    var duesInput = document.getElementById('dues');
    var discountInput = document.getElementById('discount');
    var payInput = document.getElementById('pay');

    if (categoryNameInput) {
        categoryNameInput.addEventListener('input', function () {
            this.style.color = '#000';
        });
    }

    if (licenceNameInput) {
        licenceNameInput.addEventListener('input', function () {
            this.style.color = '#000';
        });
    }

    if (productNameInput) {
        productNameInput.addEventListener('input', function () {
            this.style.color = '#000';
        });
    }

    if (productDescriptionInput) {
        productDescriptionInput.addEventListener('input', function () {
            this.style.color = '#000';
        });
    }

    if (productSkuInput) {
        productSkuInput.addEventListener('input', function () {
            this.style.color = '#000';
        });
    }

    if (productPriceInput) {
        productPriceInput.addEventListener('input', function () {
            this.style.color = '#000';
        });
    }

    if (duesInput) {
        duesInput.addEventListener('input', function () {
            this.style.color = '#000';
        });
    }

    if (discountInput) {
        discountInput.addEventListener('input', function () {
            this.style.color = '#000';
        });
    }

    if (payInput) {
        payInput.addEventListener('input', function () {
            this.style.color = '#000';
        });
    }

});

