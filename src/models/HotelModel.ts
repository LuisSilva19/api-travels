import { AutoIncrement,
    Column, 
    CreatedAt, 
    DataType, 
    DefaultScope, 
    DeletedAt, 
    IsEmail, 
    Model, 
    PrimaryKey, 
    Scopes, 
    Table, 
    Unique, 
    UpdatedAt } 
from "sequelize-typescript";

@DefaultScope(() => ({
    where: {
      isValid: true
    }
}))
@Scopes(() => ({
    todos: {
        where: {}
    }
}))
@Table({
    timestamps: true,
    tableName: "hotels",
    modelName: "HotelModel",
    paranoid: true
})
export class HotelModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT
    })
    declare id: string;
    
    @Column({type: DataType.STRING})
    declare name: string;

    @Unique
    @IsEmail
    @Column({type: DataType.STRING})
    declare email: string;

    @Column({ field: 'deleted_at',type: DataType.DATE})
    @DeletedAt
    declare deletedAt: Date; 

    @Column({ field: 'updated_at',type: DataType.DATE})
    @UpdatedAt
    declare updatedAt: Date;

    @Column({ field: 'created_at',type: DataType.DATE})
    @CreatedAt
    declare createdAt: Date;

    @Column({field: 'is_valid',type: DataType.BOOLEAN}) 
    declare isValid: Boolean;

}