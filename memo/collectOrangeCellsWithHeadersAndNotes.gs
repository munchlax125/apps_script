function collectOrangeCellsWithHeadersAndNotes() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  const dataRange = sheet.getRange("I7:R" + lastRow);
  const bgColors = dataRange.getBackgrounds();
  const values = dataRange.getValues();
  const notes = dataRange.getNotes(); // 🟡 메모

  const headers = sheet.getRange("I6:R6").getValues()[0]; // 제목
  const outputCol = 8; // H열

  for (let i = 0; i < values.length; i++) {
    let collected = [];

    for (let j = 0; j < values[0].length; j++) {
      const color = bgColors[i][j];
      if (isOrange(color)) {
        const header = headers[j];
        const cellValue = values[i][j];
        const note = notes[i][j];
        const noteText = note ? ` (${note})` : '';
        collected.push(`${header}: ${cellValue}${noteText}`);
      }
    }

    sheet.getRange(i + 7, outputCol).setValue(collected.join('\n'));
  }
}

function isOrange(color) {
  const orangeList = [
    '#fbbc04', '#f6b26b', '#f79646', '#f9cb9c', '#ff9900'
  ];
  return orangeList.includes(color.toLowerCase());
}
