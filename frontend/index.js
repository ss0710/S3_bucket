var app = angular.module("myApp", []);

app.controller("index", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.uploadPhoto = function () {
      console.log("post function calling");
      var formData = new FormData();
      formData.append("image", $scope.formData.image);

      $http({
        method: "POST",
        url: "http://localhost:8000/images",
        headers: {
          "Content-Type": undefined,
        },
        data: formData,
      }).then(
        function (response) {
          // handle server response
          console.log(response);
        },
        function (error) {
          // handle error
          console.log(error.data);
        }
      );
    };
  },
]);
