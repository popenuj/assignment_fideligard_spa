Fideligard.directive('trades', ['transactionService', function(transactionService) {
  return {
    restrict: "E",
    templateUrl: "/js/directives/trades.html",
    scope: true,
    link: function(scope) {
      scope.performTransaction = transactionService.performTransaction
    }
  }
}])
