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
  Categories:string[]=[]
  selectedProduct:Product
  selectedIndex: number
  ProductForm:FormGroup 
  editMode : boolean = false

  onsubmit(){
    let newProduct:Product={
      id : this.productService.count,
      name: this.ProductForm.get("pName").value,
      category :this.ProductForm.get("pCategory").value,
      price : this.ProductForm.get("pPrice").value,
      availableQuantity : this.ProductForm.get("pQuantity").value,
      description : this.ProductForm.get("pDescription").value,
      image :this.ProductForm.get("pImage").value
    }
    if(this.editMode){
      this.productService.editProduct(this.selectedIndex,newProduct);
    }
    else{
      this.productService.addProduct(newProduct);
    }
    this.router.navigateByUrl("/product/list")
  }

  cancel(){
    this.productService.editMode=false;
    this.productService.selectedProduct=null;
    this.router.navigateByUrl("/product/list")
  }

  clearForm(){
    this.ProductForm.reset();
  }

  constructor(private productService:ProductsServiceService ,
              private router:Router  ) { 
                if(this.productService.selectedProduct){
                  this.selectedProduct=this.productService.selectedProduct
                  this.selectedIndex=this.selectedProduct.id;
                }
                this.editMode=this.productService.editMode
                this.Categories=this.productService.Categories;
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
