Fideligard.factory('dateService', [
  function(){
    var oneDay = 86400000;
    var currentDate = { date: new Date() - (oneDay * 91) };
    var startDate = new Date() - 0;
    var endDate = new Date() - (oneDay * 182);

    currentDate.changeByDropdown = function(selection) {
      if (selection) this.date = selection - 0
    }

    currentDate.changeByRange =function(value) {
      this.date = startDate - (value * -1)
    }

    return {
      currentDate: currentDate,
      startDate: startDate,
      endDate: endDate,
      oneDay: oneDay
    }
  }]
)
