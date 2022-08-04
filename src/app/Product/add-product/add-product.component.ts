import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/Models/product.model';
import { ProductsServiceService } from 'src/app/shared/Services/PoductsService/products-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  Categories:string[]=["Dairy" , "fruits" , "sweets" , "poultery"]
  selectedProduct:Product
  selectedIndex: number

  ProductForm:FormGroup 

  onsubmit(){
    this.productService.addProduct(this.ProductForm.value);
    this.router.navigateByUrl("/product/list")
  }

  clearForm(){
    this.ProductForm.reset();
  }

  constructor(private productService:ProductsServiceService ,
              private router:Router ) { 
                this.selectedProduct=this.productService.selectedProduct
                this.selectedIndex=this.productService.getIdOfProduct(this.selectedProduct);
              }

  ngOnInit(): void {
    this.ProductForm =new FormGroup({
      pName : new FormControl(this.selectedProduct?.name??"",
                                  [Validators.required, 
                                  Validators.minLength(4),
                                  Validators.maxLength(30)]),
      pDescription:new FormControl(this.selectedProduct?.description??"",[Validators.required]),
      pCategory:new FormControl(this.selectedProduct?.category??"",[Validators.required]),
      pQuantity:new FormControl(this.selectedProduct?.availableQuantity??"",[Validators.required]),
      pPrice:new FormControl(this.selectedProduct?.price??"",[Validators.required]),
      pImage:new FormControl(this.selectedProduct?.image??"",[Validators.required])
    })
  }

}
