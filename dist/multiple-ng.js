(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = isDescendant;

function isDescendant(parent, child) {
  var node = child.parentNode;

  while (node !== null) {
    if (node === parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

},{}],2:[function(require,module,exports){
'use strict';


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
      template: "<div class=\"ng-multiple dropdown dropdown-block\">\n  <button type=\"button\" class=\"btn btn-default dropdown-toggle\" ng-click=\"isVisible = !isVisible\" ng-disabled=\"isDisabled\">\n    {{buttonLabel(ngModel)}}\n    <span class=\"caret\"></span>\n  </button>\n  <div role=\"menu\" class=\"dropdown-menu\" ng-class=\"{ show: isVisible }\">\n    <div class=\"multi-select-options\" ng-show=\"showSelectors\">\n      <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"selectAll()\">\n        {{selectAllLabel || 'Select all'}}\n      </button>\n      <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"selectNone()\" ng-disabled=\"!ngModel.length\">\n        {{selectNoneLabel || 'Select none'}}\n      </button>\n    </div>\n    <input placeholder=\"{{searchLabel || 'Search'}}\" type=\"text\" class=\"form-control padding-right-lg\" ng-model=\"search\" />\n    <ul>\n      <li ng-repeat=\"item in items | filter:search\">\n        <div class=\"checkbox\">\n          <input id=\"{{itemLabel(item) + $index}}\" type=\"checkbox\"\n            ng-checked=\"ngModel.indexOf(item) > -1\"\n            ng-click=\"toggleSelection(item)\" />\n          <label for=\"{{itemLabel(item) + $index}}\">{{itemLabel(item)}}</label>\n        </div>\n      </li>\n    </div>\n  </div>\n</div>\n",
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

},{"is-descendant":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaXMtZGVzY2VuZGFudC9pbmRleC5qcyIsInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNEZXNjZW5kYW50O1xuXG5mdW5jdGlvbiBpc0Rlc2NlbmRhbnQocGFyZW50LCBjaGlsZCkge1xuICB2YXIgbm9kZSA9IGNoaWxkLnBhcmVudE5vZGU7XG5cbiAgd2hpbGUgKG5vZGUgIT09IG51bGwpIHtcbiAgICBpZiAobm9kZSA9PT0gcGFyZW50KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbnZhciBpc0Rlc2NlbmRhbnQgPSByZXF1aXJlKCdpcy1kZXNjZW5kYW50Jyk7XG5cbmFuZ3VsYXIubW9kdWxlKCdtdWx0aXBsZS1zZWxlY3QnLCBbJ25nJ10pXG4uZGlyZWN0aXZlKCdtdWx0aXBsZVNlbGVjdCcsIFtcbiAgJyRkb2N1bWVudCcsXG4gIGZ1bmN0aW9uICgkZG9jdW1lbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICByZXF1aXJlOiAnP25nTW9kZWwnLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgaXRlbXM6ICc9JyxcbiAgICAgICAgbmdNb2RlbDogJz0nLFxuICAgICAgICBpc0Rpc2FibGVkOiAnPT8nLFxuICAgICAgICBzZWFyY2hMYWJlbDogJ0A/JyxcbiAgICAgICAgc2VsZWN0QWxsTGFiZWw6ICdAPycsXG4gICAgICAgIHNlbGVjdE5vbmVMYWJlbDogJ0A/JyxcbiAgICAgICAgc2hvd1NlYXJjaDogJz0/JyxcbiAgICAgICAgc2hvd1NlbGVjdG9yczogJz0/JyxcbiAgICAgICAgYnV0dG9uTGFiZWw6ICcmPycsXG4gICAgICAgIGl0ZW1MYWJlbDogJyYnLFxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9XFxcIm5nLW11bHRpcGxlIGRyb3Bkb3duIGRyb3Bkb3duLWJsb2NrXFxcIj5cXG4gIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVxcXCIgbmctY2xpY2s9XFxcImlzVmlzaWJsZSA9ICFpc1Zpc2libGVcXFwiIG5nLWRpc2FibGVkPVxcXCJpc0Rpc2FibGVkXFxcIj5cXG4gICAge3tidXR0b25MYWJlbChuZ01vZGVsKX19XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJjYXJldFxcXCI+PC9zcGFuPlxcbiAgPC9idXR0b24+XFxuICA8ZGl2IHJvbGU9XFxcIm1lbnVcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1tZW51XFxcIiBuZy1jbGFzcz1cXFwieyBzaG93OiBpc1Zpc2libGUgfVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm11bHRpLXNlbGVjdC1vcHRpb25zXFxcIiBuZy1zaG93PVxcXCJzaG93U2VsZWN0b3JzXFxcIj5cXG4gICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdCBidG4tc21cXFwiIG5nLWNsaWNrPVxcXCJzZWxlY3RBbGwoKVxcXCI+XFxuICAgICAgICB7e3NlbGVjdEFsbExhYmVsIHx8ICdTZWxlY3QgYWxsJ319XFxuICAgICAgPC9idXR0b24+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHQgYnRuLXNtXFxcIiBuZy1jbGljaz1cXFwic2VsZWN0Tm9uZSgpXFxcIiBuZy1kaXNhYmxlZD1cXFwiIW5nTW9kZWwubGVuZ3RoXFxcIj5cXG4gICAgICAgIHt7c2VsZWN0Tm9uZUxhYmVsIHx8ICdTZWxlY3Qgbm9uZSd9fVxcbiAgICAgIDwvYnV0dG9uPlxcbiAgICA8L2Rpdj5cXG4gICAgPGlucHV0IHBsYWNlaG9sZGVyPVxcXCJ7e3NlYXJjaExhYmVsIHx8ICdTZWFyY2gnfX1cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgcGFkZGluZy1yaWdodC1sZ1xcXCIgbmctbW9kZWw9XFxcInNlYXJjaFxcXCIgLz5cXG4gICAgPHVsPlxcbiAgICAgIDxsaSBuZy1yZXBlYXQ9XFxcIml0ZW0gaW4gaXRlbXMgfCBmaWx0ZXI6c2VhcmNoXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNoZWNrYm94XFxcIj5cXG4gICAgICAgICAgPGlucHV0IGlkPVxcXCJ7e2l0ZW1MYWJlbChpdGVtKSArICRpbmRleH19XFxcIiB0eXBlPVxcXCJjaGVja2JveFxcXCJcXG4gICAgICAgICAgICBuZy1jaGVja2VkPVxcXCJuZ01vZGVsLmluZGV4T2YoaXRlbSkgPiAtMVxcXCJcXG4gICAgICAgICAgICBuZy1jbGljaz1cXFwidG9nZ2xlU2VsZWN0aW9uKGl0ZW0pXFxcIiAvPlxcbiAgICAgICAgICA8bGFiZWwgZm9yPVxcXCJ7e2l0ZW1MYWJlbChpdGVtKSArICRpbmRleH19XFxcIj57e2l0ZW1MYWJlbChpdGVtKX19PC9sYWJlbD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvbGk+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCIsXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQpIHtcbiAgICAgICAgJGRvY3VtZW50WzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKCFpc0Rlc2NlbmRhbnQoZWxlbWVudFswXSwgZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc2NvcGUuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6ICdtdWx0aXBsZVNlbGVjdENvbnRyb2xsZXInXG4gICAgfTtcbiAgfVxuXSlcbi5jb250cm9sbGVyKCdtdWx0aXBsZVNlbGVjdENvbnRyb2xsZXInLCBbXG4gICckc2NvcGUnLFxuICBmdW5jdGlvbiBtdWx0aXBsZVNlbGVjdENvbnRyb2xsZXIoJHNjb3BlKSB7XG4gICAgJHNjb3BlLnNlbGVjdEFsbCA9IHNlbGVjdEFsbDtcbiAgICAkc2NvcGUuc2VsZWN0Tm9uZSA9IHNlbGVjdE5vbmU7XG4gICAgJHNjb3BlLnRvZ2dsZVNlbGVjdGlvbiA9IHRvZ2dsZVNlbGVjdGlvbjtcbiAgICAkc2NvcGUuY2xlYW5TZWFyY2ggPSBjbGVhblNlYXJjaDtcblxuICAgIGZ1bmN0aW9uIHNlbGVjdEFsbCgpIHtcbiAgICAgICRzY29wZS5uZ01vZGVsID0gJHNjb3BlLml0ZW1zLnNsaWNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VsZWN0Tm9uZSgpIHtcbiAgICAgICRzY29wZS5uZ01vZGVsID0gW107XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlU2VsZWN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgaXRlbUluZGV4O1xuXG4gICAgICAkc2NvcGUubmdNb2RlbCA9ICRzY29wZS5uZ01vZGVsIHx8IFtdO1xuICAgICAgaXRlbUluZGV4ID0gJHNjb3BlLm5nTW9kZWwuaW5kZXhPZihpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1JbmRleCA+IC0xKSB7XG4gICAgICAgICRzY29wZS5uZ01vZGVsLnNwbGljZShpdGVtSW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICRzY29wZS5uZ01vZGVsLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW5TZWFyY2goKSB7XG4gICAgICAkc2NvcGUuc2VhcmNoID0gJyc7XG4gICAgfVxuICB9XG5dKTtcbiJdfQ==
