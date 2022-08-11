import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService implements OnInit {

  constructor(private http:HttpClient) {

    this.getProducts().subscribe(data=>this.productList=data)

    this.getCategories().subscribe(data=>{
      this.Categories=data
    })
    
    this.productSelected.subscribe((product)=>{
      this.selectedProduct=product
    })
  }
  ngOnInit(): void {
  }

  private productList:Product[]=[]
  count = this.productList.length
  Categories:string[]
  productSelected : Subject<Product> = new Subject();
  selectedProduct:Product
  editMode:boolean = false  ;


  getProducts(){
     return this.http.get<Product[]>("http://localhost:3000/products")
  }

  getCategories(){
    return this.http.get<string[]>("http://localhost:3000/categories")
  }

  getProductsByCategory(category:string){
    let categorizedProducts:Product[] = []
    this.getProducts().subscribe(data=>{
      for (const product of data) {
        if (product.category == category) {
          categorizedProducts.push(product)   ; 
        }
      }
    })
    return categorizedProducts ;
  }


  addProduct(newproduct:Product){
    this.http.post<Product>("http://localhost:3000/products" , newproduct).subscribe
    (result=>{
      this.productList.push(result);
    });
  }

  editProduct(index:number , newproduct:Product){
    this.http.put<Product>("http://localhost:3000/products/"+index ,  newproduct).subscribe(data=>{
      this.productList.map(x=>{
        if(x.id==index)
        x=data;
      })
    });
     this.editMode=false ;
     this.selectedProduct= null;
  }

  deleteProducts(indexes:number[]){
    let prevIndex : number = -1
    for(let index of indexes){
      if(index < prevIndex || prevIndex == -1){
        this.http.delete("http://localhost:3000/products/"+index).subscribe();
      }
      else{
        this.http.delete("http://localhost:3000/products/"+(index-1)).subscribe();
      }
      prevIndex=index ;
    }
  }

}
