'use strict';

angular
		.module('iStatControllers')
		.controller(
				'iTransformController',
				[
						'$scope',
						'$http',
						'iTransformService',
						'ngDialog',
						'DocumentiStat',

						function($scope, $http, iTransformController, ngDialog,
								DocumentiStat) {

							$scope.request = '';

							$scope.response = new Object();

							$scope.clickToOpen = function($name) {

								var newScope = $scope;
								newScope.transformName = $name;
								ngDialog.open({
									template : 'popUps/popUpTransform.html',
									className : 'ngdialog-theme-default',
									scope : newScope
								});
							};

							$scope.clickToOpenInterpolation = function($name) {

								var newScope = $scope;
								newScope.transformName = $name;
								ngDialog
										.open({
											template : 'popUps/popUpTransformInterpolation.html',
											className : 'ngdialog-theme-default',
											scope : newScope
										});
							};

							$scope.clickToOpenDatasets = function($name) {

								var newScope = $scope;
								newScope.transformName = $name;
								ngDialog
										.open({
											template : 'popUps/popUpTransformDatasets.html',
											className : 'ngdialog-theme-default',
											scope : newScope
										});
							};

							$scope.clickToOpenScale = function($name) {

								var newScope = $scope;
								newScope.transformName = $name;
								ngDialog
										.open({
											template : 'popUps/popUpTransformScale.html',
											className : 'ngdialog-theme-default',
											scope : newScope
										});
							};

							$scope.confirm = function($data) {
								var validInput = validateInput($data);
								if (validInput) {
									$scope.outputBeginLine = $data.outputBeginLine;
									$scope.outputBeginColumn = $data.outputBeginColumn;
									$scope.closeThisDialog();
									switch ($scope.transformName) {
									case 'Transpose Dataset':
										convertInputIntoRequest($data);
										callTransformTranspose();
										break;
									case 'Scale':
										convertInputIntoRequestScale($data);
										callTransformScale();
										break;
									case 'Add a Scalar':
										convertInputIntoRequestScale($data);
										callTransformAddScalar();
										break;
									case 'Add Two Datasets':
										convertInputIntoRequestDatasets($data);
										callTransformAddTwoDatasets();
										break;
									case 'Multiply Two Datasets':
										convertInputIntoRequestDatasets($data);
										callTransformMultiplyTwoDatasets();
										break;
									case 'Linear Interpolation':
										convertInputIntoRequest($data);
										$scope.inputType = $data.inputType;
										$scope.outputBeginColumn = $data.inputBeginColumn;
										$scope.outputBeginLine = $data.inputBeginLine;
										callTransformLinearInterpolation();
										break;
									default:
										break;
									}
								}
							};

							function validateInput($data) {
								if ($data) {
									switch ($scope.transformName) {
									case 'Transpose Dataset':
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
										} else {
											alert("Invalid input! All the fields must be fill!");
											return false;
										}
										break;
									case 'Scale':
									case 'Add a Scalar':
										if ($data.inputScalar
												&& $data.inputBeginColumn
												&& $data.inputEndColumn
												&& $data.inputBeginLine
												&& $data.inputEndLine) {
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
										} else {
											alert("Invalid input! All the fields must be fill!");
											return false;
										}
										break;
									case 'Add Two Datasets':
									case 'Multiply Two Datasets':
										if ($data.outputBeginLine
												&& $data.outputBeginColumn
												&& $data.matrix1.inputBeginColumn
												&& $data.matrix1.inputEndColumn
												&& $data.matrix1.inputBeginLine
												&& $data.matrix1.inputEndLine
												&& $data.matrix2.inputBeginColumn
												&& $data.matrix2.inputEndColumn
												&& $data.matrix2.inputBeginLine
												&& $data.matrix2.inputEndLine) {
											var matchedPosition = $data.outputBeginColumn
													.search(/[a-zA-Z]/i);
											if (matchedPosition == -1) {
												alert("Invalid output begin column! Must be a letter from A to Z!");
												return false;
											}
											var matchedPosition = $data.matrix1.inputBeginColumn
													.search(/[a-zA-Z]/i);
											if (matchedPosition == -1) {
												alert("Invalid input matrix1 begin column! Must be a letter from A to Z!");
												return false;
											}
											var matchedPosition = $data.matrix1.inputEndColumn
													.search(/[a-zA-Z]/i);
											if (matchedPosition == -1) {
												alert("Invalid input matriz1 end column! Must be a letter from A to Z!");
												return false;
											}
											var matchedPosition = $data.matrix2.inputBeginColumn
													.search(/[a-zA-Z]/i);
											if (matchedPosition == -1) {
												alert("Invalid input matrix2 begin column! Must be a letter from A to Z!");
												return false;
											}
											var matchedPosition = $data.matrix2.inputEndColumn
													.search(/[a-zA-Z]/i);
											if (matchedPosition == -1) {
												alert("Invalid input matriz2 end column! Must be a letter from A to Z!");
												return false;
											}
										} else {
											alert("Invalid input! All the fields must be fill!");
											return false;
										}
										break;
									case 'Linear Interpolation':
										if ($data.inputType
												&& $data.inputBeginColumn
												&& $data.inputEndColumn
												&& $data.inputBeginLine
												&& $data.inputEndLine) {
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
										} else {
											alert("Invalid input! All the fields must be fill!");
											return false;
										}
										break;
									default:
										break;
									}
									return true;
								} else {
									alert("Invalid input! All the fields must be fill!");
									return false;
								}
							}

							function convertInputIntoRequest($data) {
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

							function convertInputIntoRequestScale($data) {
								var columnIndexInputBegin = getColFromName($data.inputBeginColumn);
								var lineIndexInputBegin = getLineFromName($data.inputBeginLine);
								var columnIndexInputEnd = getColFromName($data.inputEndColumn);
								var lineIndexInputEnd = getLineFromName($data.inputEndLine);
								var datasetCells = getValuesDataset(
										columnIndexInputBegin,
										lineIndexInputBegin,
										columnIndexInputEnd, lineIndexInputEnd);
								console.log(datasetCells);
								var scalar = $data.inputScalar;
								console.log(scalar);
								$scope.data = datasetCells.data;
								$scope.scalar = scalar;
							}

							function convertInputIntoRequestDatasets($data) {
								var matrix1ColumnIndexInputBegin = getColFromName($data.matrix1.inputBeginColumn);
								var matrix1LineIndexInputBegin = getLineFromName($data.matrix1.inputBeginLine);
								var matrix1ColumnIndexInputEnd = getColFromName($data.matrix1.inputEndColumn);
								var matrix1LineIndexInputEnd = getLineFromName($data.matrix1.inputEndLine);
								var matrix2ColumnIndexInputBegin = getColFromName($data.matrix2.inputBeginColumn);
								var matrix2LineIndexInputBegin = getLineFromName($data.matrix2.inputBeginLine);
								var matrix2ColumnIndexInputEnd = getColFromName($data.matrix2.inputEndColumn);
								var matrix2LineIndexInputEnd = getLineFromName($data.matrix2.inputEndLine);
								var matrixDatasetCells = getValuesDatasetMatrixs(
										matrix1ColumnIndexInputBegin,
										matrix1LineIndexInputBegin,
										matrix1ColumnIndexInputEnd,
										matrix1LineIndexInputEnd,
										matrix2ColumnIndexInputBegin,
										matrix2LineIndexInputBegin,
										matrix2ColumnIndexInputEnd,
										matrix1LineIndexInputEnd);
								console.log(matrixDatasetCells);
								$scope.data = matrixDatasetCells.data;
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

							function getValuesDatasetMatrixs(
									matrix1ColumnIndexInputBegin,
									matrix1LineIndexInputBegin,
									matrix1ColumnIndexInputEnd,
									matrix1LineIndexInputEnd,
									matrix2ColumnIndexInputBegin,
									matrix2LineIndexInputBegin,
									matrix2ColumnIndexInputEnd,
									matrix2LineIndexInputEnd) {
								var dataset = DocumentiStat.createNew();
								for (var line = matrix1LineIndexInputBegin; line <= matrix1LineIndexInputEnd; line++) {
									for (var column = matrix1ColumnIndexInputBegin; column <= matrix1ColumnIndexInputEnd; column++) {
										dataset.addCell('dataset_1', hot
												.getRowHeader(line), hot
												.getColHeader(column), hot
												.getDataAtCell(line, column));
									}
								}
								for (var line = matrix2LineIndexInputBegin; line <= matrix2LineIndexInputEnd; line++) {
									for (var column = matrix2ColumnIndexInputBegin; column <= matrix2ColumnIndexInputEnd; column++) {
										dataset.addCell('dataset_2', hot
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

							function callTransformTranspose() {

								console.log("--> Called transformTranspose!");
								var promise = iTransformController.execute(
										$scope.data, $scope.scalar,
										$scope.outputBeginLine,
										$scope.outputBeginColumn,
										'transformTranspose');

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response.datasets[0].cells);
														var resultCells = $scope.response.datasets[0].cells;
														for (var cellIndex = 0; cellIndex < resultCells.length; cellIndex++) {
															hot
																	.setDataAtCell(
																			getLineFromName(resultCells[cellIndex].line),
																			getColFromName(resultCells[cellIndex].column),
																			resultCells[cellIndex].value);
														}

													}
												},
												function(response) {
													console
															.log('Error to call transformTranspose');
													console.log(response);
													alert(response);
												});

							}

							function callTransformScale() {

								console.log("--> Called transformScale!");
								var promise = iTransformController.execute(
										$scope.data, $scope.scalar,
										$scope.outputBeginLine,
										$scope.outputBeginColumn,
										'transformScale');

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response.datasets[0].cells);
														var resultCells = $scope.response.datasets[0].cells;
														for (var cellIndex = 0; cellIndex < resultCells.length; cellIndex++) {
															hot
																	.setDataAtCell(
																			getLineFromName(resultCells[cellIndex].line),
																			getColFromName(resultCells[cellIndex].column),
																			resultCells[cellIndex].value);
														}

													}
												},
												function(response) {
													console
															.log('Error to call transformScale');
													console.log(response);
													alert(response);
												});

							}

							function callTransformAddScalar() {

								console.log("--> Called transformAddScalar!");
								var promise = iTransformController.execute(
										$scope.data, $scope.scalar,
										$scope.outputBeginLine,
										$scope.outputBeginColumn,
										'transformAddScalar');

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response.datasets[0].cells);
														var resultCells = $scope.response.datasets[0].cells;
														for (var cellIndex = 0; cellIndex < resultCells.length; cellIndex++) {
															hot
																	.setDataAtCell(
																			getLineFromName(resultCells[cellIndex].line),
																			getColFromName(resultCells[cellIndex].column),
																			resultCells[cellIndex].value);
														}
													}
												},
												function(response) {
													console
															.log('Error to call transformAddScalar');
													console.log(response);
													alert(response);
												});

							}

							function callTransformAddTwoDatasets() {

								console
										.log("--> Called transformAddTwoDatasets!");
								var promise = iTransformController.execute(
										$scope.data, $scope.scalar,
										$scope.outputBeginLine,
										$scope.outputBeginColumn,
										'transformAddTwoDatasets');

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response.datasets[0].cells);
														var resultCells = $scope.response.datasets[0].cells;
														for (var cellIndex = 0; cellIndex < resultCells.length; cellIndex++) {
															hot
																	.setDataAtCell(
																			getLineFromName(resultCells[cellIndex].line),
																			getColFromName(resultCells[cellIndex].column),
																			resultCells[cellIndex].value);
														}

													}
												},
												function(response) {
													console
															.log('Error to call transformAddTwoDatasets');
													console.log(response);
													alert(response);
												});

							}

							function callTransformMultiplyTwoDatasets() {

								console
										.log("--> Called transformMultiplyTwoDatasets!");
								var promise = iTransformController.execute(
										$scope.data, $scope.scalar,
										$scope.outputBeginLine,
										$scope.outputBeginColumn,
										'transformMultiplyTwoDatasets');

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response.datasets[0].cells);
														var resultCells = $scope.response.datasets[0].cells;
														for (var cellIndex = 0; cellIndex < resultCells.length; cellIndex++) {
															hot
																	.setDataAtCell(
																			getLineFromName(resultCells[cellIndex].line),
																			getColFromName(resultCells[cellIndex].column),
																			resultCells[cellIndex].value);
														}

													}
												},
												function(response) {
													console
															.log('Error to call transformMultiplyTwoDatasets');
													console.log(response);
													alert(response);
												});

							}

							function callTransformLinearInterpolation() {

								console
										.log("--> Called transformLinearInterpolation!");
								var typeOfInterpolation = '';
								if ($scope.inputType) {
									if ($scope.inputType == 'row') {
										typeOfInterpolation = 'transformInterpolationLine';
									} else {
										typeOfInterpolation = 'transformInterpolationColumn';
									}
								}
								var promise = iTransformController.execute(
										$scope.data, $scope.scalar,
										$scope.outputBeginLine,
										$scope.outputBeginColumn,
										typeOfInterpolation);

								promise
										.then(
												function(response) {

													if (response.data != null) {

														$scope.response = response.data;
														console
																.log($scope.response.datasets[0].cells);
														var resultCells = $scope.response.datasets[0].cells;
														for (var cellIndex = 0; cellIndex < resultCells.length; cellIndex++) {
															hot
																	.setDataAtCell(
																			getLineFromName(resultCells[cellIndex].line),
																			getColFromName(resultCells[cellIndex].column),
																			resultCells[cellIndex].value);
														}

													}
												},
												function(response) {
													console
															.log('Error to call transformLinearInterpolation');
													console.log(response);
													alert(response);
												});

							}
						}

				]);