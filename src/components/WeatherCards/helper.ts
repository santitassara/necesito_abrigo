import React from "react";

interface IConvertToCelsius {
  convertToCelsius: (temp: number) => number;
}


export const convertToCelsius = (temp:number) => {
  return temp - 273.15
}