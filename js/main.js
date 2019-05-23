const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

var lyrics = [];

function syllabify(words) {
    var syllableList = words.match(syllableRegex);
    var length = syllableList ? syllableList.length : 0;
    if (syllableList && length > 1) {
      console.log("Long Word!")
      var lastSyllable = syllableList[length-1]
      var sLength = lastSyllable ? lastSyllable.length : 0;
      if (lastSyllable[sLength - 1] == "e" ||
          (lastSyllable[sLength - 1] == "d" &&
           lastSyllable[sLength - 2] == "e")) {
        console.log("Silent E!")
        var fixedEnding = syllableList[length-2] + syllableList[length-1];
        console.log(fixedEnding);
        syllableList.length = length - 2;
        syllableList.push(fixedEnding);
      }
    }
    return syllableList;
}

function findRhymeSound(syllable) {
  if (syllable.includes("oo") ) {
    return "oo";
  } else if (syllable.includes("aw")) {
    return "aw";
  } else if (syllable.includes("oi")) {
    return "oi";
  } else if (syllable.includes("ow")) {
    return "ow";
    // Need also e...e like here
  } else if (syllable.includes("ee") || syllable.includes("ea")) {
    return "long-e";
  } else if (syllable.includes("a")) {
    if (syllable.match(/a(.*)e/)) {
      return "long-a";
    }
    return "short-a";
  } else if (syllable.includes("e")) {
    if (syllable.match(/e(.*)e/)) {
      return "long-e";
    }
    return "short-e";
  } else if (syllable.includes("i")) {
    if (syllable.match(/i(.*)e/)) {
      return "long-i";
    }
    return "short-i";
  } else if (syllable.includes("o")) {
    if (syllable.match(/o(.*)e/)) {
      return "long-o";
    }
    return "short-o";
  } else if (syllable.includes("u")) {
    if (syllable.match(/u(.*)e/)) {
      return "long-u";
    }
    return "short-u";
  }
}

//- Using a function pointer:
// document.getElementById("submitLyrics").onclick =

//- Using an anonymous function:
document.getElementById("submitLyrics").onclick = function () {
  lyrics = [];
  var input = document.getElementById("lyricsInput").value;
  document.getElementById("lyricsOutput").textContent = "";

  var lines = input.split("\n");

  for (var line = 0; line < lines.length; line++) {
    var lineDiv = document.createElement('div');
    lineDiv.className = "lineLyrics";

    var lineCount = document.createElement('div');
    lineCount.className = "lineCount";

    var words = lines[line].split(" ");

    var syllableCount = 0;

    for (var i = 0; i < words.length; i++) {
      var spaceSpan = document.createElement('span');
      spaceSpan.textContent = " ";

      var syllables = syllabify(words[i]);
      console.log("SYLLABlES")
      console.log(syllables)
      console.log(words[i])
      if (syllables) {
        syllableCount = syllableCount + syllables.length;
        for (var j= 0; j < syllables.length; j++) {
          var sylSpan = document.createElement('span');
          sylSpan.className = "lyricWord";
          sylSpan.textContent = syllables[j];

          var rhyme = findRhymeSound(syllables[j]);
          console.log("RHYMEEEEE")
          console.log(rhyme)

          lyrics.push({
            'syllable': syllables[j],
            'rhyme': rhyme
          });
          lineDiv.appendChild(sylSpan);
        }
      } else {
        if (words[i].length > 0) {
          console.log('NULL CASE')
          console.log(words[i])
          console.log(words[i].length)
          syllableCount = syllableCount + 1;
          var sylSpan = document.createElement('span');
          sylSpan.className = "lyricWord";
          sylSpan.textContent = words[i];

          lyrics.push({
            'syllable': words[i],
            'rhyme': 'a'
          });

          lineDiv.appendChild(sylSpan);
        }
      }

      lineDiv.appendChild(spaceSpan);
    }

    if (syllableCount > 0) {
      lineCount.textContent = "# Syl: " + syllableCount;
    } else {
      lineCount.textContent = " ------------ ";
    }

    var lineContainer = document.createElement('div');
    lineContainer.className = "lineContainer";


    lineContainer.appendChild(lineCount);

    lineContainer.appendChild(lineDiv);



    document.getElementById("lyricsOutput").appendChild(lineContainer);
  }

  console.log("LYRIC OBJECT");
  console.log(lyrics);

};




document.getElementById("clearLyrics").onclick = function () {
  document.getElementById("lyricsInput").value = "";
}

document.getElementById("resetLyrics").onclick = function () {
  document.getElementById("lyricsInput").value = document.getElementById("lyricsOutput").textContent;

  // var words = input.split(" ");
  //
  // for (var i = 0; i < words.length; i++) {
  //   var spaceSpan = document.createElement('span');
  //   // spaceSpan.className = "lyricWord";
  //   spaceSpan.textContent = " ";
  //
  //   var syllables = syllabify(words[i]);
  //   for (var j= 0; j < syllables.length; j++) {
  //     var sylSpan = document.createElement('span');
  //     sylSpan.className = "lyricWord";
  //     sylSpan.textContent = syllables[j];
  //     document.getElementById("lyricsOutput").appendChild(sylSpan);
  //   }
  //   document.getElementById("lyricsOutput").appendChild(spaceSpan)
  //   // `<span class='lyricWord'>${}</span>`;
  //   // document.getElementById("lyricsOutput").appendChild(wordSpan);
  // }
};

console.log(['away we fly mister', 'hair', 'halter', 'hairspray', 'father', 'lady', 'kid'].map(syllabify))
