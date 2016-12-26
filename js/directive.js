var weatherApp = angular.module('weatherApp');

weatherApp.directive('weatherReport', function(){
	return {
		restrict: 'AECM',
		templateUrl: "views/directives/weather_report.html",
		transclude: true
	}
})
