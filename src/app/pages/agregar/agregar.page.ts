import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista:Lista;
  nombreItem='';

  constructor(private route: ActivatedRoute,
              private deseos:DeseosService) {
   const listaId= this.route.snapshot.paramMap.get('listaId');
   //console.log(listaId);
   this.lista = this.deseos.obtenerLista(listaId);
   console.log(this.lista);


  }

  ngOnInit() {
  }

  agregarItems() {

    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    // ahora agrego el item actual a la lista de items
    this.lista.items.push(nuevoItem);
    this.nombreItem='';
    this.deseos.guardarStorage();


  }

  cambioCheck( item:ListaItem ){
    //console.log(item);
    /** ahora retorno la cantiudad de items que falta marcar */
    /**esto retorna un arreglo con todos los items faltantes */
    const pendientes = this.lista.items.filter(itemData =>{
      return !itemData.completado;
    }).length;
    //console.log({pendientes});
    /**validacion para reconocer cuando todas las tareas esten terminadas */
    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      // si se desmarca un check la lista cambiaria de estado ya no estaria terminada
       this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseos.guardarStorage();

    //console.log(this.lista);
  }

  borrar( i:number ){

    this.lista.items.splice( i, 1 );
    this.deseos.guardarStorage();

  }


}
