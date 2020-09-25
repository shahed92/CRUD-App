// select all input

const nameValue = document.querySelector('#name');
const emailValue = document.querySelector('#email');
const numberValue = document.querySelector('#number');
const positionValue = document.querySelector('#position');
const submitForm = document.querySelector('.form');
let submitBtn = document.querySelector('.submitBtn');
console.log(submitBtn);
//parent p select
const formList = document.querySelector('.read-form');

let url = 'http://localhost:3000/person';

///submit form
submitForm.addEventListener('submit', (e) => {
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

  //  /// clear the input values
  nameValue.value = '';
  emailValue.value = '';
  numberValue.value = '';
  positionValue.value = '';

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
  .then((data) => {
    readData(data);
  })
  .catch((err) => console.log(err));

// read data function

function readData(data) {
  let readDom = document.querySelector('.read-form');
  let singlePerson = '';

  data.forEach((person) => {
    singlePerson += `<div class="single-person">
      <p id="${person.id}">
        <strong class="id">${person.id} </strong><strong>name: </strong
        ><span class="name">${person.name}</span> <strong>email: </strong> <span class="email">${person.email}</span>
        <strong>number: </strong>
        <span class="number">${person.number}</span>
        <strong>number: </strong>
        <span class="position">${person.position}</span>
        <button class="edit" id="edit" >edit</button>
        <button class="delete" id="delete" >delete</button>
      </p>
    </div>`;
  });
  readDom.innerHTML = singlePerson;
}

////delete post

formList.addEventListener('click', (e) => {
  let deleteBtn = e.target.id === 'delete';
  let editBtn = e.target.id === 'edit';
  let id = e.target.parentElement.id;
  if (deleteBtn) {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
  }

  ///edit and up date

  if (editBtn) {
    let name = e.target.parentElement.querySelector('.name').textContent;
    let email = e.target.parentElement.querySelector('.email').textContent;
    let number = e.target.parentElement.querySelector('.number').textContent;
    let position = e.target.parentElement.querySelector('.position')
      .textContent;

    submitBtn.innerHTML = 'Update';

    nameValue.value = name;
    emailValue.value = email;
    numberValue.value = number;
    positionValue.value = position;

    ///update
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      ///patch
      fetch(`${url}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: nameValue.value,
          email: emailValue.value,
          number: numberValue.value,

          positiion: positionValue.value,
        }),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    });
  }

  ///update
});

////////////Edit and update post
// formList.addEventListener('click', (e)=>{

// })
