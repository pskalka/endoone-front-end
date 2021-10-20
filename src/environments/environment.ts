// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: '', // was: http://localhost:8080
  imgPath: '',
  //apiUrl: 'http://francescomar.myds.me:5010',
  smartlistJcrPath: '/configuration/smartlist/endoscopia-chivasso',
  smartilistJcrfieldProperties: [
    "PropertyAuto",
    "PropertyDescription",
    "PropertyEditors",
    "PropertyMaxLength",
    "PropertyMulti",
    "PropertyName",
    "PropertyProtected",
    "PropertyRequired",
    "PropertyType",
    "value"],
  newCardTitle: "Scheda infermeristica",
  pathWorkAreaSchedaDesktop: 'next-forms/dati/endoscopia-chivasso/archivio/WorkArea/Desktop',
  // pathWorkAreaSchedaTablet: 'next-forms/dati/endoscopia-chivasso/archivio/WorkArea/Tablet',
  pathWorkAreaSchedaTablet: 'next-forms/dati/endoscopia-chivasso/archivio/WorkArea/Desktop',
  pathWorkAreaSchedaAttive: 'next-forms/dati/endoscopia-chivasso/archivio/WorkArea/Desktop',
  printPostUrl: 'next-forms/pdfscheda',
  defaultMaxLength: 4096,
  gruppoendoSegreteria: 'endo-segreteria',
  gruppoendoInfermieri: 'endo-infermieri',
  gruppoendoMedici: 'endo-medici',
  gruppoendoAdmin: 'endo-admin'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
