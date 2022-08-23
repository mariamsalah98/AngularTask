import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CartComponent } from "./cart/cart.component";
import { CategoriesComponent } from "./categories/categories.component";
import { CategorizedproductsComponent } from "./categorizedproducts/categorizedproducts.component";
import { ProductdetailsComponent } from "./productdetails/productdetails.component";
import { ShoppingRoutingModule } from "./shopping.routing";

@NgModule({
    declarations:[
        CategoriesComponent,
        CategorizedproductsComponent,
        CartComponent,
        ProductdetailsComponent 
    ],
    imports: [
        SharedModule,
        ShoppingRoutingModule
    ],
    exports:[
    ]
})
export class ShoppingModule {

}