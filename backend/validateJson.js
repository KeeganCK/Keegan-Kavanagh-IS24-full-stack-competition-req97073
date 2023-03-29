const { Draft07 } = require("json-schema-library");
const myJsonSchema = require("./Schema.json");
const myData = require("./projects.json");

const jsonSchema = new Draft07(myJsonSchema);
for(let i = 0; i < myData.projectsArray.length; i++) {
    const isValid = jsonSchema.isValid(myData.projectsArray[i]);
    console.log(isValid);
}
