import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyA6JP04M2tbeuDdtff9CouqbdoSKBcN7m8",
    authDomain: "react-slack-chat-16616.firebaseapp.com",
    databaseURL: "https://react-slack-chat-16616.firebaseio.com",
    projectId: "react-slack-chat-16616",
    storageBucket: "react-slack-chat-16616.appspot.com",
    messagingSenderId: "894350623561",
    appId: "1:894350623561:web:04260691ce880658"
};

firebase.initializeApp(firebaseConfig);

export default firebase;