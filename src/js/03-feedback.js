import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};
let formData = {};

// 1
refs.form.addEventListener('input', throttle(onFormInput, 500)); // 4
function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// 2
getSavedInputs();
function getSavedInputs() {
  const savedData = localStorage.getItem('feedback-form-state');
  const parsedData = JSON.parse(savedData);

  if (parsedData.email) {
    refs.email.value = parsedData.email;
  }
  if (parsedData.message) {
    refs.message.value = parsedData.message;
  }
  formData = parsedData;
}

// 3
refs.form.addEventListener('submit', onFormSubmit);
function onFormSubmit(evt) {
  evt.preventDefault();

  evt.currentTarget.reset();

  localStorage.removeItem('feedback-form-state');

  console.log(formData);
  formData = {};
}
