import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { CategoriesComponent } from "./categories/categories.component";
import { CategorizedproductsComponent } from "./categorizedproducts/categorizedproducts.component";
const shoppingRoutes :Route[] =[
    {path:"" , component:CategoriesComponent },
    {path:"cart" , component:CartComponent},
    {path:":category" , component:CategorizedproductsComponent},
]
@NgModule({
    imports : [RouterModule.forChild(shoppingRoutes)] ,
    exports : [RouterModule]
})
export class ShoppingRoutingModule {

}