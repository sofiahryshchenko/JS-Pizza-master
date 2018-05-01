/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var sizeOfPizza = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var alreadyChoosed = [];

//HTML едемент куди будуть додаватися піци
var $choosedAlreade = $(".cart_items");

function addToCart(pizza, size) {

    var hasPizza = false;
    alreadyChoosed.forEach(function (item) {
        if((item.pizza.id===pizza.id)&&(item.size===size)){
            hasPizza=true;
            item.quantity+=1;
        }
    });


    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    if(hasPizza===false) {
        alreadyChoosed.push({
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
    for (var i = 0; i < alreadyChoosed.length; i++) {
        if(alreadyChoosed[i].pizza.id===cart_item.pizza.id&&alreadyChoosed[i].size===cart_item.size)alreadyChoosed.splice(i,1);
    }

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    var $money = $(".count");
    alreadyChoosed = JSON.parse(localStorage.getItem("pizzas"));
    if(alreadyChoosed===null){
        alreadyChoosed=[];
    }
    var sum = 0;
    alreadyChoosed.forEach(function (value) {
        sum+=value.pizza[value.size].price*value.quantity });
    $money.text(sum);

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return alreadyChoosed;
}

function updateCart() {

    var sum=0;
    var orderAmount=0;
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $choosedAlreade.html("");

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
        $choosedAlreade.append($node);

    }

    localStorage.clear();
    localStorage.setItem("pizzas", JSON.stringify(alreadyChoosed));

    alreadyChoosed.forEach(showOnePizzaInCart);
    $(".counter").text(sum);
    $(".order_amount").text(orderAmount);



}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = sizeOfPizza;