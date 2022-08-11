import{Action} from "@ngrx/store"
import { Product } from "src/app/shared/Models/product.model"

export const ADDPRODUCT = "ADDPRODUCT"
export const EDITPRODUCT = "EDITPRODUCT"
export const DELETEPRODUCT = "DELETEPRODUCT"

export class AddProductAction implements Action{
readonly type = ADDPRODUCT

constructor(public payload:Product){}
}


export class EditProductAction implements Action{
    readonly type = EDITPRODUCT
    constructor(public payload:{id:number ,product:Product}){}
}


export class DeleteProductAction implements Action{
    readonly type =  DELETEPRODUCT
    constructor(public payload :number){}
}

export type ProductActions = AddProductAction | DeleteProductAction |
                             EditProductAction
