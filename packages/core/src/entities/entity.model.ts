// type AllowedType =
//   | number
//   | string
//   | Date
//   | Boolean
//   | number[]
//   | string[]
//   | Date[]
//   | Boolean[]
//   | {
//       [key: string]: AllowedType;
//     };

export interface Entity {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
