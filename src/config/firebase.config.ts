import * as admin from 'firebase-admin';

const rootParams = Buffer.from(
  process.env.FIREBASE_SERVICE_BASE64 || '',
  'base64'
);

const root = admin.initializeApp(
  {
    credential: admin.credential.cert(JSON.parse(rootParams.toString())),
    databaseURL: process.env.FIREBASE_DATABASE,
  },
  'root'
);

export default { root };
