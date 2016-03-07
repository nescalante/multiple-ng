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
      template: "<div class=\"dropdown dropdown-block\">\n  <button type=\"button\" class=\"btn btn-default dropdown-toggle\" ng-click=\"isVisible = !isVisible\" ng-disabled=\"isDisabled\">\n    {{parsedLabel}}\n    <span class=\"caret\"></span>\n  </button>\n  <div role=\"menu\" class=\"dropdown-menu\" ng-class=\"{ show: isVisible }\">\n    <button type=\"button\" class=\"btn btn-default btn-sm\" ng-if=\"helpers.all\" ng-click=\"selectAll()\">\n      <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n      {{labels.selectAll}}\n    </button>\n    <button type=\"button\" class=\"btn btn-default btn-sm\" ng-if=\"helpers.none\" ng-click=\"selectNone()\">\n      <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n      {{labels.selectNone}}\n    </button>\n    <input placeholder=\"{{labels.search}}\" type=\"text\" class=\"form-control padding-right-lg\" ng-show=\"helpers.filter\" ng-model=\"search\" />\n    <div class=\"checkbox\" ng-repeat=\"item in list | filter:search\">\n      <label>\n        <input type=\"checkbox\" ng-model=\"item.isSelected\" ng-change=\"updateCheck()\" />\n        {{item.label}}\n      </label>\n    </div>\n  </div>\n</div>\n",
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

        scope.updateCheck = function () {
          var model = scope.list
            .filter(function (item) {
              return item.isSelected;
            })
            .map(function (item) {
              return item.getSourceItem();
            });
          ngModel.$setViewValue(model);
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
        }

        function selectNone() {
          ngModel.$setViewValue([]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuXG5cbmFuZ3VsYXIubW9kdWxlKCdtdWx0aXBsZS1zZWxlY3QnLCBbJ25nJ10pXG4uZGlyZWN0aXZlKCdtdWx0aXBsZVNlbGVjdCcsIFtcbiAgJyRwYXJzZScsXG4gIGZ1bmN0aW9uICgkcGFyc2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICByZXF1aXJlOiAnP25nTW9kZWwnLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgc291cmNlTGlzdDogJz0nLFxuICAgICAgICBpdGVtTGFiZWw6ICcmJyxcbiAgICAgICAgaXNEaXNhYmxlZDogJz0nLFxuICAgICAgICBvbkl0ZW1DbGljazogJyYnLFxuICAgICAgICBvblNlbGVjdEFsbDogJyYnLFxuICAgICAgICBvblNlbGVjdE5vbmU6ICcmJyxcbiAgICAgICAgc2VsZWN0QWxsTGFiZWw6ICc9JyxcbiAgICAgICAgc2VsZWN0Tm9uZUxhYmVsOiAnPScsXG4gICAgICAgIHNlYXJjaExhYmVsOiAnPSdcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPVxcXCJkcm9wZG93biBkcm9wZG93bi1ibG9ja1xcXCI+XFxuICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcXFwiIG5nLWNsaWNrPVxcXCJpc1Zpc2libGUgPSAhaXNWaXNpYmxlXFxcIiBuZy1kaXNhYmxlZD1cXFwiaXNEaXNhYmxlZFxcXCI+XFxuICAgIHt7cGFyc2VkTGFiZWx9fVxcbiAgICA8c3BhbiBjbGFzcz1cXFwiY2FyZXRcXFwiPjwvc3Bhbj5cXG4gIDwvYnV0dG9uPlxcbiAgPGRpdiByb2xlPVxcXCJtZW51XFxcIiBjbGFzcz1cXFwiZHJvcGRvd24tbWVudVxcXCIgbmctY2xhc3M9XFxcInsgc2hvdzogaXNWaXNpYmxlIH1cXFwiPlxcbiAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgY2xhc3M9XFxcImJ0biBidG4tZGVmYXVsdCBidG4tc21cXFwiIG5nLWlmPVxcXCJoZWxwZXJzLmFsbFxcXCIgbmctY2xpY2s9XFxcInNlbGVjdEFsbCgpXFxcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1va1xcXCIgYXJpYS1oaWRkZW49XFxcInRydWVcXFwiPjwvc3Bhbj5cXG4gICAgICB7e2xhYmVscy5zZWxlY3RBbGx9fVxcbiAgICA8L2J1dHRvbj5cXG4gICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLWRlZmF1bHQgYnRuLXNtXFxcIiBuZy1pZj1cXFwiaGVscGVycy5ub25lXFxcIiBuZy1jbGljaz1cXFwic2VsZWN0Tm9uZSgpXFxcIj5cXG4gICAgICA8c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcXFwiIGFyaWEtaGlkZGVuPVxcXCJ0cnVlXFxcIj48L3NwYW4+XFxuICAgICAge3tsYWJlbHMuc2VsZWN0Tm9uZX19XFxuICAgIDwvYnV0dG9uPlxcbiAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XFxcInt7bGFiZWxzLnNlYXJjaH19XFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sIHBhZGRpbmctcmlnaHQtbGdcXFwiIG5nLXNob3c9XFxcImhlbHBlcnMuZmlsdGVyXFxcIiBuZy1tb2RlbD1cXFwic2VhcmNoXFxcIiAvPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjaGVja2JveFxcXCIgbmctcmVwZWF0PVxcXCJpdGVtIGluIGxpc3QgfCBmaWx0ZXI6c2VhcmNoXFxcIj5cXG4gICAgICA8bGFiZWw+XFxuICAgICAgICA8aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiIG5nLW1vZGVsPVxcXCJpdGVtLmlzU2VsZWN0ZWRcXFwiIG5nLWNoYW5nZT1cXFwidXBkYXRlQ2hlY2soKVxcXCIgLz5cXG4gICAgICAgIHt7aXRlbS5sYWJlbH19XFxuICAgICAgPC9sYWJlbD5cXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIixcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMsIG5nTW9kZWwpIHtcbiAgICAgICAgc2NvcGUuaGVscGVycyA9IHtcbiAgICAgICAgICBhbGw6IHRydWUsXG4gICAgICAgICAgbm9uZTogdHJ1ZSxcbiAgICAgICAgICBmaWx0ZXI6IHRydWUsXG4gICAgICAgIH07XG5cbiAgICAgICAgc2NvcGUubGFiZWxzID0ge1xuICAgICAgICAgIHNlbGVjdEFsbDogYXR0cnMuc2VsZWN0QWxsTGFiZWwgfHwgJ1NlbGVjdCBhbGwnLFxuICAgICAgICAgIHNlbGVjdE5vbmU6IGF0dHJzLnNlbGVjdE5vbmVMYWJlbCB8fCAnU2VsZWN0IG5vbmUnLFxuICAgICAgICAgIHNlYXJjaDogYXR0cnMuc2VhcmNoTGFiZWwgfHwgJ1NlYXJjaCdcbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS5saXN0ID0gW107XG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gc2NvcGUuc291cmNlTGlzdDtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgIGlmIChzY29wZS5zb3VyY2VMaXN0KSB7XG4gICAgICAgICAgICBzY29wZS5saXN0ID0gc2NvcGUuc291cmNlTGlzdC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogc2NvcGUuaXRlbUxhYmVsKGl0ZW0pLFxuICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGdldFNvdXJjZUl0ZW06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNjb3BlLmxpc3QgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjb3BlLnVwZGF0ZUNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBtb2RlbCA9IHNjb3BlLmxpc3RcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaXNTZWxlY3RlZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpdGVtLmdldFNvdXJjZUl0ZW0oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIG5nTW9kZWwuJHNldFZpZXdWYWx1ZShtb2RlbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2NvcGUuc2VsZWN0QWxsID0gc2VsZWN0QWxsO1xuICAgICAgICBzY29wZS5zZWxlY3ROb25lID0gc2VsZWN0Tm9uZTtcblxuICAgICAgICBpZiAoIWF0dHJzLmJ1dHRvbkxhYmVsKSB7XG4gICAgICAgICAgc2NvcGUuYnV0dG9uTGFiZWwgPSBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcyAmJiBpdGVtcy5sZW5ndGggPyBpdGVtcy5sZW5ndGggKyAnIGl0ZW1zJyA6IGF0dHJzLm1vZGVsTmFtZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmcmVzaExhYmVsKCk7XG5cbiAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gbmdNb2RlbC4kbW9kZWxWYWx1ZTtcbiAgICAgICAgfSwgdXBkYXRlTGlzdCwgdHJ1ZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gc2VsZWN0QWxsKCkge1xuICAgICAgICAgIG5nTW9kZWwuJHNldFZpZXdWYWx1ZShzY29wZS5zb3VyY2VMaXN0LnNsaWNlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2VsZWN0Tm9uZSgpIHtcbiAgICAgICAgICBuZ01vZGVsLiRzZXRWaWV3VmFsdWUoW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVmcmVzaExhYmVsKCkge1xuICAgICAgICAgIHNjb3BlLnBhcnNlZExhYmVsID0gJHBhcnNlKHNjb3BlLmJ1dHRvbkxhYmVsKShuZ01vZGVsLiRtb2RlbFZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUxpc3Qob2JqKSB7XG4gICAgICAgICAgc2NvcGUubGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB2YXIgaXNTZWxlY3RlZCA9IChvYmogfHwgW10pLnNvbWUoZnVuY3Rpb24gKG1vZGVsSXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5nZXRTb3VyY2VJdGVtKCkgPT09IG1vZGVsSXRlbTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdGVtLmlzU2VsZWN0ZWQgPSBpc1NlbGVjdGVkO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmVmcmVzaExhYmVsKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG4iXX0=
