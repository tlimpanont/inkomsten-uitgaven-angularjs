app.controller("mainCtrl", function($scope, Income, Expense, calculator) {
	$scope.incomes = [];
	$scope.expenses = [];

	$scope.addIncome = function(label, amount) {
		var income = new Income();
		income.label = label; 
		income.amount = amount;
		$scope.incomes.push(income);
	}
	$scope.addExpense = function(label, amount) {
		var expense = new Expense();
		expense.label = label; 
		expense.amount = amount;
		$scope.expenses.push(expense);
	}

	$scope.getNewIncomeDialog = function() {
		$('#incomeDialog').modal({
			  keyboard: false
		});
	}

	$scope.getNewExpenseDialog = function() {
		$('#expenseDialog').modal({
			  keyboard: false
		});
	}

	// // add all incomes
	// $scope.addIncome("salaris", 2200);
	// $scope.addIncome("zorgtoeslag", 60);

	// // add all expenses
	// $scope.addExpense("boodschappen", 230);	
	// $scope.addExpense("verzekering", 80);
	// $scope.addExpense("telefoon", 30);
	// $scope.addExpense("hypotheek", 400);
	// $scope.addExpense("gas/water/elektriciteit", 120);

	$scope.total_incomes = function() {
		 return calculator.sum($scope.incomes);
	}

	$scope.total_expenses = function() {
		 return calculator.sum($scope.expenses);
	}

	$scope.month_balance = function()
	{
		return calculator.balance(calculator.sum($scope.incomes), calculator.sum($scope.expenses));
	}
});