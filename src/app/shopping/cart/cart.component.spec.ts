import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CartItem, CartService } from "src/app/shared/Services/CartService/cart.service";
import { CartComponent } from "./cart.component";
import * as fromCart from "./store/cart.reducer"
describe("Cart Componenent" , ()=>{
  let fixture  : ComponentFixture<CartComponent>;
  let component ;
  let mockCartService ;
  // let store = MockStore<fromCart.State>;
  let initialState = {
    cart : {
      cart : [
        { id : 20 ,
          name: 'testfood ',
          quantity: 1,
          price : 10 ,
          image:"test",
          category :"food"
        },
        {
          id : 21 ,
          name:"testfood2" ,
          quantity: 2,
          price : 20 ,
          image:"test" ,
          category : "food"
        }
      ]
    }
}
  beforeEach(()=>{
    mockCartService= 
    jasmine.createSpyObj(["deleteItem" , "plusOne" , "minusOne"])
    TestBed.configureTestingModule({
      declarations :[CartComponent] ,
      providers :[
        {provide: CartService , useValue : mockCartService},
        provideMockStore({initialState})
      ] ,
      schemas : [NO_ERRORS_SCHEMA]
    }) ;
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance ;
    fixture.detectChanges();
  });

  it("should be created" , ()=>{
    expect(component).toBeTruthy();
  });

 it("should render cart initial state" , ()=>{
  //arrange
  let dom = fixture.debugElement.query(By.css("table"));
  //assert
  expect(dom.nativeElement.textContent).toContain("testfood");
 })

 it("should call deleteItem from cart service when delete is clicked" , ()=>{
  fixture.debugElement.queryAll(By.css(".delete"))[0].triggerEventHandler('click' , {});
  expect(mockCartService.deleteItem).toHaveBeenCalledWith(20)
 })

 it("should call plusOne from cart service when plusOne is clicked" , ()=>{
  fixture.debugElement.queryAll(By.css(".plus"))[0].triggerEventHandler('click' , {});
  expect(mockCartService.plusOne).toHaveBeenCalledWith(20)
 })

 it("should call minusOne from cart service when minusOne is clicked" , ()=>{
  fixture.debugElement.queryAll(By.css(".minus"))[1].triggerEventHandler('click' , {});
  expect(mockCartService.minusOne).toHaveBeenCalledWith(21)
 })


})
