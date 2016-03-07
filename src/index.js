'use strict';

var fs = require('fs');

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
      template: fs.readFileSync(__dirname + '/template.html', 'utf8'),
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
