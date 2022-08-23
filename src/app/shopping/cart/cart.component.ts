import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCart from "./store/cart.reducer"
import { CartItem, CartService } from 'src/app/shared/Services/CartService/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  shoppingList:Observable<{cart:CartItem[]}>

  constructor(private cartService:CartService , private store:Store<fromCart.State>) {
   }

  ngOnInit(): void {
    this.shoppingList=this.store.select('cart');
    // this.shoppingList=this.cartService.getCart();
    // this.cartService.cartUpdated.subscribe(newCart=>{
    //   this.shoppingList= newCart;
    // })
  }

  delete(id:number){
    this.cartService.deleteItem(id);
    
  }
  plus(id:number){
    this.cartService.plusOne(id);
  }
  minus(id:number){
  this.cartService.minusOne(id);
  }
}
