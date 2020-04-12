// import { EntitySchema, Entity, PropertyType, ImageRef, RefractTypes, PropertyOptions } from '@refract-cms/core';
// import queryString from 'query-string';
// import { ServerConfig } from './server-config';
// import { repositoryForSchema } from './repository-for-schema';

// export interface Property<TEntity extends Entity, P> {
//   type: PropertyType<P>;
//   resolve?: (entity: TEntity) => P | Promise<P>;
// }

// export type Properties<TModel, TEntity extends Entity> = { [P in keyof TModel]: Property<TEntity, TModel[P]> };

// export function createPublicSchema<TEntity extends Entity, TModel extends Entity>(
//   schema: EntitySchema<TEntity, TModel>,
//   buildProperties: (helpers: Helpers<TEntity>) => Properties<Omit<TModel, '_id' | 'createDate' | 'updateDate'>, TEntity>
// ) {
//   return {
//     schema,
//     buildProperties
//   };
// }

// export type CropsUrls<T extends string> = { [P in T]: string };

// export interface ImageModel<TCrops extends string> {
//   imageId: string;
//   crops: CropsUrls<TCrops>;
// }

// type Key<TEntity, K extends keyof TEntity, TReturnValue> = TEntity[K] extends TReturnValue ? K : never;

// type ImageRefKey<TEntity, K extends keyof TEntity, TCrops extends string> = TEntity[K] extends ImageRef<TCrops>
//   ? K
//   : never;

// export interface Helpers<TEntity extends Entity> {
//   schema: EntitySchema<TEntity>;
//   serverConfig: ServerConfig;
//   resolveImageProperty: <TCrops extends string, K extends keyof TEntity>(
//     propertyKey: ImageRefKey<TEntity, K, TCrops>
//   ) => Property<TEntity, ImageModel<TCrops>>;
//   resolveReference: <RefEntity extends Entity, RefModel extends Entity, K extends keyof TEntity>(
//     refSchema: EntitySchema<RefEntity, RefModel>,
//     propertyKey: Key<TEntity, K, string>
//   ) => Property<TEntity, RefModel>;
//   resolveReferences: <RefEntity extends Entity, RefModel extends Entity, K extends keyof TEntity>(
//     refSchema: EntitySchema<RefEntity, RefModel>,
//     propertyKey: Key<TEntity, K, string[]>
//   ) => Property<TEntity, RefModel[]>;
// }

// export const buildHelpers = <TEntity extends Entity>({
//   serverConfig,
//   schema
// }: {
//   serverConfig: ServerConfig;
//   schema: EntitySchema<TEntity>;
// }) => {
//   return {
//     resolveReference: (refSchema, propertyKey) => {
//       return {
//         type: RefractTypes.schemaType(refSchema),
//         resolve: source => {
//           const id = source[propertyKey];
//           return repositoryForSchema(refSchema).findOne({ _id: id });
//         }
//       } as any;
//     },
//     resolveReferences: (refSchema, propertyKey) => {
//       return {
//         type: RefractTypes.arrayOf(RefractTypes.schemaType(refSchema) as any),
//         resolve: source => {
//           const ids = source[propertyKey];
//           return repositoryForSchema(refSchema).find({
//             _id: {
//               $in: ids
//             }
//           });
//         }
//       } as any;
//     },
//     resolveImageProperty: propertyKey => {
//       const crops = (schema.properties as any)[propertyKey].type.meta.crops.meta;
//       const cropKeys = Object.keys(crops);
//       return {
//         type: RefractTypes.shape({
//           imageId: RefractTypes.string,
//           crops: RefractTypes.shape(
//             cropKeys.reduce((acc, key) => {
//               acc[key] = RefractTypes.string;
//               return acc;
//             }, {})
//           )
//         }) as any,
//         resolve: entity => {
//           const property: ImageRef<any> = entity[propertyKey] as any;
//           if (!property) {
//             return null;
//           }
//           return {
//             imageId: property.imageId,
//             crops: cropKeys.reduce(
//               (acc, cropKey) => {
//                 const crop = property.crops[cropKey];
//                 const pixelCrop = crop.pixelCrop
//                   ? {
//                       height: crop.pixelCrop.height,
//                       width: crop.pixelCrop.width,
//                       x: crop.pixelCrop.x,
//                       y: crop.pixelCrop.y
//                     }
//                   : undefined;
//                 const cropQuery = crop && pixelCrop ? `?${queryString.stringify(pixelCrop)}` : '';
//                 acc[cropKey] = `${serverConfig.rootPath}/files/${property.imageId}${cropQuery}`;
//                 return acc;
//               },
//               {} as any
//             )
//           };
//         }
//       };
//     },
//     serverConfig,
//     schema
//   } as Helpers<TEntity>;
// };
