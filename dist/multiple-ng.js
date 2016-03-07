(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';



angular.module('multiple-select', ['ng'])
.directive('multipleSelect', [
  '$parse', '$document',
  function ($parse, $document) {
    return {
      restrict: 'AE',
      require: '?ngModel',
      scope: {
        sourceList: '=',
        itemLabel: '&',
        buttonLabel: '&',
        isDisabled: '=',
        onItemClick: '&',
        onSelectAll: '&',
        onSelectNone: '&',
        onOpen: '&',
        onClose: '&',
        modelDescription: '=',
        selectAllLabel: '=',
        selectNoneLabel: '=',
        searchLabel: '='
      },
      template: "<div class=\"ng-multiple dropdown dropdown-block\">\n  <button type=\"button\" class=\"btn btn-default dropdown-toggle\" ng-click=\"toggle()\" ng-disabled=\"isDisabled\">\n    {{parsedLabel}}\n    <span class=\"caret\"></span>\n  </button>\n  <div role=\"menu\" class=\"dropdown-menu\" ng-class=\"{ show: isVisible }\">\n    <button type=\"button\" class=\"btn btn-default btn-sm\" ng-if=\"helpers.all\" ng-click=\"selectAll()\">\n      <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n      {{labels.selectAll}}\n    </button>\n    <button type=\"button\" class=\"btn btn-default btn-sm\" ng-if=\"helpers.none\" ng-click=\"selectNone()\">\n      <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n      {{labels.selectNone}}\n    </button>\n    <input placeholder=\"{{labels.search}}\" type=\"text\" class=\"form-control\" ng-show=\"helpers.filter\" ng-model=\"search\" />\n    <div class=\"checkbox\" ng-repeat=\"item in list | filter:search\">\n      <label>\n        <input type=\"checkbox\" ng-model=\"item.isSelected\" ng-change=\"updateCheck(item)\" />\n        {{item.label}}\n      </label>\n    </div>\n  </div>\n</div>\n",
      link: function (scope, element, attrs, ngModel) {
        scope.isVisible = false;
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

        $document[0].addEventListener('click', function (event) {
          var target = event.target;

          if (!isDescendant(element[0], target)) {
            scope.$apply(function () {
              scope.isVisible = false;
              scope.onClose();
            });
          }
        });

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

        scope.toggle = toggle;
        scope.updateCheck = updateCheck;
        scope.selectAll = selectAll;
        scope.selectNone = selectNone;

        if (!attrs.buttonLabel) {
          scope.buttonLabel = function (items) {
            return items && items.length ? items.length + ' items' : attrs.modelDescription;
          };
        }

        refreshLabel();

        scope.$watch(function () {
          return ngModel.$modelValue;
        }, updateList, true);

        function toggle() {
          scope.isVisible = !scope.isVisible;

          if (scope.isVisible) {
            scope.onOpen();
          } else {
            scope.onClose();
          }
        }

        function updateCheck(item) {
          var model = scope.list
            .filter(function (item) {
              return item.isSelected;
            })
            .map(function (item) {
              return item.getSourceItem();
            });

          ngModel.$setViewValue(model);
          scope.onItemClick({ item: item.getSourceItem() });
        }

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
      }
    };
  }]);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5cblxuYW5ndWxhci5tb2R1bGUoJ211bHRpcGxlLXNlbGVjdCcsIFsnbmcnXSlcbi5kaXJlY3RpdmUoJ211bHRpcGxlU2VsZWN0JywgW1xuICAnJHBhcnNlJywgJyRkb2N1bWVudCcsXG4gIGZ1bmN0aW9uICgkcGFyc2UsICRkb2N1bWVudCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgIHJlcXVpcmU6ICc/bmdNb2RlbCcsXG4gICAgICBzY29wZToge1xuICAgICAgICBzb3VyY2VMaXN0OiAnPScsXG4gICAgICAgIGl0ZW1MYWJlbDogJyYnLFxuICAgICAgICBidXR0b25MYWJlbDogJyYnLFxuICAgICAgICBpc0Rpc2FibGVkOiAnPScsXG4gICAgICAgIG9uSXRlbUNsaWNrOiAnJicsXG4gICAgICAgIG9uU2VsZWN0QWxsOiAnJicsXG4gICAgICAgIG9uU2VsZWN0Tm9uZTogJyYnLFxuICAgICAgICBvbk9wZW46ICcmJyxcbiAgICAgICAgb25DbG9zZTogJyYnLFxuICAgICAgICBtb2RlbERlc2NyaXB0aW9uOiAnPScsXG4gICAgICAgIHNlbGVjdEFsbExhYmVsOiAnPScsXG4gICAgICAgIHNlbGVjdE5vbmVMYWJlbDogJz0nLFxuICAgICAgICBzZWFyY2hMYWJlbDogJz0nXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGU6IFwiPGRpdiBjbGFzcz1cXFwibmctbXVsdGlwbGUgZHJvcGRvd24gZHJvcGRvd24tYmxvY2tcXFwiPlxcbiAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHQgZHJvcGRvd24tdG9nZ2xlXFxcIiBuZy1jbGljaz1cXFwidG9nZ2xlKClcXFwiIG5nLWRpc2FibGVkPVxcXCJpc0Rpc2FibGVkXFxcIj5cXG4gICAge3twYXJzZWRMYWJlbH19XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJjYXJldFxcXCI+PC9zcGFuPlxcbiAgPC9idXR0b24+XFxuICA8ZGl2IHJvbGU9XFxcIm1lbnVcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1tZW51XFxcIiBuZy1jbGFzcz1cXFwieyBzaG93OiBpc1Zpc2libGUgfVxcXCI+XFxuICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbVxcXCIgbmctaWY9XFxcImhlbHBlcnMuYWxsXFxcIiBuZy1jbGljaz1cXFwic2VsZWN0QWxsKClcXFwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLW9rXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+PC9zcGFuPlxcbiAgICAgIHt7bGFiZWxzLnNlbGVjdEFsbH19XFxuICAgIDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdCBidG4tc21cXFwiIG5nLWlmPVxcXCJoZWxwZXJzLm5vbmVcXFwiIG5nLWNsaWNrPVxcXCJzZWxlY3ROb25lKClcXFwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZVxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPjwvc3Bhbj5cXG4gICAgICB7e2xhYmVscy5zZWxlY3ROb25lfX1cXG4gICAgPC9idXR0b24+XFxuICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cXFwie3tsYWJlbHMuc2VhcmNofX1cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIG5nLXNob3c9XFxcImhlbHBlcnMuZmlsdGVyXFxcIiBuZy1tb2RlbD1cXFwic2VhcmNoXFxcIiAvPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjaGVja2JveFxcXCIgbmctcmVwZWF0PVxcXCJpdGVtIGluIGxpc3QgfCBmaWx0ZXI6c2VhcmNoXFxcIj5cXG4gICAgICA8bGFiZWw+XFxuICAgICAgICA8aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiIG5nLW1vZGVsPVxcXCJpdGVtLmlzU2VsZWN0ZWRcXFwiIG5nLWNoYW5nZT1cXFwidXBkYXRlQ2hlY2soaXRlbSlcXFwiIC8+XFxuICAgICAgICB7e2l0ZW0ubGFiZWx9fVxcbiAgICAgIDwvbGFiZWw+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCIsXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBuZ01vZGVsKSB7XG4gICAgICAgIHNjb3BlLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBzY29wZS5oZWxwZXJzID0ge1xuICAgICAgICAgIGFsbDogdHJ1ZSxcbiAgICAgICAgICBub25lOiB0cnVlLFxuICAgICAgICAgIGZpbHRlcjogdHJ1ZSxcbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS5sYWJlbHMgPSB7XG4gICAgICAgICAgc2VsZWN0QWxsOiBhdHRycy5zZWxlY3RBbGxMYWJlbCB8fCAnU2VsZWN0IGFsbCcsXG4gICAgICAgICAgc2VsZWN0Tm9uZTogYXR0cnMuc2VsZWN0Tm9uZUxhYmVsIHx8ICdTZWxlY3Qgbm9uZScsXG4gICAgICAgICAgc2VhcmNoOiBhdHRycy5zZWFyY2hMYWJlbCB8fCAnU2VhcmNoJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHNjb3BlLmxpc3QgPSBbXTtcblxuICAgICAgICAkZG9jdW1lbnRbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgICAgaWYgKCFpc0Rlc2NlbmRhbnQoZWxlbWVudFswXSwgdGFyZ2V0KSkge1xuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc2NvcGUuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgIHNjb3BlLm9uQ2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gc2NvcGUuc291cmNlTGlzdDtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgIGlmIChzY29wZS5zb3VyY2VMaXN0KSB7XG4gICAgICAgICAgICBzY29wZS5saXN0ID0gc2NvcGUuc291cmNlTGlzdC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogc2NvcGUuaXRlbUxhYmVsKGl0ZW0pLFxuICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGdldFNvdXJjZUl0ZW06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjb3BlLmxpc3QgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLnRvZ2dsZSA9IHRvZ2dsZTtcbiAgICAgICAgc2NvcGUudXBkYXRlQ2hlY2sgPSB1cGRhdGVDaGVjaztcbiAgICAgICAgc2NvcGUuc2VsZWN0QWxsID0gc2VsZWN0QWxsO1xuICAgICAgICBzY29wZS5zZWxlY3ROb25lID0gc2VsZWN0Tm9uZTtcblxuICAgICAgICBpZiAoIWF0dHJzLmJ1dHRvbkxhYmVsKSB7XG4gICAgICAgICAgc2NvcGUuYnV0dG9uTGFiZWwgPSBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcyAmJiBpdGVtcy5sZW5ndGggPyBpdGVtcy5sZW5ndGggKyAnIGl0ZW1zJyA6IGF0dHJzLm1vZGVsRGVzY3JpcHRpb247XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZnJlc2hMYWJlbCgpO1xuXG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG5nTW9kZWwuJG1vZGVsVmFsdWU7XG4gICAgICAgIH0sIHVwZGF0ZUxpc3QsIHRydWUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICAgICAgICBzY29wZS5pc1Zpc2libGUgPSAhc2NvcGUuaXNWaXNpYmxlO1xuXG4gICAgICAgICAgaWYgKHNjb3BlLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgc2NvcGUub25PcGVuKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjb3BlLm9uQ2xvc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDaGVjayhpdGVtKSB7XG4gICAgICAgICAgdmFyIG1vZGVsID0gc2NvcGUubGlzdFxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0U291cmNlSXRlbSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBuZ01vZGVsLiRzZXRWaWV3VmFsdWUobW9kZWwpO1xuICAgICAgICAgIHNjb3BlLm9uSXRlbUNsaWNrKHsgaXRlbTogaXRlbS5nZXRTb3VyY2VJdGVtKCkgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZWxlY3RBbGwoKSB7XG4gICAgICAgICAgbmdNb2RlbC4kc2V0Vmlld1ZhbHVlKHNjb3BlLnNvdXJjZUxpc3Quc2xpY2UoKSk7XG4gICAgICAgICAgc2NvcGUub25TZWxlY3RBbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNlbGVjdE5vbmUoKSB7XG4gICAgICAgICAgbmdNb2RlbC4kc2V0Vmlld1ZhbHVlKFtdKTtcbiAgICAgICAgICBzY29wZS5vblNlbGVjdE5vbmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlZnJlc2hMYWJlbCgpIHtcbiAgICAgICAgICBzY29wZS5wYXJzZWRMYWJlbCA9ICRwYXJzZShzY29wZS5idXR0b25MYWJlbCkobmdNb2RlbC4kbW9kZWxWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVMaXN0KG9iaikge1xuICAgICAgICAgIHNjb3BlLmxpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIGlzU2VsZWN0ZWQgPSAob2JqIHx8IFtdKS5zb21lKGZ1bmN0aW9uIChtb2RlbEl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0U291cmNlSXRlbSgpID09PSBtb2RlbEl0ZW07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXRlbS5pc1NlbGVjdGVkID0gaXNTZWxlY3RlZDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJlZnJlc2hMYWJlbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNEZXNjZW5kYW50KHBhcmVudCwgY2hpbGQpIHtcbiAgICAgICAgICB2YXIgbm9kZSA9IGNoaWxkLnBhcmVudE5vZGU7XG5cbiAgICAgICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG5vZGUgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG4iXX0=
