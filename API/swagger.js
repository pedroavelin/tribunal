// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '15ª SECÇÃO DA SALA CRIMINAL',
            version: '1.0.0',
            description: 'AUTOR: PEDRO AVELINO EPALANGA - 2025',
        },
        servers: [{
            url: 'http://localhost:3000',
            description: 'Servidor de desenvolvimento',
        }, ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: [],
        }, ],

    },
    apis: ['./routes/*.js'], // Caminho dos arquivos de rota com comentários Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;