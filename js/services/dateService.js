Fideligard.factory('dateService', [
  function(){

    var formatDate = function() {
      var d = new Date(this.date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    }

    var oneDay = 86400000;

    var currentDate = {
          date: new Date() - (oneDay * 91),
          formatDate: formatDate
        };
    var startDate = {
          date: new Date() - 0,
          formatDate: formatDate
        };
    var endDate = {
          date: new Date() - (oneDay * 182),
          formatDate: formatDate
        };

    currentDate.changeByDropdown = function(selection) {
      if (selection) this.date = selection - 0
    }

    currentDate.changeByRange =function(value) {
      this.date = startDate.date - (value * -1)
    }

    return {
      currentDate: currentDate,
      startDate: startDate,
      endDate: endDate,
      oneDay: oneDay
    }
  }]
)
