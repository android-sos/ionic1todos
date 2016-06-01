angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {

})

.controller('TodolistsCtrl',['$scope','$ionicPopup', '$ionicActionSheet', '$timeout','TodosService', function($scope, $ionicPopup, $ionicActionSheet,  $timeout, TodosService) {
  
  $scope.filterTodo = 0;

  $scope.todos = [];
  $scope.todos = TodosService.getTodos();
  console.log($scope.todos);
  $scope.todoComplete = function (item) {
    var alertPopup = $ionicPopup.alert({
      title: 'Todo Sample',
      template: 'Todo Complete: '+ item.title 
    });
  };


   $scope.showFilter = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'All' },
       { text: 'High' },
       { text: 'Medium' },
       { text: 'Low' },
     ],
     titleText: 'Filert by Priority',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       $scope.filterTodo = index;
       console.log($scope.filterTodo)
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 2000);

 };

}])

.controller('TodoFormCtrl',['$scope', "$state", '$stateParams', '$ionicPopup', 'TodosService', function($scope, $state, $stateParams, $ionicPopup, TodosService) {
   console.log($stateParams);
   $scope.todo = {};
   $scope.id = $stateParams.id;
   $scope.newItem =  function(){
        $scope.todo.id = ''
        $scope.todo.title = ''
        $scope.todo.priority = ''
        $scope.todo.completed = ''
   }

   if ($scope.id ===-1){
      $scope.newItem();  
   } else{
     TodosService.getTodo($scope.id).then( function (item) {
        $scope.newItem(); 
        $scope.todo.id = item.id
        $scope.todo.title = item.title
        $scope.todo.priority = item.priority
        $scope.todo.completed = item.completed
     })
   }

   $scope.save = function() {
     
     var item = $scope.todo 
     console.log($scope.id)

     if ($scope.id == -1){
       console.log('s') 
       TodosService.saveTodo(item)
     } else{
      console.log('u') 
       TodosService.updateTodo(item) 
     }
     $state.go('app.todos');
   };

   $scope.delete = function() {
    var item = $scope.todo 
     TodosService.deleteTodo(item)
     $state.go('app.todos');
   };

}])

.controller('LoginCtrl', ["$scope", "$state", "$ionicPopup","$localstorage", 
                    function($scope, $state, $ionicPopup, $localstorage) {
  console.log('login')
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(loginData) {
     console.log(loginData)
     if (loginData.username==='test' && loginData.password==='12345'){
        $localstorage.set('user_logged', 1);
        $state.go('app.todos');
     } else {
       var alertPopup = $ionicPopup.alert({
          title: 'Todo Sample',
          template: 'Info, User Do not Exist!' 
        });
     }
  };
}])

.filter('custom', function() {
  return function(input, search) {
    
    if (!input) return input;
    if (!search) return input;
    var result = {}
    angular.forEach(input, function(value, key) {
      if (value.priority == search) {
        result[key] = value;
      }
    });
    return result;
  }
})

;
