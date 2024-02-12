import mongoose,{ Schema, Document } from 'mongoose';

// Define the schema
export interface IProperty extends Document {
    idProperty: string;
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
    idProperty: { type: String, required: true, unique: true },
    mailOwner:  { type: Schema.Types.ObjectId, ref: 'User' },
    city: { type: String, required: true },
    street: { type: String, required: true },
    zipCode: { type: String, required: true },
    numSleeps: { type: Number, required: true },
    numBedrooms: { type: Number, required: true },
    distance: { type: Number, required: true },
    price: { type: Number, required: true }
});


const Property = mongoose.model<IProperty>('Property', PropertySchema);
export default Property;


export const getProperties = async () => Property.find();
export const getPropertiyById = async (id : string) => Property.findById(id);
export const createUser = async (property : IProperty) => Property.create(property).then((property) => property.save());
export const deletePropertyById = async (id : string) => Property.findByIdAndDelete(id);
export const updatePropertyById = async (id : string, property : IProperty) => Property.findOneAndUpdate({idProperty:id}, property);

