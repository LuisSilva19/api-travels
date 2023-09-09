import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey
} from "sequelize-typescript";
import TravelModel from "./TravelsModel";
@Table({
    timestamps: true,
    tableName: "tours",
    modelName: "TourModel"
})
export class TourModel extends Model {
    @Column({
        primaryKey: true,
        type: DataType.BIGINT,
        autoIncrement: true,
    })
    declare id: BigInt;

    @ForeignKey(() => TravelModel)
    @Column({type: DataType.BIGINT})
    declare travel_id: BigInt;

    @Column({ type: DataType.STRING })
    declare name: string;

    @Column({ type: DataType.DATEONLY })
    declare starting_date: Date;

    @Column({ type: DataType.DATEONLY })
    declare ending_date: Date;

    @Column({ type: DataType.DECIMAL(10,4) })
    declare price: number;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare update_at: Date;
}
