import mongoose from 'mongoose';
import { getEnvVariable } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVariable('MONGODB_USER');
    const pwd = getEnvVariable('MONGODB_PASSWORD');
    const url = getEnvVariable('MONGODB_URL');
    const db = getEnvVariable('MONGODB_DB');
    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(error);
  }
};

// import mongoose from 'mongoose';
// import { getEnvVariable } from '../utils/env.js';

// export const initMongoConnection = async () => {
//   try {
//     const user = getEnvVariable('MONGODB_USER');
//     const pwd = getEnvVariable('MONGODB_PASSWORD');
//     const url = getEnvVariable('MONGODB_URL');
//     const db = getEnvVariable('MONGODB_DB');
//     const mongoURI = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;

//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 30000 // Optional: Increase timeout to 30 seconds
//     });

//     console.log('Mongo connection successfully established!');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// };
