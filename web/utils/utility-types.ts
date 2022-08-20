export type GetArrayElementType<T extends readonly any[]> =
  T extends readonly (infer U)[] ? U : never;
