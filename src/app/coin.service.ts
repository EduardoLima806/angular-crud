import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CoinService {

  constructor(private http: HttpClient) { }

  addCoin(name, price) {
    const uri = 'http://localhost:4000/coins/add';
    const obj = {
      name: name,
      price: price
    };

    this.http.post(uri, obj).subscribe(res => console.log('Done'));
  }

  getCoins() {
    const uri = 'http://localhost:4000/coins';
    return this
            .http
            .get(uri)
            .pipe(map(res => { return res; }));
  }

  editCoin(id) {
    const uri = 'http://localhost:4000/coins/edit/' + id;
    return this
            .http
            .get(uri)
            .pipe(map(res => { return res; }))
  }

  updateCoin(name, price, id) {
    const uri = 'http://localhost:4000/coins/update/' + id;

    const obj = {
      name: name,
      price: price
    };

    this.http.post(uri, obj).subscribe(res => console.log('Done'));
  }

  deleteCoin(id) {
    const uri = 'http://localhost:4000/coins/delete/' + id;

        return this
            .http
            .get(uri)
            .pipe(map(res => {
              return res;
            }));
  }
}
