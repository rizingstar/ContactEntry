import db from "../database/db";

const insertContact = async (contactData) => {
  await db.asyncInsert(contactData);
};

const updateContact = async (id, contactData) => {
  await db.asyncUpdate({ _id: id }, contactData);
};

const getAllContacts = async () => {
  return await db.asyncFind({});
};

const getContactDetails = async (id) => {
  return await db.asyncFindOne({ _id: id });
};

const deleteContact = async (id) => {
  return await db.asyncRemove({ _id: id });
};

const getCallList = async (res) => {
  return db
    .find({})
    .sort({ "name.last": 1, "name.first": 1 })
    .exec(function (err, contacts) {
      const callsList = contacts.map((contact) => {
        const homeContact =
          contact.phone && contact.phone.length
            ? contact.phone.find((x) => x.type == "home")
            : null;

        return {
          name: contact.name,
          phone: homeContact ? homeContact.number : "",
        };
      });

      res.status(200).json(callsList);
    });
};

export default {
  insertContact,
  getAllContacts,
  getContactDetails,
  deleteContact,
  updateContact,
  getCallList,
};
