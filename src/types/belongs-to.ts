import * as Seq from 'sequelize';

export type BelongsTo<
  Singular extends string,
  Model extends Seq.Model
> = Record<
  `get${Capitalize<Singular>}`,
  Seq.BelongsToGetAssociationMixin<Model>
> &
  Record<
    `set${Capitalize<Singular>}`,
    Seq.BelongsToSetAssociationMixin<Model, number>
  > &
  Record<
    `create${Capitalize<Singular>}`,
    Seq.BelongsToCreateAssociationMixin<Model>
  >;
