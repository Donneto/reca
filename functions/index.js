const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algolia = require('algoliasearch');

admin.initializeApp();

const env = functions.config();
const algoliaClient = algolia(env.algolia.appid, env.algolia.apikey);
const algoliaIndex = algoliaClient.initIndex('reca_prod');

exports.recaAdd = functions.firestore.document('/negocios/{negocioId}').onCreate( (snap, context) => {
  const data = snap.data();
  const objectId = snap.id;

  return algoliaIndex.addObject({
    objectId,
    ...data
  });
});

exports.recaDelete = functions.firestore.document('/negocios/{negocioId}').onDelete( (snap, context) => {
  const objectId = snap.id;
  
  return algoliaIndex.deleteObject(objectId);
});






// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
