
import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    idBooking: string;
    property: Schema.Types.ObjectId;
    renterEmail: Schema.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    review?: string;
}


const bookingSchema: Schema = new Schema({
    idLocation: { type: String, required: true },
    property: { type: Schema.Types.ObjectId, ref: 'Property' },
    renterEmail: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    review: { type: String },
});

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;

export const getBookings = async () => Booking.find();
export const getBookingById = async (id : string) => Booking.findById(id);
export const createBooking = async (booking : IBooking) => Booking.create(booking).then((booking) => booking.save());
export const deleteBookingById = async (id : string) => Booking.findByIdAndDelete(id);
export const updateBookingById = async (id : string, booking : IBooking) => Booking.findOneAndUpdate({idBooking:id}, booking);

