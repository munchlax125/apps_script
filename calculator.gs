function 생성텍스트() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // 입력값 위치
  const 제목 = sheet.getRange("C2").getValue();
  const 조정료 = sheet.getRange("C3").getValue();
  const lastRow = sheet.getLastRow();
  const 세액공제범위 = sheet.getRange(`B6:C${lastRow}`).getValues();

  let 세액공제합 = 0;
  let 세액공제내용 = "";

  for (let i = 0; i < 세액공제범위.length; i++) {
    const [이름, 금액] = 세액공제범위[i];
    if (이름 && 금액) {
      세액공제합 += 금액;
      세액공제내용 += `${이름} ${금액.toLocaleString("ko-KR")}\n`;
    }
  }

  const 감면수수료 = Math.round(세액공제합 * 0.1);
  const 부가세 = Math.round((조정료 + 감면수수료) * 0.1);
  const 총합계액 = 조정료 + 감면수수료 + 부가세;
  const 할인금액 = Math.floor(총합계액 / 10000) * 10000;
  const 버려진금액 = 총합계액 - 할인금액;

  const format = (n) => n.toLocaleString("ko-KR");

  const 할인문구 = 버려진금액 > 0
    ? `인데 할인해서 ${format(할인금액)} 입니다.`
    : "입니다.";

  const 결과 = `${제목}-

조정료 ${format(조정료)}
감면수수료 ${format(감면수수료)}
부가세 ${format(부가세)}
총합계액은 ${format(총합계액)} ${할인문구}

${세액공제내용.trim()}
감면 수수료 ${format(감면수수료)}`;

  // 출력 위치
  sheet.getRange("D14").setValue(결과);
}
