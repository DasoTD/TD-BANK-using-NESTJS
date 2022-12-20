import { createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const iv = randomBytes(16);
const password = "password used to generate key";

export const DecryptResponse = async (encryptedText: Buffer) => {
    try {
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        let decipher = createDecipheriv('aes-256-ctr', key, iv)
        // const iv = Buffer.alloc(16, AES_REQ_RES_IV);
        // const key = AES_REQ_RES_KEY;
    
        // let decipher = crypto.createDecipheriv(
        //   RESPONSE_ENCRYPTION_ALGORITHM,
        //   key,
        //   iv
        // );

        const decryptedText = Buffer.concat([
            decipher.update(encryptedText),
            decipher.final(),
          ]);
          return decryptedText;
        // let dec = decipher.update(encrypted, "hex", "utf8");
        // dec += decipher.final("utf8");
        // return dec;
      } catch (error) {
        throw error;
      }
}