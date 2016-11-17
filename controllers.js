//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadPic = function (file) {
        
        var epoch = (new Date).getTime();

        file.upload = Upload.rename(file, $scope.useremail + "_random" + epoch)
        file.upload = Upload.upload({
            url: 'upload.php',
            data: { file: file, useremail: $scope.useremail },
        });
        $scope.useremail = null;
       /*
        uploader.onAfterAddingFile = function (item) {
            var fileExtension = '.' + item.file.name.split('.').pop();

            item.file.name = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
        };
*/
        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }
}]);

