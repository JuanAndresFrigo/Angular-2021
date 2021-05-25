import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html'
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  placeholderText:string ='Buscar por pais..';

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    this.hayError = false;
    this.termino=termino;

    this.paisService.buscarPais(termino)
      .subscribe((paises) => {
        console.log(paises);

        this.paises = paises;
        console.log("paises: ", this.paises);
        

      }, (err) => {
        this.hayError = true;
        this.paises=[];
      });

  }
  sugerencias(termino:string){
    this.hayError=false;
  }

}
