import { Injectable } from '@angular/core';
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
  cart:CartItem[]=[]
  cartUpdated:Subject<CartItem[]> = new Subject();

  getCart(){
    return this.cart;
  }
  addedToCart(product:Product){
    if(this.cart.findIndex(item=>item.id==product.id) > -1){
      this.cart.map(item=>{
        if(item.id==product.id)item.quantity++;
        console.log(item)
      })
      this.cartUpdated.next(this.cart);
    }
    else{
      this.cart.push({
        id : product.id,
        name : product.name ,
        image : product.image ,
        price : product.price ,
        quantity : 1 ,
        category : product.category
      })
      this.cartUpdated.next(this.cart);
    }
  }

  deleteItem(id: number) {
    let quantity = this.cart.find(item=>item.id==id).quantity
    let product:Product
    this.productService.getProducts().subscribe(data=>{
        product=data.find(p=>p.id==id)
        this.productService.editProduct(id ,{
          ...product,
          availableQuantity : product.availableQuantity + quantity
        } )
      })
      this.cart.splice(id-1 ,1)
    this.cartUpdated.next(this.cart);
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
      this.cart[id-1].quantity--;
    this.cartUpdated.next(this.cart);
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
      this.cart[id-1].quantity++;
    this.cartUpdated.next(this.cart);
  }

  constructor(private productService:ProductsServiceService) { }
}
