import swaggerJSDoc from "swagger-jsdoc";

/**
 * API Docs for Products
 * 
 * @type {swaggerJSDoc.Options}
 * @property {object} swaggerDefinition - The definition of the Swagger API.
 * @property {string} swaggerDefinition.openapi - The version of the OpenAPI specification.
 * @property {Array<object>} swaggerDefinition.tags - The tags for the API.
 * @property {string} swaggerDefinition.tags[].name - The name of the tag.
 * @property {string} swaggerDefinition.tags[].description - The description of the tag.
 * @property {object} swaggerDefinition.info - The information about the API.
 * @property {string} swaggerDefinition.info.title - The title of the API.
 * @property {string} swaggerDefinition.info.version - The version of the API.
 */
const options : swaggerJSDoc.Options = {
    swaggerDefinition:{
        openapi: '3.0.2',
        tags:[{
            name: 'Products',
            description: 'API operations related to products',

        }],
        info:{
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0",
            
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec