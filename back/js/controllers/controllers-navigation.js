'use strict';

var controllersNavigation = angular.module( 'controllersNavigation' , [] );


controllersNavigation.controller( 'navigation' , [ '$scope' , '$location' , 'cartSrv' , function( $scope , $location , cartSrv ){

	$scope.navigation = function () {
		if ( /^\/admin/.test( $location.path() ) )
			return 'partials/admin/navigation.html';
		else
			return 'partials/site/navigation.html';
	};


	$scope.isActive = function ( path ) {
		return $location.path() === path;
	};

	$scope.$watch(function(){
		$scope.cart = cartSrv.show().length;
	});

}]);


