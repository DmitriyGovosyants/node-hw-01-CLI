const { Command } = require("commander");
const program = new Command();
const contacts = require('./contacts');

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      return await contacts.getListContacts();

    case "get":
      return await contacts.getContactById(id);

    case "add":
      return await contacts.addContact(name, email, phone);

    case "remove":
      return await contacts.removeContact(id);

    default:
      return "\x1B[31m Unknown action type!";
  }
}

invokeAction(argv)
  .then(res => console.table(res))
  .catch(err => console.log(err))