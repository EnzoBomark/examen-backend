import * as Seq from 'sequelize';

export type HasOne<Singular extends string, Model extends Seq.Model> = Record<
  `get${Capitalize<Singular>}`,
  Seq.HasOneGetAssociationMixin<Model>
> &
  Record<
    `set${Capitalize<Singular>}`,
    Seq.HasOneSetAssociationMixin<Model, number>
  > &
  Record<
    `set${Capitalize<Singular>}`,
    Seq.BelongsToCreateAssociationMixin<Model>
  >;
