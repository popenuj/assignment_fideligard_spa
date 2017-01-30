Fideligard.controller('datePickerCtrl',
  ['$scope', 'dateService', function($scope, dateService) {

    $scope.endDate = dateService.endDate;
    $scope.startDate = dateService.startDate;
    $scope.currentDate = dateService.currentDate;

  }]
)
