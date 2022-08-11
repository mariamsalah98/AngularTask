import { Component,  OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/Models/product.model';
import { CartService } from 'src/app/shared/Services/CartService/cart.service';
import { ProductsServiceService } from 'src/app/shared/Services/PoductsService/products-service.service';

@Component({
  selector: 'app-categorizedproducts',
  templateUrl: './categorizedproducts.component.html',
  styleUrls: ['./categorizedproducts.component.css']
})
export class CategorizedproductsComponent implements OnInit {

  products: Product[]
  category:string

  constructor(private route:ActivatedRoute ,  
     private productService:ProductsServiceService ,
     private cartService:CartService,
     private router : Router ) { }

  ngOnInit(): void {
    this.category =this.route.snapshot.params["category"];
    this.route.params.subscribe(params=>{
      this.category=params["category"]
    })
    this.products=this.productService.getProductsByCategory(this.category)
  }

  addToCart(product:Product){
    let index = product.id;
    let newProduct = {
      ...product,
      availableQuantity: product.availableQuantity -1
    }
    this.productService.editProduct(index , newProduct);
    this.cartService.addedToCart(newProduct);
    this.router.navigate(["shop","cart"]);
  }

}
