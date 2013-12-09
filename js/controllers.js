app.controller("mainCtrl", function($scope, Income, Expense, calculator, $http) {
	$scope.incomes = []; $scope.expenses = [];
	$http.get('api/incomes').success(function(data) {
		$scope.incomes = data;
	});
	$http.get('api/expenses').success(function(data) {
		$scope.expenses = data;
	});

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

	$scope.deleteIncome = function(income) {
		$http({
			method: "DELETE",
			url: "api/incomes/"+income.id
		}).success(function(data) {
			$scope.incomes = data;
		});
	}

	$scope.deleteExpense = function(expense) {
		$http({
			method: "DELETE",
			url: "api/expenses/"+expense.id
		}).success(function(data) {
			$scope.expenses = data;
		});
	}

	$scope.total_incomes = function() {
		 return calculator.sum($scope.incomes);
	}

	$scope.total_expenses = function() {
		 return calculator.sum($scope.expenses);
	}

	$scope.month_balance = function()
	{
		return calculator.balance($scope.total_incomes(), $scope.total_expenses());
	}
});