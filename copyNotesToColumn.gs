function copyNotesToColumnF() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange("E1:E" + sheet.getLastRow());
  const notes = range.getNotes();
  
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i][0];
    if (note) {
      sheet.getRange(i + 1, 6).setValue(note); // 6은 F열
    }
  }
}
