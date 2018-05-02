/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var API = require('../API');
var Pizza_List  = null;

API.getPizzaList(function (err,pizzaList) {
    if(err)alert("Failed to load pizzas");
    else{
        Pizza_List = pizzaList;
    }
});

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){

        if(filter === "all") pizza_shown.push(pizza);

        if(filter === "meat")
            if("meat" in pizza.content || "chicken" in pizza.content) pizza_shown.push(pizza);

        if(filter === "mushroom")
            if("mushroom" in pizza.content) pizza_shown.push(pizza);

        if(filter === "pineapple")
            if("pineapple" in pizza.content) pizza_shown.push(pizza);

        if(filter === "ocean")
            if("ocean" in pizza.content) pizza_shown.push(pizza);

        if(filter === "vegan")
            if(!"meat" in pizza.content && !"chicken" in pizza.content && !"ocean" in pizza.content) pizza_shown.push(pizza);
    });


    showPizzaList(pizza_shown);
}

function initialiseMenu(Pizza_List) {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;