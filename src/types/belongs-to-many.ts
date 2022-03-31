import * as Seq from 'sequelize';

export type BelongsToMany<
  Plural extends string,
  Model extends Seq.Model
> = Record<
  `get${Capitalize<Plural>}`,
  Seq.BelongsToManyGetAssociationsMixin<Model>
> &
  Record<
    `set${Capitalize<Plural>}`,
    Seq.BelongsToManySetAssociationsMixin<Model, number>
  > &
  Record<
    `add${Capitalize<Plural>}`,
    Seq.BelongsToManyAddAssociationsMixin<Model, number>
  > &
  Record<
    `remove${Capitalize<Plural>}`,
    Seq.BelongsToManyRemoveAssociationsMixin<Model, number>
  > &
  Record<
    `has${Capitalize<Plural>}`,
    Seq.BelongsToManyHasAssociationsMixin<Model, number>
  > &
  Record<`count${Capitalize<Plural>}`, Seq.BelongsToManyCountAssociationsMixin>;
