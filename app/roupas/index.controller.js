(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

    function Controller(UserService, QuestionService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.question = null;
        vm.questions = null;
        vm.saveQuestion = saveQuestion;
        vm.deleteQuestion = deleteQuestion;

        initController();

        function initController() {
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            getAllQuestions();
        }

        function saveQuestion() {
           if(!vm.question || !vm.question.title) return;

            QuestionService.Create(vm.question)
                .then(function () {
                    FlashService.Success('Your question has been successfully registered!');
                    getAllQuestions();
                    vm.question = null;
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteQuestion(elem) {
            QuestionService.Delete(elem.q._id)
                .then(function () {
                    FlashService.Success('Your question has been successfully removed!');
                    getAllQuestions();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function getAllQuestions(){
            QuestionService.GetAll().then(function (questions) {
                vm.questions = questions;
            });
        }
    }
})();