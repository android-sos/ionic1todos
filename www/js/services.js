
angular.module('starter.services', [])

.service('TodosService', function($q) {
  
  return {
    todos: [
      {
        id: '1',
        title: 'Descargar un Boilerplate Sencillo',
        priority: 1,
        completed: true
      },
      {
        id: '2',
        title: 'Anexar en index.html y en app, los servicios y controladores',
        priority: 1,
        completed: false
      },
      {
        id: '3',
        title: 'Programar los Controladores para cada ventas',
        priority: 2,
        completed: false
      },
      {
        id: '4',
        title: 'Desarrollar los servicios para Traer data.',
        priority: 3,
        completed: true
      },
    ],
    
    //todos: todos,
    //getTodo: function(todoId) { return todos[todoId] }

    getTodos: function() {
      return this.todos;
    },
    
    saveTodo: function(item) {
      item.id = String(this.todos.length + 1);
      console.log(item)
      this.todos.push(item);
    },

    updateTodo: function(item) {
      this.todos.forEach(function(todo) {
        if (todo.id === item.id) {
          todo.title = item.title
          todo.priority = item.priority
          todo.completed = item.completed
          return false;
        }
      })
    },

    deleteTodo: function(item) {
      var index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
    },
    
    getTodo: function(todoId) {
      var dfd = $q.defer();
      this.todos.forEach(function(todo) {
        if (todo.id === todoId) dfd.resolve(todo);
      })

      return dfd.promise;
    },

    filter : function  (arr, criteria) {
      return arr.filter(function (obj) {
        return Object.keys(criteria).every( function (c) {
          return obj[c] === criteria[c]
        })
      })
    }

  }
})

.factory('$localstorage', ['$window','$ionicHistory','$state', function($window, $ionicHistory, $state) {
  return {
    set: function(key, value) {
      $window.localStorage.setItem (key,value);
    },
    get: function(key) {
      return $window.localStorage.getItem(key)  || '';
    },
    setObject: function(key, value) {
      $window.localStorage[key] = btoa(JSON.stringify(value));
    },
    getObject: function(key) {
      if ((typeof $window.localStorage[key])=="undefined"){
          return false;
      }
      return JSON.parse(atob($window.localStorage[key]) || '{}');

    },
    removeKey: function(key) {
      $window.localStorage.removeItem(key);
    },  
    clear: function(){
           
       //this.set('user_logged', 0);

        $window.localStorage.clear();
       
        $ionicHistory.clearCache().then(function() {    
            $state.go("app.loginForm");
            $ionicHistory.clearHistory();
            //$ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
        });
    }
  }
}]);