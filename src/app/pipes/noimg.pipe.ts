import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimg'
})
export class NoimgPipe implements PipeTransform {

  transform(  images:any[]) :string {
    
    // Si no existe imagen:
    if ( !images ) {
      return '../../../../assets/img/noimage.png';
    }
    
    // En caso de que la API devuelva un array con contenido
    if (  images.length > 0) {
      return images[0].url;
    } else {
      return '../../../../assets/img/noimage.png';
    }
  }
}
