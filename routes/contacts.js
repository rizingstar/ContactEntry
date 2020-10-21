import express from "express";
var router = express.Router();

import contactService from "../services/contactService";

/* List all contacts */
router.get("/", async function (req, res, next) {
  try {
    const contacts = await contactService.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).send("An error occurred while getting contacts");
  }
});

/* Create a new contact */
router.post("/", async function (req, res, next) {
  try {
    await contactService.insertContact(req.body);
    res.status(200).json({ status: "Contact created successfully" });
  } catch (error) {
    res.status(500).send("An error occurred while inserting contacts");
  }
});

/* Get a call list */
router.get("/call-list", function (req, res, next) {
  try {
    contactService.getCallList(res);
  } catch (error) {
    res.status(500).send("An error occurred while getting contact call list");
  }
});

/* Update a contact */
router.put("/:id", async function (req, res, next) {
  try {
    var { id } = req.params;
    await contactService.updateContact(id, req.body);
    res.status(200).json({ status: "Contact updated successfully" });
  } catch (error) {
    res.status(500).send("An error occurred while updating contacts");
  }
});

/* Get a specific contact */
router.get("/:id", async function (req, res, next) {
  try {
    var { id } = req.params;
    const contactDetails = await contactService.getContactDetails(id);
    res.status(200).json(contactDetails);
  } catch (error) {
    res.status(500).send("An error occurred while getting contact details");
  }
});

/* Delete a contact */
router.delete("/:id", async function (req, res, next) {
  try {
    var { id } = req.params;
    await contactService.deleteContact(id);
    res.status(200).json({ status: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).send("An error occurred while deleting contacts");
  }
});



module.exports = router;
