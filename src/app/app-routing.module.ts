import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { ProductListComponent } from './Product/product-list/product-list.component';

const routes: Routes = [
  {path:"product/add" , component:AddProductComponent },
  {path:"product/list" , component:ProductListComponent },
  {path:"", redirectTo:"/product/list" , pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
