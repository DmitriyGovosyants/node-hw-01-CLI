const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve("./db/contacts.json");

const getListContacts = async () => {
  const contactList = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contactList);
}

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parseData = JSON.parse(data);
  const currentId = parseData.find(({ id }) => id === contactId);
  return currentId || null;
}

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parseData = JSON.parse(data)
  const filteredData = parseData.filter(({ id }) => id !== contactId);
  const stringifyData = JSON.stringify(filteredData);

  await fs.writeFile(contactsPath, stringifyData, "utf8");
  return filteredData;
}

const addContact = async (name, email, phone) => {
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
  return updatedContacts;
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
}