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
        buttonLabel: '&',
        isDisabled: '=',
        onItemClick: '&',
        onSelectAll: '&',
        onSelectNone: '&',
        modelDescription: '=',
        selectAllLabel: '=',
        selectNoneLabel: '=',
        searchLabel: '='
      },
      template: "<div class=\"ng-multiple dropdown dropdown-block\">\n  <button type=\"button\" class=\"btn btn-default dropdown-toggle\" ng-click=\"isVisible = !isVisible\" ng-disabled=\"isDisabled\">\n    {{parsedLabel}}\n    <span class=\"caret\"></span>\n  </button>\n  <div role=\"menu\" class=\"dropdown-menu\" ng-class=\"{ show: isVisible }\">\n    <button type=\"button\" class=\"btn btn-default btn-sm\" ng-if=\"helpers.all\" ng-click=\"selectAll()\">\n      <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n      {{labels.selectAll}}\n    </button>\n    <button type=\"button\" class=\"btn btn-default btn-sm\" ng-if=\"helpers.none\" ng-click=\"selectNone()\">\n      <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n      {{labels.selectNone}}\n    </button>\n    <input placeholder=\"{{labels.search}}\" type=\"text\" class=\"form-control\" ng-show=\"helpers.filter\" ng-model=\"search\" />\n    <div class=\"checkbox\" ng-repeat=\"item in list | filter:search\">\n      <label>\n        <input type=\"checkbox\" ng-model=\"item.isSelected\" ng-change=\"updateCheck(item)\" />\n        {{item.label}}\n      </label>\n    </div>\n  </div>\n</div>\n",
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
            return items && items.length ? items.length + ' items' : attrs.modelDescription;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuXG5cbmFuZ3VsYXIubW9kdWxlKCdtdWx0aXBsZS1zZWxlY3QnLCBbJ25nJ10pXG4uZGlyZWN0aXZlKCdtdWx0aXBsZVNlbGVjdCcsIFtcbiAgJyRwYXJzZScsXG4gIGZ1bmN0aW9uICgkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICByZXF1aXJlOiAnP25nTW9kZWwnLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgc291cmNlTGlzdDogJz0nLFxuICAgICAgICBpdGVtTGFiZWw6ICcmJyxcbiAgICAgICAgYnV0dG9uTGFiZWw6ICcmJyxcbiAgICAgICAgaXNEaXNhYmxlZDogJz0nLFxuICAgICAgICBvbkl0ZW1DbGljazogJyYnLFxuICAgICAgICBvblNlbGVjdEFsbDogJyYnLFxuICAgICAgICBvblNlbGVjdE5vbmU6ICcmJyxcbiAgICAgICAgbW9kZWxEZXNjcmlwdGlvbjogJz0nLFxuICAgICAgICBzZWxlY3RBbGxMYWJlbDogJz0nLFxuICAgICAgICBzZWxlY3ROb25lTGFiZWw6ICc9JyxcbiAgICAgICAgc2VhcmNoTGFiZWw6ICc9J1xuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlOiBcIjxkaXYgY2xhc3M9XFxcIm5nLW11bHRpcGxlIGRyb3Bkb3duIGRyb3Bkb3duLWJsb2NrXFxcIj5cXG4gIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZVxcXCIgbmctY2xpY2s9XFxcImlzVmlzaWJsZSA9ICFpc1Zpc2libGVcXFwiIG5nLWRpc2FibGVkPVxcXCJpc0Rpc2FibGVkXFxcIj5cXG4gICAge3twYXJzZWRMYWJlbH19XFxuICAgIDxzcGFuIGNsYXNzPVxcXCJjYXJldFxcXCI+PC9zcGFuPlxcbiAgPC9idXR0b24+XFxuICA8ZGl2IHJvbGU9XFxcIm1lbnVcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi1tZW51XFxcIiBuZy1jbGFzcz1cXFwieyBzaG93OiBpc1Zpc2libGUgfVxcXCI+XFxuICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1zbVxcXCIgbmctaWY9XFxcImhlbHBlcnMuYWxsXFxcIiBuZy1jbGljaz1cXFwic2VsZWN0QWxsKClcXFwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLW9rXFxcIiBhcmlhLWhpZGRlbj1cXFwidHJ1ZVxcXCI+PC9zcGFuPlxcbiAgICAgIHt7bGFiZWxzLnNlbGVjdEFsbH19XFxuICAgIDwvYnV0dG9uPlxcbiAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdCBidG4tc21cXFwiIG5nLWlmPVxcXCJoZWxwZXJzLm5vbmVcXFwiIG5nLWNsaWNrPVxcXCJzZWxlY3ROb25lKClcXFwiPlxcbiAgICAgIDxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZVxcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPjwvc3Bhbj5cXG4gICAgICB7e2xhYmVscy5zZWxlY3ROb25lfX1cXG4gICAgPC9idXR0b24+XFxuICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cXFwie3tsYWJlbHMuc2VhcmNofX1cXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIG5nLXNob3c9XFxcImhlbHBlcnMuZmlsdGVyXFxcIiBuZy1tb2RlbD1cXFwic2VhcmNoXFxcIiAvPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjaGVja2JveFxcXCIgbmctcmVwZWF0PVxcXCJpdGVtIGluIGxpc3QgfCBmaWx0ZXI6c2VhcmNoXFxcIj5cXG4gICAgICA8bGFiZWw+XFxuICAgICAgICA8aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiIG5nLW1vZGVsPVxcXCJpdGVtLmlzU2VsZWN0ZWRcXFwiIG5nLWNoYW5nZT1cXFwidXBkYXRlQ2hlY2soaXRlbSlcXFwiIC8+XFxuICAgICAgICB7e2l0ZW0ubGFiZWx9fVxcbiAgICAgIDwvbGFiZWw+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCIsXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzLCBuZ01vZGVsKSB7XG4gICAgICAgIHNjb3BlLmhlbHBlcnMgPSB7XG4gICAgICAgICAgYWxsOiB0cnVlLFxuICAgICAgICAgIG5vbmU6IHRydWUsXG4gICAgICAgICAgZmlsdGVyOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgICAgIHNjb3BlLmxhYmVscyA9IHtcbiAgICAgICAgICBzZWxlY3RBbGw6IGF0dHJzLnNlbGVjdEFsbExhYmVsIHx8ICdTZWxlY3QgYWxsJyxcbiAgICAgICAgICBzZWxlY3ROb25lOiBhdHRycy5zZWxlY3ROb25lTGFiZWwgfHwgJ1NlbGVjdCBub25lJyxcbiAgICAgICAgICBzZWFyY2g6IGF0dHJzLnNlYXJjaExhYmVsIHx8ICdTZWFyY2gnXG4gICAgICAgIH07XG5cbiAgICAgICAgc2NvcGUubGlzdCA9IFtdO1xuXG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHNjb3BlLnNvdXJjZUxpc3Q7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICBpZiAoc2NvcGUuc291cmNlTGlzdCkge1xuICAgICAgICAgICAgc2NvcGUubGlzdCA9IHNjb3BlLnNvdXJjZUxpc3QubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbGFiZWw6IHNjb3BlLml0ZW1MYWJlbChpdGVtKSxcbiAgICAgICAgICAgICAgICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBnZXRTb3VyY2VJdGVtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzY29wZS5saXN0ID0gW107XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzY29wZS51cGRhdGVDaGVjayA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgdmFyIG1vZGVsID0gc2NvcGUubGlzdFxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pc1NlbGVjdGVkO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0U291cmNlSXRlbSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBuZ01vZGVsLiRzZXRWaWV3VmFsdWUobW9kZWwpO1xuICAgICAgICAgIHNjb3BlLm9uSXRlbUNsaWNrKHsgaXRlbTogaXRlbS5nZXRTb3VyY2VJdGVtKCkgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2NvcGUuc2VsZWN0QWxsID0gc2VsZWN0QWxsO1xuICAgICAgICBzY29wZS5zZWxlY3ROb25lID0gc2VsZWN0Tm9uZTtcblxuICAgICAgICBpZiAoIWF0dHJzLmJ1dHRvbkxhYmVsKSB7XG4gICAgICAgICAgc2NvcGUuYnV0dG9uTGFiZWwgPSBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcyAmJiBpdGVtcy5sZW5ndGggPyBpdGVtcy5sZW5ndGggKyAnIGl0ZW1zJyA6IGF0dHJzLm1vZGVsRGVzY3JpcHRpb247XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZnJlc2hMYWJlbCgpO1xuXG4gICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG5nTW9kZWwuJG1vZGVsVmFsdWU7XG4gICAgICAgIH0sIHVwZGF0ZUxpc3QsIHRydWUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNlbGVjdEFsbCgpIHtcbiAgICAgICAgICBuZ01vZGVsLiRzZXRWaWV3VmFsdWUoc2NvcGUuc291cmNlTGlzdC5zbGljZSgpKTtcbiAgICAgICAgICBzY29wZS5vblNlbGVjdEFsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2VsZWN0Tm9uZSgpIHtcbiAgICAgICAgICBuZ01vZGVsLiRzZXRWaWV3VmFsdWUoW10pO1xuICAgICAgICAgIHNjb3BlLm9uU2VsZWN0Tm9uZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVmcmVzaExhYmVsKCkge1xuICAgICAgICAgIHNjb3BlLnBhcnNlZExhYmVsID0gJHBhcnNlKHNjb3BlLmJ1dHRvbkxhYmVsKShuZ01vZGVsLiRtb2RlbFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUxpc3Qob2JqKSB7XG4gICAgICAgICAgc2NvcGUubGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB2YXIgaXNTZWxlY3RlZCA9IChvYmogfHwgW10pLnNvbWUoZnVuY3Rpb24gKG1vZGVsSXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5nZXRTb3VyY2VJdGVtKCkgPT09IG1vZGVsSXRlbTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdGVtLmlzU2VsZWN0ZWQgPSBpc1NlbGVjdGVkO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmVmcmVzaExhYmVsKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG4iXX0=
