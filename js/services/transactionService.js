Fideligard.factory('transactionService',
  function(){
    var trades = [];

    var performTransaction = function(stock, formData) {
      var tradeInfo = {stock};
      tradeInfo.buyOrSell = formData.buyOrSell;
      tradeInfo.quantity = formData.quantity;
      tradeInfo.totalPrice = stock.Close * formData.quantity
      trades.push(tradeInfo)
    }

    return {
      performTransaction: performTransaction,
      trades: trades
    }

  }
)
