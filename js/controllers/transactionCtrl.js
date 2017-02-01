Fideligard.controller('transactionCtrl', ['$scope', 'transactionService',
  function($scope, transactionService ) {
    $scope.trades = transactionService.trades
  }
])
