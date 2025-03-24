import { db } from './firebase';
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc
} from 'firebase/firestore';

// Utility to get the Firestore document reference
const getEntryDocRef = (userId, date, type, customLabel = "") => {
  const id =
    type === "custom" && customLabel
      ? `${date}-custom-${customLabel}`
      : `${date}-${type}`;
  return doc(db, "journals", userId, "entries", id);
};

// Save a journal entry
export async function saveJournalEntry(userId, date, type, content, customLabel = "") {
  const ref = getEntryDocRef(userId, date, type, customLabel);

  const data = {
    content,
    type,
    timestamp: new Date().toISOString(),
  };

  // Only include customLabel if type is custom
  if (type === "custom" && customLabel) {
    data.customLabel = customLabel;
  }

  await setDoc(ref, data);
}

// Get a journal entry
export async function getJournalEntry(userId, date, type, customLabel = "") {
  const ref = getEntryDocRef(userId, date, type, customLabel);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

// Delete a journal entry
export async function deleteJournalEntry(userId, date, type, customLabel = "") {
  const ref = getEntryDocRef(userId, date, type, customLabel);
  await deleteDoc(ref);
}