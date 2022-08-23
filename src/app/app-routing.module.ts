import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {path:"", redirectTo:"/product/list" , pathMatch:"full"},
  {path: "product" , loadChildren : ()=>{
    return import("./Product/product.module").then(m=>m.ProductModule)
  }},
  {path:"shop" , loadChildren : 
  ()=>import("./shopping/shopping.module").then(m => m.ShoppingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
