import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import dynamic from "next/dynamic";
import { auth } from "../lib/firebase";
import {
  saveJournalEntry,
  getJournalEntry,
  deleteJournalEntry,
} from "../lib/journalService";

import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function JournalEditor({ selectedDate: initialDate }) {
  const [user] = useAuthState(auth);

  // Allow date editing directly
  const [selectedDate, setSelectedDate] = useState(
    initialDate || new Date().toISOString().split("T")[0]
  );

  const [entryType, setEntryType] = useState("day"); // day | night | custom
  const [customLabel, setCustomLabel] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("idle");

  // Load journal content when date/type/label changes
  useEffect(() => {
    const loadEntry = async () => {
      if (!user || !selectedDate) return;
      const data = await getJournalEntry(user.uid, selectedDate, entryType, customLabel);
      setContent(data?.content || "");
    };
    loadEntry();
  }, [user, selectedDate, entryType, customLabel]);

  const handleSave = async () => {
    if (!user) return alert("Please log in.");
    if (!selectedDate) return alert("Please select a date.");
    setStatus("saving");
    await saveJournalEntry(user.uid, selectedDate, entryType, content, customLabel);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 1500);
  };

  const handleDelete = async () => {
    if (!user) return;
    const confirm = window.confirm("Delete this journal entry?");
    if (confirm) {
      await deleteJournalEntry(user.uid, selectedDate, entryType, customLabel);
      setContent("");
    }
  };

  return (
    <div className="bg-white p-6 mt-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">📝 Journal Entry</h2>

      {/* Date & Type Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div>
          <label className="mr-2 font-medium">Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded p-2"
          />
        </div>

        <div>
          <label className="mr-2 font-medium">Type:</label>
          <select
            value={entryType}
            onChange={(e) => setEntryType(e.target.value)}
            className="border rounded p-2"
          >
            <option value="day">🌞 Day</option>
            <option value="night">🌙 Night</option>
            <option value="custom">✍️ Custom</option>
          </select>
        </div>

        {entryType === "custom" && (
          <input
            type="text"
            placeholder="Custom label (e.g. Gratitude)"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            className="border rounded p-2 w-full md:w-64"
          />
        )}
      </div>

      {/* Editor */}
      <ReactQuill
        value={content}
        onChange={setContent}
        className="mb-4"
        placeholder="Start writing your thoughts..."
      />

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Entry
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Entry
        </button>
        {status === "saved" && <p className="text-green-600 ml-2">✅ Saved!</p>}
      </div>
    </div>
  );
}