type BasicPropertyType = StringConstructor | DateConstructor | NumberConstructor | BooleanConstructor;

type ShapePropertyType = { [key: string]: PropertyType };

export type ActualTypeFromPrototype<T> = T extends String
  ? string
  : T extends Date
  ? Date
  : T extends Number
  ? number
  : T extends Boolean
  ? boolean
  : T extends { [K in keyof T]: PropertyType }
  ? { [K in keyof T]: ActualTypeFromPrototype<T[K]> }
  : never;

export type PropertyType = BasicPropertyType | ShapePropertyType;

export type ActualType<T extends PropertyType | any> = T extends BasicPropertyType
  ? ActualTypeFromPrototype<T['prototype']>
  : T extends ShapePropertyType
  ? { [K in keyof T]: ActualType<T[K]> }
  : T extends (infer U)[]
  ? U extends BasicPropertyType
    ? ActualTypeFromPrototype<U['prototype']>[]
    : ActualTypeFromPrototype<U>[]
  : never;
