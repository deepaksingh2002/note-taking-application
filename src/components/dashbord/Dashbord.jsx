import { useState, useEffect } from "react";
import Input from "../Input";
import Button from "../Button";
import { Trash } from "lucide-react";
//import Logo from "../assets/logo.png"; // Import your logo image

function Dashboard() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [notes, setNotes] = useState([]);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState("");

  // Initialize user and notes
  useEffect(() => {
    setUser({ name: "Jonas Kahnwald", email: "jonas@example.com" });
    setNotes([]);
  }, []);

  // Add note handler
  const handleAddNote = () => {
    if (!noteText.trim()) return;
    const noteToAdd = { id: Date.now(), text: noteText };
    setNotes([...notes, noteToAdd]);
    setNoteText("");
  };

  // Remove note handler
  const removeNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
  {/* Header */}
  <div className="flex justify-between items-center">
    <span className="text-xl font-bold">Logo</span>
    <h1 className="text-xl font-bold">Dashboard</h1>
    <button className="text-blue-600 font-semibold">Sign Out</button>
  </div>

  {/* User Card */}
  <div className="bg-white rounded-lg shadow p-4 text-center mx-auto w-full lg:w-2/3">
    <p className="font-semibold text-lg">Welcome, {user.name}!</p>
    <p className="text-gray-600">Email: {user.email}</p>
  </div>

  {/* Create Note Button */}
  <div className="flex justify-center">
    <Button
      className="w-full lg:w-2/3 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-lg rounded-md"
      onClick={() => setShowNoteInput(!showNoteInput)}
    >
      {showNoteInput ? "Close Note" : "Create Note"}
    </Button>
  </div>

  {/* Note Input (shown when Create Note is clicked) */}
  {showNoteInput && (
    <div className="flex justify-center mt-2">
      <div className="flex gap-2 w-full lg:w-2/3">
        <Input
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Add a note"
          className="flex-1 h-10 px-3 rounded-md border border-gray-300"
        />
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 h-10 flex-shrink-0 rounded-md px-4"
          onClick={handleAddNote}
        >
          Add
        </Button>
      </div>
    </div>
  )}

  {/* Notes List */}
  {notes.length > 0 && <p className="font-semibold mt-2 mb-1 text-center">Notes</p>}
  <ul className="space-y-1 mx-auto w-full lg:w-2/3">
    {notes.map((note) => (
      <li
        key={note.id}
        className="flex justify-between items-center bg-gray-100 p-2 rounded shadow"
      >
        <span>{note.text}</span>
        <button onClick={() => removeNote(note.id)}>
          <Trash size={16} />
        </button>
      </li>
    ))}
  </ul>
</div>


  );
}

export default Dashboard;
