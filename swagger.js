const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Pizza Api',
        decription: 'Project 2 of CSE341, my project of choice was to make a basic pizza shop api.'
    },
    host: 'localhost:3030',
    schemes: ['http', 'https']
};

const outputfile = "./swagger.json";
const endpointfile = ['./routes/indexRoute.js'];

swaggerAutogen(outputfile, endpointfile, doc);