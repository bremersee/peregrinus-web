import {AccessControlEntry} from './access-control-entry';
export {AccessControlEntry} from './access-control-entry';

export class AccessControlList {
  owner: string;
  entries: AccessControlEntry[];
}
