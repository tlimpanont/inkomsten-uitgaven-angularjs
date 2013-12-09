app.directive("financialModal", function( Income, Expense, $http) {
	return {
		templateUrl: 'templates/financialModal.html',
		scope: {
			title : "@",
			modalId: "@",
			collection: "=",
			model: "@",
		},
		controller: function($scope) {
			$scope.addFinancialItem = function() {
				var item = new window[$scope.model]();
				item.label = $scope.label.toString(); 
				item.amount =  Number($scope.amount);

				if($scope.model == "Income") {
					url = "api/incomes";
				}
				else
				{
					url = "api/expenses";
				}

				$http({
					method: "POST",
					data: item,
					url: url,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				}).success(function(data) {
					$scope.collection = data;
				});


				$scope.resetForm();
			}
			
			$scope.resetForm = function() {
				$scope.label = "";
				$scope.amount = "";
			}
		}
	}
});

app.directive('onlyNumbers',  function(){
	return {
		link: function($scope, element, attrs) {
			angular.element(element).on("keypress", function(e) {
				var character = (String.fromCharCode(e.which));
				if(!/[\d+|\.]/g.test(character))
					return false;
			});
		}
	};
});
