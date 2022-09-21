import VISA_ICON from './assets/visa.png';
import MASTERCARD_ICON from './assets/mastercard.png';
import DISCOVER_ICON from './assets/discover.png';
import AMEX_ICON from './assets/amex.png';

export const OTHERCARDS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const AMEX = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const CARD = [
  'VISA',
  'MASTERCARD',
  'DISCOVER',
  'AMEX'
];

export const CARD_ICON = {
  VISA: VISA_ICON,
  MASTERCARD: MASTERCARD_ICON,
  DISCOVER: DISCOVER_ICON,
  AMEX: AMEX_ICON,
}