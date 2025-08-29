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
    setUser({ name: "Deepak singh", email: "example123@example.com" });
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
    <div className="p-8 max-w-3xl mx-auto space-y-8">
  {/* Header */}
  <div className="flex justify-between items-center mb-6">
    <span className="text-xl font-bold">Logo</span>
    <h1 className="text-xl font-bold">Dashboard</h1>
    <button className="text-blue-600 font-semibold">Sign Out</button>
  </div>

  {/* User Card */}
  <div className="bg-white rounded-xl shadow p-6  mx-auto w-full lg:w-2/3">
    <p className="font-semibold text-xl mb-1">Welcome, {user.name}!</p>
    <p className="text-gray-600">Email: {user.email}</p>
  </div>

  {/* Create Note Button */}
  <div className="flex justify-center">
    <Button
      className="w-full lg:w-2/3 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-lg rounded-xl"
      onClick={() => setShowNoteInput(!showNoteInput)}
    >
      {showNoteInput ? "Close Note" : "Create Note"}
    </Button>
  </div>

  {/* Note Input (shown when Create Note is clicked) */}
  {showNoteInput && (
    <div className="flex justify-center mt-4">
      <div className="flex gap-4 w-full lg:w-2/3">
        <Input
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Add a note"
          className="flex-1 h-12 px-4 rounded-xl border border-gray-300"
        />
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700 h-12 flex-shrink-0 rounded-xl px-6"
          onClick={handleAddNote}
        >
          Add
        </Button>
      </div>
    </div>
  )}

  {/* Notes List */}
  {notes.length > 0 && <p className="font-semibold mt-4 mb-2 text-center">Notes</p>}
  <ul className="space-y-2 mx-auto w-full lg:w-2/3">
    {notes.map((note) => (
      <li
        key={note.id}
        className="flex justify-between items-center bg-gray-100 p-3 rounded-xl shadow"
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
