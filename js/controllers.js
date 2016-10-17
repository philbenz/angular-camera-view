(function() {
  'use strict';

  const app = angular.module('cameraApp');

  app
    .controller('CatalogController', CatalogController)
    .controller('CartController', CartController);

  function CartController ($rootScope) {
    const TAX_PERCENTAGE = .075;

    if($rootScope.cart) {
      cartitems = $rootScope.cart;
      //call function to present array
    }

    //set price
    console.log('subtotal: ',$rootScope.subtotal);
    this.subtotal = $rootScope.subtotal;

    //set tax
    this.taxAmount = $rootScope.subtotal * TAX_PERCENTAGE;

    //set total
    this.total = this.subtotal + this.taxAmount;

  }

  function CatalogController ($rootScope) {

    $rootScope.cart = [];
    $rootScope.id = 1;
    $rootScope.cartID = 0;
    $rootScope.subtotal = 0;

    this.cameras =
      [{
          id: $rootScope.id++,
          name: 'Nikon D3100 DSLR',
          image: 'http://ecx.images-amazon.com/images/I/713u2gDQqML._SX522_.jpg',
          rating: 4,
          price: 369.99,
          onSale: true
        },
        {
          id: $rootScope.id++,
          name: 'Canon EOS 70D',
          image: 'http://ecx.images-amazon.com/images/I/81U00AkAUWL._SX522_.jpg',
          rating: 2,
          price: 1099.99,
          onSale: false
        },
        {
          id: $rootScope.id++,
          name: 'Nikon D810A',
          image:'http://ecx.images-amazon.com/images/I/91wtXIfLl2L._SX522_.jpg',
          rating: 3,
          price: 3796.95,
          onSale: true
      }];

    this.camera = initClass($rootScope);

    this.addItem = (camera) => {

      let item = $rootScope.cart.filter(selectedCamera => {
        return selectedCamera.id === camera.id;
      })[0];

      if(item) {
        //if found, increase quantity
        item.quantity += 1;
        $rootScope.subtotal += item.price;
        console.log('quantity price: ', item.price);
      } else {
        //push item into cart
        item = {
          id: camera.id,
          name: camera.name,
          price: camera.price,
          quantity: 1
        };
        $rootScope.cart.push(item);
        $rootScope.subtotal = $rootScope.subtotal + item.price;
      }

      console.log('here is the subtotal: ', $rootScope.subtotal);
    }
  }

    function initClass($rootScope) {
      return {
        id: $rootScope.id++,
        name: '',
        price: ''
      }
    }
}());
