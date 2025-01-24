const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { FieldValue, getFirestore, collection, addDoc } = require("firebase-admin/firestore");

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert('./secrets/key.json'),
  databaseURL: 'https://mood-map-ef59b.firebaseio.com' 
});

const db = getFirestore("mood-map");

// npm --prefix ./functions run lint -- --fix
// firebase deploy --only functions functions:addMessage,functions:makeUppercase

// Add mood function using onRequest
exports.addMood = onRequest(async (req, res) => {
  // Log the start of the function
  logger.info("addMood function triggered", { structuredData: true });

  // Get the mood data from the request body
  const mood = req.body.mood;
  const description = req.body.description;
  const userID = req.body.userID;

  // Log the request and the mood
  logger.info("Request body", { structuredData: true });
  logger.info(req.body, { structuredData: true });

  // Log the mood rating
  logger.info("Mood rating", { structuredData: true });
  logger.info(mood, { structuredData: true });

  // - Validate the data before formatting -
  logger.info("Validating mood data", { structuredData: true });

  // #1 - mood: number
  if (typeof mood !== "number" || mood < 1 || mood > 10) {
    res.status(400).send({ error: 'Invalid mood rating' });
    return;
  }

  //  #2 - description: string
  if (typeof description !== "string") {
    res.status(400).send({ error: 'Invalid description' });
    return;
  }

  // Create the format for the mood data
  logger.info("Creating mood data", { structuredData: true });
  const moodData = {
    mood: mood,
    description: description,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    userID: userID,
  };

  // Add the mood data to the Firestore database
  logger.info("Adding mood data to Firestore", { structuredData: true });
  try {
    const docRef = db.collection("moods").doc();
    await docRef.set(moodData);
    logger.info("Document written with ID:", { id: docRef.id });
    res.status(200).send({ message: "Mood added successfully" });
  } catch (e) {
    logger.error("Error adding mood", e);
    res.status(500).send({ error: "Error adding mood" });
  }
});

