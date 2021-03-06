# Auto Complete Trie
An auto complete implementation based on using a [trie](https://en.wikipedia.org/wiki/Trie) data structure.

## Usage
```javascript

// Create a new instance
const autoComplete = new AutoComplete();

// add a single word
autoComplete.addWord('light');

// add multiple words
autoComplete.addWords(['life', 'lights', 'cat', 'dog']);

// find all words that begin with 'li'
autoComplete.findWords('li')
// => ['light', 'lights', 'life',]
```

## Node

A Node in the trie containing meta information and the character value.  If terminate is true
it indicates that a complete word can be created from the Node back to the top of the tree.

### Constructor
-   `char` **[string][21]** a single character
-   `children` **[array][22]** an array of child Nodes
-   `terminate` **[boolean][23]** a boolean that determines if a word can be create from here to the root Node
-   `parent` **[object][20]** the parent Node that this Node is a child of

## AutoComplete

An auto complete trie that when loaded with words can determine possible words that will complete
a supplied string.

### findLeafs

Returns an array of all of the leafs of the trie

#### Parameters

-   `node` **[Node][24]** the starting node for the search

### addCharactersToNode

Add and/or update tree with the necessary nodes and terminates

#### Parameters

-   `node` **[Node][24]** the starting node to begin adding Nodes to
-   `chars` **[array][22]** array of characters to add/update

### addWord

Add a single new word to the trie

#### Parameters

-   `word` **[string][21]** a string to add

### addWords

Add an array of new words to the trie

#### Parameters

-   `wordArray` **[array][22]** array of strings to add

### getNodeCount

Count all of the nodes from the provided node (default is the head)

#### Parameters

-   `node` **[Node][24]** the Node to start counting from (optional, default `this.head`)

### getWord

Get a word from a leaf or terminate Node

#### Parameters

-   `node` **[Node][24]** the lead Node to begin building the work from
-   `str` **[string][21]** the word string being built (optional, default `""`)

### findNode

Traverse the tree to find the node from an array of characters

#### Parameters

-   `chars` **[array][22]** array of characters describing the path to traverse
-   `parentNode` **[Node][24]** the Node to start the search from (optional, default `this.head`)

### findWords

Find all words that begin with the value of the provided string

#### Parameters

-   `str` **[string][21]** the string of characters to search for words from

[1]: #node

[2]: #parameters

[3]: #autocomplete

[4]: #findleafs

[5]: #parameters-1

[6]: #addcharacterstonode

[7]: #parameters-2

[8]: #addword

[9]: #parameters-3

[10]: #addwords

[11]: #parameters-4

[12]: #getnodecount

[13]: #parameters-5

[14]: #getword

[15]: #parameters-6

[16]: #findnode

[17]: #parameters-7

[18]: #findwords

[19]: #parameters-8

[20]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[21]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[22]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[23]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[24]: #node
