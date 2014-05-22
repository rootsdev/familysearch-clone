(function(){
  'use strict';
  angular.module('fsCloneShared')
    .factory('fsChangeHistoryModal', function(_, $modal, fsApi, fsChangeUtils) {
      return {
        open: function(opts) { // {person, item}
          return $modal.open({
            templateUrl: 'fsCloneShared/fsChangeHistoryModal/fsChangeHistoryModal.tpl.html',
            size: 'lg',
            controller: function($scope) {
              console.log('fsChangeHistoryModal', opts);

              $scope.person = opts.person;
              $scope.busy = false;
              $scope.changes = [];
              var fromChangeId = '';
              var moreChanges = true;
              var isFiltering = !!opts.item;
              var changedItemIds = {};

              function readChanges(count) {
                if (moreChanges && !$scope.busy) {
                  $scope.busy = true;
                  var requestOpts = {count: count * (isFiltering ? 10 : 1)};
                  if (!!fromChangeId) {
                    requestOpts.from = fromChangeId;
                  }
                  fsApi.getPersonChanges($scope.person.id, requestOpts).then(function(response) {
                    $scope.busy = false;
                    if (response.getChanges().length < requestOpts.count) {
                      moreChanges = false;
                    }
                    response.getChanges().forEach(function(change) {
                      var changedItemId = fsChangeUtils.getChangedItemId(change);
                      if (!isFiltering || opts.item.id === changedItemId) {
                        if (changedItemId) {
                          if (changedItemIds[changedItemId]) {
                            change._isRestorable = true;
                          }
                          else {
                            changedItemIds[changedItemId] = true;
                          }
                        }
                        $scope.changes.push(change);
                        count--;
                      }
                      fromChangeId = change.id;
                    });
                    if (moreChanges && count > 0) {
                      readChanges(count);
                    }
                  });
                }
              }

              $scope.getMoreChanges = function() {
                readChanges(8);
              };

              $scope.getMoreChanges(); // kick things off

            }
          }).result;
        }
      };
    });
})();