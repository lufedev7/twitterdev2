
const admin = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require('./firebase-key.json')
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
} catch (e) {}

const db = getFirestore()
module.exports = { db }
/* require('dotenv').config()
const { initializeApp, applicationDefault } = require('firebase-admin/app')

const serviceAccount = require("path/to/serviceAccountKey.json");

initializeApp({
  credential: admin.credential.cert(serviceAccount)
}); */
