const input = document.querySelector("#foo");
const text = input.value;
const limit = 140;

function numberDigit(num) {
  return String(num).length;
}

function textLengthWithSpaceSlash(str) {
  return  Math.ceil((str.length / (limit - 2)) * limit);
}

function lengthWithPostFix(length, preChank = 0, postChank = '') {
  if(!preChank) preChank = Math.ceil(length/limit);
  length += preChank * Math.abs(numberDigit(postChank) - (numberDigit(preChank)));
  postChank = Math.ceil(length/limit);
  if (numberDigit(preChank) !== numberDigit(postChank)) length = lengthWithPostFix(length, postChank, preChank);
  return length;
}

function lengthWithPreFix(chank) {
  let dopLength = 0;
  const numberDigitChank = numberDigit(chank);
  for(let rank = 1; rank <= numberDigitChank; rank++) {
    for(let i = 1; i <= chank; i++) {
      if(numberDigit(i) === rank) dopLength += rank;
    }
  }
  return dopLength;
}

const textLengthWithSpaceSlashRez = textLengthWithSpaceSlash(text);
const lengthWithPostFixRez = lengthWithPostFix(textLengthWithSpaceSlashRez);
const lengthWithPreFixRez = lengthWithPreFix(Math.ceil(lengthWithPostFixRez / limit));

let estimatedNumberChank =  (Math.ceil((lengthWithPostFixRez + lengthWithPreFixRez) / limit));
let arrChanks = [];

while(true) {

  let arrWord = text.split(' ');
  let k = 1;
  arrChanks = [];
  while(arrWord.length) {

    let limitContent = limit - 1 -numberDigit(k) - numberDigit(estimatedNumberChank);
    let tempStr = '';
    
    while(arrWord.length && limitContent > tempStr.length + arrWord[0].length) tempStr += arrWord.shift() + ' ';
    tempStr += `${k}/${estimatedNumberChank}`;
    arrChanks.push(tempStr);
    k += 1;

  }

  if(arrChanks.length > 9999) {
    console.log('Превышенно допустимое количество фрагментов!');
    break;
  } 
  else if (arrChanks.length === estimatedNumberChank) break;
  else if (numberDigit(arrChanks.length) === numberDigit(estimatedNumberChank)) {
    arrChanks = arrChanks.map((el) => el.replace(estimatedNumberChank,arrChanks.length));
    break;
  } 
  else estimatedNumberChank = arrChanks.length;
}
if(arrChanks.length <= 9999)console.log('Результат:',arrChanks);

