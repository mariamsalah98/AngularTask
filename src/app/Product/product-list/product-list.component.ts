import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/Models/product.model';
import { ProductsServiceService } from 'src/app/shared/Services/PoductsService/products-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[]=[]

  constructor(private productService:ProductsServiceService) {
    this.products=this.productService.getProducts();
   }

  ngOnInit(): void {
    this.productService.productListChanged.subscribe((list)=>{
      this.products=list;
    })
  }

}
