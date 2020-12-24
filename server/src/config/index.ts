
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || "8080";
process.env.API_VERSION = process.env.API_VERSION || "v1";

export default {
  port: parseInt(process.env.PORT, 10),
  apiVersion: `${process.env.API_VERSION}` || 'v1',
};
