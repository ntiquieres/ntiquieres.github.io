const UserEmail = document.createElement("input");;
const UserDiscord = document.createElement("input");;
const SendButton = document.createElement("button");
let totPrice = 0;



class Product {
    constructor(name, price, id) {
      this.name = name;
      this.price = price;
      this.id = id;
    }
  }

const products = [
    new Product("Klistermärke 1", 10, 1),
    new Product("Klistermärke 2", 15, 2),
  ];
  const cart = [];


function addToCart(id){
    const product = getProductById(id);
    if (product) {
      cart.push(product);
      checkCartLenght();
      console.log(`Added ${product.name} to cart.`);
    } else {
      console.log(`Product with id ${id} not found.`);
    }
}

  function getProductById(id) {
    return products.find(product => product.id === id);
  }

  function checkCartLenght(){
    if (cart.length != 0){
        const counter = document.getElementById("counter");
        counter.style.opacity = 1;
        counter.children[0].innerHTML = cart.length;
    }
  }

  function NewOverlayContent(){
    const contentholder = document.getElementById("shop-content"); 
    if (cart.length != 0){
        contentholder.innerHTML = "";
        totPrice = 0;
        const br = document.createElement("br");
        let totPruducts = cart.length;

        const counts = {}; //counts the amount of pruducts with the same id
        for (let i = 0; i < cart.length; i++) {
            const id = cart[i].id;
            counts[id] = counts[id] ? counts[id] + 1 : 1;
        }
        for (const id in counts) {
            const count = counts[id];
            const name = cart.find(p => p.id == id).name;
            const price = cart.find(p => p.id == id).price;
            const element = document.createElement("div");
            element.innerText = `${name}, Antal ${count}, Kostnad ` + price*count + " kr";
            totPrice += price*count;
            contentholder.appendChild(element);
            contentholder.appendChild(br);
        }
        const price = document.createElement("div");
        price.innerText = "Totalpriset är: " + totPrice + " kr";
        contentholder.appendChild(price);
        contentholder.appendChild(br);

        const info = document.createElement("div");
        info.innerText = "Du kommer inte att betala nu för din egna säkerhet. Vi kommer få ett mejl om din beställning. Sen fixar vi din order och då bestämmer vi en plats med dig via email eller discord. Endast Swish."
        contentholder.appendChild(info);
        contentholder.appendChild(br);


const emailAddress = 'ntiquires@gmail.com';
const emailSubject = 'Order';
let emailBody = "Ny order från NTIQUIERES \nOrdern består av: \n";

for (const id in counts) {
  const count = counts[id];
  const name = cart.find(p => p.id == id).name;
  const price = cart.find(p => p.id == id).price;
  emailBody += name + " , Antal " + count + ", Kostnad " + price*count + " kr \n";
}
emailBody += "Totalt " + totPrice + " kr \n \nTill sändare, så fort vi har din order redo kommer vi skicka tillbaka till dig";

console.log(emailBody);
const mailtoLink = `https://mail.google.com/mail/?view=cm&to=${emailAddress}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

const linkElement = document.createElement('a');
linkElement.setAttribute('href', mailtoLink);
linkElement.setAttribute('target', '_blank');
linkElement.textContent = 'Click here to send an email';
contentholder.appendChild(linkElement);

    }
    else {
        contentholder.innerHTML = "Du har inte lagt något i din vagn än :(";
        
    }

  }



