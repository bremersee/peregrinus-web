import {AccessControlList} from './access-control-list';
import {FeatureSettings} from './feature-settings';

export {AccessControlList} from './access-control-list';
export {FeatureSettings} from './feature-settings';

export interface FeatureProperties {
  _type: string;
  acl: AccessControlList;
  created: Date;
  createdBy: string;
  modified: Date;
  modifiedBy: string;
  name: string;
  plainTextDescription: string;
  markdownDescription: string;
  // links
  settings: FeatureSettings;
}
