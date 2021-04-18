import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltrocompletadoPipe } from './filtrocompletado.pipe';



@NgModule({
  declarations: [
    FiltrocompletadoPipe
  ],
  exports: [
    FiltrocompletadoPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
