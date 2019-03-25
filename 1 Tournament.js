const input = `Allegoric Alaskans;Blithering Badgers;win
Devastating Donkeys;Courageous Californians;draw
Devastating Donkeys;Allegoric Alaskans;win
Courageous Californians;Blithering Badgers;loss
Blithering Badgers;Devastating Donkeys;loss
Allegoric Alaskans;Courageous Californians;win`;

class Team {
  constructor(name, mp, win, draw, loss, point) {
    this.name = name;
    this.mp = mp;
    this.win = win;
    this.draw = draw;
    this.loss = loss;
    this.point = point;
  }
}

const WHITE_SPACE_NUM = 31;

var teamList = {};
if (readInput(input)) {
  var teamArr = sortTeam(teamList);
  printResult(teamArr);
} else {
  console.error("Invalid Input.");
}

function sortTeam(teamList) {
  let teamArr = [];
  for (let name in teamList) {
    teamArr.push(teamList[name]);
  }
  // sorted by points, descending. In case of a tie, sorted alphabetically.
  teamArr.sort(function(a, b) {
    if (a.point > b.point) {
      return -1;
    } else if (a.point < b.point) {
      return 1;
    } else {
      return a.name - b.name;
    }
  });

  return teamArr;
}

function printResult(teamArr) {
  document.write(
    "Team" +
      addWhiteSpace("Team") +
      "|&nbsp;MP&nbsp;|&nbsp;&nbsp;W&nbsp;|&nbsp;&nbsp;D&nbsp;|&nbsp;&nbsp;L&nbsp;|&nbsp;&nbsp;P<br>"
  );
  for (let team of teamArr) {
    document.write(
      team.name +
        addWhiteSpace(team.name) +
        "|&nbsp;&nbsp;" +
        team.mp +
        "&nbsp;|&nbsp;&nbsp;" +
        team.win +
        "&nbsp;|&nbsp;&nbsp;" +
        team.draw +
        "&nbsp;|&nbsp;&nbsp;" +
        team.loss +
        "&nbsp;|&nbsp;&nbsp;" +
        team.point +
        "<br>"
    );
  }
}

function readInput(input) {
  let matchArr = input.split("\n");
  if (!matchArr.length) {
    return false;
  }
  // read one line of match info at a time:
  let invalidCount = 0;
  for (let i = 0; i < matchArr.length; i++) {
    let matchInfo = matchArr[i].split(";");
    if (matchInfo.length !== 3) {
      console.error("There is an invalid Input.");
      continue;
    }
    teamList[matchInfo[0]] = teamList[matchInfo[0]]
      ? teamList[matchInfo[0]]
      : new Team(matchInfo[0], 0, 0, 0, 0, 0);
    teamList[matchInfo[1]] = teamList[matchInfo[1]]
      ? teamList[matchInfo[1]]
      : new Team(matchInfo[1], 0, 0, 0, 0, 0);
    let team1 = teamList[matchInfo[0]];
    let team2 = teamList[matchInfo[1]];
    team1.mp++;
    team2.mp++;
    if (matchInfo[2] === "win") {
      team1.win++;
      team1.point += 3;
      team2.loss++;
    } else if (matchInfo[2] === "draw") {
      team1.draw++;
      team1.point += 1;
      team2.draw++;
      team2.point += 1;
    } else if (matchInfo[2] === "loss") {
      team2.win++;
      team2.point += 3;
      team1.loss++;
    } else {
      console.error("There is an invalid Input.");
      invalidCount++;
      continue;
    }
  }

  return !(invalidCount === matchArr.length);
}

function addWhiteSpace(name) {
  let result = "";
  for (let i = 0; i < WHITE_SPACE_NUM - name.length; i++) {
    result += "&nbsp;";
  }
  return result;
}
