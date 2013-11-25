app.directive("financialModal", function( Income, Expense) {
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
				$scope.collection.push(item);
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
				if(!/\d+/g.test(character))
					return false;
			});
		}
	};
});
