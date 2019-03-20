'use strict';

var controllersNavigation = angular.module( 'controllersNavigation' , [] );


controllersNavigation.controller( 'navigation' , [ '$scope' , '$location' , 'cartSrv', 'checkToken', function( $scope , $location , cartSrv, checkToken){

	if(checkToken.loggedIn())
		$scope.loggedIn = true;
	else
		$scope.loggedIn = false;


	$scope.navigation = function () {
		if ( /^\/admin/.test( $location.path() ) )
		{
			if(!checkToken.isAdmin())
			{
				$location.path('/products');
				window.location.href = '#/products?alert=noAdmin';
			}
            return 'partials/admin/navigation.html';
		}

		else
		{
			if($location.search().alert == 'noAdmin')
				$scope.noAdmin = true;
			else
				$scope.noAdmin = false;

            return 'partials/site/navigation.html';
		}

	};


	$scope.isActive = function ( path ) {
		return $location.path() === path;
	};

	$scope.$watch(function(){
		$scope.cart = cartSrv.show().length;
	});

	$scope.logout = function () {
		checkToken.del();
		location.reload();
    }

}]);


