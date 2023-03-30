const fs = require("fs");
const HttpError = require("./http-error");
const uuid = require("uuid");
const myJsonSchema = require("./Schema.json");
const { Draft07 } = require("json-schema-library");

const jsonSchema = new Draft07(myJsonSchema);

const getProjects = async (req, res, next) => {
  let data = [];
  try {
    const readData = await fs.readFileSync("./projects.json", "utf8");
    obj = JSON.parse(readData);
    data = obj.projectsArray;
  } catch (err) {
    const error = new HttpError("Can not get products, please try again", 500);
    return next(error);
  }

  res.status(200).json({
    data: data.reverse(),
  });
};

const getscrumMasterProjects = async (req, res, next) => {
  let name = req.params.name;
  console.log(name);
  if (!name) {
    const error = new HttpError("Need to enter a name", 500);
    return next(error);
  }
  let data = [];
  try {
    const readData = await fs.readFileSync("./projects.json", "utf8");
    obj = JSON.parse(readData);
    for (let i = 0; i < obj.projectsArray.length; i++) {
			name = name.toLowerCase()
			scrumMaster = obj.projectsArray[i].scrumMasterName.toLowerCase();
      if (name === scrumMaster) {
        data.push(obj.projectsArray[i]);
      }
    }
  } catch (err) {
    const error = new HttpError("Can not get products, please try again", 500);
    return next(error);
  }

  res.status(200).json({
    data: data.reverse(),
  });
};

const getdeveloperProjects = async (req, res, next) => {
  let name = req.params.name;
  if (!name) {
    const error = new HttpError("Need to enter a name", 500);
    return next(error);
  }

  let data = [];
  try {
    const readData = await fs.readFileSync("./projects.json", "utf8");
    obj = JSON.parse(readData);
    for (let i = 0; i < obj.projectsArray.length; i++) {
      let inDevArray = false;
      for (let j = 0; j < obj.projectsArray[i].Developers.length; j++) {
        if (
          name.toLowerCase() ===
          obj.projectsArray[i].Developers[j].toLowerCase()
        ) {
          inDevArray = true;
        }
      }
      if (inDevArray) {
        data.push(obj.projectsArray[i]);
      }
    }
  } catch (err) {
    const error = new HttpError("Can not get products, please try again", 500);
    return next(error);
  }

  res.status(200).json({
    data: data.reverse(),
  });
};

const addProject = async (req, res, next) => {
  if (!req.body) {
    const error = new HttpError("Request Body not found", 500);
    return next(error);
  }

  const {
    productName,
    productOwnerName,
    Developers,
    scrumMasterName,
    startDate,
    methodology,
  } = req.body;
  console.log(req.body);
  let newRecord;
  try {
    const readData = fs.readFileSync("./projects.json", "utf8");
    obj = JSON.parse(readData); //now it an object
    tempObject = {
      productId: uuid.v4(),
      productName,
      productOwnerName,
      Developers,
      scrumMasterName,
      startDate,
      methodology,
    };
    newRecord = tempObject;
    const isValid = jsonSchema.isValid(tempObject);
    if (!isValid) {
      const error = new HttpError(
        "Input did not meet Schema, please try again",
        400
      );
      return next(error);
    }
    obj.projectsArray.push(tempObject); //add some data
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFileSync("./projects.json", json, "utf8");
  } catch (err) {
    console.log("err: ", err);
    const error = new HttpError(
      "Could not create product, please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({
    message: "Product Succesfully Added",
    record: newRecord,
  });
};

// edit project
const editProject = async (req, res, next) => {
  if (!req.body) {
    const error = new HttpError("Request Body not found", 500);
    return next(error);
  }

  const {
    productId,
    productName,
    productOwnerName,
    Developers,
    scrumMasterName,
    methodology,
  } = req.body;
  console.log(req.body);
  try {
    let wantedProduct;
    const readData = fs.readFileSync("./projects.json", "utf8");
    obj = JSON.parse(readData); //now it an object

    let index = 0;
    for (let i = 0; i < obj.projectsArray.length; i++) {
      if (obj.projectsArray[i].productId === productId) {
        wantedProduct = obj.projectsArray[i];
        index = i;
      }
    }
    if (!wantedProduct) {
      const error = new HttpError(
        "Can not find product, please try again",
        500
      );
      return next(error);
    }

    tempObject = {
      productId: productId,
      productName: productName ? productName : wantedProduct.productName,
      productOwnerName: productOwnerName
        ? productOwnerName
        : wantedProduct.productOwnerName,
      Developers: Developers.length > 0 ? Developers : wantedProduct.Developers,
      scrumMasterName: scrumMasterName
        ? scrumMasterName
        : wantedProduct.scrumMasterName,
      startDate: wantedProduct.startDate,
      methodology: methodology ? methodology : wantedProduct.methodology,
    };
    const isValid = jsonSchema.isValid(tempObject);
    if (!isValid) {
      const error = new HttpError(
        "Input did not meet Schema, please try again",
        400
      );
      return next(error);
    }
    obj.projectsArray[index] = tempObject; // change data at location
    json = JSON.stringify(obj); //convert it back to json
    fs.writeFileSync("./projects.json", json, "utf8");
  } catch (err) {
    const error = new HttpError("Can not edit product, please try again", 500);
    return next(error);
  }

  res.status(200).json({
    message: "Product Succesfully Edited",
  });
};

exports.getProjects = getProjects;
exports.addProject = addProject;
exports.editProject = editProject;
exports.getscrumMasterProjects = getscrumMasterProjects;
exports.getdeveloperProjects = getdeveloperProjects;
