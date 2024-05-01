import { createProperty, updatePropertyById } from "../Models/property";
import { createUser } from "../Models/user";

// Fonction pour créer des utilisateurs et des biens associés
const adresses = [
  {
    city: "Chartres",
    street: "6 place Maurice-Charretier",
    zipCode: "28000",
    latitude: 48.4439,
    longitude: 1.4895,
    review: "4.5",
  },
  {
    city: "Bordeaux",
    street: "24 avenue de l'Amandier",
    zipCode: "33000",
    latitude: 44.8378,
    longitude: -0.5795,
    review: "4.6",
  },
  {
    street: "92 rue Gouin de Beauchesne",
    city: "Saint-michel-sur-orge",
    zipCode: "91240",
    latitude: 48.6351,
    longitude: 2.3062,
    review: "4.7",
  },
  {
    street: "85 rue Sébastopol",
    city: "Sant-Etienne",
    zipCode: "42000",
    latitude: 45.4397,
    longitude: 4.3872,
    review: "4",
  },
  {
    street: "96 Square de la Couronne",
    city: "Ozoir-la-Ferrière",
    zipCode: "77330",
    latitude: 48.7734,
    longitude: 2.6608,
    review: "4.2",
  },
  {
    street: "52 rue de la Hulotais",
    city: "Saint-quentin",
    zipCode: "02100",
    latitude: 49.8486,
    longitude: 3.2875,
    review: "4.3",
  },
  {
    street: "58 Place de la Gare",
    city: "Combs-la-Ville",
    zipCode: "77380",
    latitude: 48.6597,
    longitude: 2.5632,
    review: "3.5",
  },
  {
    street: "50 rue Saint Germain",
    city: "Gap",
    zipCode: "05000",
    latitude: 44.5613,
    longitude: 6.0826,
    review: "4.8",
  },
];
const createUsersAndProperties = async () => {
  try {
    const users: any[] = [];
    const properties: any[] = [];

    // Générer des données pour les utilisateurs et créer les utilisateurs avec leurs biens associés
    for (let i = 0; i < 5; i++) {
      // Générer un email et un mot de passe
      const email = `user${i}@example.com`;
      const password = "test";
      const userData: any = {
        idUser: 1,
        firstname: `First`,
        lastname: `Last`,
        email,
        phone: `+1234567890`,
        password,
        isAdmin: i % 2 === 0, // Alterner entre true et false pour l'isAdmin
      };
      // Créer l'utilisateur avec les données générées
      const user = await createUser(userData);

      users.push(user);
    }
    for (let i = 0; i < 8; i++) {
      // Générer des données pour le bien immobilier associé à cet utilisateur
      const user = users[Math.floor(Math.random() * users.length)];
      const propertyData: any = {
        idProperty: i + 1,
        mailOwner: user.email,
        city: adresses[i].city,
        street: adresses[i].street,
        zipCode: adresses[i].zipCode,
        numSleeps: Math.floor(Math.random() * 10) + 1,
        numBedrooms: Math.floor(Math.random() * 5) + 1,
        distance: Math.floor(Math.random() * 50) + 1,
        price: Math.floor(Math.random() * 990000) + 10000, // Prix entre 10000 et 1000000
        latitude: adresses[i].latitude,
        longitude: adresses[i].longitude,
        review: adresses[i].review, // Ajouter d'autres champs de bien aléatoires si nécessaire
        img: "", // Ajouter d'autres champs de bien aléatoires si nécessaire
      };

      // Créer le bien immobilier avec les données générées
      const property: any = await createProperty(propertyData);
      property.img = `http://localhost:${process.env.API_PORT}/img/${property.idProperty}`;
      const property_modified = await updatePropertyById(property.idProperty, {
        img: property.img,
      });
      properties.push(property_modified);
    }

    return { users, properties };
  } catch (error) {
    console.error(
      "Erreur lors de la création des utilisateurs et des biens :",
      error
    );
    throw error;
  }
};

export { createUsersAndProperties };
