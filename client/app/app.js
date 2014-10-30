angular.module('mainApp', [
  // 1st party dependencies
  'browseFeature',
  'createClassroomFeature',

  // 3rd party dependencies
  'ngAnimate',
  'ngMaterial'
]);

angular.module('mainApp').config(function($locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/browse');

});
