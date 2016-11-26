// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('/', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('localuser', {
    url: '/localuser',
    templateUrl: 'templates/local.html',
    controller: 'UserController'
  })

  // setup an abstract state for the tabs directive
  .state('homeuser', {
    url: '/homeuser',
    templateUrl: 'templates/homeuser.html',
    controller: 'HomeUserCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('reportuser', {
    url: '/reportuser',
    templateUrl: 'templates/reportuser.html',
    controller: 'ReportUserCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('quiz', {
    url: '/quiz/:id',
    templateUrl: 'templates/quiz.html',
    controller: 'QuizUserCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('addmeasurement', {
    url: '/addmeasurement',
    templateUrl: 'templates/addmeasurement.html',
    controller: 'AddMeasurementCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('resultmission', {
    url: '/resultmission',
    templateUrl: 'templates/resultmission.html',
    controller: 'ResultMissionCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('ranking', {
    url: '/ranking',
    templateUrl: 'templates/ranking.html',
    controller: 'RankingCtrl'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
