/**
 * Created by diana on 12.01.16.
 */

var pizza_info = [
    {
        id:1,
        icon:'pizza_1.jpg',
        title: "Імпреза",
        type: 'М’ясна піца',
        content: {
            meat: ['балик', 'салямі'],
            chicken: ['куриця'],
            cheese: ['сир моцарелла', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 99
        },
        big_size:{
            weight: 660,
            size: 40,
            price: 169
        },
        is_new:true,

    },
    {
        id:2,
        icon:'pizza_2.jpg',
        title: "BBQ",
        type: 'М’ясна піца',
        content: {
            meat: ['мисливські ковбаски', 'ковбаски папероні', 'шинка'],
            cheese: ['сир домашній'],
            mushroom: ['шампінйони'],
            additional: ['петрушка', 'оливки']
        },
        small_size:{
            weight: 460,
            size: 30,
            price: 139
        },
        big_size:{
            weight: 840,
            size: 40,
            price: 199
        },
        is_popular:true
    },
    {
        id:3,
        icon:'pizza_1.jpg',
        title: "Міксовий поло",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'куриця копчена'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        small_size:{
            weight: 430,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 179
        }
    },
    {
        id:4,
        icon:'pizza_5.jpg',
        title: "Сициліано",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'салямі'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            additional: ['перець болгарський',  'соус томатний']
        },
        small_size:{
            weight: 450,
            size: 30,
            price: 111
        },
        big_size:{
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id:17,
        icon:'pizza_3.jpg',
        title: "Маргарита",
        type: 'Вега піца',
        content: {
            cheese: ['сир моцарелла', 'сир домашній'],
            tomato: ['помідори'],
            additional: ['базилік', 'оливкова олія', 'соус томатний']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 89
        },

        big_size:{
            weight: 500,
            size: 40,
            price: 119
        }

    },
    {
        id:43,
        icon:'pizza_6.jpg',
        title: "Мікс смаків",
        type: 'М’ясна піца',
        content: {
            meat: ['ковбаски'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            pineapple: ['ананаси'],
            additional: ['цибуля кримська', 'огірки квашені', 'соус гірчичний']
        },
        small_size:{
            weight: 470,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 180
        }
    },
    {
        id:90,
        icon:'pizza_8.jpg',
        title: "Дольче Маре",
        type: 'Морська піца',
        content: {
            ocean: ['криветки тигрові', 'мідії', 'ікра червона', 'філе червоної риби'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },

        small_size: {
          weight: 499,
            size: 30,
            price: 199
        },

        big_size:{
            weight: 845,
            size: 40,
            price: 399
        }
    },
    {
        id:6,
        icon:'pizza_4.jpg',
        title: "Россо Густо",
        type: 'Морська піца',
        content: {
            ocean: ['ікра червона', 'лосось копчений'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        small_size:{
            weight: 400,
            size: 30,
            price: 189
        },
        big_size:{
            weight: 700,
            size: 40,
            price: 299
        }
    }
];
class Order {
    constructor(name, size, price, radius, weight, img) {
        this.name = name;
        this.size = size;
        this.price = price;
        this.radius = radius;
        this.weight = weight;
        this.img = img;
        this.amount = 1;
    }
}

let cartOfpizzas = JSON.parse(localStorage.getItem("cartOfpizzas"));
if(!cartOfpizzas)
    cartOfpizzas = [];



const pizzaTypes = document.querySelectorAll("#types-of-pizzas span");
pizzaTypes.forEach((type) => {
    type.addEventListener("click", function() {
        const typesSelected = document.getElementById("types-selected");
        if (typesSelected) {
            typesSelected.removeAttribute("id");
        }
        type.id = "types-selected";
        document.getElementById("current-category").innerText = type.innerText;
        renderPizzas();
    });
});

document.getElementById("clear-order").addEventListener("click", function() {
    cartOfpizzas = [];
    updateCart();
});

function joinContentOfThePizza(pizza) {
    let array = [];
    Object.values(pizza.content).forEach(e => {
        e.forEach(el => {
            array.push(el);
        });
    });
    array[0] = array[0][0].toUpperCase() + array[0].slice(1);
    return array.join(", ");
}
function generatePizzaFromDescription(pizza) {
    let html = `
    <div class="pizza">
      <div class="remarks">
        ${pizza.is_popular ? `<span class="remark-popular">Популярна</span>` : ''}
        ${pizza.is_new ? `<span class="remark-new">Нова</span>` : ''}
      </div>
      <img src="${pizza.icon}">
      <h2>${pizza.title}</h2>
      <span class="pizza-type">${pizza.type}</span>
      <span class="pizza-desc">
        ${joinContentOfThePizza(pizza)}
      </span>
  `;

    if (pizza.small_size) {
        html += `
      <div class="small-pizza-info">
        <p>
          <img src="size-icon.svg">
          <span class="small-size">${pizza.small_size.size}</span>
        </p>
        <p>
          <img src="weight.svg">
          <span class="small-weight">${pizza.small_size.weight}</span>
        </p>
        <h2>${pizza.small_size.price}</h2>
        <p>грн</p>
        <button class="buy-button" onclick="placeOrder('${pizza.title}', 'Маленька', '${pizza.small_size.price}', '${pizza.small_size.size}', '${pizza.small_size.weight}', '${pizza.icon}')">Купити</button>
      </div>
    `;
    }

    if (pizza.big_size) {
        html += `
      <div class="big-pizza-info">
        <p>
          <img src="size-icon.svg">
          <span class="big-size">${pizza.big_size.size}</span>
        </p>
        <p>
          <img src="weight.svg">
          <span class="big-weight">${pizza.big_size.weight}</span>
        </p>
        <h2>${pizza.big_size.price}</h2>
        <p>грн</p>
        <button class="buy-button" onclick="placeOrder('${pizza.title}', 'Велика', '${pizza.big_size.price}', '${pizza.big_size.size}', '${pizza.big_size.weight}', '${pizza.icon}')">Купити</button>
      </div>
    `;
    }

    html += `</div>`;
    return html;
}

function generatePizzaForShoppingCart(orderPizza) {
    const { name, size, radius, weight, price, amount, img } = orderPizza;

    return `
    <div>
      <h2>${name} (${size})</h2>
      <div class="order-size">
        <p>
          <img src="size-icon.svg">
          <span class="small-size">${radius}</span>
        </p>
        <p>
          <img src="weight.svg">
          <span class="small-weight">${weight}</span>
        </p>
      </div>
      <div class="order-buttons">
        <span class="order-price">${price * amount}</span>
        <button class="minus-button" onclick="removeOnePizzaFromCards('${name}')">-</button>
        <span class="order-amount">${amount}</span>
        <button class="plus-button" onclick="addPizzaToTheCart('${name}')">+</button>
        <button class="cross-button" onclick="removePizza('${name}')">x</button>
      </div>
      <img src="${img}">
    </div>
  `;
}
function renderPizzas() {
    let html = "";
    let size = 0;

    const selectedType = document.getElementById("types-selected").innerText;

    for (let i = 0; i < pizza_info.length; ++i) {
        const pizza = pizza_info[i];
        const content = pizza.content;

        if (
            (selectedType === "М'ясні" && !content.meat) ||
            (selectedType === "З ананасами" && !content.pineapple) ||
            (selectedType === "З грибами" && !content.mushroom) ||
            (selectedType === "З морепродуктами" && !content.ocean) ||
            (selectedType === "Вега" && pizza.type !== "Вега піца")
        ) {
            continue;
        }

        size++;
        html += generatePizzaFromDescription(pizza);
    }

    document.getElementById("pizza-list").innerHTML = html;
    document.getElementById("pizza-counter").innerText = size;
}

function placeOrder(pizzaName, size, price, radius, weight, img) {
    for (let order of cartOfpizzas) {
        if (order.name === pizzaName && order.size === size) {
            order.amount++;
            updateCart();
            return;
        }
    }

    cartOfpizzas.push(new Order(pizzaName, size, price, radius, weight, img));
    updateCart();
}

function updateCart() {
    let html = "";
    let sum = 0;

    for (let order of cartOfpizzas) {
        html += generatePizzaForShoppingCart(order);
        sum += order.amount * order.price;
    }

    const orderPizzasElement = document.getElementById("order-pizzas");
    const orderSummaryElement = document.querySelector("#order-summary h3");
    const orderCounterElement = document.getElementById("order-counter");

    orderPizzasElement.innerHTML = html;
    orderSummaryElement.innerText = sum + " грн";
    orderCounterElement.innerText = cartOfpizzas.length;

    localStorage.setItem("cartOfpizzas", JSON.stringify(cartOfpizzas));
}

function addPizzaToTheCart(name) {
    for (let order of cartOfpizzas) {
        if (order.name === name) {
            order.amount++;
            updateCart();
            return;
        }
    }
}

function removeOnePizzaFromCards(name) {
    for (let order of cartOfpizzas) {
        if (order.name === name) {
            if (order.amount === 1) {
                removePizza(name);
                return;
            }
            order.amount--;
            updateCart();
            return;
        }
    }
}

function removePizza(name) {
    for (let i = 0; i < cartOfpizzas.length; ++i) {
        if (cartOfpizzas[i].name === name) {
            cartOfpizzas.splice(i, 1);
            updateCart();
            return;
        }
    }
}

renderPizzas();
updateCart();
