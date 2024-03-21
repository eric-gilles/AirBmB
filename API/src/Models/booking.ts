import mongoose, { Schema, Document } from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);
export interface IBooking extends Document {
  _id: Number;
  idBooking: string;
  property: Number;
  renterEmail: string;
  startDate: Date;
  endDate: Date;
  review?: string;
}

const BookingSchema: Schema = new Schema({
  idBooking: { type: Number, required: true },
  idProperty: { type: Number, ref: "Property.idProperty" },
  renterEmail: { type: String, ref: "User.email", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  review: { type: String },
  nbGuests: { type: Number, required: true },
});

BookingSchema.plugin(AutoIncrement, { inc_field: "idBooking" });

const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;

export const getBookings = async () => Booking.find();
export const getBookingById = async (idBooking: number) =>
  Booking.findOne({ idBooking });
export const getBookingByPropertyId = async (idProperty: number) => {
  console.log(idProperty);
  const booking = await Booking.find({ idProperty });
  console.log(booking);
  return booking;
};
export const createBooking = async (booking: IBooking) =>
  Booking.create(booking).then((booking) => booking.save());
export const deleteBookingById = async (idBooking: number) =>
  Booking.findByIdAndDelete({ idBooking });
export const updateBookingById = async (idBooking: number, booking: IBooking) =>
  Booking.findOneAndUpdate({ idBooking }, booking);
