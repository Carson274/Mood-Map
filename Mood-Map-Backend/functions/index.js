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

  // Get the mood rating from the request body
  const mood = req.body.mood;

  // Log the request and the mood
  logger.info("Request body", { structuredData: true });
  logger.info(req.body, { structuredData: true });

  // Log the mood rating
  logger.info("Mood rating", { structuredData: true });
  logger.info(mood, { structuredData: true });

  // Validate the mood rating - IMPORTANT
  if (typeof mood !== "number" || mood < 1 || mood > 10) {
    res.status(400).send({ error: 'Invalid mood rating' });
    return;
  }

  logger.info("Creating mood data", { structuredData: true });

  // Create the format for the mood data
  const moodData = {
    mood: mood,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };

  logger.info("Adding mood data to Firestore", { structuredData: true });

  // Add the mood data to the Firestore database
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