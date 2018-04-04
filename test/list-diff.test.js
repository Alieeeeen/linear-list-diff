const diff = require('../dist/list-diff');
const expect = require('expect.js');

function patch(list, moves) {
  var _item;
  moves.forEach((move) => {
    switch(move.type) {
    case 'INSERT':
      list.splice(move.index, 0, move.item);
      break;
    case 'REMOVE':
      list.splice(move.index, 1);
      break;
    case 'MOVE':

      _item = list.splice(move.from, 1)[0];
      list.splice(move.to, 0, _item);
      break;
    default:
      break;
    }
  });
  return list;
}

function run(source, target) {
  const patches = diff(source, target, 'key');
  const res = patch(source, patches);

  expect(res).to.eql(target);
  return patches;
}

describe('list-diff', () => {
  describe('simple case', () => {
    it('2 lists contain no key should not be diffed', () => {
      const source = [{id: 12}, {id: 90}];
      const target = [{id: 13}, {id: 80}];

      const patches = diff(source, target, 'key');
      expect(patches).to.eql([]);
    })

    it('test remove', () => {
      const source = [{key: 1}, {key: 2}, {key: 3}];
      const target = [{key: 1}];

      run(source, target);
    });

    it('test insert', () => {
      const source = [{key: 1}];
      const target = [{key: 1}, {key: 2}, {key: 3}];

      run(source, target);
    });

    it('test move', () => {
      const source = [{key: 1}, {key: 3}, {key: 2}, {key: 4}];
      const target = [{key: 1}, {key: 2}, {key: 3}, {key: 4}];
      
      run(source, target);
    });
  });

  describe('practical', () => {
    it('empty key should be ok', () => {
      const source = [{key: 1}, {}, {key: 3}, {key: 4}];
      const target = [{key: 1}, {key: 2}, {key: 3}, {key: 4}];

      run(source, target);
    });

    it('complex1', () => {
      const source = [{key: 'a'}, {key: 'b'}, {key: 'f'}, {key: 'c'}, {key: 'e'}];
      const target = [{key: 'a'}, {key: 'e'}, {key: 'c'}, {key: 'f'}];

      run(source, target);
    });

    it('complex2', () => {
      const source = [{key: 1}, {key: 8}, {key: 3}, {key: 7}, {key: 4}]
      const target = [{key: 1}, {key: 4}, {key: 5}, {key: 3}, {key: 7}, {key: 6}]

      run(source, target);
    })
  });
})
