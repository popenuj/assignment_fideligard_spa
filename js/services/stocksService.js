Fideligard.factory('stocksService', [ "$http", "dateService",
  function($http, dateService){
    var _start = dateService.endDate.formatDate()
    var _end = dateService.startDate.formatDate()

  var obtainStocks = function(){
      return $http({
        method: "GET",
        url: urlBuilder(["AAPL", "YHOO", "GOOG", "MSFT"]),
        success: function(response){return response},
        failire: function(response){console.log(response)}
      })
    }

  var sanitizeStocks = function(response){
    //for each stock, generate the 30d, 7d, 1d prices
    //and populate the object with them
  }

  var urlBuilder = function(companyArray) {
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


  return {
    obtainStocks: obtainStocks
  }

}])
