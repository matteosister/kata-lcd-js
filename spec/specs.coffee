describe 'Display', ->
    display = null

    beforeEach ->
        display = new Display()

    it 'Display class should exists', ->
        expect(display).toBeDefined()

    it 'and it should be constructed with a dim', ->
        display = new Display()
        expect(display.dim).toBe(1)

    it 'should have a config property', ->
        expect(display.config).toBeDefined()

    it 'should have a repeat method', ->
        expect(display.repeat).toBeDefined()

    it 'and it should repeat strings', ->
        expect(display.repeat('a', 2)).toEqual('aa')
        expect(display.repeat('a', 4)).toEqual('aaaa')

    describe 'draw', ->
        it 'there should be a draw method', ->
            expect(display.draw).toBeDefined()

        it 'should draw numbers', ->
            expect(display.draw(0)).toEqual([' - ', '| |', '   ', '| |', ' - '])
            expect(display.draw(1)).toEqual(['   ', '  |', '   ', '  |', '   '])
            expect(display.draw(2)).toEqual([' - ', '  |', ' - ', '|  ', ' - '])
            expect(display.draw(3)).toEqual([' - ', '  |', ' - ', '  |', ' - '])
            expect(display.draw(4)).toEqual(['   ', '| |', ' - ', '  |', '   '])
            expect(display.draw(5)).toEqual([' - ', '|  ', ' - ', '  |', ' - '])
            expect(display.draw(6)).toEqual([' - ', '|  ', ' - ', '| |', ' - '])
            expect(display.draw(7)).toEqual([' - ', '  |', '   ', '  |', '   '])
            expect(display.draw(8)).toEqual([' - ', '| |', ' - ', '| |', ' - '])
            expect(display.draw(9)).toEqual([' - ', '| |', ' - ', '  |', ' - '])

    describe 'drawLine', ->
        it 'there should be a drawLine method', ->
            expect(display.drawLine).toBeDefined()

        it 'and it should return an array', ->
            expect(typeof display.drawLine('L'))
                .toBe 'string'

        it 'return "|  " for L', ->
            expect(display.drawLine('L')).toEqual '|  '

        it 'return "  |" for R', ->
            expect(display.drawLine('R')).toEqual '  |'

        it 'return "   " for N', ->
            expect(display.drawLine('N')).toEqual '   '

        it 'return "| |" for LR', ->
            expect(display.drawLine('LR')).toEqual '| |'

        it 'return " - " for O', ->
            expect(display.drawLine('O')).toEqual ' - '

    describe 'line', ->
        it 'should create a line', ->
            expect(display.line('a', 'b', 'c')).toEqual('abc')
            display = new Display(2)
            expect(display.line('a', 'b', 'c', true)).toEqual(['abbc', 'abbc'])

    describe 'greater dimensions', ->
        beforeEach ->
            display = new Display(2)

        it 'return " -- " for O when dim is 2', ->
            expect(display.drawLine('O')).toEqual ' -- '

        it 'return "|   " for L when dim is 2', ->
            expect(display.drawLine('L')).toEqual '|   '

        it 'should draw different lines', ->
            expect(display.drawLine('L', true)).toEqual ['|   ', '|   ']
            expect(display.drawLine('R', true)).toEqual ['   |', '   |']
            expect(display.drawLine('N', true)).toEqual ['    ', '    ']
            expect(display.drawLine('LR', true)).toEqual ['|  |', '|  |']
            expect(display.drawLine('O', true)).toEqual [' -- ', ' -- ']
