import * as crypto from 'crypto';

const secretKey =
  '1bdc3e12500ebf8683db944977a1f977bf7c24fbce2a52c47e149a2a55bd6adc';
const secretIv = '91086bc9c55eb141400ae26282eafa5a';

const ecnryptionMethod = 'aes-256-cbc';

const key = crypto
  .createHash('sha512')
  .update(secretKey)
  .digest('hex')
  .substring(0, 32);
const encryptionIV = crypto
  .createHash('sha512')
  .update(secretIv)
  .digest('hex')
  .substring(0, 16);

// Encrypt data
export function encryptData(data) {
  const cipher = crypto.createCipheriv(ecnryptionMethod, key, encryptionIV);
  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
  ).toString('base64'); // Encrypts data and converts to hex and base64
}
export function decryptData(encryptedData) {
  const buff = Buffer.from(encryptedData, 'base64');
  const decipher = crypto.createDecipheriv(ecnryptionMethod, key, encryptionIV);
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  ); // Decrypts data and converts to utf8
}
