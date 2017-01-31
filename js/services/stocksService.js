Fideligard.factory('stocksService', [ "$http", "dateService",
  function($http, dateService){
    var _start = dateService.endDate.formatDate()
    var _end = dateService.startDate.formatDate()

    var obtainStocks = function(){
        return $http({
          method: "GET",
          url: _urlBuilder(["AAPL", "YHOO", "GOOG", "MSFT"])
        }).then(formatData)
      }

    var formatData = function(response) {
      var stockData = response.data.query.results.quote
      var tempStocks = {};
      for (var i = 0; i < stockData.length; i++) {
        var companyName = stockData[i].Symbol
        if (!tempStocks[companyName]) {
          tempStocks[companyName] = {};
        }
        tempStocks[companyName][(stockData[i].Date)] = stockData[i]
      }
      return tempStocks
    }

    var _urlBuilder = function(companyArray) {
      var companyString = "'" + companyArray.join("','") + "'";
      var startDate = _start.replace(/-/g, '/');
      var endDate = _end.replace(/-/g, '/');

      return 'http://query.yahooapis.com/v1/public/yql?q=' +
                'select * from yahoo.finance.historicaldata ' +
                'where symbol in (' + companyString + ') ' +
                'and startDate = "' + startDate + '" ' +
                'and endDate = "' + endDate + '" ' +
                '&format=json '+
                '&diagnostics=true ' +
                '&env=store://datatables.org/alltableswithkeys ' +
                '&callback=';
    };

    var stocks = obtainStocks();

    return {
      obtainStocks: obtainStocks,
      stocks: stocks
    }
  }]
)
