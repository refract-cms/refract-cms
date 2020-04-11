export interface EntityListFilter {
  propertyKey: string;
  operater: "EQ" | "NEQ";
  value: any;
}
