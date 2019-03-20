'use strict';

var controllersAdmin = angular.module( 'controllersAdmin' , [ 'angularFileUpload' , 'myDirectives' ] );


controllersAdmin.controller( 'products' , [ '$scope' , '$http' , function( $scope , $http ){
	
	$http.get( 'api/admin/products/get/' ).
	success( function( data ){
		$scope.products = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function ( product , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć ten produkt?' ) )
			return false;

		$scope.products.splice( $index , 1 );

        $http.post( '/api/admin/products/delete/', {
            product: product
        }).
        success( function(){
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });

	};

}]);


controllersAdmin.controller( 'productEdit' , [ '$scope' , '$http' , '$routeParams' , 'FileUploader' , '$timeout' , function( $scope , $http , $routeParams , FileUploader , $timeout){

	var product_id = $routeParams.id;
	$scope.id = product_id;
	$http.get( 'api/admin/products/get/'+ product_id ).
	success( function( data ){
		$scope.product = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});
	function getImages() {
        $http.get( '/api/admin/images/get/' + product_id).
        success( function( data ){
            $scope.images = data;
        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
	}

	getImages();


	$scope.saveChanges = function ( product ) {

        $http.post( '/api/admin/products/update/', {
        	product: product
		}).
        success( function(){
        	$scope.success = true;
        	$timeout(function() {
				$scope.success = false;
            }, 3000)
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });

		console.log( product );
		console.log( $routeParams.id );
	};

	$scope.delImage = function(imageName, $index){
        $scope.images.splice( $index , 1 );

        $http.post( '/api/admin/images/del/', {
        	id: product_id,
			image: imageName
		} ).
        success( function(){

        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });

		// id
		// image

	}

    var uploader = $scope.uploader = new FileUploader({
        url: '/api/admin/images/upload/' + product_id
    });

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        getImages();
    };


}]);


controllersAdmin.controller( 'productCreate' , [ '$scope' , '$http' , '$timeout', function( $scope , $http, $timeout ){

	$scope.createProduct = function ( product ) {
        $http.post( '/api/admin/products/create/', {
            product: product
        }).
        success( function(){
            $scope.success = true;
            $timeout(function() {
                $scope.success = false;
                $scope.product = {};
            }, 3000)
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });
		console.log( $scope.product );
	};

}]);


controllersAdmin.controller( 'users' , [ '$scope' , '$http' , function( $scope , $http ){


    $http.get( 'api/admin/users/get/' ).
    success( function( data ){
        $scope.users = data;
    }).error( function(){
        console.log( 'Błąd pobrania pliku json' );
    });

    $scope.delete = function ( user , $index ) {

        if ( !confirm( 'Czy na pewno chcesz usunąć ten użytkownika?' ) )
            return false;

        $scope.users.splice( $index , 1 );

        $http.post( '/api/admin/users/delete/', {
            user: user
        }).
        success( function(){
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });

    };

}]);


controllersAdmin.controller( 'userEdit' , [ '$scope' , '$http' , '$routeParams', '$timeout' , function( $scope , $http , $routeParams, $timeout ){

    var user_id = $routeParams.id;
    $scope.id = user_id;
    $http.get( 'api/admin/users/get/'+ user_id ).
    success( function( data ){
        $scope.user = data;
    }).error( function(){
        console.log( 'Błąd pobrania pliku json' );
    });

	$scope.saveChanges = function ( user ) {

        $http.post( '/api/admin/users/update/', {
            user: user,
            name: user.name,
            email: user.email,
            password: user.password,
            passconf: user.passconf
        }).
        success( function(errors){
            if(errors)
            {
                $scope.errors = errors;
            }
            else
            {
                $scope.success = true;
                $timeout(function() {
                    $scope.success = false;
                    $scope.user = {};
                }, 3000)
            }
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });
	};

}]);


controllersAdmin.controller( 'userCreate' , [ '$scope' , '$http', '$timeout' , function( $scope , $http, $timeout ){
    $scope.user = {};
    $scope.user.role = 'user';
    $scope.createUser = function ( user ) {
        $http.post( '/api/admin/users/create/', {
            user: user,
            name: user.name,
            email: user.email,
            password: user.password,
            passconf: user.passconf
        }).
        success( function(errors){
            if(errors)
            {
                $scope.errors = errors;
            }
            else
            {
                $scope.success = true;
                $timeout(function() {
                    $scope.success = false;
                    $scope.user = {};
                }, 3000)
            }
        }).error( function(){
            console.log( 'Błąd komunikacji z API' );
        });
	};

}]);


controllersAdmin.controller( 'siteOrders' , [ '$scope' , '$http' , function( $scope , $http ){

	$http.get( 'model/orders.json' ).
	success( function( data ){
		$scope.orders = data;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});

	$scope.delete = function ( user , $index ) {

		if ( !confirm( 'Czy na pewno chcesz usunąć to zdjęcie' ) )
			return false;

		$scope.orders.splice( $index , 1 );

		// TODO: przesłać dane przez API

	};

	$scope.changeStatus = function ( order ) {

		if ( order.status == 0 )
			order.status = 1;
		else
			order.status = 0;

		// TODO: przesłać dane przez API

	};

}]);