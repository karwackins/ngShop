'use strict';

var myServices = angular.module( 'myServices' , [] );


myServices.factory( 'cartSrv' , [ 'store' , function( store ) {

    if ( store.get( 'cart' ) )
        var cart = store.get( 'cart' );
    else
        var cart = [];

    cart.show = function () {
        return cart;
    };

    cart.add = function ( product ) {

        if ( !cart.length )
        {
            product.qty = 0;
            cart.push( product );
        }

        var addNew = true;
        angular.forEach( cart , function ( value , key ) {

            // TODO: zmienić name na id gdy będzie kontakt z bazą

            if ( value.name == product.name )
            {
                addNew = false;
                cart[key].qty++;
            }
        });

        if ( addNew )
        {
            product.qty = 1;
            cart.push( product );
        }

        store.set( 'cart' , cart.show() );

    }

    cart.empty = function () {
        store.remove( 'cart' );
        cart.length = 0;
    };

    cart.update = function ( newCart ) {
        store.set( 'cart' , newCart );
    };

    return cart;

}]);

myServices.factory( 'checkCartSrv' , [ 'store' , function( store ) {

    if ( store.get( 'cart' ) )
        var cart = store.get( 'cart' );
    else
        var cart = [];

    cart.show = function () {
        return cart;
    };

    cart.checkCart = function(product) {
        if (cartSrv.show().length) {
            angular.forEach(cartSrv, function (item) {
                if(item.id == product.id)
                {
                    product.qty = item.qty;
                }
            });
        }
    }
    return cart;

}]);