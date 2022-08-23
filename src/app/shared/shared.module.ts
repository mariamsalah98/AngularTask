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
import { RouterModule } from "@angular/router";
import { AgGridModule } from "ag-grid-angular";

@NgModule({
    imports: [
        CommonModule ,
        RouterModule ,
        ReactiveFormsModule,  
        AgGridModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatBadgeModule ,
        MatIconModule,
        MatDialogModule,
    ],
    exports :[
        CommonModule ,
        RouterModule ,
        ReactiveFormsModule,  
        AgGridModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatBadgeModule ,
        MatIconModule,
        MatDialogModule,
    ]
})
export class SharedModule{

}