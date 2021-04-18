import { Component, Input, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
   listas:any[]=[];
   @Input() terminada ='';

  constructor(public deseos: DeseosService,
              private router:Router) {
    this.listas=this.deseos.slistas;
    console.log(this.listas);

   }

  ngOnInit() {}



  listaSeleccionada( lista:Lista ){

    console.log(lista.id);
    if (this.terminada) {

      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);

    }


  //console.log(this.terminada);

  }

  borrarLista( lista:Lista ){
    this.deseos.borrarLista( lista );

  }
  editarLista( lista:Lista ){

    //console.log(lista.titulo);
   this.deseos.editarLista(lista);


  }

}
