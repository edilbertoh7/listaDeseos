import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  slistas:Lista[]=[];

  constructor(private alertCtrl:AlertController) {
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
   return nuevalista.id;

  }

  borrarLista( lista:Lista ){
    this.slistas=this.slistas.filter(listaData=>{
      return listaData.id!== lista.id;
    });
    this.guardarStorage();

  }

 async editarLista( lista:Lista ){

     const alert =  await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar Lista',

      inputs:[
        {
          name:'titulo',
          type:'text',
          value:lista.titulo
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          handler:()=>{
            console.log('Cancelar');
          }
        },
        {//boton para crear la lista
          text:'Actualizar',
          handler:(data)=>{
            console.log(data.titulo);
            if (data.titulo.length === 0 ) {
              return;
            }else{
            lista.titulo=data.titulo;
              /// llamar al metodo para crea la lista desde el servicio
              // this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
              this.guardarStorage();
            }

          }
        }
      ]
    });
    alert.present();



  }

  obtenerLista(id: string | number){
    // se reciben todos lo id y se retorna el que coincida con el que llega por parametro
  id = Number(id);
  return this.slistas.find(listaData=>{
    return listaData.id===id;
  })
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
