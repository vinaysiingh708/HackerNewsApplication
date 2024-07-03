import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatatableComponent } from './datatable/datatable.component';

export const routes: Routes = [ 
  { path: '', component: DatatableComponent },
  { path: 'app-new-stories', component: DatatableComponent },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
