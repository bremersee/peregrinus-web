import {Node} from './node';

export {Node} from './node';

export abstract class NodeUtils {

  static isBranch(node: Node): boolean {
    return 'branch' === node._type;
  }

  static isFeatureLeaf(node: Node): boolean {
    return 'feature-leaf' === node._type;
  }

}
