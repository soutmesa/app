(function () {
  'use strict';
  // TODO
  var weatherApp = angular.module('weatherApp', []);
  
  weatherApp.controller('weatherController', ['$scope', 'weatherFactory', function($scope, weatherFactory){
  	
  	var day = 1;
  	$scope.degree = "c";
  	$scope.weather = {};

  	$scope.getForecast = function(){

  		if($scope.frm.$valid){
  			weatherFactory.getWeather($scope.weather.city, day)
			.then(function(response){
				console.log(response.data);
				$scope.weatherResult = response.data;
			}, function(response,status){
				console.log(response, status);
			});
  		}

	}

	$scope.convertToFehrenheit = function(number){
		
		if($scope.degree=="c"){
			return number = number - 273.15;
		}else{
			return number = number*(9/5) - 459.67;
		}
		
	}

	$scope.convertToDateTime = function(num){
		var mydate = new Date(parseInt(num, 10) * 1000);
		return mydate.toString();
	}

	$scope.updateDay = function(days){
		day = days;
		weatherFactory.getWeather($scope.weather.city, day)
		.then(function(response){ 
			console.log(response.data.city);
			$scope.weatherResult = response.data;
		}, function(response,status){
			console.log(response, status);
		});
	}

  }]);
})();