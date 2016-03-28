'use strict';

var fs = require('fs');
var isDescendant = require('is-descendant');

angular.module('multiple-select', ['ng'])
.directive('multipleSelect', [
  '$document',
  function ($document) {
    return {
      restrict: 'AE',
      require: '?ngModel',
      scope: {
        items: '=',
        ngModel: '=',
        isDisabled: '=?',
        searchLabel: '@?',
        selectAllLabel: '@?',
        selectNoneLabel: '@?',
        showSearch: '=?',
        showSelectors: '=?',
        buttonLabel: '&?',
        itemLabel: '&',
      },
      template: fs.readFileSync(__dirname + '/template.html', 'utf8'),
      link: function (scope, element) {
        $document[0].addEventListener('click', function (event) {
          if (!isDescendant(element[0], event.target)) {
            scope.$apply(function () {
              scope.isVisible = false;
            });
          }
        });
      },
      controller: 'multipleSelectController'
    };
  }
])
.controller('multipleSelectController', [
  '$scope',
  function multipleSelectController($scope) {
    $scope.selectAll = selectAll;
    $scope.selectNone = selectNone;
    $scope.toggleSelection = toggleSelection;
    $scope.cleanSearch = cleanSearch;

    function selectAll() {
      $scope.ngModel = $scope.items.slice();
    }

    function selectNone() {
      $scope.ngModel = [];
    }

    function toggleSelection (item) {
      var itemIndex;

      $scope.ngModel = $scope.ngModel || [];
      itemIndex = $scope.ngModel.indexOf(item);

      if (itemIndex > -1) {
        $scope.ngModel.splice(itemIndex, 1);
      }
      else {
        $scope.ngModel.push(item);
      }
    }

    function cleanSearch() {
      $scope.search = '';
    }
  }
]);
