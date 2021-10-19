import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmministrazioneComponent } from './amministrazione/amministrazione.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { StatisticheComponent } from './statistiche/statistiche.component';
import { Scheda1Component } from './_components/form_pages/scheda1/scheda1.component';
import { Scheda2Component } from './_components/form_pages/scheda2/scheda2.component';
import { Scheda3Component } from './_components/form_pages/scheda3/scheda3.component';
import { Scheda4Component } from './_components/form_pages/scheda4/scheda4.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'home', redirectTo: '', pathMatch: 'full'}, 
  { path: 'home', component: HomeComponent },
  // { path: 'test-modal', component: TestModalComponent },
  // { path: 'test-multi', component: TestMultiComponent },
  { path: "1-accoglienza", component: Scheda1Component },
  { path: "2-pre-procedura", component: Scheda2Component },
  { path: "3-intra-procedura", component: Scheda3Component },
  { path: "4-post-procedura", component: Scheda4Component },
  { path: 'ricerca', component: SearchComponent },
  { path: 'amministrazione', component: AmministrazioneComponent },
  { path: 'statistiche', component: StatisticheComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
