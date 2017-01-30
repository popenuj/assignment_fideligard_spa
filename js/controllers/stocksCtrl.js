Fideligard.controller("stocksCtrl", ["$scope", "stocksService", "dateService",
  function($scope, stocksService, dateService) {

    $scope.stocks;

    $scope.currentDate = dateService.currentDate;

    stocksService.obtainStocks().then(function(response) {
      var stockData = response.data.query.results.quote
      var stocks = {};
      for (var i = 0; i < stockData.length; i++) {
        var companyName = stockData[i].Symbol
        if (!stocks[companyName]) {
          stocks[companyName] = {};
        }
        stocks[companyName][(stockData[i].Date)] = stockData[i]
      }
      $scope.stocks = stocks
      getCurrentStocks();
    });

    var getCurrentStocks = function() {
      $scope.currentDaysStocks = [];
      var day = dateService.currentDate.formatDate()
      for (company in $scope.stocks) {
        $scope.currentDaysStocks.push($scope.stocks[company][day])
      }
    }

    $scope.$watch("currentDate.date", function() {
      getCurrentStocks()
    })

  }]
)
