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
        stockData.oneDay = stockData.Close - getStockFromDaysAgo(1, company).Close;
        stockData.sevenDay = stockData.Close - getStockFromDaysAgo(7, company).Close;
        stockData.thirtyDay = stockData.Close - getStockFromDaysAgo(30, company).Close;
        $scope.currentDaysStocks.push(stockData)
      }
    }

    var getStockFromDaysAgo = function(days, symbol) {
      var formattedDay = dateService.formatDate(dateService.currentDate.date - (days * dateService.oneDay));
      var day = dateService.currentDate.date - (days * dateService.oneDay)
      var c = $scope.stocks[symbol][formattedDay]
      if (c) {
        return c
      } else if (day > dateService.endDate.date) {
        return getStockFromDaysAgo((days + 1), symbol)
      } else {
        return
      }
    }

    $scope.$watch("currentDate.date", function() {
      getCurrentStocks();
    })

  }]
)
