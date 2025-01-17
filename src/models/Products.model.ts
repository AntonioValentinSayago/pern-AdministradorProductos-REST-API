import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
    tableName: 'products'
})

class Products extends Model {
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare name: string;

    @Column({
        type: DataType.FLOAT(10, 2),
        allowNull: false
    })
    declare price: number;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    declare availability: boolean;
}

export default Products;