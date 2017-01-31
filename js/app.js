var Fideligard = angular.module("Fideligard", ["ui.router"]);

Fideligard.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/trade')

  $stateProvider
    .state('trade', {
      url: '/trade',
      templateUrl: 'partials/trade.html',
      controller: 'tradeCtrl'
    })
})
