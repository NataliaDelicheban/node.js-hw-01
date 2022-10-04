const argv = require("yargs").argv;

const contacts = require("./db/contacts");

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
          const contactsList = await contacts.listContacts();
          console.log(contactsList);
          break;
    case "get":
          const oneContact = await contacts.getContactById(id);
          console.log(oneContact);
          break;
      case "add":
          const newContact = await contacts.addContact({ name, email, phone });
          console.log(newContact);
          break;
      case "update":
          const updateContact = await contacts.updateContact(id, { name, email, phone });
          console.log(updateContact);
          break;
      case "remove":
          const removeContact = await contacts.removeContact(id);
          console.log(removeContact);
          break;
    default:
        console.warn("\x1B[31m Unknown action type!");
}
}


invokeAction(argv);