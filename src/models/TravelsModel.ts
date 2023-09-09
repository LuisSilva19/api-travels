import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    BeforeCreate,
    HasMany,
    AutoIncrement
} from "sequelize-typescript";
import { TourModel } from "./TourModel";

@Table({
    timestamps:true,
    tableName: "travels",
    modelName: "TravelModel"
})
export default class TravelModel extends Model {
    @AutoIncrement
    @Column({
        primaryKey: true,
        type: DataType.BIGINT
    })
    declare id: BigInt;

    @Column({ type: DataType.STRING })
    declare name: string;

    @Column({ type: DataType.TEXT })
    declare description: string;

    @Column({ type: DataType.STRING })
    declare slug: string;

    @Column({ type: DataType.BOOLEAN  })
    declare is_public: Boolean;

    @Column({ type: DataType.SMALLINT  })
    declare number_of_days: number;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare update_at: Date;

    @HasMany(() => TourModel)
    declare tours: TourModel[];

    @BeforeCreate
    static async generateSlug(instance: TravelModel) {
        const count = await TravelModel.count({
            where: {
                name: instance.name
            }
        });
        let suffix = "";
        if (count > 0 ) {
            suffix = `-${count +1}`;
        }
        instance.slug = instance.name.toLowerCase().replace(" ", "-");
        suffix;
    }
}