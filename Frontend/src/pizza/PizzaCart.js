/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $(".cart_items");

function addToCart(pizza, size) {

    var hasPizza = false;
    Cart.forEach(function (item) {
        if((item.pizza.id===pizza.id)&&(item.size===size)){
            hasPizza=true;
            item.quantity+=1;
        }
    });


    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    if(hasPizza===false) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    for (var i = 0; i < Cart.length; i++) {
        if(Cart[i].pizza.id===cart_item.pizza.id&&Cart[i].size===cart_item.size)Cart.splice(i,1);
    }

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {

    var sum=0;
    var orderAmount=0;
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            sum+=cart_item.pizza[cart_item.size].price;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity -= 1;
            sum-=cart_item.pizza[cart_item.size].price;

            if(cart_item.quantity===0){
                removeFromCart(cart_item);
            }

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".delete").click(function(){
            //Збільшуємо кількість замовлених піц

                removeFromCart(cart_item);

            //Оновлюємо відображення
            updateCart();
        });

        sum+=cart_item.pizza[cart_item.size].price*cart_item.quantity;
        orderAmount+=1;
        $cart.append($node);

    }

    Cart.forEach(showOnePizzaInCart);
    $(".counter").text(sum);
    $(".order_amount").text(orderAmount);



}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;