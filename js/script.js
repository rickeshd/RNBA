
var dateHeader = (new Date()).toString().split(' ').splice(0,3).join('. ');
var HTMLtodaysDate = '<div id ="subtitle">%data%</div>';
var HTMLscoreboardcontainer = '<div class ="scoreboard-container"></div>';
var HTMLnewScore = '<div class ="score-entry"></div>';
var HTMLteamName1 = '<span class ="teamName1">%data%</span>';
var HTMLteamName2 = '<span class ="teamName2">%data%</span>';
var HTMLteam1Score = '<div class ="team1Score">%data%</div>';
var HTMLteam2Score = '<div class ="team2Score">%data%</div>';
var HTMLteamLogo = '<img src="images/%teamName%.png" alt="HTML5 Icon" style="width:30px;height:30px;">';
var HTMLgameStatus = '<span class ="gameStatus">%data%</span>';
var HTMLwinsLosses = '<div class ="winsLosses">(%data%)</div>';

function loadBoxScores(date,callback) {

	//var $boxScoreContainer = $('#boxscore-container');
	// var bullsGame = ('http://stats.nba.com/stats/scoreboard/?GameDate=11/04/2015&LeagueID=00&DayOffset=0');
    var todaysGame = ('http://stats.nba.com/stats/scoreboard/?GameDate=%data%&LeagueID=00&DayOffset=0');
    var formattedGame = todaysGame.replace("%data%", date);

    var $body = $('body');
    var $team1Score = $(".team1Score");
    
	$.ajax(formattedGame, {
        dataType: "jsonp",
        success: function(response) {
            var lineScores = response.resultSets[1].rowSet;
            var gameHeader = response.resultSets[0].rowSet;
            var teamList = [];
            var formattedTodaysDate = HTMLtodaysDate.replace("%data%", dateHeader);
            
            $body.append(HTMLscoreboardcontainer)
            $(".scoreboard-container:last").prepend(formattedTodaysDate);
            // creates score-entry container for each game
            for (e in gameHeader) {
                $(".scoreboard-container:last").append(HTMLnewScore);
                // append team names to each score-entry 
                for (var i = 0; i < teams.length; i++) {
                    if (gameHeader[e][6] === teams[i].teamId) {
                        teamList.push(teams[i].simpleName); // add team names to list
                        var formattedTeamName1 = HTMLteamName1.replace("%data%", teams[i].simpleName);
                        $(".score-entry:last").prepend(formattedTeamName1);
                            // append logos to each score-entry
                            for (a in teamList) {
                                if (teamList[a] === teams[i].simpleName) {
                                    var formattedLogo = HTMLteamLogo.replace("%teamName%", teamList[a]);
                                    $(".teamName1:last").before(formattedLogo);
                                }
                            }
                        // append scores and season win loss records to each score-entry
                        for (s in lineScores) {
                            if (gameHeader[e][6] === lineScores[s][3]) {
                                if (lineScores[s][21] === null) {
                                }
                                else {
                                    var formattedTeam1Score = HTMLteam1Score.replace("%data%", lineScores[s][21]);
                                    $(".teamName1:last").after(formattedTeam1Score);
                                }
                                var formattedWinsLosses = HTMLwinsLosses.replace("%data%", lineScores[s][6]);
                                $(".teamName1:last").after(formattedWinsLosses);
                            }
                            else {
                            }
                        }
                    }
                    // append team names to each score-entry
                    if (gameHeader[e][7] === teams[i].teamId) {
                        teamList.push(teams[i].simpleName)
                        var formattedTeamName2 = HTMLteamName2.replace("%data%", teams[i].simpleName);
                        $(".score-entry:last").append(formattedTeamName2);
                        // append logos to each score-entry
                            for (a in teamList) {
                                if (teamList[a] === teams[i].simpleName) {
                                    var formattedLogo = HTMLteamLogo.replace("%teamName%", teamList[a]);
                                    $(".teamName2:last").before(formattedLogo);
                                }
                            }
                        // append scores and season win loss records to each score-entry
                        for (s in lineScores) {
                            if (gameHeader[e][7] === lineScores[s][3]) {
                                if (lineScores[s][21] === null) {
                                }
                                else {
                                    var formattedTeam2Score = HTMLteam2Score.replace("%data%", lineScores[s][21]);
                                    $(".teamName2:last").after(formattedTeam2Score);
                                }
                                var formattedWinsLosses = HTMLwinsLosses.replace("%data%", lineScores[s][6]);
                                $(".teamName2:last").after(formattedWinsLosses);
                            }

                        }
                    }
                }
            // append game status to each score-entry
            var formattedgameStatus = HTMLgameStatus.replace("%data%", gameHeader[e][4].toUpperCase());
            $(".score-entry:last").append(formattedgameStatus);

            //create new id for each team score
            $(".team1Score").each(function(index,element) {
                $(this).attr("id","x"+index);
            });
            $(".team2Score").each(function(index,element) {
                $(this).attr("id","y"+index);
            });
            };
        var team1ScoreList = [];
        var team2ScoreList = [];     
        $(".team1Score").each(function(index,element) {
            var x = parseInt($(this).text());
            team1ScoreList.push(x);
        });
        $(".team2Score").each(function(index,element) {
            var y = parseInt($(this).text());
            team2ScoreList.push(y);
        });
        for (e in team1ScoreList) {
            if (team1ScoreList[e] > team2ScoreList[e]) {
                $("#x"+[e]).css("color", "blue");
            }
            else {
                $("#y"+[e]).css("color", "blue");
            }
        } 
        }
    });
    callback(); 
}
// get todays date mm/dd/yyyy
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd
} 
if(mm<10) {
    mm='0'+mm
} 
today = (mm+'/'+dd+'/'+yyyy).toString();

// get yesterdays date mm/dd/yyyy
$today = new Date();
$yesterday = new Date($today);
$yesterday.setDate($today.getDate() - 1);
var $dd = $yesterday.getDate();
var $mm = $yesterday.getMonth()+1; //January is 0!

var $yyyy = $yesterday.getFullYear();
if($dd<10){$dd='0'+dd} if($mm<10){$mm='0'+$mm} $yesterday = $mm+'/'+$dd+'/'+$yyyy;
console.log($yesterday);


loadBoxScores(today, function() {
    loadBoxScores($yesterday, function() {
    });
});





    






// $("img").each(function(index, element) {
//     console.log(element);
// });

// var dir = "src/themes/base/images/";
// var fileextension = ".png";
// $.ajax({
//     //This will retrieve the contents of the folder if the folder is configured as 'browsable'
//     url: dir,
//     success: function (data) {
//         //Lsit all png file names in the page
//         $(data).find("a:contains(" + fileextension + ")").each(function () {
//             var filename = this.href.replace(window.location.host, "").replace("http:///", "");
//             $body.append($("<img src=" + dir + filename + "></img>"));
//         });
//     }
// });

// nba boxscore - change game ID
// http://stats.nba.com/stats/boxscore?GameID=0021500053&RangeType=0&StartPeriod=0&EndPeriod=0&StartRange=0&EndRange=0
