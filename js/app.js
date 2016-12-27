(function () {
  'use strict';
  // TODO
  var weatherApp = angular.module('weatherApp', []);
  
  weatherApp.controller('weatherController', ['$scope', 'weatherFactory', '$http', function($scope, weatherFactory, $http){

  	$scope.degree = "c";
  	$scope.days = 2;
  	$scope.weather = {};
  	$scope.curr_forcast = '';
  	$scope.curr_local = '';

  	currentLocal();

  	function currentLocal(){
  		$('.pace').removeClass('pace-inactive');
  		$http.get("https://ipinfo.io")
		.success(function(response){
			$scope.weather.city = response.city;
			$scope.curr_local = response.city + ", " + response.country;
			// console.log($scope.curr_local);
			weatherFactory.getWeather($scope.weather.city, $scope.days)
			.then(function(response){
				// console.log(response.data);
				$scope.weatherResult = response.data;
				$scope.curr_forcast = $scope.weatherResult.list[0].temp.day;
				// console.log($scope.curr_forcast);
				$('.pace').addClass('pace-inactive');
			}, function(response,status){
				// console.log(response, status);
			});
		})
		.error(function(response){
			console.log(response);
		})
  	}

  	$scope.getForecast = function(){

  		if($scope.frm.$valid){
  			$('.pace').removeClass('pace-inactive');
  			weatherFactory.getWeather($scope.weather.city, $scope.days)
			.then(function(response){
				// console.log(response.data);
				$scope.weatherResult = response.data;
				$('.pace').addClass('pace-inactive');
			}, function(response,status){
				// console.log(response, status);
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
		return mydate.toUTCString();
	}

	$scope.updateDay = function(days){
		$scope.days = days;
		$('.pace').removeClass('pace-inactive');
		weatherFactory.getWeather($scope.weather.city, $scope.days)
		.then(function(response){ 
			// console.log(response.data.city);
			$scope.weatherResult = response.data;
			$('.pace').addClass('pace-inactive');
		}, function(response,status){
			console.log(response, status);
		});
	}

  }]);
})();