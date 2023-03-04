


export function printObjectKeys(obj:any, newValuesArray:any) {
  // Iterate over the keys of the object
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      // Get the value of the key
      const value = obj[key];
      
      // Print the key the number of times that it appears as a value
      for (let i = 0; i < value; i++) {
        
       // console.log(key);
        newValuesArray && newValuesArray.push(key)
        //console.log(newValuesArray);
        
      }
    }
  }
}