import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentFormComponent } from './document-form/document-form.component';
import { YearFormComponent } from './year-form/year-form.component';


const routes: Routes = [
  { path: 'docs', component: DocumentFormComponent },
  { path: 'years', component: YearFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
