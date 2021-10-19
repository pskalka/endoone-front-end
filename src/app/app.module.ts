import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClearSchedaDialogComponent } from './_dialogs/clear-scheda-dialog/clear-scheda-dialog.component';
import { FormSignDialogComponent } from './_dialogs/form-sign-dialog/form-sign-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule} from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule} from '@angular/material/tabs';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { GETService } from './get.service';
import { POSTService } from './post.service';
import { ProtocolService } from './protocol.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AmministrazioneComponent } from './amministrazione/amministrazione.component';
import { AnagraficaComponent } from './anagrafica/anagrafica.component';
import { ChkFieldComponent } from './chk-field/chk-field.component';
import { DatiInformativiBaseComponent } from './dati-informativi-base/dati-informativi-base.component';
import { DatiInformativiComponent } from './dati-informativi/dati-informativi.component';
import { EffettiPersonaliComponent } from './effetti-personali/effetti-personali.component';
import { LoginComponent } from './login/login.component';
import { ModArrivoComponent } from './mod-arrivo/mod-arrivo.component';
import { MotivoEsameUrgenzaComponent } from './motivo-esame-urgenza/motivo-esame-urgenza.component';
import { RequiredFieldMarkComponent } from './required-field-mark/required-field-mark.component';
import { SearchComponent } from './search/search.component';
import { SelezioneSalaComponent } from './selezione-sala/selezione-sala.component';
import { StatisticheComponent } from './statistiche/statistiche.component';
import { TestMultiComponent } from './test-multi/test-multi.component';
import { TxtAreaFieldComponent } from './txt-area-field/txt-area-field.component';
import { TxtFieldComponent } from './txt-field/txt-field.component';
import { ValutazioneDoloreNrsComponent } from './valutazione-dolore-nrs/valutazione-dolore-nrs.component';
import { ValutazioneDoloreComponent } from './valutazione-dolore/valutazione-dolore.component';
import { FormRemarksControlComponent } from './_components/form_controls/form-remarks-control/form-remarks-control.component';
import { GridControlComponent } from './_components/form_controls/grid-control/grid-control.component';
import { MultiSelectControlComponent } from './_components/form_controls/multi-select-control/multi-select-control.component';
import { SingleSelectControlComponent } from './_components/form_controls/single-select-control/single-select-control.component';
import { Scheda1Component } from './_components/form_pages/scheda1/scheda1.component';
import { Scheda2Component } from './_components/form_pages/scheda2/scheda2.component';
import { Scheda3Component } from './_components/form_pages/scheda3/scheda3.component';
import { Scheda4Component } from './_components/form_pages/scheda4/scheda4.component';
import { PrettyLabelPipe } from './_pipes/pretty-label.pipe';
import { NgxWebstorageModule} from 'ngx-webstorage';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormMultiSelectComponent } from './form-multi-select/form-multi-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AnagraficaComponent,
    DatiInformativiComponent,
    TestMultiComponent,
    EffettiPersonaliComponent,
    ValutazioneDoloreComponent,
    ModArrivoComponent,
    SearchComponent,
    AmministrazioneComponent,
    StatisticheComponent,
    LoginComponent,
    ChkFieldComponent,
    TxtFieldComponent,
    DatiInformativiBaseComponent,
    TxtAreaFieldComponent,
    Scheda2Component,
    MotivoEsameUrgenzaComponent,
    PrettyLabelPipe,
    ValutazioneDoloreNrsComponent,
    Scheda4Component,
    SelezioneSalaComponent,
    RequiredFieldMarkComponent,
    ClearSchedaDialogComponent,
    SingleSelectControlComponent,
    MultiSelectControlComponent,
    GridControlComponent,
    FormRemarksControlComponent,
    Scheda1Component,
    Scheda3Component,
    FormMultiSelectComponent,
    FormSignDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    NgxMaterialTimepickerModule,
    NgxWebstorageModule.forRoot(),
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    GETService,
    POSTService,
    ProtocolService
  ],
  entryComponents: [
    ClearSchedaDialogComponent,
    FormSignDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
