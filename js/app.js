var app = angular.module('myApp', []);

app.controller('BaseController', ['$http', function($http) {

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
//get the data from senators.json
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
    this.raceHtml = "";
    this.raceCandidates = [];
    this.currentState = "";
    //showRaceClick: displays info about each senate race when the user clicks on the appropriate state
    this.showRaceClick = function(stateClicked){
      this.raceHtml = "<h1>" + stateClicked + "</h1>";
      this.raceCandidates = [];
      if (this.currentState == stateClicked){
        this.isClicked = !this.isClicked;
      }else{
        this.isClicked = true;
        this.currentState = stateClicked;
      }
      for(var j in this.senators){
        if(this.senators[j].state === stateClicked ){
          //add senators to an array so we can copnstruct individual divs for them
          this.raceCandidates.push(this.senators[j].name);
          //construct the divs
          this.raceHtml += "<div class='col-md-6'><h2>" + this.senators[j].name + "</h2>";
          this.raceHtml += "<p>" + this.senators[j].party + "</p>";
          this.raceHtml += "</div>";
        }
      };
      console.log(this.raceCandidates);
      console.log(this.raceHtml);
      //write the divs to the page
      document.getElementById('race-info').innerHTML = this.raceHtml;
  };
}]);
