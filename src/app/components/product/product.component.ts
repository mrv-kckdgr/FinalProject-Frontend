import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[]= [];
  dataLoaded=false;
  filterText="";

  
  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private cartService:CartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"]);
      }else{
        this.getProducts();
      }
    })
    
  }


  getProducts(){
    console.log("Api request start");
    this.productService.getProducts().subscribe(response=>{
      this.products=response.data
      console.log("Api request finish");
      this.dataLoaded=true;
    })
    console.log("Method bitti");
  }


  getProductsByCategory(categoryId:number){
    console.log("Api request start");
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products=response.data
      console.log("Api request finish");
      this.dataLoaded=true;
    })
    console.log("Method bitti");
  }

  addToCart(product:Product){
    console.log(product);
    if(product.productId===1){
      this.toastrService.error("Hata", "Bu ürün Sepete eklenemez")
    }else{
      this.toastrService.success("Sepete eklendi", product.productName);
      this.cartService.addToCart(product);
    }
    
  }

}
