# linear-list-diff

**Deprecated**. This algorithm was originally used in [amber-dom](https://github.com/Alieeeeen/amber-dom). amber-dom is now under construction, with a different algorithm. This diff might be comprehensible, but rather inefficient.

A linear-complexity list diff for diffing 2 lists. It is simple & comprehensible, and takes only 80 lines.

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
- **return {Object}**: an object containing `moves` & a simulation object `diffed`.

## Example
Consider a group of prisoners just got escaped from jail, and they changed their names.
It doesn't matter, though, because we have clues. Assume we can find them by their `key`s.

after being diffed, the prisoners will be found in `.diffed`, and `.moves` tells us how to find them from the group of people step by step

- remove(free those innocent),
- insert(find this prisoner somewhere else),
- or move(adjust their positions)).

```js
import diff from 'linear-list-diff';


const people = [{key: 'a', name: 'Mary'},
                {key: 'b', name: 'John'},
                {key: 'f', name: 'Kelly'},
                {key: 'c', name: 'Jim'},
                {key: 'e', name: 'Alien'}];

const prisoners = [{key: 'a', name: 'Stan'},
                {key: 'e', name: 'Nicholas'},
                {key: 'c', name: 'Sasha'},
                {key: 'f', name: 'Another one'}];

// Normal case.
const diffs = diff(prisoners, people, 'key');
console.log(diffs.moves)   //=> [ { type: 'INSERT', index: 1, item: { key: 'b', name: 'John' } },
                           // { type: 'MOVE', from: 4, to: 2 },
                           // { type: 'MOVE', from: 4, to: 3 } ]

console.log(diffs.diffed)  //=> [ { key: 'a', name: 'Stan' },
                           // { key: 'b', name: 'John' },
                           // { key: 'f', name: 'Another one' },
                           // { key: 'c', name: 'Sasha' },
                           // { key: 'e', name: 'Nicholas' } ]
```
But if we have no clues on them, we can't find them:
```js
const diffs = diff(prisoners, people, 'no clues'); // => { moves: [], diffed: prisoners }
```

## Usage
First install it via npm or download it directly:

```bash
npm i linear-list-diff

## or

git clone https://github.com/Alieeeeen/linear-list-diff.git
```

- To run test in Node.js:

```bash
npm run build && npm run test
```

- To use ES module:

```js
import diff from 'linear-list-diff';
```

- To use CommonJS:

```js
const diff = require('linear-list-diff/dist');
```

- To run in browser, just include `dist/list-diff.js`:

```html
<script src="path/to/dist/list-diff.js"></script>
<script>
    var moves = diff([{id: 1}, {id: 2}], [{id: 1}], 'id');
</script>
```

To run in Node, simply `require('linear-list-diff')`
