const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parseData = JSON.parse(data);
    const currentId = parseData.find(({ id }) => id === contactId);
    console.table(currentId);
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parseData = JSON.parse(data)
    const filteredData = parseData.filter(({ id }) => id !== contactId);
    const stringifyData = JSON.stringify(filteredData);

    await fs.writeFile(contactsPath, stringifyData, "utf8");
    console.table(stringifyData);
  } catch (error) {
    console.log(error);
  }
}

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parseData = JSON.parse(data);
    const nextId = String(parseData.length + 1);
    
    const newContact = {
      id: nextId,
      name,
      email,
      phone,
    }
    const updatedContacts = [...parseData, newContact];
    const stringifyData = JSON.stringify(updatedContacts);
    await fs.writeFile(contactsPath, stringifyData, "utf8");
    console.table(updatedContacts);
  } catch (error) {
    console.log(error);
  }
  // try {
  //   const contacts = await promises.readFile(contactsPath, "utf-8");
  //   const parsedContacts = JSON.parse(contacts);
  //   const newContact = {
  //     id: String(parsedContacts.length + 2),
  //     name,
  //     email,
  //     phone,
  //   };
  //   const updatedContacts = [...parsedContacts, newContact];
  //   await promises.writeFile(
  //     contactsPath,
  //     JSON.stringify(updatedContacts),
  //     "utf-8"
  //   );
  //   console.table(updatedContacts);
  // } catch (error) {
  //   console.log(error);
  // }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}