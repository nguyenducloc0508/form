const allInput = document.querySelectorAll('.input');
const textAreaInput = document.querySelector('texarea');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const dateInput = document.querySelector('#birth-date');
const username = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const submitBtn = document.querySelector('.submit-btn');
const resetBtn = document.querySelector('.reset-btn');
const requiredInput = document.querySelectorAll('.required');
const form = document.querySelector('.form');
const phoneNumber = document.querySelector('#phone-number');

const removeBlank = (el) => {
  el.closest('div').classList.remove('blank');
};

const focusToRemoveBlank = (el) => {
  el.addEventListener('focus', (e) => removeBlank(e.target));
};

requiredInput.forEach((el) => focusToRemoveBlank(el));

const trimName = (name) => {
  const trimmedName = [];
  name = name.trim();
  name = name.split(' ').filter((el) => el !== '');
  name.forEach((el) => {
    el = el[0].toUpperCase() + el.slice(1).toLowerCase();
    trimmedName.push(el);
  });
  return trimmedName.join(' ');
};

const isLeafYear = (year) => {
  if (year % 4 === 0) {
    if (year % 400 === 0) return true;
    if (year % 100 === 0) return false;
    return true;
  }
  return false;
};

const checkValidateDate = (date) => {
  const [day, month, year] = date.split('/');

  const monthHas31Days = [1, 3, 5, 7, 8, 10, 12];
  const monthHas30Days = [4, 6, 9, 11];
  const dayNumber = day * 1;
  const monthNumber = month * 1;
  const yearNumber = year * 1;

  console.log(dayNumber, monthNumber, yearNumber, isLeafYear(yearNumber));

  if (
    !dayNumber ||
    !monthNumber ||
    !yearNumber ||
    dayNumber < 0 ||
    monthNumber < 0 ||
    yearNumber < 0 ||
    monthNumber < 1 ||
    monthNumber > 12 ||
    (monthHas31Days.includes(monthNumber) && dayNumber > 31) ||
    (monthHas30Days.includes(monthNumber) && dayNumber > 30) ||
    (monthNumber === 2 && !isLeafYear(yearNumber) && dayNumber > 28) ||
    (monthNumber === 2 && isLeafYear(yearNumber) && dayNumber > 29)
  ) {
    return false;
  }
  return true;
};

nameInput.addEventListener('blur', (e) => {
  nameInput.value = trimName(e.target.value);
});

for (let i = 0; i < allInput.length; i++) {
  allInput[i].addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (i < allInput.length - 1) allInput[i + 1].focus();
    }
  });
}

emailInput.addEventListener('focus', () => {
  emailInput.closest('div').classList.remove('invalid-email', 'invalid');
});

emailInput.addEventListener('blur', (e) => {
  const emailEntered = e.target.value;
  if (emailEntered !== '') {
    if (
      !e.target.value.includes('@') ||
      e.target.value.indexOf('@') === 0 ||
      e.target.value.indexOf('@') === e.target.value.length - 1
    ) {
      emailInput.closest('div').classList.add('invalid-email', 'invalid');
    } else {
      emailInput.closest('div').classList.remove('invalid-email', 'invalid');
    }
  }
});

let day = '',
  month = '',
  year = '';

dateInput.addEventListener('focus', () => {
  dateInput.closest('div').classList.remove('invalid-date', 'invalid');
});

dateInput.addEventListener('blur', (e) => {
  const dateEntered = e.target.value;
  if (dateEntered !== '') {
    if (!checkValidateDate(dateEntered)) {
      dateInput.closest('div').classList.add('invalid-date', 'invalid');
    } else {
      dateInput.closest('div').classList.remove('invalid-date', 'invalid');
    }
  }
});

phoneNumber.addEventListener('focus', () => {
  phoneNumber
    .closest('div')
    .classList.remove('invalid-phone-number', 'invalid');
});

phoneNumber.addEventListener('blur', (e) => {
  if (e.target.value === '') {
    phoneNumber
      .closest('div')
      .classList.remove('invalid-phone-number', 'invalid');
  } else {
    for (const digit of e.target.value) {
      if (digit < '0' || digit > '9') {
        phoneNumber
          .closest('div')
          .classList.add('invalid-phone-number', 'invalid');
        return;
      }
    }
  }
});

confirmPasswordInput.addEventListener('input', (e) => {
  if (e.target.value === '') {
    confirmPasswordInput
      .closest('div')
      .classList.remove('not-match', 'invalid');
  } else if (e.target.value !== passwordInput.value) {
    confirmPasswordInput.closest('div').classList.add('not-match', 'invalid');
  } else {
    confirmPasswordInput
      .closest('div')
      .classList.remove('not-match', 'invalid');
  }
});

submitBtn.addEventListener('click', (e) => {
  let resetForm = true;
  e.preventDefault();

  requiredInput.forEach((el) => {
    el.closest('div').classList.remove('blank');
    if (el.value === '') {
      el.closest('div').classList.add('blank');
      resetForm = false;
    }
    if (el.closest('div').classList.contains('invalid')) {
      resetForm = false;
    }
  });
  if (resetForm) form.reset();
});

resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  requiredInput.forEach((el) => removeBlank(el));
  form.reset();
});
