export {}

const admin = require('firebase-admin');
const config = require('./config');

const firebase_admin_connect = () => {
    if (!admin.apps.length) {
        try { 
            // console.log(config.serviceAccount)
            admin.initializeApp({
                credential: admin.credential.cert(config.serviceAccount),
                storageBucket: config.firebase.storageBucket

            }); 
        } catch (e) { 
            console.log(e); 
        }
    }

    return admin;
};


exports.firebase_admin_connect = firebase_admin_connect;