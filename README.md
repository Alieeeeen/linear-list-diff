# linear-list-diff

A linear-complexity list diff for diffing 2 lists. It is simple & comprehensive, and takes only 80 lines. 

This algorithm is used for diffing 2 lists of children of 2 vtree, thus if neither of the 2 lists contain any children, the result will be empty. For more details, please visit my another virtual dom project [amber-dom](https://github.com/Alieeeeen/amber-dom).

Here are a few projects or blogs this algorithm refered to:

- [ayqy/React list diff](http://www.ayqy.net/blog/react-list-diff/)
- [livoras/list-diff](https://github.com/livoras/list-diff)
- [Matt-Esch/virtual-dom](https://github.com/Matt-Esch/virtual-dom)

## Paramters
**diff(source, target, key)**

- **source {Array}**: an array of object with some key.
- **targte {Array}**: an array of updated object with some key.
- **key {String|Function}**: the identifier of an object. If it is a function, each object is passed to it and it must return a string.

## Example

```js
import diff from 'linear-list-diff';


const source = [{key: 'a'}, {key: 'b'}, {key: 'f'}, {key: 'c'}, {key: 'e'}];
const target = [{key: 'a'}, {key: 'e'}, {key: 'c'}, {key: 'f'}];

// Normal case.
const moves = diff(source, target, 'key'); // => [ { type: 'MOVE', from: 4, to: 1 },
                                    //      { type: 'MOVE', from: 4, to: 2 },
                                    //      { type: 'MOVE', from: 4, to: 3 },
                                    //      { type: 'REMOVE', index: 4 } ]

// Provide another key that neither array has one.
const moves2 = diff(source, target, 'id');  // => []

const res = patch(source, moves);   // => [{key: 'a'}, {key: 'e'}, {key: 'c'}, {key: 'f'}]

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

```

## Usage
To run test in Node.js:

```bash
npm run build && npm run test
```

To run in browser, just include `dist/list-diff.js`:

```html
<script src="path/to/dist/list-diff.js"></script>
<script>
    var moves = diff([{id: 1}, {id: 2}], [{id: 1}], 'id');
</script>
```

To run in Node, simply `require('linear-list-diff')`