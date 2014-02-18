var qtfTodolistr = angular.module('qtfTodolistr', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // List all tasks
  $http.get('/api/tasks')
    .success(function(data) {
      $scope.tasks = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Create new tasks
  $scope.createTask = function() {
    $http.post('/api/tasks', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.tasks = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // Delete task
  $scope.deleteTask = function(id) {
    $http.delete('/api/tasks/' + id)
      .success(function(data) {
        $scope.tasks = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

}
