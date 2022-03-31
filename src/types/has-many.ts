import * as Seq from 'sequelize';

export type HasMany<Plural extends string, Model extends Seq.Model> = Record<
  `get${Capitalize<Plural>}`,
  Seq.HasManyGetAssociationsMixin<Model>
> &
  Record<
    `set${Capitalize<Plural>}`,
    Seq.HasManySetAssociationsMixin<Model, number>
  > &
  Record<
    `add${Capitalize<Plural>}`,
    Seq.HasManyAddAssociationsMixin<Model, number>
  > &
  Record<
    `remove${Capitalize<Plural>}`,
    Seq.HasManyRemoveAssociationsMixin<Model, number>
  > &
  Record<
    `has${Capitalize<Plural>}`,
    Seq.HasManyHasAssociationsMixin<Model, number>
  > &
  Record<`count${Capitalize<Plural>}`, Seq.HasManyCountAssociationsMixin>;
