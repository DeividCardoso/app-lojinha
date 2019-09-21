(function () {
    'use strict';

    angular
        .module('app')
        .controller('Roupas.IndexController', Controller);

    function Controller(UserService, RoupaService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.roupa = null;
        vm.roupas = null;
        vm.saveRoupa = saveRoupa;
        vm.deleteRoupa = deleteRoupa;

        initUser();

        function initUser() {
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            getAllRoupas();
        }

        function saveRoupa() {
           if(!vm.roupa || !vm.roupa.codigo) return;

            RoupaService.Create(vm.roupa)
                .then(function () {
                    FlashService.Success('Nova peça cadastrada com sucesso!');
                    getAllRoupas();
                    vm.roupa = null;
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteRoupa(elem) {
            RoupaService.Delete(elem.q._id)
                .then(function () {
                    FlashService.Success('Peça apagada com sucesso!');
                    getAllRoupas();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function getAllRoupas(){
            RoupaService.GetAll().then(function (roupas) {
                vm.roupas = roupas;
            });
        }
    }
})();