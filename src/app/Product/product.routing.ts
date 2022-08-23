import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AddProductComponent } from "./add-product/add-product.component";
import { ProductListComponent } from "./product-list/product-list.component";
const productRoutes : Route[]=[
    {path:"add" , component:AddProductComponent },
    {path:"list" , component:ProductListComponent }
]
@NgModule({
    imports:[RouterModule.forChild(productRoutes)],
    exports:[RouterModule]
})
export class ProductRoutingModule {

}