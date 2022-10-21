export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      return undefined;
    } else {
      return 'Alphabetical letters only';
    }
  } else {
    return undefined;
  }
};

export const areaCodeValidation = (value) => {
  if (value) {
    if (/^[0-9]*$/i.test(value)) {
      return (value && value.length !== 3) ? 'Must be 3 characters' : undefined;
    } else {
      return 'Numbers only';
    }
  } else {
    return undefined;
  }
}

export const phoneValidation = (value) => {
  if (value) {
    if (/^[0-9]*$/i.test(value)) {
      return (value && value.length !== 10) ? 'Must be 10 characters' : undefined;
    } else {
      return 'Numbers only';
    }
  } else {
    return undefined;
  }
}

export const zipCodeValidation = (value) => {
  if (value) {
    if (/^[0-9]*$/i.test(value)) {
      return (value && value.length !== 5) ? 'Must be 5 characters' : undefined;
    } else {
      return 'Numbers only';
    }
  } else {
    return undefined;
  }
}

export const somethingValidation = (value) => {
  if (value) {
    return 'Field Required'
  } else {
    return undefined;
  }
}