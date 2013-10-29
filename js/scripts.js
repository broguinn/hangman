var Game = {
  initialize: function() {
    this.words = [];
    this.incompleteWord = [];
    this.solutionWord = [];
    this.possibleGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    this.badGuesses = [];
  },

  getWord: function() {
    var index = Math.floor(Math.random() * this.words.length);
    for (var i = 0; i < this.words[index].length; i++) {
      this.solutionWord.push(this.words[index].charAt(i));
      if ($.inArray(this.solutionWord[i], this.possibleGuesses) === -1) {
        this.incompleteWord.push(this.solutionWord[i]);
      } else {
        this.incompleteWord.push("_");
      }
    }
  },

  addWord: function(word) {
    this.words.push(word);
  },

  isValid: function(guess) {
    return ($.inArray(guess.toLowerCase(), this.possibleGuesses) !== -1) ? true : false;
  },

  handleGuess: function(guess) {
    var guess = guess.toLowerCase();
    this.possibleGuesses.splice(this.possibleGuesses.indexOf(guess), 1);

    if ($.inArray(guess, this.solutionWord) !== -1) {
      for (var i = 0; i < this.incompleteWord.length; i++) {
        this.incompleteWord[i] = (this.solutionWord[i] === guess) ? guess : this.incompleteWord[i];
      }
    } else {
      this.badGuesses.push(guess);
    }
  },

  isDead: function() {
    return (this.badGuesses.length === 6) ? true : false;
  },

  isWinner: function() {
    return ($.inArray("_", this.incompleteWord) === -1) ? true : false;
  },
};

$(function() {
  var word;

  function randomWord() {
    $.get("http://api.wordnik.com/v4/words.json/randomWord?api_key=4b252ec9e95c73764310606cd1003aaa24e8c86557b1de9d2&hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1")
    .done(function(returnObject) {
      game.addWord(returnObject.word.toLowerCase());
      word = returnObject.word;
      game.getWord();
      updateProgress();
      updateBadGuesses();
    });
  };

  function updateProgress() {
    $("#incomplete-word").empty().append("<h2>" + game.incompleteWord.join(" ") + "</h2>");
  };

  function updateBadGuesses() {
    $("#bad-guesses").empty().append("<h4>Wrong:&nbsp;&nbsp;&nbsp;" + game.badGuesses.join(", ") + "</h4>");
  };

  function updateHangman() {
    var numbers = {
      0: "zero",
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six"}

    var hangman = numbers[game.badGuesses.length];
    $("div#man").removeClass().addClass(hangman);
  }

  function endGame() {
    if(game.isDead() || game.isWinner()) {
      // ADD: .get API for word definition
      if (game.isDead()) {
        $("div.modal-body").children("p").empty().append("<p>" + word.slice(0, 1).toUpperCase() + word.slice(1) + " killed you. Better luck next life&hellip;</p>");
        $("div.modal-footer").children("button").empty().append("Reincarnate");
      } else if (game.isWinner()) {
        $("div.modal-body").children("p").empty().append("<p>Congratulations! You survived this one.</p>");
        $("div.modal-footer").children("button").empty().append("Play Again");
      }
      $("#myModal").modal("show");
    }
  }

  function showGame(guess) {
    updateProgress();
    updateBadGuesses();
    updateHangman();
  }

  var game = Object.create(Game);
  game.initialize();
  randomWord();

  $("#guess-form").submit(function() {
    var guess = $("input#guess").val();
    $("input#guess").val("");
    $("#guess-error").empty()
    if (game.isValid(guess)) {
      game.handleGuess(guess);
      showGame(guess);
      endGame();
    } else {
      $("#guess-error").append("<p><h4>404: Guess not found</h4></p><p><h5>Please enter a new letter.</h5></p>");
    }
    return false;
  });

  $("button.new-game").click(function() {
    game.initialize();
    randomWord();
    updateHangman();
  });
});
