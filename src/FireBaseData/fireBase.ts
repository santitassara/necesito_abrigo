// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getDoc, addDoc, runTransaction, collection, getFirestore, updateDoc } from "firebase/firestore";
import {printObjectKeys} from "../FireBaseData/utils"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChjwb4Va1GiAMiwnihzjqjz0e-IaEYQ-c",
  authDomain: "me-abrigo-d4bb6.firebaseapp.com",
  projectId: "me-abrigo-d4bb6",
  storageBucket: "me-abrigo-d4bb6.appspot.com",
  messagingSenderId: "1075629903797",
  appId: "1:1075629903797:web:d4c6b80173236a283753fc",
  measurementId: "G-BQZF3X13SS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);



export const getCities = async (state:any) => {
  const db = getFirestore()
  const topTenCities = doc(db, "Cities", "5zTDhcdq1Kk87KoCMIQt")
  getDoc(topTenCities).then(snapshot => {
    if (snapshot.exists()) {

      //  setListaDesc({id: snapshot.id, ...snapshot.data()})
      state(snapshot.data());
      console.log(snapshot.data());
      
      return;

    }
  })
}

export const storeTopCities = async (data: any) => {
  const db = getFirestore()
  const topTenCities = collection(db, "Cities")

  await addDoc(topTenCities, data).then(() => {
    console.log("POSTED");

  })
}

export const updateTopCities = async (data: any) => {
  const db = getFirestore()
  const topTenCities = doc(db, "Cities", "5zTDhcdq1Kk87KoCMIQt")

  await runTransaction(db, async (transaction) => {
    const transfDoc = await transaction.get(topTenCities);
    if (!transfDoc.exists()) {
      console.error("El documento no existe")
    }
    const newStock:object = transfDoc.data()!
    console.log(newStock);
    console.log(data);

    //console.log([newStock, data]);
    console.log(Object.values(newStock));
    let info:any = []
    
    let newValuesArray:string []= []
    
    printObjectKeys(newStock,newValuesArray);
    console.log(data);
    
    console.log(newValuesArray);
    const concatPrevNow = data ? newValuesArray.concat(...data) : newValuesArray
    console.log(concatPrevNow);
    
    // .forEach(function(key, index, array) {
    //   console.log(data[key]);
    //   console.log(data[index])
    //   console.log(array);
    //   info.push(data[index])
    //   console.log(info);
      
       
    // });
    var cityCount:any = {};
    concatPrevNow.forEach(function(i:any) {
      
      cityCount[i] = (cityCount[i]||0) + 1;})
      console.log(cityCount);
     setTimeout(() => {
         updateDoc(topTenCities, cityCount).then(() => {
         console.log("UPDATED");
       });
      
     }, 3000);
  })
}