import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  listas:any[]=[];

  constructor(public deseos:DeseosService,
              private router:Router,
              private alertCtrl:AlertController) {

   this.listas= this.deseos.slistas;
   //console.log(this.listas);
  }


async aregarLista(){


     const alert =  await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',

      inputs:[
        {
          name:'titulo',
          type:'text',
          placeholder:'nombre de la lista'
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
          text:'Crear',
          handler:(data)=>{
            console.log(data.titulo);
            if (data.titulo.length === 0 ) {
              return;
            }else{
              const listaId=this.deseos.crearnuevalista(data.titulo)
              /// llamar al metodo para crea la lista desde el servicio
               this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
            }
          }
        }
      ]
    });
    alert.present();
  }



}
