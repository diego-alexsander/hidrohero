angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};
  $scope.data.username = "";
  $scope.data.password= "";

  $scope.logar = function() {
      LoginService.loginUser($scope.data.login, $scope.data.password).success(function(data) {
          $state.go('localuser');
      }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Dados incorretos',
              template: 'Confira os dados informados'
          });
      });
  }
})

.controller('UserController', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, UserService, $state) {

  $scope.userName = "";

  $scope.createUser = function(userName) {
    // User.createUser({userName: userName}, function (data) {
    //     console.log(data);
    // });
        console.log(userName);
        $state.go('homeuser');
  };

    $ionicPlatform.ready(function() {

        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Procurando sua casa =)'
        });

        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;

            var myLatlng = new google.maps.LatLng(lat, long);

            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng($scope.lat, $scope.lng);

            var request = {
              latLng: myLatlng
            };

            $scope.endereco = {};

            geocoder.geocode(request, function(data, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (data[0] != null) {
                    $scope.endereco.cidade = data[0].address_components[3].long_name;
                    $scope.endereco.bairro = data[0].address_components[2].long_name;
                } else {
                 console.log("Endereço não esta disponivel");
                }
              }
            });

            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            $scope.map = map;
            $ionicLoading.hide();

            google.maps.event.addListenerOnce($scope.map, 'idle', function(){

              var marker = new google.maps.Marker({
                  map: $scope.map,
                  animation: google.maps.Animation.DROP,
                  position: myLatlng
              });

              var contentString = "Você esta aqui!";

              var infoWindow = new google.maps.InfoWindow({
                  content: contentString
              });

              infoWindow.open($scope.map, marker);

            });

        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
    });
})

.controller('HomeUserCtrl', function($scope, $stateParams, $state) {

  $scope.calculateInicialPoints = function(userFamily, userConsume, userHydrometer) {
      console.log(userFamily, userConsume, userHydrometer);
      // User.calculatePoints({userId: userId, userFamily: userFamily, userConsume: userConsume, userHydrometer: userHydrometer}, function (data) {
      //     console.log(data);
      // });
      $state.go('reportuser');
  };

})

.controller('ReportUserCtrl', function($scope, $state) {
  $scope.initMissions = function() {
    $state.go('quiz');
  }
})

.controller('QuizUserCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicPopup) {

  var template = "<p> Hoje sua avó vai limpar a casa e precisa de água para lavar o banheiro. </p> <p> Vamos ajudar? É muito simples!!! </p> <p> Responda às perguntas e anote novamente o número que aparece no relógio de água. </p>";


  var alertPopup = $ionicPopup.alert({
      title: 'Missão',
      template: template
  });

  $scope.quizzes = [
    {
      'id': 1,
      'pergunta':'1 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aperiam?',
      'dica':'Lorem ipsum dolor sit',
      'resposta1':{
          'img': 'http://placehold.it/150x200',
          'resposta': '0',
      },
      'resposta2':{
          'img': 'http://placehold.it/150x200',
          'resposta': '1',
      }
    },
    {
      'id': 2,
      'pergunta':'2 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aperiam?',
      'dica':'Lorem ipsum dolor sit',
      'resposta1':{
          'img': 'http://placehold.it/150x200',
          'resposta': '0',
      },
      'resposta2':{
          'img': 'http://placehold.it/150x200',
          'resposta': '1',
        }
    },
    {
      'id': 3,
      'pergunta':'3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aperiam?',
      'dica':'Lorem ipsum dolor sit',
      'resposta1':{
          'img': 'http://placehold.it/150x200',
          'resposta': '0',
      },
      'resposta2':{
          'img': 'http://placehold.it/150x200',
          'resposta': '1',
        }
    },
    {
      'id': 4,
      'pergunta':'4 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aperiam?',
      'dica':'Lorem ipsum dolor sit',
      'resposta1':{
          'img': 'http://placehold.it/150x200',
          'resposta': '0',
      },
      'resposta2':{
          'img': 'http://placehold.it/150x200',
          'resposta': '1',
        }
    },
    {
      'id': 5,
      'pergunta':'5 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aperiam?',
      'dica':'Lorem ipsum dolor sit',
      'resposta1':{
          'img': 'http://placehold.it/150x200',
          'resposta': '0',
      },
      'resposta2':{
          'img': 'http://placehold.it/150x200',
          'resposta': '1',
        }
    }
  ];

  $scope.hasResponse = 0;
  $scope.isCorrect = 0;
  $scope.title = 'Titulo do quiz grandao';

  $scope.choosedAnswer = [];
  $scope.isAnswerSelected = false;

  $scope.answerQuestion = function(event, answer){
    var cls = event.target;

    if (answer.resposta != '0') {
        event.target.className = 'answer-correct';
        $scope.isCorrect = 1;
    }else{
        event.target.className = 'answer-incorrect';
    }

    $scope.hasResponse = 1;

  };

  $scope.lockSlide = function () {
      $ionicSlideBoxDelegate.enableSlide(false);
  }

  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
    console.log($scope.slideIndex);
  };

  $scope.nextQuiz = function() {
    $scope.hasResponse = 0;
    $scope.isCorrect = 0;

    if ($scope.slideIndex != 4) {
      $ionicSlideBoxDelegate.next();
    }else{
      $state.go('addmeasurement');
    }

  };

})

.controller('AddMeasurementCtrl', function($scope, $state) {
  $scope.dataMeasurement = {};
  $scope.closeMission = function(userId, userHydrometer) {
      console.log(userId, userHydrometer);

      if (userHydrometer != "") {
        // User.closeMission({userId: userId, userHydrometer: userHydrometer}, function (data) {
        //     console.log(data);
        // });
        $state.go('resultmission');
      }

  }
})

.controller('ResultMissionCtrl', function($scope, $state, $ionicLoading, $ionicPlatform) {

  $scope.dataMission = {};

  // $ionicPlatform.ready(function() {
  //     $ionicLoading.show({
  //         template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Calculando seus pontos...'
  //     });
  // });

  // $ionicLoading.hide();

  if ($scope.dataMission.result >= 7) {
    // dados da missao que deu certo
  }else{
    // dados da missao que deu errado
  }

  $scope.goToRanking = function() {
      $state.go('ranking');
  }

})

.controller('RankingCtrl', function($scope, $state, $ionicLoading, $ionicPlatform, $ionicScrollDelegate) {
  $scope.animaWater = false;

  if ($scope.animaWater == true) {

  }

});
