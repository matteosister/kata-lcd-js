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

  module.exports = Display;

}).call(this);
