import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseConfig } from "./firebase.config";

const application = firebase.initializeApp(firebaseConfig);

export const auth = application.auth();
export default application;
