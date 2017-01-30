Fideligard.controller("stocksCtrl", ["$scope", "stocksService",
  function($scope, stocksService) {
    
    $scope.stockData = [];

    stocksService.obtainStocks().then(function(response){
      $scope.stockData = response.data.query.results.quote
    })

  }]
)
