Fideligard.controller("stocksCtrl", ["$scope", "stocksService", "dateService", "stocks",
  function($scope, stocksService, dateService, stocks) {

    $scope.stocks = stocks

    $scope.currentDate = dateService.currentDate;

    var getCurrentStocks = function() {
      $scope.currentDaysStocks = [];
      var day = dateService.currentDate.formatDate()
      for (var company in $scope.stocks) {
        stockData = getStockFromDaysAgo(0, company)
        stockData.oneDay = stockData.Close - setHistoricalStock(1, company)
        stockData.sevenDay = stockData.Close - setHistoricalStock(7, company)
        stockData.thirtyDay = stockData.Close - setHistoricalStock(30, company)
        $scope.currentDaysStocks.push(stockData)
      }
    }

    var setHistoricalStock = function(days, company) {
      if (getStockFromDaysAgo(days, company)) {
        return getStockFromDaysAgo(days, company).Close
      }
    }

    var getStockFromDaysAgo = function(days, symbol) {
      var formattedDay = dateService.formatDate(dateService.currentDate.date - (days * dateService.oneDay));
      var day = dateService.currentDate.date - (days * dateService.oneDay)
      if ($scope.stocks[symbol][formattedDay]) {
        return $scope.stocks[symbol][formattedDay]
      } else if (day > dateService.endDate.date) {
        return getStockFromDaysAgo((days + 1), symbol)
      }
    }

    $scope.$watch("currentDate.date", function() {
      getCurrentStocks();
    })

  }]
)
