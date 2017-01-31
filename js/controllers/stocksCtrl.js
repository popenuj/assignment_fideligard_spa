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
        stockData = $scope.stocks[company][day]
        stockData.oneDay = stockData.Close - getStockFromDaysAgo(1, company);
        stockData.sevenDay = stockData.Close - getStockFromDaysAgo(7, company);
        stockData.thirtyDay = stockData.Close - getStockFromDaysAgo(30, company);
        $scope.currentDaysStocks.push(stockData)
      }
    }

    var getStockFromDaysAgo = function(days, symbol) {
      var day = dateService.formatDate(dateService.currentDate.date - (days * dateService.oneDay));
      for (company in $scope.stocks) {
        var c = $scope.stocks[company][day]
        if (c) {
          if (c.Symbol === symbol) {
            return c.Open
          }
        }
      }
    }

    $scope.$watch("currentDate.date", function() {
      getCurrentStocks();
    })

  }]
)
