import { Component } from '@angular/core';
import { CartService } from './shared/Services/CartService/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cartLength :number ;
  constructor(private cartService:CartService){
    this.cartLength=this.cartService.cart.length
    this.cartService.cartUpdated.subscribe(cart=>{
      this.cartLength= cart.length
    })
  }
}
