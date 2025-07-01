function countTwoColorsToD38() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("신고자명단");
  var range = sheet.getRange("M:M");
  var bgColors = range.getBackgrounds();
  var count = 0;

  var colorA = "#00ff00"; // 연두색
  var colorB = "#00ffff"; // 하늘색

  for (var i = 0; i < bgColors.length; i++) {
    var cellColor = bgColors[i][0].toLowerCase();
    if (cellColor === colorA || cellColor === colorB) {
      count++;
    }
  }

  // 결과 출력
  var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  targetSheet.getRange("D38").setValue(count);
}
