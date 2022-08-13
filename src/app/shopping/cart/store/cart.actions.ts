import { Action } from "@ngrx/store"
import { Product } from "src/app/shared/Models/product.model"

export const AddTOCART ="AddTOCART"
export const DELETECARTITEM = "DELETECARTITEM"
export const CARTITEMPLUSONE = "CARTITEMPLUSONE"
export const CARTITEMMINUSONE = "CARTITEMMINUSONE"

export class addItem implements Action{
    readonly  type = AddTOCART
    constructor(public payload : Product){}
}

export class deleteItem implements Action{
    readonly  type = DELETECARTITEM
    constructor(public payload: number){}
}

export class PlusOneItem implements Action{
    readonly  type = CARTITEMPLUSONE
    constructor(public payload: number){}
}

export class MinusOneItem implements Action{
    readonly  type = CARTITEMMINUSONE
    constructor(public payload: number){}
}

export type CartActions = addItem | deleteItem | PlusOneItem | MinusOneItem
