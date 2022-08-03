import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  
  private productList:Product[]=[];
  productListChanged:Subject<Product[]> = new Subject();

  getProducts(){
    return this.productList;
  }

  addProduct(newproduct:Product){
    this.productList.push(newproduct);
    this.productListChanged.next(this.productList);
  }

  constructor() { }
}
