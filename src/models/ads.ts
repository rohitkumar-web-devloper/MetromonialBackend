import {Model, DataTypes, Sequelize, Optional} from 'sequelize';

// Define the attributes for the Ads model
export interface AdsAttributes {
    [x: string]: any;

    id: number;
    planId: number;
    planType: string;
    startTime: string;
    endTime: string;
    price: number;
    email: string;
    category: string;
    category_handler: string;
    categoryId: number;
    city: string;
    city_handler: string;
    state: string;
    address: string;
    zip: string;
    age: string;
    title: string;
    description: string;
    mobileNumber: string;
    whatsAppNumber: string;
    ethnicity: string;
    nationality: string;
    breast: string;
    hair: string;
    bodyType: string;
    pricePerHour: string;
    createdById: number
    createdByName: string
    profile: any[];
    paymentMethod: string[];

}

// Optional fields for model creation
type AdsCreationAttributes = Optional<AdsAttributes, 'id'>;

// Define the Ads model class
class Ads extends Model<AdsAttributes, AdsCreationAttributes> implements AdsAttributes {
    [x: string]: any;

    public id!: number;
    public planId!: number;
    public planType!: string;
    public startTime!: string;
    public endTime!: string;
    public price!: number;
    public email!: string;
    public category!: string;
    public category_handler!: string;
    public categoryId!: number;
    public city!: string;
    public city_handler!: string;
    public state!: string;
    public address!: string;
    public zip!: string;
    public age!: string;
    public title!: string;
    public description!: string;
    public mobileNumber!: string;
    public whatsAppNumber!: string;
    public ethnicity!: string;
    public nationality!: string;
    public breast!: string;
    public hair!: string;
    public bodyType!: string;
    public pricePerHour!: string;
    public createdById!: number
    public createdByName!: string
    public profile!: string[];
    public paymentMethod!: string[];

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        Ads.belongsTo(models.Categories, {foreignKey: 'categoryId', as: 'categoryAssociation'});
        Ads.hasMany(models.Service, {foreignKey: 'adId', as: 'services'});
        Ads.hasMany(models.AttentionTo, {foreignKey: 'adId', as: 'attentionTo'});
        Ads.hasMany(models.PlaceOfService, {foreignKey: 'adId', as: 'placeOfServices'});

    }

    static initModel(sequelize: Sequelize): typeof Ads {
        Ads.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                planId: {
                    type: DataTypes.INTEGER,
                },
                planType: {
                    type: DataTypes.STRING,
                },
                startTime: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                endTime: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                price: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        isEmail: true,
                    },
                },
                category: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                category_handler: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                categoryId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                city: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                city_handler: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                state: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                address: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                zip: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                age: {
                    type: DataTypes.STRING,
                },
                title: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                mobileNumber: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                whatsAppNumber: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                ethnicity: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                nationality: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                breast: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                hair: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                bodyType: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                pricePerHour: {
                    type: DataTypes.STRING,
                },
                createdById: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                createdByName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                profile: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },

                paymentMethod: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Ads',
                timestamps: true,
            }
        );
        return Ads;
    }
}

export default Ads;
