// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    pedometer.isStepCountingAvailable(function(){
      console.log( "Pedometer step counting is available" );
      alert("Pedometer Support");
    }, function(){
      console.log( "Pedometer step counting is NOT available" );
      alert("Not Pedometer Support");
    });

    $cordovaHealthKit.isAvailable().then(function(yes) {
    // HK is available
    var permissions = ['HKQuantityTypeIdentifierHeight', 'HKQuantityTypeIdentifierStepCount'];

    $cordovaHealthKit.requestAuthorization(
        permissions, // Read permission
        permissions // Write permission
    ).then(function(success) {
        // store that you have permissions
    }, function(err) {
        // handle error
    });

    }, function(no) {
        // No HK available
      });
    });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.step', {
      url: '/step',
      views: {
        'menuContent': {
          templateUrl: 'templates/step.html',
          controller: 'StepController'
        }
      }
    })

    .state('app.healthData', {
      url: '/healthData',
      views: {
        'menuContent': {
          templateUrl: 'templates/health-data.html',
          controller: 'HealthDataController'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/healthData');
});
