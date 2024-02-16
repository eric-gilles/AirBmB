
import mongoose, { Schema, Document } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);
export interface IBooking extends Document {
    _id : Number;
    idBooking: string;
    property: Number;
    renterEmail: string;
    startDate: Date;
    endDate: Date;
    review?: string;
}


const BookingSchema: Schema = new Schema({
    idBooking: { type: Number, required: true },
    property: { type: Number, ref: 'Property.idProperty' },
    renterEmail: { type: String, ref: 'User.email', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    review: { type: String },
});

BookingSchema.plugin(AutoIncrement, { inc_field: 'idBooking' });

const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
export default Booking;

export const getBookings = async () => Booking.find();
export const getBookingById = async (id : string) => Booking.findById(id);
export const createBooking = async (booking : IBooking) => Booking.create(booking).then((booking) => booking.save());
export const deleteBookingById = async (id : string) => Booking.findByIdAndDelete(id);
export const updateBookingById = async (id : string, booking : IBooking) => Booking.findOneAndUpdate({idBooking:id}, booking);

