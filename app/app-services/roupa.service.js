(function () {
    'use strict';

    angular
        .module('app')
        .factory('RoupasService', Service);

    function Service($http, $q) {
        var service = {};

        service.Create = Create;
        service.GetAll = GetAll;
        service.Delete = Delete;

        return service;

        function Create(roupa) {
            return $http.post('/api/roupas', roupa).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/roupas/' + _id).then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/roupas').then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }
})();
