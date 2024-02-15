import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User, {createUser} from '../Models/user';
import Property from '../Models/property';
import Booking from '../Models/booking';


dotenv.config();
// URL de connexion à votre base de données MongoDB
const DB_URL : string = process.env.DB_URL || '';

// Fonction pour établir la connexion à la base de données
export async function connectToDatabase() {
    try {
        await mongoose.connect(DB_URL);
        // await Booking.deleteMany({});
        // await Property.deleteMany({});
        // await User.deleteMany({});
        // User.create({idUser:1, email:'admin@admin', firstName:'admin', lastName:'admin', password:'admin'});

        console.log('Connexion à la base de données MongoDB réussie');
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données MongoDB :', error);
    }
}

