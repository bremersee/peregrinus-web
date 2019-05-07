import {AccessControlList} from './access-control-list';
import {NodeSettings} from './node-settings';

export {AccessControlList} from './access-control-list';
export {NodeSettings} from './node-settings';

export abstract class Node {
  id: string;
  created: Date;
  createdBy: string;
  modified: Date;
  modifiedBy: string;
  acl: AccessControlList;
  settings: NodeSettings;
  parentId: string;
  name: string;
}
