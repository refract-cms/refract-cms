import { PropertyType } from './property-types';

export function isBasicPropertyType(propertyType: PropertyType) {
  return [String, Number, Date, Boolean].find((t) => propertyType === t);
}
