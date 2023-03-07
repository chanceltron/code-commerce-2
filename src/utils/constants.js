// CREDIT CARDS
import VISA_ICON from '../assets/visa.png';
import MASTERCARD_ICON from '../assets/masterCard.png';
import AMEX_ICON from '../assets/amex.png';
import DISCOVER_ICON from '../assets/discover.png';

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

export const CARD = ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER'];

export const CARDICON = {
  VISA: VISA_ICON,
  MASTERCARD: MASTERCARD_ICON,
  AMEX: AMEX_ICON,
  DISCOVER: DISCOVER_ICON,
};
