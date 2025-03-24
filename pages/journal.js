import JournalEditor from "../components/JournalEditor";

export default function JournalPage() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📔 Daily Journal</h1>
      <JournalEditor selectedDate={today} />
    </div>
  );
}
