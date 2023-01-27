const input = document.querySelector("#input");
const text = input.value;
const limit = 140;

function getNumberDigit(number) {
  return String(number).length;
}

function getTextLengthWithSpaceAndSlash(string) {
  return  Math.ceil((string.length / (limit - 2)) * limit);
}

function getLengthWithNextSuffix(length, previousChank = 0, nextChank = '') {
  if(!previousChank) previousChank = Math.ceil(length/limit);
  length += previousChank * Math.abs(getNumberDigit(nextChank) - (getNumberDigit(previousChank)));
  nextChank = Math.ceil(length/limit);
  if (getNumberDigit(previousChank) !== getNumberDigit(nextChank)) length = getLengthWithNextSuffix(length, nextChank, previousChank);
  return length;
}

function getLengthWithPreviousSuffix(chank) {
  let additionalLength = 0;
  const getNumberDigitChank = getNumberDigit(chank);
  for(let rank = 1; rank <= getNumberDigitChank; rank++) {
    for(let i = 1; i <= chank; i++) {
      if(getNumberDigit(i) === rank) additionalLength += rank;
    }
  }
  return additionalLength;
}

if(text.trim().length) {
  
  const getTextLengthWithSpaceAndSlashRezult = getTextLengthWithSpaceAndSlash(text);
  const getLengthWithNextSuffixRezult = getLengthWithNextSuffix(getTextLengthWithSpaceAndSlashRezult);
  const getLengthWithPreviousSuffixRezult = getLengthWithPreviousSuffix(Math.ceil(getLengthWithNextSuffixRezult / limit));
  let estimatedNumberChank =  (Math.ceil((getLengthWithNextSuffixRezult + getLengthWithPreviousSuffixRezult) / limit));
  let arrayChanks = [];
  let arrayWord = text.split(' ');

  if(arrayWord.length === 1 && text.length > 136) estimatedNumberChank = 1;
  if(estimatedNumberChank === 1) {
    arrayChanks.push(arrayWord.join(' '));
  }
  else {
    while(true) {
      arrayWord = text.split(' ');
      let k = 1;
      arrayChanks = [];
      while(arrayWord.length) {
    
        let limitContent = limit - 1 -getNumberDigit(k) - getNumberDigit(estimatedNumberChank);
        let tempStr = '';
        
        while(arrayWord.length && limitContent > tempStr.length + arrayWord[0].length) tempStr += arrayWord.shift() + ' ';
        tempStr += `${k}/${estimatedNumberChank}`;
        arrayChanks.push(tempStr);
        k += 1;
      }
    
      if(arrayChanks.length > 9999) {
        console.log('Превышенно допустимое количество фрагментов!');
        break;
      } 
      else if (arrayChanks.length === estimatedNumberChank) break;
      else if (getNumberDigit(arrayChanks.length) === getNumberDigit(estimatedNumberChank)) {
        arrayChanks = arrayChanks.map((item) => item.replace(estimatedNumberChank,arrayChanks.length));
        break;
      } 
      else estimatedNumberChank = arrayChanks.length;
    }
  }

  if(arrayChanks.length <= 9999) arrayChanks.forEach((item) => console.log(item + ' - ' + item.length));
  if(arrayChanks.every((item) => item.length > limit)) console.log('Превышен лимит объема фрагмента!');
} else console.log('Вы ничего не ввели.');
