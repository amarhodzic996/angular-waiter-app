import { HttpClient, HttpParams } from '@angular/common/http';
import { getSafePropertyAccessString } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Item } from './interfaces/item-interface';
import { map } from 'rxjs';
import { User } from './interfaces/user-interface';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  category = new BehaviorSubject<string | boolean>(false);
  user = new ReplaySubject<User>();
  receipt: any = [];
  receiptSum: number;
  userLoggedIn: User;
  receiptReport: any = [];

  constructor(private http: HttpClient) {}

  receiptSumCalculator(): number {
    this.receiptSum = this.receipt.reduce((accumulator, currentElement) => {
      return accumulator + +currentElement.price;
    }, 0);
    return this.receiptSum;
  }

  addItemToReceiptList(item: Item) {
    let isContained = false;
    for (let i = 0; i < this.receipt.length; i++) {
      if (this.receipt[i].name === item.name) {
        this.receipt[i].quantity++;
        this.receipt[i].price = this.receipt[i].quantity * +item.price;
        isContained = true;
      }
    }
    if (this.receipt.length === 0 || !isContained) {
      this.receipt.push({ ...item, quantity: 1 });
    }
  }

  fetchData(category: string) {
    return this.http
      .get<{ [key: string]: Item }>(
        `https://waiter-app-305cd-default-rtdb.europe-west1.firebasedatabase.app/${category}.json`,
        { params: new HttpParams().set('auth', this.userLoggedIn.idToken) }
      )
      .pipe(
        map((responseData) => {
          const getArray: Item[] = [];
          for (const key in responseData) {
            getArray.push({ ...responseData[key], id: key });
          }
          return getArray;
        })
      );
  }

  postNewItem(data: Item) {
    const upData: Item = {
      name: data.name,
      price: data.price,
      image: data.image,
      category: data.category,
    };
    console.log(data);
    return this.http.post(
      `https://waiter-app-305cd-default-rtdb.europe-west1.firebasedatabase.app/${upData.category}.json`,
      upData,
      { params: new HttpParams().set('auth', this.userLoggedIn.idToken) }
    );
  }

  postNewReceipt(receipt: Item[], receiptSum: number) {
    const upReceipt = [
      { receiptSum: receiptSum, date: new Date() },
      ...receipt,
    ];
    return this.http.post(
      `https://waiter-app-305cd-default-rtdb.europe-west1.firebasedatabase.app/${this.userLoggedIn.displayName}.json?auth=` +
        this.userLoggedIn.idToken,
      upReceipt
    );
  }

  getReport(user: User) {
    return this.http
      .get<{ [key: string]: Item }>(
        `https://waiter-app-305cd-default-rtdb.europe-west1.firebasedatabase.app/${user.displayName}.json`,
        { params: new HttpParams().set('auth', user.idToken) }
      )
      .pipe(
        map((responseData) => {
          let report: any = [];
          for (const key in responseData) {
            report.push(responseData[key]);
          }
          return report;
        })
      );
  }
}
