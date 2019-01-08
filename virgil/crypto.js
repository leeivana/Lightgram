import { VirgilCrypto, VirgilCardCrypto } from 'virgil-crypto';
import { VirgilCardVerifier, CardManager } from 'virgil-sdk';

// initialize Crypto library
const cardCrypto = new VirgilCardCrypto(new VirgilCrypto());
const cardVerifier = new VirgilCardVerifier(cardCrypto);

// initialize cardManager and specify accessTokenProvider, cardVerifier
const cardManager = new CardManager({
  cardCrypto,
  accessTokenProvider,
  cardVerifier,
});

export default cardManager;
