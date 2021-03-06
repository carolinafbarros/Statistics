'use strict';

angular
		.module('iStatControllers')
		.controller(
				'iCalcController',
				[
						'$scope',
						'$http',
						'iCalcService',
						'ngDialog',
						'DocumentiStat',

						function($scope, $http, iCalcService, ngDialog,
								DocumentiStat) {

							$scope.request = '';
							var outputBeginLine = '';
							var outputBeginColumn = '';

							$scope.response = new Object();

							$scope.clickToOpen = function($name) {

								var newScope = $scope;
								newScope.calculateName = $name;
								ngDialog.open({
									template : 'popUps/popUpCalculate.html',
									className : 'ngdialog-theme-default',
									scope : newScope
								});
							};

							$scope.confirm = function($data) {
								var validInput = validateInput($data);
								if (validInput) {
									outputBeginLine = $data.outputBeginLine;
									outputBeginColumn = $data.outputBeginColumn;
									convertInputIntoRequest($data);
									$scope.closeThisDialog();
									switch ($scope.calculateName) {
									case 'Column\'s Total':
										callCalculateRowColumnTotal();
										break;
									case 'Row\'s Total':
										callCalculateRowColumnTotal();
										break;
									case 'Median':
										callCalculateMedian();
										break;
									case 'Mode':
										callCalculateMode();
										break;
									case 'Midrange':
										callCalculateMidrange();
										break;
									case 'Variance':
										callCalculateVariance();
										break;
									case 'Standard Deviation':
										callCalculateStandardDeviation();
										break;
									case 'Geometric Mean':
										callCalculateGeometricMean();
										break;
									default:
										break;
									}
								}

							};

							function validateInput($data) {
								if ($data) {
									if ($data.outputBeginLine
											&& $data.outputBeginColumn
											&& $data.inputBeginColumn
											&& $data.inputEndColumn
											&& $data.inputBeginLine
											&& $data.inputEndLine) {
										var matchedPosition = $data.outputBeginColumn
												.search(/[a-zA-Z]/i);
										if (matchedPosition == -1) {
											alert("Invalid output begin column! Must be a letter from A to Z!");
											return false;
										}
										var matchedPosition = $data.inputBeginColumn
												.search(/[a-zA-Z]/i);
										if (matchedPosition == -1) {
											alert("Invalid input begin column! Must be a letter from A to Z!");
											return false;
										}
										var matchedPosition = $data.inputEndColumn
												.search(/[a-zA-Z]/i);
										if (matchedPosition == -1) {
											alert("Invalid input end column! Must be a letter from A to Z!");
											return false;
										}
										return true;
									} else {
										alert("Invalid input! All the fields must be fill!");
										return false;
									}
								} else {
									alert("Invalid input! All the fields must be fill!");
									return false;
								}
							}

							function convertInputIntoRequest($data) {
								console.log('convertInputIntoRequest');
								var columnIndexInputBegin = getColFromName($data.inputBeginColumn);
								var lineIndexInputBegin = getLineFromName($data.inputBeginLine);
								var columnIndexInputEnd = getColFromName($data.inputEndColumn);
								var lineIndexInputEnd = getLineFromName($data.inputEndLine);
								var datasetCells = getValuesDataset(
										columnIndexInputBegin,
										lineIndexInputBegin,
										columnIndexInputEnd, lineIndexInputEnd);
								console.log(datasetCells);
								$scope.data = datasetCells.data;
							}

							function getValuesDataset(columnIndexInputBegin,
									lineIndexInputBegin, columnIndexInputEnd,
									lineIndexInputEnd) {
								var dataset = DocumentiStat.createNew();

								for (var line = lineIndexInputBegin; line <= lineIndexInputEnd; line++) {
									for (var column = columnIndexInputBegin; column <= columnIndexInputEnd; column++) {
										dataset.addCell('dataset_100', hot
												.getRowHeader(line), hot
												.getColHeader(column), hot
												.getDataAtCell(line, column));
									}
								}
								return dataset;
							}

							function getColFromName(name) {
								var n_cols = hot.countCols();
								console.log(n_cols);
								var i = 1;

								for (i = 0; i <= n_cols; i++) {
									if (name.toLowerCase() == hot.getColHeader(
											i).toLowerCase()) {
										return i;
									}
								}
								return -1; // return -1 if nothing can be found
							}

							function getLineFromName(name) {
								var n_rows = hot.countRows();
								console.log(n_rows);
								var i = 1;
								name = name.toString();
								for (i = 0; i <= n_rows; i++) {
									if (name.toLowerCase() == hot.getRowHeader(
											i).toString().toLowerCase()) {
										return i;
									}
								}
								return -1; // return -1 if nothing can be found
							}

							// Internal function
							function callCalculateRowColumnTotal() {
								console
										.log("--> Called calculateRowColumnTotal!");
								console.log($scope.data);
								var promise = iCalcService.execute($scope.data,
										'calculateRowColumnTotal');

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response);

														hot
																.setDataAtCell(
																		getLineFromName(outputBeginLine),
																		getColFromName(outputBeginColumn),
																		$scope.response.value);

													}
												},
												function(response) {
													console
															.log('Error to call calculateRowColumnTotal');
													console.log(response);
													alert(response);
												});
							}

							function callCalculateStandardDeviation() {

								console
										.log("--> Called calculateStandardDeviation!");
								var promise = iCalcService.execute($scope.data,
										'calculateStandardDeviation');

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response);

														hot
																.setDataAtCell(
																		getLineFromName(outputBeginLine),
																		getColFromName(outputBeginColumn),
																		$scope.response.value);

													}
												},
												function(response) {
													console
															.log('Error to call calculateStandardDeviation');
													alert(response);
												});

							}

							function callCalculateVariance() {

								console.log("--> Called calculateVariance!");
								var promise = iCalcService.execute($scope.data,
										'calculateVariance');

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response);

														hot
																.setDataAtCell(
																		getLineFromName(outputBeginLine),
																		getColFromName(outputBeginColumn),
																		$scope.response.value);

													}
												},
												function(response) {
													console
															.log('Error to call calculateVariance');
													alert(response);
												});

							}

							function callCalculateMidrange() {

								console.log("--> Called calculateMidrange!");
								var promise = iCalcService.execute($scope.data,
										'calculateMidrange');

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response);

														hot
																.setDataAtCell(
																		getLineFromName(outputBeginLine),
																		getColFromName(outputBeginColumn),
																		$scope.response.value);

													}
												},
												function(response) {
													console
															.log('Error to call calculateMidrange');
													alert(response);
												});

							}

							function callCalculateMode() {

								console.log("--> Called calculateMode!");
								var promise = iCalcService.execute($scope.data,
										'calculateMode');

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response);

														hot
																.setDataAtCell(
																		getLineFromName(outputBeginLine),
																		getColFromName(outputBeginColumn),
																		$scope.response.value);

													}
												},
												function(response) {
													console
															.log('Error to call calculateMode');
													alert(response);
												});

							}

							function callCalculateGeometricMean() {

								console
										.log("--> Called calculateGeometricMean!");
								var promise = iCalcService.execute($scope.data,
										'calculateGeometricMean');

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response);

														hot
																.setDataAtCell(
																		getLineFromName(outputBeginLine),
																		getColFromName(outputBeginColumn),
																		$scope.response.value);

													}
												},
												function(response) {
													console
															.log('Error to call calculateGeometricMean');
													alert(response);
												});

							}

							function callCalculateMedian() {

								console.log("--> Called calculateMedian!");
								var promise = iCalcService.execute($scope.data,
										'calculateMedian');

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response);

														hot
																.setDataAtCell(
																		getLineFromName(outputBeginLine),
																		getColFromName(outputBeginColumn),
																		$scope.response.value);

													}
												},
												function(response) {
													console
															.log('Error to call calculateMedian');
													alert(response);
												});

							}
						}

				]);