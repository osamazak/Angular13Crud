import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  //Get All Products
  getProduct(){
    return this.httpClient.get<any>("http://localhost:3000/productsList");
  }
  //Add new Product
  postProduct(data: any){
    return this.httpClient.post<any>("http://localhost:3000/productsList/",data);
  }
  //Update new Product
  putProduct(data: any,id: number){
    return this.httpClient.put<any>("http://localhost:3000/productsList/"+id,data);
  }
  //delete Product
  deleteProduct(id: number){
    return this.httpClient.delete<any>("http://localhost:3000/productsList/"+id);
  }
}
