(function() {
  var Display;

  Display = (function() {
    function Display(dim) {
      if (dim == null) {
        dim = 1;
      }
      this.dim = dim;
      this.config = {
        0: ['O', 'LR', 'N', 'LR', 'O'],
        1: ['N', 'R', 'N', 'R', 'N'],
        2: ['O', 'R', 'O', 'L', 'O'],
        3: ['O', 'R', 'O', 'R', 'O'],
        4: ['N', 'LR', 'O', 'R', 'N'],
        5: ['O', 'L', 'O', 'R', 'O'],
        6: ['O', 'L', 'O', 'LR', 'O'],
        7: ['O', 'R', 'N', 'R', 'N'],
        8: ['O', 'LR', 'O', 'LR', 'O'],
        9: ['O', 'LR', 'O', 'R', 'O']
      };
    }

    Display.prototype.print = function(number) {
      var chars, _i, _ref, _results;
      chars = _.map(number.toString().split(''), function(char) {
        return this.draw(char);
      }, this);
      return _.each((function() {
        _results = [];
        for (var _i = 0, _ref = 2 + (this.dim * 2); 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this), function(n) {
        _.each(chars, function(l) {
          return process.stdout.write(l[n] + " ");
        });
        return process.stdout.write("\n");
      });
    };

    Display.prototype.draw = function(number) {
      return _.flatten(_.map(this.config[number], (function(_this) {
        return function(config, index) {
          return _this.drawLine(config, index === 1 || index === 3);
        };
      })(this)));
    };

    Display.prototype.drawLine = function(type, considerDim) {
      if (considerDim == null) {
        considerDim = false;
      }
      switch (type) {
        case 'L':
          return this.line('|', ' ', ' ', considerDim);
        case 'R':
          return this.line(' ', ' ', '|', considerDim);
        case 'N':
          return this.line(' ', ' ', ' ', considerDim);
        case 'LR':
          return this.line('|', ' ', '|', considerDim);
        case 'O':
          return this.line(' ', '-', ' ', considerDim);
      }
    };

    Display.prototype.line = function(left, middle, right, considerDim) {
      var line, _i, _ref, _results;
      if (considerDim == null) {
        considerDim = false;
      }
      line = "" + left + (this.repeat(middle, this.dim)) + right;
      if (!considerDim) {
        return line;
      }
      return _.map((function() {
        _results = [];
        for (var _i = 1, _ref = this.dim; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this), function() {
        return line;
      });
    };

    Display.prototype.repeat = function(v, n) {
      var _i, _results;
      return _.map((function() {
        _results = [];
        for (var _i = 1; 1 <= n ? _i <= n : _i >= n; 1 <= n ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this), function() {
        return v;
      }).join('');
    };

    return Display;

  })();

  describe('Display', function() {
    var display;
    display = null;
    beforeEach(function() {
      return display = new Display();
    });
    it('Display class should exists', function() {
      return expect(display).toBeDefined();
    });
    it('and it should be constructed with a dim', function() {
      display = new Display();
      return expect(display.dim).toBe(1);
    });
    it('should have a config property', function() {
      return expect(display.config).toBeDefined();
    });
    it('should have a repeat method', function() {
      return expect(display.repeat).toBeDefined();
    });
    it('and it should repeat strings', function() {
      expect(display.repeat('a', 2)).toEqual('aa');
      return expect(display.repeat('a', 4)).toEqual('aaaa');
    });
    describe('draw', function() {
      it('there should be a draw method', function() {
        return expect(display.draw).toBeDefined();
      });
      return it('should draw numbers', function() {
        expect(display.draw(0)).toEqual([' - ', '| |', '   ', '| |', ' - ']);
        expect(display.draw(1)).toEqual(['   ', '  |', '   ', '  |', '   ']);
        expect(display.draw(2)).toEqual([' - ', '  |', ' - ', '|  ', ' - ']);
        expect(display.draw(3)).toEqual([' - ', '  |', ' - ', '  |', ' - ']);
        expect(display.draw(4)).toEqual(['   ', '| |', ' - ', '  |', '   ']);
        expect(display.draw(5)).toEqual([' - ', '|  ', ' - ', '  |', ' - ']);
        expect(display.draw(6)).toEqual([' - ', '|  ', ' - ', '| |', ' - ']);
        expect(display.draw(7)).toEqual([' - ', '  |', '   ', '  |', '   ']);
        expect(display.draw(8)).toEqual([' - ', '| |', ' - ', '| |', ' - ']);
        return expect(display.draw(9)).toEqual([' - ', '| |', ' - ', '  |', ' - ']);
      });
    });
    describe('drawLine', function() {
      it('there should be a drawLine method', function() {
        return expect(display.drawLine).toBeDefined();
      });
      it('and it should return an array', function() {
        return expect(typeof display.drawLine('L')).toBe('string');
      });
      it('return "|  " for L', function() {
        return expect(display.drawLine('L')).toEqual('|  ');
      });
      it('return "  |" for R', function() {
        return expect(display.drawLine('R')).toEqual('  |');
      });
      it('return "   " for N', function() {
        return expect(display.drawLine('N')).toEqual('   ');
      });
      it('return "| |" for LR', function() {
        return expect(display.drawLine('LR')).toEqual('| |');
      });
      return it('return " - " for O', function() {
        return expect(display.drawLine('O')).toEqual(' - ');
      });
    });
    describe('line', function() {
      return it('should create a line', function() {
        expect(display.line('a', 'b', 'c')).toEqual('abc');
        display = new Display(2);
        return expect(display.line('a', 'b', 'c', true)).toEqual(['abbc', 'abbc']);
      });
    });
    return describe('greater dimensions', function() {
      beforeEach(function() {
        return display = new Display(2);
      });
      it('return " -- " for O when dim is 2', function() {
        return expect(display.drawLine('O')).toEqual(' -- ');
      });
      it('return "|   " for L when dim is 2', function() {
        return expect(display.drawLine('L')).toEqual('|   ');
      });
      return it('should draw different lines', function() {
        expect(display.drawLine('L', true)).toEqual(['|   ', '|   ']);
        expect(display.drawLine('R', true)).toEqual(['   |', '   |']);
        expect(display.drawLine('N', true)).toEqual(['    ', '    ']);
        expect(display.drawLine('LR', true)).toEqual(['|  |', '|  |']);
        return expect(display.drawLine('O', true)).toEqual([' -- ', ' -- ']);
      });
    });
  });

}).call(this);
