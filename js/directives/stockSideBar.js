Fideligard.directive('stockSideBar', ['dateService', function(dateService) {
  return {
    restrict: "E",
    templateUrl: "/js/directives/stockSideBar.html",
    scope: true,
  }
}])
