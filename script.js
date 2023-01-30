const TEST_TEXT = "Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut suscipit velit efficitur eget Sed sit amet posuere risus";

function breakTextIntoChunks(text) {
  const limit = 140;
  const countChunks = 9999;

  function getNumberDigit(number) {
    return String(number).length;
  }

  function getTextLengthWithSeparators(string) {
    return Math.ceil((string.length / (limit - 2)) * limit);
  }

  function getLengthWithNextSuffix(length, previousChunk = 0, nextChunk = '') {
    if (!previousChunk) {
      previousChunk = Math.ceil(length / limit);
    }
    length += previousChunk * Math.abs(getNumberDigit(nextChunk) - (getNumberDigit(previousChunk)));
    nextChunk = Math.ceil(length / limit);
    if (getNumberDigit(previousChunk) !== getNumberDigit(nextChunk)) {
      length = getLengthWithNextSuffix(length, nextChunk, previousChunk);
    }
    return length;
  }

  function getLengthWithPreviousSuffix(chunk) {
    let additionalLength = 0;
    const getNumberDigitChunk = getNumberDigit(chunk);
    for (let rank = 1; rank <= getNumberDigitChunk; rank++) {
      for (let i = 1; i <= chunk; i++) {
        if (getNumberDigit(i) === rank) {
          additionalLength += rank;
        }
      }
    }
    return additionalLength;
  }

  if (text.trim().length) {
    const textLengthWithSeparators = getTextLengthWithSeparators(text);
    const lengthWithNextSuffix = getLengthWithNextSuffix(textLengthWithSeparators);
    const lengthWithPreviousSuffix = getLengthWithPreviousSuffix(Math.ceil(lengthWithNextSuffix / limit));
    let estimatedNumberChunk = Math.ceil((lengthWithNextSuffix + lengthWithPreviousSuffix) / limit);
    let arrayChunks = [];
    let arrayWord = text.split(' ');

    if (arrayWord.length === 1 && text.length > 136) {
      estimatedNumberChunk = 1;
    }
    if (estimatedNumberChunk === 1) {
      arrayChunks.push(arrayWord.join(' '));
    }
    else {
      while (true) {
        arrayWord = text.split(' ').reverse();
        let indexChunk = 1;
        arrayChunks = [];
        while (arrayWord.length) {
          let limitContent = limit - 1 - getNumberDigit(indexChunk) - getNumberDigit(estimatedNumberChunk);
          let tempStr = '';

          while (arrayWord.length && limitContent > tempStr.length + arrayWord.at(-1).length) {
            tempStr += arrayWord.pop() + ' ';
          }
          tempStr += `${indexChunk}/${estimatedNumberChunk}`;
          arrayChunks.push(tempStr);
          indexChunk += 1;
        }

        if (arrayChunks.length > countChunks) {
          console.log("Number of fragments exceeded!");
          break;
        } else if (arrayChunks.length === estimatedNumberChunk) {
          break;
        } else if (getNumberDigit(arrayChunks.length) === getNumberDigit(estimatedNumberChunk)) {
          arrayChunks = arrayChunks.map((item) => item.replace(estimatedNumberChunk, arrayChunks.length));
          break;
        } else {
          estimatedNumberChunk = arrayChunks.length;
        }
      }
    }

    if (arrayChunks.length <= countChunks) {
      console.log(arrayChunks);
    }
    if (arrayChunks.every((item) => item.length > limit)) {
      console.log("Fragment size limit exceeded!");
    }
  } else {
    console.log("You didn't enter anything.");
  }
}

breakTextIntoChunks(TEST_TEXT);
