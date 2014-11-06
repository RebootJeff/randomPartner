angular.module('createClassroomFeature', [
  // 3rd party dependencies
  'ui.router'
]);

angular.module('createClassroomFeature')

.config(function($stateProvider) {
  $stateProvider
    .state('create', {
      url: '/create',
      templateUrl: 'app/createClassroom/createClassroom.html',
      controller: 'createClassroomCtrl as create'
    });
})

.controller('createClassroomCtrl', function() {

  this.foo = 'hello, createClassroom';

});
