/**
 * A Node in the trie containing meta information and the character value.  If terminate is true
 * it indicates that a complete word can be created from the Node back to the top of the tree.
 */
class Node {
  constructor({ char, children, terminate, parent } = {}) {
    this.char = char;
    this.children = children || [];
    this.terminate = terminate || false;
    this.parent = parent || null;
  }
}

class AutoComplete {
  constructor() {
    this.head = new Node({ char: "" });
  }

  /**
   * Returns an array of all of the leafs of the trie
   * @param {*} node
   */
  findLeafs(node) {
    if (!node.children.length) return [node];
    if (node.terminate)
      return [
        node,
        ...node.children
          .map(child => this.findLeafs(child))
          .reduce((acc, val) => acc.concat(val), [])
      ];
    return node.children
      .map(child => this.findLeafs(child))
      .reduce((acc, val) => acc.concat(val), []);
  }

  /**
   * Add and/or update tree with the necessary nodes and terminates
   * @param {*} node
   * @param {*} chars
   */
  addCharactersToNode(node, chars) {
    if (!chars.length) return;
    const char = chars.shift();
    let charNode = [...node.children.filter(child => child.char === char)][0];
    if (!charNode) {
      charNode = new Node({ char, terminate: chars.length < 1, parent: node });
      node.score += 1;
      node.children.push(charNode);
    } else if (!charNode.terminate) {
      charNode.terminate = chars.length < 1;
    }
    this.addCharactersToNode(charNode, chars);
  }

  /**
   * Add a single new word to the trie
   * @param {*} word 
   */
  addWord(word) {
    const chars = [...word];
    this.addCharactersToNode(this.head, chars);
  }

  /**
   * Add an array of new words to the trie
   * @param {*} wordArray 
   */
  addWords(wordArray) {
    wordArray.forEach(word => this.addWord(word));
  }

  /**
   * Count all of the nodes from the provided node (default is the head)
   * @param {*} node 
   */
  getNodeCount(node = this.head) {
    let count = 1;
    if (!node.children.length) return count;
    count += node.children
      .map(child => this.getNodeCount(child))
      .reduce((acc, curr) => acc + curr);
    return count;
  }

  /**
   * Get a word from a leaf or terminate Node
   * @param {*} node 
   * @param {*} str 
   */
  getWord(node, str = "") {
    if (!node.parent) return str;
    return this.getWord(node.parent, `${node.char}${str}`);
  }

  /**
   * Traverse the tree to find the node from an array of characters
   * @param {*} chars 
   * @param {*} parentNode 
   */
  findNode(chars, parentNode = this.head) {
    if (!chars.length) return parentNode;
    const char = chars.shift();
    const node = [
      ...parentNode.children.filter(child => child.char === char)
    ][0];
    // eslint-disable-next-line consistent-return
    if (!node) return;
    return this.findNode(chars, node);
  }

  /**
   * Find all words that begin with the value of the provided string
   * @param {*} str 
   */
  findWords(str) {
    const chars = [...str];
    const node = this.findNode(this.head, chars);
    if (node) return this.findLeafs(node).map(leaf => this.getWord(leaf));
    return [];
  }
}

export default AutoComplete;
