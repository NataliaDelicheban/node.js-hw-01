const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


const listContacts = async () => {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
}

const getContactById = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id.toString());
    return result || null;
}

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();

    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };

    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

const updateContact = async (id, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id.toString());
    if (index === -1) {
        return null;
    }
    contacts[index] = { id, ...data };
    await updateContacts(contacts);
    return contacts[index];
}

const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id.toString());
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}
module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
}