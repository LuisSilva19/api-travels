import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeUpdate,
  BeforeCreate,
  BeforeInit,
  Sequelize,
  Length
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "note",
  modelName: "NoteModel"
})
export class NoteModel extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: string;

  @Length({ min: 3, max: 100,
    msg: "The length of note title can't be shorter than 3 and longer than 60",
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare content: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare category: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  declare published: Boolean;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare update_at: Date;

  @BeforeUpdate
  static updateUpdatedAt(instance: NoteModel) {
    instance.update_at = new Date();
  }

  @BeforeCreate
  static updateCreatedAt(instance: NoteModel) {
    instance.created_at = new Date();
  }

}
