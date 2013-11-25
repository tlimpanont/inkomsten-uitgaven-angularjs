FinancialItem = function() { 
	this.label = "";
	this.amount = 0;
}

Income = function() { }
Income.prototype = new FinancialItem();
Expense = function() { }
Income.prototype = new FinancialItem();


app.factory("FinancialItem", function () {
	return FinancialItem;
});
app.factory("Income", function () {
	return Income;
});
app.factory("Expense", function () {
	return Expense;
});
app.factory("calculator", function() {
	return {
		sum: function(financial_items) {
			var total = 0;
			financial_items.forEach(function(item, index) {
				total += item.amount;
			});
			return total;
		},
		balance: function(total_incomes, total_expenses) {
			return (total_incomes - total_expenses);
		}
	}
})
