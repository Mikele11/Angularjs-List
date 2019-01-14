let myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', ($scope, $http) => {
    console.log("I am in controller");
    $scope.myRadio = []; // array of tags

let refresh = () => {
  let url = "http://localhost:3000/json/sdks.json"
  $http
    .get(url)
    .then((response) => {
      console.log("Geter");
      $scope.sdk = response.data.results;
      const middle =Math.round($scope.sdk.length/2);
      $scope.col1 = $scope.sdk.slice(0, middle);
      $scope.col2 = $scope.sdk.slice(middle, $scope.sdk.length);
      const tags1 = [...new Set($scope.sdk.map(item => item.tags))];
      let tags2 = [];
      let k = 0;
      for ( let i = 0; i < tags1.length; i++ ) {
        for ( let j = 0; j < tags1[i].length; j++ ) {
          tags2[k] = tags1[i][j];
          k++;
        }
      }
      let uniqueItems = [...new Set(tags2)];
      for ( let i = 0; i < uniqueItems.length; i++ ) {
        $scope.myRadio[i] = { model: uniqueItems[i] }
      }
    });
};

refresh();

}]);