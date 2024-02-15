import mongoose,{ Schema, Document } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Define the schema
export interface IProperty extends Document {
    idProperty: {type : Number, required : true, unique : true};
    mailOwner: Schema.Types.ObjectId;
    city: string;
    street: string; // Nom de la rue
    zipCode: string;
    numSleeps: number; // Nombre de couchages
    numBedrooms: number; // Nombre de chambres
    distance: number;
    price: number;
}

const PropertySchema = new Schema({
    idProperty: { type: Number, required: true, unique: true },
    mailOwner:  { type: Schema.Types.ObjectId, ref: 'User' },
    city: { type: String, required: true },
    street: { type: String, required: true },
    zipCode: { type: String, required: true },
    numSleeps: { type: Number, required: true },
    numBedrooms: { type: Number, required: true },
    distance: { type: Number, required: true },
    price: { type: Number, required: true }
});

PropertySchema.plugin(AutoIncrement, {inc_field: 'idProperty'});

const Property = mongoose.model<IProperty>('Property', PropertySchema);
export default Property;


export const getProperties = async () => Property.find();
export const getPropertiyById = async (id : string) => Property.findById(id);
export const createProperty = async (property : IProperty) => Property.create(property).then((property) => property.save());
export const deletePropertyById = async (idProperty : number) => Property.findOneAndDelete({ idProperty });
export const updatePropertyById = async (idProperty : string, property : IProperty) => Property.findOneAndUpdate({idProperty}, property);

