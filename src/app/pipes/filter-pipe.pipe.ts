import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  //array i filtreleyeceğiz -> : dan sonra yazılan dönüs tipi
  transform(value: Product[], filterText: string): Product[] {
    filterText = filterText?filterText.toLocaleLowerCase():"" 
    return filterText?value.filter((p:Product)=>p.productName.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }
  //ilk karakterden itibaren bulamadığında -1 bulursa ilk bulduğu karakteri döndürür.

}


//map
//filter