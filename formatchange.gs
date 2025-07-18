function formatJeJoWithTitle() {
  const body = DocumentApp.getActiveDocument().getBody();
  const paragraphs = body.getParagraphs();
  const regex = /^제\d+조.*$/;  // "제n조"로 시작하는 모든 줄

  for (let i = 0; i < paragraphs.length; i++) {
    const paraText = paragraphs[i].getText().trim();
    
    if (regex.test(paraText)) {
      const textElement = paragraphs[i].editAsText();
      textElement.setBold(true);
      textElement.setFontSize(13.5);
    }
  }
}
