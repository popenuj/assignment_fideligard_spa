var Fideligard = angular.module("Fideligard", ["ui.router"]);

Fideligard.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/stocks/trades')

  $stateProvider
    .state('stocks', {
      url: '/stocks',
      templateUrl: 'body.html',
      controller: 'stocksCtrl',
      resolve: {
        stocks: function(stocksService) {
          return stocksService.obtainStocks();
        }
      }
    })
    .state('stocks.trades', {
      url: '/trades',
      template: "<trades></trades>",
      controller: 'tradeCtrl'
    })
    .state('stocks.portfolio', {
      url: '/portfolio',
      templateUrl: "partials/portfolio.html",
      controller: 'portfolioCtrl'
    })
    .state('stocks.transactions', {
      url: '/transactions',
      templateUrl: "partials/transactions.html",
      controller: 'transactionCtrl'
    })
})
