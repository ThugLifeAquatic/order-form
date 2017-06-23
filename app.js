'use strict';
//////////////////////////////
//UNIVERSAL FUNCTIONS/////////
//////////////////////////////
var orders = [];
var allProducts = [];
var delOrder = '';
function Item(product, path) {
  this.name = '';
  this.product = product;
  this.path = path;
  this.quantity = 0;
  this.street = '';
  this.city = '';
  this.zip = '';
  this.phone = '';
  this.payment = '';
  allProducts.push(this);
}
function pushStorage() {
  var protoAll = JSON.stringify(orders);
  localStorage.setItem('all', protoAll);
}
//////////////////////////////
//FORM FUNCTIONS//////////////
//////////////////////////////
function handleSubmit(event) {
  console.log('HandleSubmit!!');
  event.preventDefault();
  var e = document.getElementById('drop-down');
  console.log(e);
  var ddProduct = e.options[e.selectedIndex].value;
  console.log(ddProduct);
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].product === ddProduct) {
      console.log('MATCH!');
      allProducts[i].name = event.target.name.value;
      allProducts[i].quantity = event.target.quantity.value;
      allProducts[i].street = event.target.street.value;
      allProducts[i].city = event.target.city.value;
      allProducts[i].state = event.target.state.value;
      allProducts[i].zip = event.target.zip.value;
      allProducts[i].phone = event.target.phone.value;
      allProducts[i].payment = event.target.payment.value;
      event.target.name.value = null;
      event.target.quantity.value = null;
      event.target.street.value = null;
      event.target.city.value = null;
      event.target.zip.value = null;
      event.target.phone.value = null;
      event.target.payment.value = null;
      event.target.state.value = null;
      orders.push(allProducts[i]);
    }
  }
  pushStorage();
}
//////////////////////////////
//ORDER FUNCTIONS/////////////
//////////////////////////////
var orderList = document.getElementById('orderList');
function pullStorage() {
  var protoAll = localStorage.getItem('all');
  orders = JSON.parse(protoAll);
}
//wipe screen for redraw
function wipe() {
  while (orderList.firstChild) {
    orderList.removeChild(orderList.firstChild);
  }
}
function renderOrder() {
  wipe();
  for (var i = 0; i < orders.length; i++) {
    var divEl = document.createElement('div');
    divEl.id = orders[i].product;
    var imgEl = document.createElement('img');
    imgEl.src = orders[i].path;
    divEl.appendChild(imgEl);
    var pEl = document.createElement('p');
    pEl.textContent = orders[i].quantity + ' orders of ' + orders[i].product;
    divEl.appendChild(pEl);
    pEl = document.createElement('p');
    pEl.textContent = 'Send to customer: ' + orders[i].name;
    divEl.appendChild(pEl);
    pEl = document.createElement('p');
    pEl.textContent = 'Address: ' + orders[i].street + ', ' + orders[i].city + ', ' + orders[i].state + ' ' + orders[i].zip;
    divEl.appendChild(pEl);
    pEl = document.createElement('p');
    pEl.textContent = 'Contact: ' + orders[i].phone;
    divEl.appendChild(pEl);
    pEl = document.createElement('p');
    pEl.textContent = 'Credit Card Number: ' + orders[i].payment;
    divEl.appendChild(pEl);
    var buttonEl = document.createElement('button');
    buttonEl.innerHTML = 'Close Order';
    divEl.appendChild(buttonEl);
    orderList.appendChild(divEl);
    buttonEl.addEventListener('click', close);
  }
}
function close(event){
  var del = event.target.parentElement.id;
  console.log(del.parentElement);
  console.log('Clicked!');
  for (var i = 0; i < orders.length; i++) {
    if (del === orders[i].product) {
      orders.splice([i],1);
    }
  }
  wipe();
  renderOrder();
}
new Item('bag', 'images/bag.jpg');
new Item('banana', 'images/banana.jpg');
new Item('bathroom', 'images/bathroom.jpg');
new Item('boots', 'images/boots.jpg');
new Item('breakfast', 'images/breakfast.jpg');
new Item('bubblegum', 'images/bubblegum.jpg');
new Item('chair', 'images/chair.jpg');
new Item('cthulhu', 'images/cthulhu.jpg');
new Item('dog-duck', 'images/dog-duck.jpg');
new Item('dragon', 'images/dragon.jpg');
new Item('pen', 'images/pen.jpg');
new Item('pet-sweep', 'images/pet-sweep.jpg');
new Item('scissors', 'images/scissors.jpg');
new Item('shark', 'images/shark.jpg');
new Item('sweep', 'images/sweep.png');
new Item('tauntaun', 'images/tauntaun.jpg');
new Item('unicorn', 'images/unicorn.jpg');
new Item('usb', 'images/usb.gif');
new Item('water-can', 'images/water-can.jpg');
new Item('wine-glass', 'images/wine-glass.jpg');
if (document.getElementById('orderList')) {
  pullStorage();
  renderOrder();
} else {
  document.getElementById('input').addEventListener('submit', handleSubmit);
}
