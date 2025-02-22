import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || ''; // Replace with a strong secret key

// Function to encrypt data
const encryptData = (data: object): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Function to decrypt data
const decryptData = (ciphertext: string): object | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Error decrypting cookie:', error);
    return null;
  }
};

// Function to set a cookie with encrypted data
export const setCookie = (name: string, value: object, expiryDays: number) => {
  const encryptedValue = encryptData(value);
  Cookies.set(name, encryptedValue, {
    expires: expiryDays,
  });
};

// Function to get a cookie and decrypt it
export const getCookie = (name: string): object | null => {
  const encryptedValue = Cookies.get(name);
  return encryptedValue ? decryptData(encryptedValue) : null;
};
export const clearCookie = (name: string) => {
    Cookies.remove(name, { path: '/' });
  };