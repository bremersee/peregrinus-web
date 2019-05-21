import {FeatureProperties} from './feature-properties';

export {FeatureProperties} from './feature-properties';

export interface Feature {
  type: string;
  id?: string;
  bbox?: number[];
  geometry?: any;
  properties: FeatureProperties;
}
