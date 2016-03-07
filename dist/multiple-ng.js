(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';



angular.module('multiple-select', ['ng'])
.directive('multipleSelect', [
  '$parse',
  function ($parse) {
    return {
      restrict: 'AE',
      require: '?ngModel',
      scope: {
        sourceList: '=',
        itemLabel: '&',
        isDisabled: '=',
        onItemClick: '&',
        onSelectAll: '&',
        onSelectNone: '&',
        selectAllLabel: '=',
        selectNoneLabel: '=',
        searchLabel: '='
      },
      template: "<div class=\"dropdown dropdown-block\">\n  <button type=\"button\" class=\"btn btn-default dropdown-toggle\" ng-click=\"isVisible = !isVisible\" ng-disabled=\"isDisabled\">\n    {{parsedLabel}}\n    <span class=\"caret\"></span>\n  </button>\n  <div role=\"menu\" class=\"dropdown-menu\" ng-class=\"{ show: isVisible }\">\n    <button type=\"button\" class=\"btn btn-default btn-sm\" ng-if=\"helpers.all\" ng-click=\"selectAll()\">\n      <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n      {{labels.selectAll}}\n    </button>\n    <button type=\"button\" class=\"btn btn-default btn-sm\" ng-if=\"helpers.none\" ng-click=\"selectNone()\">\n      <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n      {{labels.selectNone}}\n    </button>\n    <input placeholder=\"{{labels.search}}\" type=\"text\" class=\"form-control padding-right-lg\" ng-show=\"helpers.filter\" ng-model=\"search\" />\n    <div class=\"checkbox\" ng-repeat=\"item in list | filter:search\">\n      <label>\n        <input type=\"checkbox\" ng-model=\"item.isSelected\" ng-change=\"updateCheck(item)\" />\n        {{item.label}}\n      </label>\n    </div>\n  </div>\n</div>\n",
      link: function (scope, element, attrs, ngModel) {
        scope.helpers = {
          all: true,
          none: true,
          filter: true,
        };

        scope.labels = {
          selectAll: attrs.selectAllLabel || 'Select all',
          selectNone: attrs.selectNoneLabel || 'Select none',
          search: attrs.searchLabel || 'Search'
        };

        scope.list = [];

        scope.$watch(function () {
          return scope.sourceList;
        }, function (source) {
          if (scope.sourceList) {
            scope.list = scope.sourceList.map(function (item) {
              return {
                label: scope.itemLabel(item),
                isSelected: false,
                getSourceItem: function () {
                  return item;
                }
              };
            });
          }
          else {
            scope.list = [];
          }
        });

        scope.updateCheck = function (item) {
          var model = scope.list
            .filter(function (item) {
              return item.isSelected;
            })
            .map(function (item) {
              return item.getSourceItem();
            });

          ngModel.$setViewValue(model);
          scope.onItemClick({ item: item.getSourceItem() });
        };

        scope.selectAll = selectAll;
        scope.selectNone = selectNone;

        if (!attrs.buttonLabel) {
          scope.buttonLabel = function (items) {
            return items && items.length ? items.length + ' items' : attrs.modelName;
          };
        }

        refreshLabel();

        scope.$watch(function () {
          return ngModel.$modelValue;
        }, updateList, true);

        function selectAll() {
          ngModel.$setViewValue(scope.sourceList.slice());
          scope.onSelectAll();
        }

        function selectNone() {
          ngModel.$setViewValue([]);
          scope.onSelectNone();
        }

        function refreshLabel() {
          scope.parsedLabel = $parse(scope.buttonLabel)(ngModel.$modelValue);
        }

        function updateList(obj) {
          scope.list.forEach(function (item) {
            var isSelected = (obj || []).some(function (modelItem) {
              return item.getSourceItem() === modelItem;
            });

            item.isSelected = isSelected;
          });

          refreshLabel();
        }
      }
    };
  }]);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5cblxuYW5ndWxhci5tb2R1bGUoJ211bHRpcGxlLXNlbGVjdCcsIFsnbmcnXSlcbi5kaXJlY3RpdmUoJ211bHRpcGxlU2VsZWN0JywgW1xuICAnJHBhcnNlJyxcbiAgZnVuY3Rpb24gKCRwYXJzZSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgIHJlcXVpcmU6ICc/bmdNb2RlbCcsXG4gICAgICBzY29wZToge1xuICAgICAgICBzb3VyY2VMaXN0OiAnPScsXG4gICAgICAgIGl0ZW1MYWJlbDogJyYnLFxuICAgICAgICBpc0Rpc2FibGVkOiAnPScsXG4gICAgICAgIG9uSXRlbUNsaWNrOiAnJicsXG4gICAgICAgIG9uU2VsZWN0QWxsOiAnJicsXG4gICAgICAgIG9uU2VsZWN0Tm9uZTogJyYnLFxuICAgICAgICBzZWxlY3RBbGxMYWJlbDogJz0nLFxuICAgICAgICBzZWxlY3ROb25lTGFiZWw6ICc9JyxcbiAgICAgICAgc2VhcmNoTGFiZWw6ICc9J1xuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9XFxcImRyb3Bkb3duIGRyb3Bkb3duLWJsb2NrXFxcIj5cXG4gIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVxcXCIgbmctY2xpY2s9XFxcImlzVmlzaWJsZSA9ICFpc1Zpc2libGVcXFwiIG5nLWRpc2FibGVkPVxcXCJpc0Rpc2FibGVkXFxcIj5cXG4gICAge3twYXJzZWRMYWJlbH19XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJjYXJldFxcXCI+PC9zcGFuPlxcbiAgPC9idXR0b24+XFxuICA8ZGl2IHJvbGU9XFxcIm1lbnVcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1tZW51XFxcIiBuZy1jbGFzcz1cXFwieyBzaG93OiBpc1Zpc2libGUgfVxcXCI+XFxuICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbVxcXCIgbmctaWY9XFxcImhlbHBlcnMuYWxsXFxcIiBuZy1jbGljaz1cXFwic2VsZWN0QWxsKClcXFwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLW9rXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+PC9zcGFuPlxcbiAgICAgIHt7bGFiZWxzLnNlbGVjdEFsbH19XFxuICAgIDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdCBidG4tc21cXFwiIG5nLWlmPVxcXCJoZWxwZXJzLm5vbmVcXFwiIG5nLWNsaWNrPVxcXCJzZWxlY3ROb25lKClcXFwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZVxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPjwvc3Bhbj5cXG4gICAgICB7e2xhYmVscy5zZWxlY3ROb25lfX1cXG4gICAgPC9idXR0b24+XFxuICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cXFwie3tsYWJlbHMuc2VhcmNofX1cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wgcGFkZGluZy1yaWdodC1sZ1xcXCIgbmctc2hvdz1cXFwiaGVscGVycy5maWx0ZXJcXFwiIG5nLW1vZGVsPVxcXCJzZWFyY2hcXFwiIC8+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNoZWNrYm94XFxcIiBuZy1yZXBlYXQ9XFxcIml0ZW0gaW4gbGlzdCB8IGZpbHRlcjpzZWFyY2hcXFwiPlxcbiAgICAgIDxsYWJlbD5cXG4gICAgICAgIDxpbnB1dCB0eXBlPVxcXCJjaGVja2JveFxcXCIgbmctbW9kZWw9XFxcIml0ZW0uaXNTZWxlY3RlZFxcXCIgbmctY2hhbmdlPVxcXCJ1cGRhdGVDaGVjayhpdGVtKVxcXCIgLz5cXG4gICAgICAgIHt7aXRlbS5sYWJlbH19XFxuICAgICAgPC9sYWJlbD5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIixcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIG5nTW9kZWwpIHtcbiAgICAgICAgc2NvcGUuaGVscGVycyA9IHtcbiAgICAgICAgICBhbGw6IHRydWUsXG4gICAgICAgICAgbm9uZTogdHJ1ZSxcbiAgICAgICAgICBmaWx0ZXI6IHRydWUsXG4gICAgICAgIH07XG5cbiAgICAgICAgc2NvcGUubGFiZWxzID0ge1xuICAgICAgICAgIHNlbGVjdEFsbDogYXR0cnMuc2VsZWN0QWxsTGFiZWwgfHwgJ1NlbGVjdCBhbGwnLFxuICAgICAgICAgIHNlbGVjdE5vbmU6IGF0dHJzLnNlbGVjdE5vbmVMYWJlbCB8fCAnU2VsZWN0IG5vbmUnLFxuICAgICAgICAgIHNlYXJjaDogYXR0cnMuc2VhcmNoTGFiZWwgfHwgJ1NlYXJjaCdcbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS5saXN0ID0gW107XG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gc2NvcGUuc291cmNlTGlzdDtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgIGlmIChzY29wZS5zb3VyY2VMaXN0KSB7XG4gICAgICAgICAgICBzY29wZS5saXN0ID0gc2NvcGUuc291cmNlTGlzdC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogc2NvcGUuaXRlbUxhYmVsKGl0ZW0pLFxuICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGdldFNvdXJjZUl0ZW06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjb3BlLmxpc3QgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLnVwZGF0ZUNoZWNrID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgbW9kZWwgPSBzY29wZS5saXN0XG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtLmlzU2VsZWN0ZWQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5nZXRTb3VyY2VJdGVtKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIG5nTW9kZWwuJHNldFZpZXdWYWx1ZShtb2RlbCk7XG4gICAgICAgICAgc2NvcGUub25JdGVtQ2xpY2soeyBpdGVtOiBpdGVtLmdldFNvdXJjZUl0ZW0oKSB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS5zZWxlY3RBbGwgPSBzZWxlY3RBbGw7XG4gICAgICAgIHNjb3BlLnNlbGVjdE5vbmUgPSBzZWxlY3ROb25lO1xuXG4gICAgICAgIGlmICghYXR0cnMuYnV0dG9uTGFiZWwpIHtcbiAgICAgICAgICBzY29wZS5idXR0b25MYWJlbCA9IGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA/IGl0ZW1zLmxlbmd0aCArICcgaXRlbXMnIDogYXR0cnMubW9kZWxOYW1lO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZWZyZXNoTGFiZWwoKTtcblxuICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBuZ01vZGVsLiRtb2RlbFZhbHVlO1xuICAgICAgICB9LCB1cGRhdGVMaXN0LCB0cnVlKTtcblxuICAgICAgICBmdW5jdGlvbiBzZWxlY3RBbGwoKSB7XG4gICAgICAgICAgbmdNb2RlbC4kc2V0Vmlld1ZhbHVlKHNjb3BlLnNvdXJjZUxpc3Quc2xpY2UoKSk7XG4gICAgICAgICAgc2NvcGUub25TZWxlY3RBbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNlbGVjdE5vbmUoKSB7XG4gICAgICAgICAgbmdNb2RlbC4kc2V0Vmlld1ZhbHVlKFtdKTtcbiAgICAgICAgICBzY29wZS5vblNlbGVjdE5vbmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlZnJlc2hMYWJlbCgpIHtcbiAgICAgICAgICBzY29wZS5wYXJzZWRMYWJlbCA9ICRwYXJzZShzY29wZS5idXR0b25MYWJlbCkobmdNb2RlbC4kbW9kZWxWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVMaXN0KG9iaikge1xuICAgICAgICAgIHNjb3BlLmxpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIGlzU2VsZWN0ZWQgPSAob2JqIHx8IFtdKS5zb21lKGZ1bmN0aW9uIChtb2RlbEl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0U291cmNlSXRlbSgpID09PSBtb2RlbEl0ZW07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXRlbS5pc1NlbGVjdGVkID0gaXNTZWxlY3RlZDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJlZnJlc2hMYWJlbCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xuIl19
