import * as firebase from 'firebase-admin';
import { parsable } from '../utils';

// root firebase params
const rp = Buffer.from(
  process.env.FIREBASE_SERVICE_BASE64 || '',
  'base64'
).toString();

const root = parsable(rp)
  ? firebase.initializeApp(
      {
        credential: firebase.credential.cert(JSON.parse(rp)),
        databaseURL: process.env.FIREBASE_DATABASE,
      },
      'root'
    )
  : ({} as firebase.app.App);

export default { root };
