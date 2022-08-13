import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCart from "./shopping/cart/store/cart.reducer"
import { CartService } from './shared/Services/CartService/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cartLength :number ;
  constructor(private cartService:CartService , private store : Store<fromCart.State>){
    this.store.select('cart').subscribe(cart=>{
      this.cartLength= cart.cart.length
    })
  }
}
