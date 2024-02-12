import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// URL de connexion à votre base de données MongoDB
const DB_URL : string = process.env.DB_URL || '';



// Fonction pour établir la connexion à la base de données
export async function connectToDatabase() {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connexion à la base de données MongoDB réussie');
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données MongoDB :', error);
    }
}

