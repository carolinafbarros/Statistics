'use strict';

angular.module('iStatControllers').controller('iIOController',
	['$scope', '$http', 'iIOService',

		function ($scope, $http, iIOController) {

			$scope.request = '';

			$scope.data = "{    \"datasets\": [        {            \"name\": \"dataset_1\",            \"cells\": [                {                    \"line\": \"1\",                    \"column\": \"A\",                    \"value\": 100                },                {                    \"line\": \"2\",                    \"column\": \"A\",                    \"value\": 200                }            ]        },        {            \"name\": \"dataset_2\",            \"cells\": [                {                    \"line\": \"1\",                    \"column\": \"A\",                    \"value\": 100                },                {                    \"line\": \"2\",                    \"column\": \"A\",                    \"value\": 200                }            ]        }    ]}";

			$scope.response = new Object();

			$scope.calculateRowTotal = function ($data) {
				console.log($data);
				$scope.data = $data;
				callCalculateRowTotal();
			}
		
		
			function callCalculateRowTotal() {

				var promise = iCalcService.calculateRowTotal($scope.data);

				promise.then(function (response) {

					if (response.data != null) {

						$scope.response = response.data;
						console.log($scope.response);

						hot.setDataAtCell(1, 1, $scope.response.value);

					}
				}, function (response) {
					console.log('Error to call callCalculateRowTotal');
				});
			}
		}

	]);