import expressLoader from './express';
import startServer from './server';

export default async ({ expressApp }) => {

  await expressLoader({ app: expressApp });
  console.info(`✌️ Express loaded `);

  startServer({ app: expressApp });
  console.info(`✌️ Server loaded `);

  console.info('✌️ Loaders completed');
};
