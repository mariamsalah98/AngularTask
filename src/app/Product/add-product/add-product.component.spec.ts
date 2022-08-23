import { compileComponentFromMetadata } from "@angular/compiler";
import { ChangeDetectionStrategy, Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from "@angular/core/testing"
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import { ProductsServiceService } from "src/app/shared/Services/PoductsService/products-service.service";
import { ProductListComponent } from "../product-list/product-list.component";
import { AddProductComponent } from "./add-product.component"

describe("AddProduct Componenent" , ()=>{
  let fixture : ComponentFixture<AddProductComponent>;
  let component ;
  let mockProductService ;
  beforeEach(()=>{
    mockProductService= 
    jasmine.createSpyObj(["Categories" , "selectedProduct" , "editMode", "addProduct" , "editProduct"])
    TestBed.configureTestingModule({
      declarations :[AddProductComponent] ,
      imports :[RouterTestingModule.withRoutes([
        {path:"product/list" , component:ProductListComponent}
      ]) ],
      providers :[
        {provide: ProductsServiceService , useValue : mockProductService}
      ] ,
      schemas : [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AddProductComponent);
   component = fixture.componentInstance ;
  });

  it("should be created" , ()=>{
    expect(component).toBeTruthy();
  })

  it("should contain categories in dropdown" , ()=>{
    component.Categories = ["fruits" , "vegetables"];
    fixture.detectChanges();
    let dropdown = fixture.debugElement.query(By.css('mat-select'));
    expect(dropdown.nativeElement.textContent).toContain("fruits");
  })

  it("should be written edit on the button when its edit mode" , ()=>{
    component.Categories = ["fruits" , "vegetables"];
    component.editMode= true ;
    fixture.detectChanges();
    let button = fixture.debugElement.queryAll(By.css("button"))[2];
    expect(button.nativeElement.textContent).toEqual("Edit");
  })

  it("should be written add on the button when its not edit mode" , ()=>{
    component.Categories = ["fruits" , "vegetables"];
    component.editMode= false ;
    fixture.detectChanges();
    let button = fixture.debugElement.queryAll(By.css("button"))[2];
    expect(button.nativeElement.textContent).toEqual("Add");
  })

  it("should clear form when clear form is clicked" , ()=>{
    //arrange
    component.Categories = ["fruits" , "vegetables"];
    component.editMode= true ;
    component.selectedProduct = {
      "id": 1,
      "name": "Juhayna milk",
      "category": "Dairy",
      "price": 22,
      "availableQuantity": 11,
      "description": "full creamm",
      "image": "data:image/jpeg;base64,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"
    }

    fixture.detectChanges();
    //act
    fixture.debugElement.queryAll(By.css("button"))[0]
              .triggerEventHandler("click" , {});
    let inputElement = fixture.debugElement.queryAll(By.css("input"))[0];
    //asert
      expect(component.ProductForm.get('pName').value).toBe(null);
  });

  it("should fill form initially if we have a selected product" , ()=>{
    //arrange
    component.Categories = ["fruits" , "vegetables"];
    component.editMode= true ;
    component.selectedProduct = {
      "id": 1,
      "name": "Juhayna milk",
      "category": "Dairy",
      "price": 22,
      "availableQuantity": 11,
      "description": "full creamm",
      "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUSFRIRDxISERISEhISERIYERESFBERGhgZGhgYGBkcJi8lHB8tHxgYJjspKy8xNjU1HCU7TjszQy40NTEBDAwMEA8QHhISHz8sJSs2MTY/Pz8/PzQ/MTE9Nzc6MTQ0NDE2NDQ9NTU0Njc0NDQ0PTQxNDQ0NDE0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEBAAIDAQEAAAAAAAAAAAAAAQUGAgMEBwj/xABCEAACAgECAwUEBwcBBgcAAAABAgADEQQSBSExBhNBUXEiMmGRFEJSgaGywSQ0YpKzwtFjI1OTouHwBzNygqOx0v/EABkBAQADAQEAAAAAAAAAAAAAAAACAwQFAf/EACYRAQEAAgEDBAIDAQEAAAAAAAABAhEDBBIhMUFRgSJxMjNhQhT/2gAMAwEAAhEDEQA/APs0mZZIDMZiIDMZiIDMZiIDMZiIDMZiIDMZiIDMZiIDMZiIDMZiIDMZiIDMZiIDMZiIDMskCBYiICSWSAiJIFiSIFiIgIiICJ57yxxsdV65yA36wzHCgMufrNy5cuoB+OIeMZreLsjugVCFJHPOehP6Tobjzc/YTlnxbzAl4jwg2MXV0JPUlypJxjOFGJ4G4DZ9qv8A4rw9d1/aN1zhE/5j4n4/CZXgGva+tnfGQ7KMDAwAp/WYB+zdjdXr/wCK/wDiZvg2jbT1hNysTZuOGyNpwDzOOfLMDMRPLh/96nj9QY+Hj/3idyP4FgT4Hl7XLygdkSxAkSxAkSxAREQECIECxEQEkskBJLJAsSRAsREBIRnlLEDHt1PqZxnJup9TOMDqs1CKQruik+BYAzF8c1r1siVtsG3cTgEnmQBz9PxnRxvh7ljYhUq2MqWVSCBjkW5ETGIllqivBLIcodysAhIDKcHoPeHoR4iYOXk5ct4ya+Kryy1dNm0OrDVI9jKpOQScKCQSM/hPXW6sNyEMPMEETS7newhEChVARFa2pcL5kE9T1M2bgmhalCHYMztubHNRywAD49Oss4OXkyy7bPEnr/rVlx4Y4S90t+GQlr9+v1P5TJLV79fq35TNalkYiICIiAiIgIiICBECBYiICSWSAiIgIiICIiAiIgY9up9TOMwfari9lBpq0yo1+qtKIXzsTGMk/wAw/Hr0mIPEtfp9TpKdXZp3TU2FcIh5KNoPMgY94Scwtm0bZHp1nCbrr23h9hY4sJXYqeAUZz08MdfnOvtFYNIKqaF2K+XZwcM7KRjLeOOv3iTi91+jt0eqvu31szafVBN6U4ZmKPsJIBCk5P8ACPOevtRrGS/h1S7DXfqCtislb7lBQADcDj3zzHPpM+XSyyyXzfdLgyw48+7KbTUcM+lUJeiImoZA55ALZ6/E9Qfj8u7stptRWLBqAVTK92pI5HnuxjoOk8PHeKavvtRVpDXVXpNML3dk3O42lsIDkeGOngefhPP2Z7Q6h1TTXoO+toss0dzsxW5gGIDkZPUHp4KeXTNuPTa1l7qspjeTunj1/TdZyq99PVvymaVr9TxXTI99j6N66wGdVD5K5APgPPzm2cK1YuXT2qNotrWwDrt3JnH4yWWOptOZbZmIiRSIiICIiAiIgIEQIFiIgJJZICIiAiIgIiICIiBrvH+D16tNlpZCj94littath4g/wCf0mAPYreVd9fq3dDmt9+SgPP2SSSCeXMEdJtPEag6WIwZlZWyq43MOuBnkc9OfXM1nSq5QXG36JZaXFdd+xGV+jOoIAYnCYG3kAPU243LXioZdu/Lm/ZAsliWa3VXLZWybbH7xFbIKuAT1DKD6ZHjNd0XDrtZfTp79XWPoiWit6y/e+w4rYgkDmGVBk/Z8es3d7tSEDJWjvvsDrnA2jcqYzgkZAOeuMTqbWaldzPUoAKooGDlmcgEDOT1QY8SfDnhM6XGMS/Yjc299drGfYa9xcFih6rk89vw6SL2EUd2RrdWDXnu8MB3YPXZ9nPwmco1d+8CyoIma1Zsj3mUe7gn6+Qc/Dr1lV9TZlWrrpVlZd3eFnBKHDLt5DDY+6O/L5O2fDXNf2TdnqpfWayyu0uHL6hMKyqXUBG98naenTbnwm48O061CipPdrQVr54VMDPymPo4OFc2NY7e2jrltzZUsebHwy7rgfVIHTlMmtqrZWrMoZy2xSQGbCknA8eQMjllb4eyaZSIiQSIiICIiAiIgIEQIFiIgJJZICIiAiIgIiICcX6H0M5Ti/Q+hiFfE9Dx7U0AJVcwQdEYK6geQ3A4HpieXiHELdQ2/UOXYDAyAAo8gByE9PDOHLYl11jlUoAJRQC7kgnAzyA5decx9hX6isB/E4Y/gBOxjMN3U8uXblqbvhmeDdqL9KAmRbWOlbk+wP4W6gfDmPhNiHbmv3b9NajKwJUMjYZSCPe29CBNL0tSOlis9aOSmxnLhQntb8bQfa9zr4FvGe6zV6Y3PYa7rCztyLV7CTyDbNuT57SfWVZ8WFy9E8eTKT1ba3bWhiFFGodiVKpsryT1XA3ehE879tXdxVRpGawsVCvZht3ltA/Wa5TfWzm9RagWv2qglbI1VaKjpvLZIK4z7ORn0mMUvp7PZbZZU5AYEHaw5cvMSM4ML7JXmy+Wf4v2l1wY12Y0zDqiIAcHodxyfvBnV2LsZ9fp3dmdj3uWZizH/ZP1J5z16e1uKVPXaE+lUAPVYAFDoThkfHTnjp5j456OyOmariVNb43obA2DkZ7lz1++e/jMMsdasleflcsbvc2+uxETmugREQEREBERAQIgQLERASSyQEREBERAREQE42dD6GcpxfofQxCvk3Y2pbBqq3zsdKw2OoB3jP4zzarslqUYhEW1AfZdXRdw8PZYggzu7D2YutXzpJ+8On+TN2Wz78Z5f9fCbeXmy4+Tx76ZOPjxz4/Ps0PQ8G1NTFxpS7rjZmxNqHxYqDknHTBGDz64k1esvqYPbpKq2LbhY1d/N8q2QxfBbKL8j4Fs76CT1GPQzkKQchssG5FSNyn1B5GQ/wDTbd5RK9PNaxr5i3ETsNaVVICHG5e+LDftDkbnI5hFHTl4YzFWmu1bu9dZdnYsxUEIpJ8zyA9TPpCcF04O4UUg+fdV/wCJkkrCjAAA8gAB8pO9VJ/GITprfWsB2Z4J9EVmchrLMbyOigdFH+fGYXgj7uL58rdSv8tbr+k3m/kDPn/Zds8UU+d2qPzWyR48rnM8r8J8kmHbjPl9aiBLMjSkSxAkSxAkSxAkCIECxEQEkskBERAREQEREBOL9D6GcpxfofQxCvjnY98anH2q7V+S7v7ZuytzPrNB7MvjVVfHvF+dbj9Zn9XfZZqkorsNddaLdawAy+Wwqc/A45+s19VjvP6Zeny1j9tpRp3LMHxfUtXpr7EJV1rYqfFT0yPnOOltcarTVGxyi6HvGBP/AJlm4IWfzPj6zPjjbNr7lq6eTgd7trHdnc95Zra2UsSoSpqgmF6DG5h983JZofChar8Quor3vXdbTSOv+0stBdjnwUKhmUay/h5R77bNVpnwL3Iy1Fh+uv8AATyx+uM28mG74V4ZanlsOpb3R/Ev/wBz532Hfdr6G+0bm+dbmb7rbgUDoQy7TYrA5DDbkEGaB2CH7dpvS3+k8nwT8M/0jy388f2+xiWQSzI0kREBERAREQJAiBAsREBJLJAREQEREBERATi/Q+hnKcX6H0MQr4dwN9up05/1q1/mYL+s2HiddtV66ums2qaxXdWPfKg7lZfMjP8A34atoH221N9m2tvk4M+g2DDGbequrL/jJ003LGE1uuu1dVlGn0lyb1w72qKwFHPC56k4x987a+J2C+vUNo9ZhNN9HZe5bJs3BuX8PLr+EznDdMle8oCDZYbH9pjlyACefToOQndouHU1ObEBV7A683c7tzGxgFJx1yeUpmck1pdcLbvbCcJ1Go0XefSdLa6X2G8NUveGt399HHhjl/1ntv4pqNUjVabR2IrqUazUDYiqRgnb9b7s+kzSatC2xbFLbzXtByd4BJH3BW+Rndo9Wlqb0JK7nTmCDuRirdfiDPLn72eSY+NS+GCs0P0TRPVvLmujUNuPL2ijnCjwGTNW7Cfv2n9Lf6bzce1T409x/wBJh/MQv6zTuwn79p/S3+m8v4t3iyyvvtTyzXJjI+xCWQSzE1kREBERAREQJAiBAsREBJLJAREQEREBERATjZ0PoZynF+h9DEK/P5bHMeHP5T6DxWt33d021wwdOu1mViQrY+qehnz1vGfRlfIRvtVo3zUH9Zv6zx21i6b/AKjFabhNyhGGpsDIVs2bL3U2AJuUkNzQlT4fWPnO1OGX2Be9vZCuNu2jVsc7GUncGUjm59dq+k9iHU95msV90uPZZipsypychW6HHl08c8vXo69Xle9ekrkBwpI9nDbivsZzkrjny2+OZmmVk9Y0XGOI4aN62JZZWylNxFN43jObM9ObNtOOnLocmejQcJZEK9/ant2NhPYXDXGzOGXO7B2H4Z9Z49PwrUoHRbFKN3ZRmZmdNlysoOAARs3kjzbHTnMxwzRGlNhsew5B3N1wEVAPkgPqSfGMr48Uxm76MT2yf9mu+IrH/wAiH9JrHYT9+o9Lf6bzPdtnxp2H2rK1/M39swfYIfttPpb/AE2mjj/oy+1HL/dPp9fiImFsIiICIiAiIgIEQIFiIgJJZICIiAiIgIiICcbOh9DOU42dD6GIV+f2m+6Bs00H/RrHyRR+k0Nus3ngr501B/hK/wArMv8AbOh1c/CVg6X+dZSi5VBLMFABJJ5AAdTPUmvqxu72vbg89645EA/iRPHXUDnG0MQBuK58QeY5TkmndCM2rjJflSNx57mBwc4JwTjmZhkxrbbY9ycSqILCxSA6pyPVjgDHmPaHPpPUtgPQ55Z+6eGmqw5ItU8xtHdAYG4E5OTnluH3z2ogHJQB1PIdTFkj2baj25f/AGSDzvU/JH//AFMb2BH7ZV6W/kae7t82BSvm9jfIIP7p4+wH73V6WfkabsPHT37Ysv759PrYlklnPbiIiAiIgQxLJAQIgQLERASSyQEREBERAREQE4v0PpOUj9D6QV+fm6zc+zp/Zq/g1g/5mP6zTG6zZezfEEVGqsdUYOXQsdqsCByyfHkfnOp1GNy4/DndPlMc/LatNPem0kA4JHMA4yPiJpvEeL2Vup01lDVqoaxd9Zd/a5qvPrj4zu7QIl76eyjV102DfWzi1AUUqWBLKeXMbf8A3TBjxW634bcuSTem6rE0jQau+lL0GspttNlIqd7w9ew53kbjkcsZ64+cy/B+JN7bazWaUkHataPWEAGDvDE5OckfdGXDZ52Y8krDf+IDe3px5JYfmVH9s6OwH73X6WfkaeXtdxFL7wam3olYTcOjNuZiR5jmBn4Tv7An9tq9LfyNNurODV+GK2Xn3Pl9elklnNdEiIgIiICQyyQECIECxEQEkskBJLJAREQEsksBOL9D6TlI3QwPgOwnJUEgczgE4GM8/LoflO7RoA6d6CqB9r5RmweeVIHPPw6z3i160NP0ezfixXZldSrMHXAA64DHr4zqv1Njo1fdON7F3bDkliVLHHTqo59evnOv3b8OV26VNJSS261FK7cr0XJ25AyeZGW6E+71GZE0KAJZbbWqnYxQYbevLcqbCSCM454znPQEzw/R3/3b/wAjR3D/AGH/AJGnup8m/wDGX4Vw/T2LX3toVmPtYcKyv7eVYEEBMIhDY6uRz5Adeu0GnRHauxy6ZCowI3A2IFb2lXPslsgZ57T0zPBR3lfuo3XPOsnP4ZnG5HZi3dsM+G1v1ke3zvue7/H08uibH2C/faf/AE2/kaYDuX+w/wDK02LsFp3+m1tsbaiWFm2nCgqQMn1InvNZ2X9HFL3x9clklnIdQiIgIiIEMQYgIEQIFiIgJJZICSXEYgSJcRiBJYxEAYjEYgIjEYgIiICIiAiIgIiICIiAiIgIiICBEsBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA/9k="
    }

    fixture.detectChanges();
    //act
    let inputElement = fixture.debugElement.queryAll(By.css("input"))[0];
    //asert
      expect(component.ProductForm.get('pName').value).toBe("Juhayna milk");
  })

  it(`should call addProduct from Product 
      service if we click add and its not edit mode` ,()=>{
        component.Categories = ["fruits" , "vegetables"];
        component.editMode= false ; 
        fixture.detectChanges(); 
        //form
        let name = component.ProductForm.controls["pName"];
        let category = component.ProductForm.controls["pCategory"];
        let description = component.ProductForm.controls["pDescription"];
        let image = component.ProductForm.controls["pImage"];
        let quantity = component.ProductForm.controls["pQuantity"];
        let price = component.ProductForm.controls["pPrice"];
        name.setValue("test");
        category.setValue("test");
        description.setValue("test");
        image.setValue("test");
        quantity.setValue(10);
        price.setValue(10);
        fixture.detectChanges(); 
        
        component.onsubmit()
        fixture.detectChanges(); 

        expect(mockProductService.addProduct).toHaveBeenCalled();
      })

      it(`should call editProduct from Product 
      service if we click add and its edit mode` ,()=>{
        component.Categories = ["fruits" , "vegetables"];
        component.editMode= true ; 
        fixture.detectChanges(); 
         //form
         let name = component.ProductForm.controls["pName"];
         let category = component.ProductForm.controls["pCategory"];
         let description = component.ProductForm.controls["pDescription"];
         let image = component.ProductForm.controls["pImage"];
         let quantity = component.ProductForm.controls["pQuantity"];
         let price = component.ProductForm.controls["pPrice"];
         name.setValue("test");
         category.setValue("test");
         description.setValue("test");
         image.setValue("test");
         quantity.setValue(10);
         price.setValue(10);
        fixture.detectChanges();

        component.onsubmit()
        fixture.detectChanges(); 

        expect(mockProductService.editProduct).toHaveBeenCalled();
      })

})
