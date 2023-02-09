'use strict';
const peopleInput = document.getElementById('people');
const billInput = document.getElementById('bill');
const buttons = document.querySelectorAll('.buttonsCont button');
const billAmount = billInput.value;
const pricevalue = document.querySelector('.price');
const totalValue = document.querySelector('.total');
const customInput = document.querySelector('.custom');
const reset = document.querySelector('.reset');

console.log(people.validity);

peopleInput.addEventListener('input', () => {
  // console.log(peopleInput.validity.valid);
  if (!peopleInput.validity.valid) {
    console.log('ne valja');
    peopleInput.style.outline = '2px solid red';
  } else {
    peopleInput.style.outline = '';
  }
  let v = parseInt(peopleInput.value);
  if (v > 1000) peopleInput.value = peopleInput.max;
  if (v < 0) peopleInput.value = peopleInput.min;

  if (peopleInput.value === '') {
    peopleInput.value = '0';
  }
  peopleInput.value = peopleInput.value.replace(/^[0]+/g, '');
});
billInput.addEventListener('input', () => {
  // console.log(peopleInput.validity.valid);
  if (!billInput.validity.valid) {
    console.log('ne valja');
    billInput.style.outline = '2px solid red';
  } else {
    // billInput.style.outline = '2px solid hsl(172deg, 67%, 45%)';
    billInput.style.outline = 'hsl(172deg, 67%, 45%) 2px solid';
    calculateTip(billInput.value, people.value);
  }
  let v = parseInt(billInput.value);
  if (v > 999999999) billInput.value = billInput.max;
  if (v < 0) billInput.value = billInput.min;
});

buttons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    buttons.forEach((but) => but.classList.remove('selected'));
    customInput.classList.remove('selected');
    e.preventDefault();
    console.log(btn);
    btn.classList.add('selected');
    calculateTip(billInput.value, people.value);

    console.log(billInput.value);
  });
});

customInput.addEventListener('input', () => {
  console.log(customInput);
  customInput.classList.add('selected');
  buttons.forEach((but) => but.classList.remove('selected'));
  calculateTip(billInput.value, people.value);
  let v = parseInt(customInput.value);
  if (v > 1000) customInput.value = customInput.max;
  if (v < 0) customInput.value = customInput.min;
});

customInput.addEventListener('click', () => {
  if (!customInput.value) return;
  else {
    customInput.classList.add('selected');
    buttons.forEach((but) => but.classList.remove('selected'));
    calculateTip(billInput.value, people.value);
  }
});

function calculateTip(price, people) {
  let selectedTip = document.querySelector('.selected');
  let sum;
  if (
    !selectedTip ||
    !billInput.value ||
    peopleInput.value === '0' ||
    peopleInput.value === ''
  )
    return;
  else {
    if (customInput.classList.contains('selected')) {
      sum = price * (customInput.value / 100);
    } else {
      sum = price * (selectedTip.innerHTML.replace('%', '') / 100);
    }
    let tipAmount = (sum / peopleInput.value).toFixed(2);
    console.log(tipAmount);
    pricevalue.textContent = tipAmount;
    let total = (+price + +tipAmount) / peopleInput.value;
    totalValue.textContent = total.toFixed(2);
    reset.classList.add('resetActive');
  }
}

peopleInput.addEventListener('input', () => {
  calculateTip(billInput.value, people.value);
});
// peopleInput.addEventListener('change', () => {
//   calculateTip(billInput.value, people.value);
// });

reset.addEventListener('click', () => {
  if (reset.classList.contains('resetActive')) {
    pricevalue.textContent = '0.00';
    totalValue.textContent = '0.00';
    billInput.value = '';
    peopleInput.value = '0';
    reset.classList.remove('resetActive');
    customInput.classList.remove('selected');
    customInput.value = '';
    billInput.style.outline = '';
    peopleInput.style.outline = '';

    buttons.forEach((but) => but.classList.remove('selected'));
  }
});
