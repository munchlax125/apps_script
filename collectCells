function collectOrangeCellsWithHeadersAndNotes() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  const dataRange = sheet.getRange("B2:H" + lastRow);  // B~H열, 2행부터 시작
  const bgColors = dataRange.getBackgrounds();
  const values = dataRange.getValues();
  const notes = dataRange.getNotes(); // 🟡 메모

  const headers = sheet.getRange("B1:H1").getValues()[0]; // B1:H1 헤더
  const outputCol = 1; // A열 (1번째 열)

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

    sheet.getRange(i + 2, outputCol).setValue(collected.join('\n'));
  }
}

function isOrange(color) {
  const orangeList = [
    '#fbbc04', '#f6b26b', '#f79646', '#f9cb9c', '#ff9900'
  ];
  return orangeList.includes(color.toLowerCase());
}

// 보너스: A열 내용을 다른 열 메모에 추가하는 함수 (예: B열)
function appendToColumnNoteAndHighlight() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();

  for (let i = 2; i <= lastRow; i++) {  // 2행부터 시작
    const aValue = sheet.getRange(i, 1).getValue(); // A열 값
    if (aValue) {
      const targetCell = sheet.getRange(i, 2); // B열 셀 (또는 원하는 열로 변경)
      const oldNote = targetCell.getNote();    // 기존 메모
      const newNote = oldNote ? `${oldNote}\n${aValue}` : aValue;

      targetCell.setNote(newNote); // 메모 업데이트
      targetCell.setBackground('#ff9900'); // 셀 배경 주황색
    }
  }
}
