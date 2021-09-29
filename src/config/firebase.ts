import { initializeApp, getApps, getApp } from "firebase/app";
const config = require('./config');

const firebase_connect = () => {
    let firebase: any;
    if (getApps().length === 0) {
        try { 
            firebase = initializeApp(config.firebase);
        } catch (e) { 
            console.log(e); 
        }
    } else {
        firebase = getApp();
    }
    return firebase;
}

exports.firebase_connect = firebase_connect;
