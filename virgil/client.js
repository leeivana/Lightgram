// client.js

import { CachingJwtProvider } from 'virgil-sdk';

const fetchJwt = () =>
  fetch('/virgil-access-token', { credentials: 'same-origin' }).then(response =>
    response.text()
  );

const jwtProvider = new CachingJwtProvider(fetchJwt);
// pass jwtProvider as `accessTokenProvider` to the `CardManager` constructor
