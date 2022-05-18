'use strict';

const url = 'https://www.aimn.com/products.json?&limit=250';
const imgNotFoundUrl = 'https://mdcomplain.com/wp-content/uploads/2019/09/No_Image_Available.jpg';

const cardsContainer = document.querySelector('.content');
const loader = document.querySelector('.loader');
const topButton = document.querySelector('.topButton');

let results;
let counter = 0;
const counterHolder = document.querySelector('#count');
const previous = document.querySelector('#previous'); // previous page button
const next = document.querySelector('#next'); // next page button


next.addEventListener('click', () => {
    counter++;
    previous.disabled = (counter <= 0) ? true : false; // disabling prev button if needed
    next.disabled = (counter >= 4) ? true : false;
    updateProducts(results);
    counterHolder.textContent = counter + 1;
    console.log(counter);

})
previous.addEventListener('click', () => {
    counter--;
    previous.disabled = (counter <= 0) ? true : false;
    next.disabled = (counter >= 4) ? true : false;
    updateProducts(results);
    counterHolder.textContent = counter + 1;
})

const updateProducts = (data) => {
    cardsContainer.innerHTML = '';
    const filteredProducts = data.slice(counter * 50, counter * 50 + 50);

    filteredProducts.map(item => {
        if (item.images.length > 0) {
            cardsContainer.appendChild(createCard(item.title, item.variants[0].price, item.images[0].src));
        } else {
            cardsContainer.appendChild(createCard(item.title, item.variants[0].price, imgNotFoundUrl));
        }
    });
}

const getData = async function(url) {
    const response = await fetch(url)
    const result = await response.json();
    return result.products;
}
const createElement = (tag, className, content) => {
    const elem = document.createElement(tag);
    if (className !== 0) elem.classList.add(className);
    if (content !== 0) elem.textContent = content;
    return elem;
}
const createCard = (title, price, src) => {
    const cardElem = createElement('div', 'card', 0);
    const titleElem = createElement('p', 0, title);
    const priceElem = createElement('p', 0, price + '€');
    const imgElem = createElement('img', 0, 0);
    imgElem.src = src;
    cardElem.appendChild(imgElem);
    cardElem.appendChild(titleElem);
    cardElem.appendChild(priceElem);

    return cardElem;
}

getData(url).then(products => {
    loader.remove();
    results = [...products]
    updateProducts(products);
});

document.addEventListener('scroll', () => hideTopButton())

const hideTopButton = () => {
    window.scrollY > window.innerHeight ? topButton.classList.remove('hidden') : topButton.classList.add('hidden');
    console.log(scrollY);
};
