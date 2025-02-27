import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { PORT , HOST} from './constants/Variables';
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphQlServer from './Graphql';
import authMiddleware from './Middleware/atuh';
import cors from 'cors'
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import db from './models';
app.use(cors({
  origin: ['https://lustloungh.com' , 'https://react.lustloungh.com' ,'https://test-next.lustloungh.com','http://localhost:5173','http://localhost:3001'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(graphqlUploadExpress());
const startServer = async () => {
  app.use(
    '/graphql',
    expressMiddleware(await createApolloGraphQlServer(), {
      context: async ({ req }) => {
        const user = await authMiddleware(req);
        return { user };
      },
    }),
  );

  app.listen(PORT, () => {
    console.log(`Server is running process on Port : ${HOST}/graphql`);
  });
};

startServer();

