import { VirgilCrypto, VirgilCryptoPrivateKeyExporter } from 'virgil-crypto';
import { PrivateKeyStorage } from 'virgil-sdk';
import cardManager from './crypto';

const createKeys = phoneNumber => {
  // initialize Virgil Crypto library
  const virgilCrypto = new VirgilCrypto();
  const privateKeyExporter = new VirgilCryptoPrivateKeyExporter(
    virgilCrypto,
    // if provided, will be used to encrypt the key bytes before exporting
    // and decrypt before importing.
    '[OPTIONAL_PASSWORD_TO_ENCRYPT_THE_KEYS_WITH]'
  );

  // Generate a private key
  const keyPair = virgilCrypto.generateKeys();

  const privateKeyStorage = new PrivateKeyStorage(privateKeyExporter);

  // Store the private key with optional metadata (i.e. the PrivateKeyEntry)
  privateKeyStorage
    .save(phoneNumber, keyPair.privateKey, { optional: 'data' })
    .then(() => {
      // Load the private key entry

      cardManager
        .publishCard({
          privateKey: keyPair.privateKey,
          publicKey: keyPair.publicKey,
        })
        .then(card => {
          console.log('Card is published with ID: ', card.id);
        });
      privateKeyStorage.load(phoneNumber).then(privateKeyEntry => {
        if (privateKeyEntry === null) {
          return;
        }

        console.log(privateKeyEntry.privateKey); // VirgilPrivateKey instance
        console.log(privateKeyEntry.meta); // { optional: 'data' }

        const privateKey = privateKeyEntry.privateKey;

        // Use the privateKey in virgilCrypto operations

        // Delete a private key
        privateKeyStorage.delete(phoneNumber).then(() => {
          console.log('Private key has been removed');
        });
      });
    });
};

export default createKeys;
