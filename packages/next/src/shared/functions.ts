export function isAvailableTime(params: {
  start: Date | null;
  deadline: Date | null;
}) {
  const { start, deadline } = params;
  if (!start || !deadline) {
    return false;
  }
  const stringStart = start.toString().split("Z")[0];
  const stringDeadline = deadline.toString().split("Z")[0];
  const time = new Date();
  const startDay = new Date(stringStart + "+09:00");
  const deadlineDay = new Date(stringDeadline + "+09:00");
  if (startDay <= time && time < deadlineDay) {
    return true;
  }

  return false;
}

export function koreanPostWord(label: string): string {
  const startWord = 44032; //가
  const endWord = 55203; //힣
  const lastStringCode = label.charCodeAt(label.length - 1);
  var prop = true;
  var msg;

  if (lastStringCode < startWord || lastStringCode > endWord) {
    return label + "를"; //한글이 아님
  }

  if ((lastStringCode - startWord) % 28 == 0) prop = false;

  if (prop) {
    msg = label + "을";
  } else {
    msg = label + "를";
  }

  return msg;
}

export function removeBRtag(value: string) {
  if (!value?.split) {
    return null;
  }
  const BR_REGEX = /(<br>|<BR>|<\/br>)/;
  if (!BR_REGEX.test(value)) {
    return value;
  }
  const splited = value.split(BR_REGEX);

  const text = splited.filter((value: string) => {
    if (value !== "<br>" && value !== "</br>" && value !== "<BR>") {
      return value + " ";
    }
  });

  return text;
}

export function numberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isValidSpecValue(value: string) {
  const notValidValues = new Set(["X", "-", "U", "가격 미확인"]);
  return !notValidValues.has(value);
}

export function numToStr(num: number) {
  return num < 10 ? "0" + num : num;
}

export function secondsToDhms(seconds: number) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + "일" : "";
  var hDisplay = h > 0 ? " " + numToStr(h) : " 00";
  var mDisplay = m > 0 ? ":" + numToStr(m) : ":00";
  var sDisplay = ":" + numToStr(s);

  if (d > 0) {
    return dDisplay + hDisplay + mDisplay;
  }

  return hDisplay + mDisplay + sDisplay;
}
export function getKoreanMoneyFormat(value: number) {
  // const test = -123412345678; for test value
  const isNegative = value < 0 ? true : false;
  const absoluteValue = Math.abs(value);
  if (absoluteValue < 1000) {
    return value;
  }

  let formattedString = "";
  const stringValue = String(absoluteValue);
  for (let index = stringValue.length - 1; 0 <= index; index--) {
    formattedString = stringValue[index] + formattedString;
    if ((stringValue.length - 1 - index + 1) % 3 === 0 && index !== 0) {
      formattedString = "," + formattedString;
    }
  }

  if (isNegative) {
    formattedString = "-" + formattedString;
  }

  return formattedString;
}
