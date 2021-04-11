import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  slistas:Lista[]=[];

  constructor() {
  // const lista1 =new Lista('Recolectar gemas del infinito');
  // const lista2 =new Lista('Heroes a desaparecer');
  // this.slistas.push(lista1,lista2);
  //console.log(this.slistas);
  this.cargarStorage();
  }
  crearnuevalista(titulo:string){
  const nuevalista =new Lista(titulo);
   this.slistas.push(nuevalista);
   this.guardarStorage();

  }

  guardarStorage(){
    localStorage.setItem('data',JSON.stringify(this.slistas));
  }
  cargarStorage(){
    if (localStorage.getItem('data')) {
      this.slistas=JSON.parse(localStorage.getItem('data'));
    }else{
      this.slistas=[];
    }
  }


}
