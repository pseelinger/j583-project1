var app = angular.module('myApp', ['ngSanitize']);

app.controller('BaseController', ['$http', function($http) {

    this.message = "Ready";
    this.states= [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
    ];
    this.senators = [];
    var _this = this;

    $http.get('/js/senators.json')
    .success(function(data){
      console.log(data);
      console.log(this);
      _this.senators = data;
    })
    .error(function(msg){
      console.log("Beep boop, something went wrong: \n" + msg);
    });
    this.candidates = [];
    this.isClicked = false;
    this.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
};
    this.raceHtml = "";
    this.raceCandidates = [];
    this.showRaceClick = function(s){
      this.raceHtml = "";
      this.raceCandidates = [];
      this.isClicked = !this.isClicked;
      for(var j in this.senators){
        if(this.senators[j].state === s ){
          this.raceCandidates.push(this.senators[j].name);
          this.raceHtml += "<h1>" + this.senators[j].name + "</h1>";
        }
      };
      console.log(this.raceCandidates);
      console.log(this.raceHtml);
      document.getElementById('race-info').innerHTML = this.raceHtml;
  };
  //this.showInfo = function(){
  //  return this.raceHtml;
  //};
}]);
