// select all input

const nameValue = document.querySelector('#name');
const emailValue = document.querySelector('#email');
const numberValue = document.querySelector('#number');
const positionValue = document.querySelector('#position');
const submitForm = document.querySelector('.submit');

let url = 'http://localhost:3000/comments';
///submit form
submitForm.addEventListener('click', (e) => {
  e.preventDefault();

  function personOBJ(name, email, number, position) {
    this.name = name;
    this.email = email;
    this.number = number;
    this.position = position;
  }

  let member = new personOBJ(
    nameValue.value,
    emailValue.value,
    numberValue.value,
    positionValue.value
  );

  /// clear the input values
  nameValue.value = '';
  emailValue.value = '';
  numberValue.value = '';
  positionValue.value = '';

  //

  ///save to json server

  fetch(url, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(member),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
});

//fetch data from json server

fetch(url)
  .then((res) => res.json())
  .then((data) => console.log(data.map((data) => data.name)))
  .catch((err) => console.log(err));
