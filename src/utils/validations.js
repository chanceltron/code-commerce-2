import moment from 'moment';

export const cardNumberValidation = (cardNumber) => {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMEX: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
  };
  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
      if (cardNumber) {
        return cardNumber &&
          /^[1-6]{1}[0-9]{14,15}$/i.test(
            cardNumber.replace(/[^\d]/g, '').trim()
          )
          ? ''
          : 'Enter a Valid Card Number';
      }
    }
  }
  return 'Enter a Valid Card Number';
};

export const expiryValidation = (value) => {
  if (value) {
    if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
      let today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate()}`;
      let currentDate = moment(new Date(date));
      let visaValue = value.split('/');
      let visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
      return currentDate < moment(visaDate)
        ? undefined
        : 'Please Enter a Valid Date';
    } else {
      return 'Invalid Date Format';
    }
  }
};

export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      return undefined;
    } else {
      return 'Alphabetical Letters Only';
    }
  } else {
    return 'This field is required';
  }
};

export const postalCodeValidation = (value) => {
  if (value) {
    if (/^\d{5}$/i.test(value)) {
      undefined;
    } else {
      return 'Invalid Postal Code';
    }
  } else {
    undefined;
  }
};

export const emailValidation = (users, value) => {
  let errorMessage;
  users.map((user) => {
    if (user.email === value) {
      errorMessage = 'A user for this email already exists';
    } else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) {
      errorMessage = undefined;
    } else if (value === '') {
      errorMessage = 'This field is required';
    } else {
      errorMessage = 'Please enter a valid email';
    }
  });
  return errorMessage;
};

export const emailDuplicateValidation = (users, value) => {
  users.find((user) => {
    if (user.email === value) {
      return 'This email is associated with an account';
    } else {
      undefined;
    }
  });
};

export const passwordComplexityValidation = (value) => {
  if (
    /(?=^.{8,20}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i.test(
      value
    )
  ) {
    undefined;
  } else {
    return 'Does not meet requirements';
  }
};

export const passwordMatchValidation = (initPassword, confirmPassword) => {
  if (initPassword === confirmPassword) {
    undefined;
  } else {
    return 'Passwords Do Not Match';
  }
};

export const formatPhoneNumber = (number) => {
  if (!number) return number;
  const phoneNumber = number.replace(/[^\d]/g, '');
  if (phoneNumber.length < 4) return phoneNumber;
  if (phoneNumber.length < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
};

export const formatZipCode = (zip) => {
  if (!zip) return zip;
  return zip.replace(/[^\d]/g, '');
};

export const formatName = (name) => {
  if (!name) return name;
  return name.replace(/[^a-z ]+/i, '');
};
