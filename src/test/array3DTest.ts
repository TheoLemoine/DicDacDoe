import * as array3D from '../app/utils/array3D'

test('should makeEmpty with a deepness and length of 2 return a 2*2 array', () => {
    expect(array3D.makeEmpty(2, 2, 0)).toEqual([
        [0, 0],
        [0, 0],
    ])
})
