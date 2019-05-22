import {FeatureProperties} from './feature-properties';
import {RteSeg} from './rte-seg';

export {FeatureProperties} from './feature-properties';

export interface RteProperties extends FeatureProperties {
  rteSegments: RteSeg[];
}
