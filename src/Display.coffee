class Display
    constructor: (dim = 1) ->
        @dim = dim
        @config = {
            0: ['O', 'LR', 'N', 'LR', 'O']
            1: ['N', 'R', 'N', 'R', 'N']
            2: ['O', 'R', 'O', 'L', 'O']
            3: ['O', 'R', 'O', 'R', 'O']
            4: ['N', 'LR', 'O', 'R', 'N']
            5: ['O', 'L', 'O', 'R', 'O']
            6: ['O', 'L', 'O', 'LR', 'O']
            7: ['O', 'R', 'N', 'R', 'N']
            8: ['O', 'LR', 'O', 'LR', 'O']
            9: ['O', 'LR', 'O', 'R', 'O']
        }

    draw: (number) ->
        _.flatten _.map @config[number], (config, index) =>
            if index in [1, 3]
                @drawLine(config, true)
            else
                @drawLine(config)

    drawLine: (type, considerDim = false) ->
        switch type
            when 'L' then @line('|', ' ', ' ', considerDim)
            when 'R' then @line(' ', ' ', '|', considerDim)
            when 'N' then  @line(' ', ' ', ' ', considerDim)
            when 'LR' then @line('|', ' ', '|', considerDim)
            when 'O' then @line(' ', '-', ' ', considerDim)

    line: (left, middle, right, considerDim = false) ->
        line = "#{ left }#{ @repeat middle, @dim }#{ right }"
        return line unless considerDim
        _.map [1..@dim], -> line

    # repeat v for n times
    repeat: (v, n) ->
        _.map [1..n], ->
            v
        .join('')