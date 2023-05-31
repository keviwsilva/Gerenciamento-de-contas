import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import * as path from 'path';
import { MesDataComponent } from './mes-data/mes-data.component';
import { AnoDataComponent } from './ano-data/ano-data.component';


const routes: Routes = [
  {
  path: 'contas', component: MesDataComponent
},
{
  path: 'ano', component: AnoDataComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
