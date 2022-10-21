export const emailValidation = (value) => {
  if (value) {
    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]+)$/i.test(value)) {
      return undefined;
    } else {
      return 'Email invalid';
    }
  } else {
    return undefined;
  }
};

export const passwordValidation = (value) => {
  if (value) {
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/i.test(value)) {
      return undefined;
    } else {
      return 'Invalid Password';
    }
  } else {
    return undefined;
  }
};

export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z]*$/i.test(value)) {
      return undefined;
    } else {
      return 'Alphabetical letters only';
    }
  } else {
    return undefined;
  }
};

export const zipValidation = (value) => {
  if (value) {
    if (/^\d{5}(?:[-\s]\d{4})?$/i.test(value)) {
      return undefined;
    } else {
      return 'Postal Code invalid';
    }
  } else {
    return undefined;
  }
};