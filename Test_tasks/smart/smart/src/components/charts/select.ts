/*
import * as React from 'react';

import products from '../../fixture';

interface MyProps {}
interface MyState {}

function unique(arr: number[]) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    let str = arr[i];
    obj[str] = true; // запомнить строку в виде свойства объекта
  }
  return Object.keys(obj); // или собрать ключи перебором для IE8-
}

export default class Select extends React.Component<MyProps, MyState> {

  options: any = [];
  years: any = [];

  render() {
    for (let product of products) {
      this.years.push(product.year);
    }
    for (let year of  unique(this.years)) {
      this.options.push(year);
    }
    return (
      <select>
        { this.options.map((i: any) => {
            return <option key={i.id} value={i}>{i}</option>
        })}
      </select>

    );
  }
}*/
