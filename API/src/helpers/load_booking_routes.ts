import { Express } from 'express';
import createBooking from '../routes/booking/createBooking';
import getBookings from '../routes/booking/getBookings';
import getBookingById from '../routes/booking/getBookingById';
import updateBooking from '../routes/booking/updateBooking';
import deleteAllBooking from '../routes/booking/deleteAllBooking';

export default (app: Express) => {
    createBooking(app);
    getBookings(app);
    getBookingById(app);
    updateBooking(app);
    deleteAllBooking(app);
}
