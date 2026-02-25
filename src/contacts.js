import fs from "node:fs/promises";
import { resolve } from "node:path";
import { nanoid } from "nanoid";

const contactsPath = resolve("src", "db", "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const Contacts = await listContacts();
  const result = Contacts.find((contact) => contact.id === contactId);
  return result || null;
};
export const addContact = async (data) => {
  const Contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };

  Contacts.push(newContact);
  await updateContacts(Contacts);
  return newContact;
};

export const removeContact = async (contactId) => {
  const Contacts = await listContacts();
  const index = Contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = Contacts.splice(index, 1);
  await updateContacts(Contacts);
  return removedContact;
};
