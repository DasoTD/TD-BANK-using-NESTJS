import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const iv = randomBytes(16);
const password = "password used to generate key";

// The key length is dependent on the algorithm.
// In this case for aes256, it is 32 bytes.
// const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
// const cipher = createCipheriv('aes-256-ctr', key, iv);

export const encryptResponse = async () => {
    try {
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);

      // const ivs = Buffer.alloc(16, "AES_REQ_RES_IV");
      // const keys = "AES_REQ_RES_KEY";
  
      // // let ciphers = crypto.createCipheriv(RESPONSE_ENCRYPTION_ALGORITHM, keys, ivs);
      // let encrypted = cipher.update("plain");
      // encrypted = Buffer.concat([encrypted, cipher.final()]);

      const encryptedText = Buffer.concat([
        cipher.update("plain"),
        cipher.final(),
      ]);
      return encryptedText.toString("hex");
      // return encrypted; //.toString("hex");
    } catch (error) {
      throw error;
    }
  };