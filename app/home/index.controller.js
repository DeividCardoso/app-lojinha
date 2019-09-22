(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService, RoupaService) {
        var vm = this;

        vm.user = null;
        vm.roupa = null;
        vm.roupas = null;

        initUser();

        function initUser() {
            // get current user data in the API
            UserService.GetUserId().then(function (userId) {
                UserService.GetCurrent(userId).then(function (user) {
                        vm.user = user;
                    });
            });
            getAllRoupas();
        }

        function getAllRoupas(){
            RoupaService.GetAll().then(function (roupas) {
                vm.roupas = roupas;
            });
        }

    }

})();