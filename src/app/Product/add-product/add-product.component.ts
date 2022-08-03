import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsServiceService } from 'src/app/shared/Services/PoductsService/products-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  Categories:string[]=["Dairy" , "fruits" , "sweets" , "poultery"]

  ProductForm:FormGroup = new FormGroup({
    pName : new FormControl("",[Validators.required, 
                                Validators.minLength(4),
                              Validators.maxLength(30)]),
    pDescription:new FormControl("",[Validators.required]),
    pCategory:new FormControl("",[Validators.required]),
    pQuantity:new FormControl("",[Validators.required]),
    pPrice:new FormControl("",[Validators.required]),
    pImage:new FormControl("",[Validators.required])
  })

  onsubmit(){
    this.productService.addProduct(this.ProductForm.value);
    this.router.navigateByUrl("/product/list")
  }

  clearForm(){
    this.ProductForm.reset();
  }

  constructor(private productService:ProductsServiceService ,private router:Router) { }

  ngOnInit(): void {

  }

}
