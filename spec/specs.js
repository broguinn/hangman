describe('Game', function() {
  describe('initialize', function() {
    it('has an array for possible words', function() {
      var game = Object.create(Game);
      game.initialize();
      game.words.should.eql([]);
    });

    it('has an incomplete word array', function() {
      var game = Object.create(Game);
      game.initialize();
      game.incompleteWord.should.eql([]);
    });

    it('has a solution word array', function() {
      var game = Object.create(Game);
      game.initialize();
      game.solutionWord.should.eql([]);
    });

    it('has an array of possible guesses (the alphabet)', function() {
      var game = Object.create(Game);
      game.initialize();
      game.possibleGuesses.length.should.equal(26);
    });

    it('has an array of bad guesses', function() {
      var game = Object.create(Game);
      game.initialize();
      game.badGuesses.length.should.equal(0);
    });
  });

  describe('getWord', function() {
    it('sets the solution word equal to a random word from words', function() {
      var game = Object.create(Game);
      game.initialize();
      game.addWord("apple");
      game.getWord();
      game.solutionWord.should.eql(["a", "p", "p", "l", "e"]);
    });

    it('sets the incomplete word to blank spaces', function() {
      var game = Object.create(Game);
      game.initialize();
      game.addWord("apple");
      game.getWord();
      game.incompleteWord.should.eql(["_", "_", "_", "_", "_"]);
    });
  });

  describe('addWord', function() {
    it('adds a word to the array of words', function() {
      var game = Object.create(Game);
      game.initialize();
      game.addWord("apple");
      game.words[0].should.equal("apple");
    });
  });

  describe('isValid', function() {
    it('returns true if a guess is valid', function() {
      var game = Object.create(Game);
      game.initialize();
      game.isValid('f').should.be.true;
    });

    it('returns false if a guess is invalid', function() {
      var game = Object.create(Game);
      game.initialize();
      game.isValid('fa').should.be.false;
    });

    it('returns true for uppercase guesses', function() {
      var game = Object.create(Game);
      game.initialize();
      game.isValid('F').should.be.true;
    });
  });

  describe('handleGuess', function() {
    it('removes the guessed letter from the array of possible guesses',function() {
      var game = Object.create(Game);
      game.initialize();
      game.handleGuess("q");
      game.possibleGuesses.length.should.equal(25);
    });

    it('adds the guess to the array of bad guesses (for a bad guess)', function() {
      var game = Object.create(Game);
      game.initialize();
      game.handleGuess("p");
      game.badGuesses.should.eql(["p"]);
    });

    it('adds the guessed letter to the incomplete word array (for a right guess)', function() {
      var game = Object.create(Game);
      game.initialize();
      game.addWord("apple");
      game.getWord();
      game.handleGuess("a");
      game.incompleteWord.should.eql(["a", "_", "_", "_", "_"]);
    });

    it('adds the guessed letter to the incomplete word array in multiple places (for a right guess)', function() {
      var game = Object.create(Game);
      game.initialize();
      game.addWord("apple");
      game.getWord();
      game.handleGuess("p");
      game.incompleteWord.should.eql(["_", "p", "p", "_", "_"]);
    });
  });

  describe('isDead', function() {
    it('returns true if the user has made six bad guesses', function() {
      var game = Object.create(Game);
      game.initialize();
      for (var i = 0; i < 6; i++) {
        game.handleGuess("q");
      }
      game.isDead().should.be.true;
    });

    it('returns false if the user has made less than six bad guesses', function() {
      var game = Object.create(Game);
      game.initialize();
      game.handleGuess("p");
      game.isDead().should.be.false;
    });
  });

  describe('isWinner', function() {
    it('returns true if the user has guessed the full word', function() {
      var game = Object.create(Game);
      game.initialize();
      game.addWord("cat");
      game.getWord();
      game.handleGuess("c");
      game.handleGuess("a");
      game.handleGuess("t");
      game.isWinner().should.be.true;
    });

    it('returns false if the user has not yet guessed the full word', function() {
      var game = Object.create(Game);
      game.initialize();
      game.addWord("cat");
      game.getWord();
      game.handleGuess("c");
      game.handleGuess("t");
      game.isWinner().should.be.false;
    });
  });
});











