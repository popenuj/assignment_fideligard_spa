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
