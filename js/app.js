var app = angular.module('myApp', []);
//The following two directives allow for the main tab functionality of the page(Welcome, Sort by state, sort by name)
app.directive('tab', function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div role="tabpanel" ng-transclude ng-show="active"></div>',
    scope: {
    heading: '@'
    },
    require: '^tabset',
    link: function(scope, elem, attr, tabsetCtrl) {
      scope.active = false
  tabsetCtrl.addTab(scope)
    }
  }
});
app.directive('tabset', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: { },
    templateUrl: 'tabset.html',
    bindToController: true,
    controllerAs: 'tabset',
    controller: function() {
      var self = this
      self.tabs = []
      self.addTab = function addTab(tab) {
      self.tabs.push(tab)
      if(self.tabs.length === 1) {
    tab.active = true
  }
    }
    self.select = function(selectedTab) {
  angular.forEach(self.tabs, function(tab) {
    if(tab.active && tab !== selectedTab) {
      tab.active = false;
    }
  })

  selectedTab.active = true;
}
  }
}
});
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
    this.partyClicked = "";
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
    // declare some variables we'll need later
    this.candidates = [];
    this.isClicked = false;
    this.raceHtml = "";
    this.candInfo = "";
    this.raceCandidates = [];
    this.currentState = "";
//showRaceClick - displays info about each senate race when the user clicks on the appropriate state
    this.showRaceClick = function(stateClicked){
      //Clear the variable first or else info from the other tab may get written to this section.
      this.candInfo = "";
      // Using bootstrap tabs here because angular can't act on html written to the page once it's loaded
      this.raceHtml = "<h2>" + stateClicked + "</h2><p>Senators in <span style='color: red'>red</span> are not running this year.</p><ul class='nav nav-pills nav-stacked' id='cand-info-tabs'>";
      this.raceCandidates = [];
      if (this.currentState == stateClicked){
        this.isClicked = !this.isClicked;
      }else{
        this.isClicked = true;
        this.currentState = stateClicked;
      }
      //Divs for the 'sub-menus' where the user can select a candidate
      for(var j in this.senators){
        if(this.senators[j].state === stateClicked ){
          //add senators to an array so we can construct individual divs for them
          this.raceCandidates.push(this.senators[j].name);
          //construct the divs
          this.raceHtml += "<li><a data-toggle='pill' href='#" + this.senators[j].last + "'";
          if(!this.senators[j].isOpen || this.senators[j].isOpen && !this.senators[j].isRunning){
            this.raceHtml += "class='not-open'";
          }
          this.raceHtml+= ">" + this.senators[j].name;
          if(this.senators[j].isIncumbent){
            this.raceHtml += " (Incumbent) ";
          }
          this.raceHtml += " (" + this.senators[j].party + ")" + "</a></li>";
        }
      };
      this.raceHtml += "</ul>";
      //Divs for info on the candidate the user selects
      for(var j in this.senators){
        if(this.senators[j].state === stateClicked ){
          //construct the divs
          this.candInfo += "<div id='" + this.senators[j].last + "' class='tab-pane'>";
          this.candInfo+= "'<h3>" + this.senators[j].name ;
          if(this.senators[j].isIncumbent){
            this.candInfo += " (Incumbent) ";
          }
          this.candInfo += " (" + this.senators[j].party + ")</h3>";
          this.candInfo += "<img src='" + this.senators[j].image + "'>"
          if(!this.senators[j].isOpen){
            this.candInfo += "<p>Seat not open in 2016</p>";
          }
          if(this.senators[j].isOpen && !this.senators[j].isRunning){
            this.candInfo += "<p>Retiring in 2016</p>";
          }
          if(this.senators[j].bio !== undefined){
            this.candInfo += "<p>" +  this.senators[j].bio + "</p>";
            this.candInfo += "<h4>Platform Points:</h4>";
            this.candInfo += "<ul><li>" + this.senators[j].point1 + "</li>" + "<li>" + this.senators[j].point2 + "</li>" + "<li>" + this.senators[j].point3 + "</li></ul>";
          }else if(this.senators[j].isRunning){
            this.candInfo += "<p>Running for senate in " + this.senators[j].state + " in 2016</p>"
          }
          this.candInfo +="</div>";
        }
      };
      //write the divs to the page
      document.getElementById('race-info').innerHTML = this.raceHtml;
      this.candInfo += "</div>";
      console.log(this.candInfo);
      $('#cand-info-tabs li:first-child').addClass('active');
      document.getElementById('cand-info').innerHTML = this.candInfo;
      $('#cand-info div:first-child').addClass('active');
  };
//end showRaceClick
//showCandInfo - Used for displaying information on candidates in the "Sort by name" section
this.showCandInfo = function(cand){
  this.candInfo = "";
  this.candInfo += "<h3>" + cand.name ;
  if(cand.isIncumbent){
    this.candInfo += " (Incumbent) ";
  }
  this.candInfo += " (" + cand.party + ")</h3>";
  if(!cand.isOpen){
    this.candInfo += "<h4>Seat not open in 2016</h4>";
  }
  if(cand.isOpen && cand.isRunning){
    this.candInfo += "<img src='" + cand.image + "'>"
    if(cand.bio !== undefined){
      this.candInfo += "<p>" +  cand.bio + "</p>";
      this.candInfo += "<h4>Platform Points:</h4>";
      this.candInfo += "<ul><li>" + cand.point1 + "</li>" + "<li>" + cand.point2 + "</li>" + "<li>" + cand.point3 + "</li></ul>";
    }else if(cand.isRunning){
      this.candInfo += "<p>Running for senate in " + cand.state + " in 2016</p>"
    }
    this.candInfo += "<h4>Running against:</h4>"
    for(j in this.senators){
      if(cand.state == this.senators[j].state && this.senators[j].isRunning && this.senators[j].name !== cand.name){
        this.candInfo += "<p>" + this.senators[j].name + "</p>";
      }
    }
  }
  document.getElementById('candidateInfoBox').innerHTML = this.candInfo;
}
//endShowCandInfo
}]);
