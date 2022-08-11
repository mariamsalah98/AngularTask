import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from 'src/app/shared/Services/CartService/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  shoppingList:CartItem[]

  constructor(private cartService:CartService) {
   }

  ngOnInit(): void {
    this.shoppingList=this.cartService.getCart();
    this.cartService.cartUpdated.subscribe(newCart=>{
      this.shoppingList= newCart;
    })
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
