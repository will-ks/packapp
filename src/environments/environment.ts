// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server: 'http://localhost:3000',
  firebase: {
    apiKey: 'AIzaSyCJBhCAKce8MJGX89rONXDCrmGq-B_KeKk',
    authDomain: 'projectcountdown-195619.firebaseapp.com',
    databaseURL: 'https://projectcountdown-195619.firebaseio.com',
    projectId: 'projectcountdown-195619',
    storageBucket: 'projectcountdown-195619.appspot.com',
    messagingSenderId: '352779741386'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
