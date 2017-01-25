// create our angular app and inject ngAnimate and ui-router
// =============================================================================
angular.module('app-wizard', ['ngAnimate', 'ui.router'])

// configuring our routes
// =============================================================================
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    // route to show our basic form (/form)
      .state('signup', {
        url: '',
        templateUrl: 'app/component/sign_up/wizard/wizard.component.html',
        controller: 'formController'
      })

      // nested states
      // each of these sections will have their own view
      // url will be nested (/form/profile)
      .state('step1', {
        url: '/step1/:email',
        //templateUrl: 'app/component/sign_up/wizard/step1/step1.component.html',
        component: Step1Component
      })

      // url will be /form/interests
      .state('step2', {
        url: '/step2',
        templateUrl: 'app/component/sign_up/wizard/step2/step2.component.html'
      })

      // url will be /form/payment
      .state('step3', {
        url: '/step3',
        templateUrl: 'app/component/sign_up/wizard/step3/step3.component.html'
      });

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/');
  })

  // our controller for the form
  // =============================================================================
  .controller('formController', function($scope) {

    // we will store all of our form data in this object
    $scope.formData = {};

    // function to process the form
    $scope.processForm = function() {
      alert('awesome!');
    };

  });

