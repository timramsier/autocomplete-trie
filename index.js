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

  addCharactersToNode(node, chars) {
    if (!chars.length) return;
    const char = chars.shift();
    let charNode = [...node.children.filter(child => child.char === char)][0];
    if (!charNode) {
      charNode = new Node({ char, terminate: chars.length < 1, parent: node });
      node.children.push(charNode);
    } else if (!charNode.terminate) {
      charNode.terminate = chars.length < 1;
    }
    this.addCharactersToNode(charNode, chars);
  }

  addWord(word) {
    const chars = [...word];
    this.addCharactersToNode(this.head, chars);
  }

  getWord(node, str = "") {
    if (!node.parent) return str;
    return this.getWord(node.parent, `${node.char}${str}`);
  }

  findNode(parentNode, chars) {
    if (!chars.length) return parentNode;
    const char = chars.shift();
    const node = [
      ...parentNode.children.filter(child => child.char === char)
    ][0];
    // eslint-disable-next-line consistent-return
    if (!node) return;
    return this.findNode(node, chars);
  }

  findWords(str) {
    const chars = [...str];
    const node = this.findNode(this.head, chars);
    if (node) return this.findLeafs(node).map(leaf => this.getWord(leaf));
    return [];
  }
}

export default AutoComplete;
