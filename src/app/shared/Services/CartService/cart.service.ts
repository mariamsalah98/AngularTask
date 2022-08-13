import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCart from "../../../shopping/cart/store/cart.reducer"
import * as cartActions from "../../../shopping/cart/store/cart.actions"
import { Subject } from 'rxjs';
import { Product } from '../../Models/product.model';
import { ProductsServiceService } from '../PoductsService/products-service.service';
export interface CartItem {
    id : number
    name:string ,
    quantity: number,
    price : number
    image:string
    category : string
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  // cart:CartItem[]=[]
  // cartUpdated:Subject<CartItem[]> = new Subject();

  // getCart(){
  //   return this.cart;
  // }
  // addedToCart(product:Product){
  //   if(this.cart.findIndex(item=>item.id==product.id) > -1){
  //     this.cart.map(item=>{
  //       if(item.id==product.id)item.quantity++;
  //     })
  //     this.cartUpdated.next(this.cart);
  //   }
  //   else{
  //     this.cart.push({
  //       id : product.id,
  //       name : product.name ,
  //       image : product.image ,
  //       price : product.price ,
  //       quantity : 1 ,
  //       category : product.category
  //     })
  //     this.cartUpdated.next(this.cart);
  //   }
  // }

  deleteItem(id: number) {
    let cart:CartItem[] ;
    this.store.select('cart').subscribe(items=>cart=items.cart)
    let quantity = cart.find(item=>item.id==id).quantity
    let product:Product
    this.productService.getProducts().subscribe(data=>{
        product=data.find(p=>p.id==id)
        this.productService.editProduct(id ,{
          ...product,
          availableQuantity : product.availableQuantity + quantity
        } )
      })
      this.store.dispatch(new cartActions.deleteItem(id));
  }


  minusOne(id: number) {
    let product:Product
    this.productService.getProducts().subscribe(data=>{
        product=data.find(p=>p.id==id)
        this.productService.editProduct(id ,{
          ...product,
          availableQuantity : product.availableQuantity + 1
        } )
      })
      this.store.dispatch(new cartActions.MinusOneItem(id));
  }
  plusOne(id: number) {
    let product:Product
    this.productService.getProducts().subscribe(data=>{
        product=data.find(p=>p.id==id)
        this.productService.editProduct(id ,{
          ...product,
          availableQuantity : product.availableQuantity - 1
        } )
      })
      this.store.dispatch(new cartActions.PlusOneItem(id));
  }

  constructor(private productService:ProductsServiceService , private store:Store<fromCart.State>) { }
}
