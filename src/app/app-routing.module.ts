import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { CartComponent } from './shopping/cart/cart.component';
import { CategoriesComponent } from './shopping/categories/categories.component';
import { CategorizedproductsComponent } from './shopping/categorizedproducts/categorizedproducts.component';
const routes: Routes = [
  {path:"product/add" , component:AddProductComponent },
  {path:"product/list" , component:ProductListComponent },
  {path:"shop" , component:CategoriesComponent},
  {path:"shop/cart" , component:CartComponent},
  {path:"shop/:category" , component:CategorizedproductsComponent},
  {path:"", redirectTo:"/product/list" , pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
