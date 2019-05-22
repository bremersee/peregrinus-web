import {Feature} from './feature';

export abstract class FeatureUtils {

  static isRte(feature: Feature): boolean {
    return 'Rte' === feature.properties._type;
  }

  static isTrk(feature: Feature): boolean {
    return 'Trk' === feature.properties._type;
  }

  static isWpt(feature: Feature): boolean {
    return 'Wpt' === feature.properties._type;
  }

}
