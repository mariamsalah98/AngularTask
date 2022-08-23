import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AgGridModule } from "ag-grid-angular";
import { AppComponent } from "../app.component";
import { SharedModule } from "../shared/shared.module";
import { AddProductComponent } from "./add-product/add-product.component";
import { ConfirmationDialogueComponent } from "./confirmation-dialogue/confirmation-dialogue.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductRoutingModule } from "./product.routing";

@NgModule({
    declarations:[
        AppComponent,
        AddProductComponent,
        ProductListComponent,
        ConfirmationDialogueComponent
    ],
    imports:[
        SharedModule,
        ProductRoutingModule
    ] ,
    exports:[
    ]
})
export class ProductModule{

}