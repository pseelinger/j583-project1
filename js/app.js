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
    this.candInfo = "";
    this.raceCandidates = [];
    this.currentState = "";
    //showRaceClick: displays info about each senate race when the user clicks on the appropriate state
    this.showRaceClick = function(stateClicked){
      this.raceHtml = "<h1>" + stateClicked + "</h1><ul class='nav nav-pills nav-stacked' id='cand-info-tabs'>";
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
          this.raceHtml += "<li><a data-toggle='pill' href='#" + this.senators[j].last + "'>" + this.senators[j].name  + " (" + this.senators[j].party + ")" + "</a></li>";
        }
      };
      this.raceHtml += "</ul>";
      this.raceCandidates = [];
      for(var j in this.senators){
        if(this.senators[j].state === stateClicked ){
          //add senators to an array so we can copnstruct individual divs for them
          this.raceCandidates.push(this.senators[j].name);
          //construct the divs
          this.candInfo += "<div id='" + this.senators[j].last + "' class='tab-pane'><h3>" + this.senators[j].name ;
          this.candInfo += " (" + this.senators[j].party + ")";
          this.candInfo += "</h3></div>";
        }
      };
      //write the divs to the page
      document.getElementById('race-info').innerHTML = this.raceHtml;
      this.candInfo += "</div>";
      console.log(this.candInfo);
      $('#cand-info-tabs li:first-child').addClass('active');
      document.getElementById('cand-info').innerHTML = this.candInfo;
  };
//end showRaceClick
}]);
