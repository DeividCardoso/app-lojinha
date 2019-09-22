(function () {
    'use strict';

    angular
        .module('app')
        .factory('RoupaService', Service);

    function Service($http, $q) {
        var apiUrl = "http://localhost:9050";
        var service = {};

        service.Create = Create;
        service.GetAll = GetAll;
        service.Delete = Delete;
        service.Update = Update;

        return service;

        function Update(roupa){
            return $http.update(apiUrl + '/api/roupas/' + roupa._id, roupa).then(handleSuccess, handleError);
        }

        function Create(roupa) {
            return $http.post(apiUrl + '/api/roupas', roupa).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete(apiUrl + '/api/roupas/' + _id).then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get(apiUrl + '/api/roupas').then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }
})();
