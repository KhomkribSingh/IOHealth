angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaHealthKit) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('StepController', function($scope, $cordovaHealthKit){

/*$scope.steps = 'step';
$scope.distance = 0.0;
$scope.startDate = '';
$scope.endDate = '';
$scope.historySteps='';
$scope.historyStartDate='';
$scope.historyEndDate='';*/


  $scope.findWorkouts = function() {
    $cordovaHealthKit.findWorkouts().then(function(v){
      var value = JSON.stringify(v);
      alert("OK: " + value);
    }, function(err){
    });
  }

	var onError = function (error) {
		console.log("ERRO! " + error);
    alert("ERROR" + error);
	}

  var successHandler = function (pedometerData) {
    $scope.steps =  pedometerData.numberOfSteps;
    $scope.distance = pedometerData.distance;
    $scope.startDate = pedometerData.startDate;
    $scope.endDate = pedometerData.endDate;
    // pedometerData.floorsAscended;
    // pedometerData.floorsDescended;
    // pedometerData.startDate; -> ms since 1970
    // pedometerData.endDate; -> ms since 1970
    alert($scope.steps);
};

var queryHandler = function(pedometerData) {
  $scope.historySteps = pedometerData.numberOfSteps;
  $scope.historyStartDate = pedometerData.startDate;
  $scope.historyEndDate = pedometerData.endDate;
}
var options = {
    "startDate": new Date("Sun Jan 10 2016 00:00:00"),
    "endDate": new Date("Mon Jan 11 2016 00:00:00")
};
pedometer.queryData(queryHandler, onError, options);
pedometer.startPedometerUpdates(successHandler, onError);
//pedometer.stopPedometerUpdates(successCallback, failureCallback);




})

.controller('HealthDataController', function($scope, $cordovaHealthKit){
  $scope.body = {
        height: ''
    };

    $scope.saveHeight = function() {
        $cordovaHealthKit.saveHeight($scope.body.height, 'cm').then(function(v) {
        }, function(err) {
            console.log(err);
        });
    };

    $scope.getHeight = function() {
        $cordovaHealthKit.readHeight('cm').then(function(v) {
            alert('Your height: ' + v.value + " " + v.unit);
        }, function(err) {
            console.log(err);
        });
    };

    $scope.saveWorkout = function() {
    $cordovaHealthKit.saveWorkout(
        {
            'activityType': 'HKWorkoutActivityTypeWalking',
            'quantityType': 'HKQuantityTypeIdentifierDistanceWalkingRunning',
            'startDate': new Date(), // now
            'endDate': null, // not needed when using duration
            'duration': 6000, //in seconds
            'energy': 400, //
            'energyUnit': 'kcal', // J|cal|kcal
            'distance': 5, // optional
            'distanceUnit': 'km'
        }
    ).then(function(v) {
        alert(JSON.stringify(v));
    }, function(err) {
        console.log(err);
    });
};

$scope.getWorkouts = function() {
    $cordovaHealthKit.findWorkouts().then(function(v) {
        alert(JSON.stringify(v));
    }, function(err) {
        console.log(err);
    });
};
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
