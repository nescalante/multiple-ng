'use strict';

var fs = require('fs');

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
        onClear: '&',
        onItemClick: '&',
        onSelectAll: '&',
        onSelectNone: '&',
        translation: '=',
        selectAllLabel: '=',
        selectNoneLabel: '=',
        searchLabel: '='
      },
      template: fs.readFileSync(__dirname + '/template.html', 'utf8'),
      link: function (scope, element, attrs, ngModel) {
        scope.list = scope.sourceList.map(function (item) {
          return {
            label: scope.itemLabel(item),
            isSelected: false,
            getSourceItem: function () {
              return item;
            }
          };
        });

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
