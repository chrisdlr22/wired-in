import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // Enables user interaction

export default function Calendar() {
  const [events, setEvents] = useState([]);

  // Function to handle adding a new event/task
  const handleDateClick = (info) => {
    const taskTitle = prompt("Enter task name:");
    if (taskTitle) {
      setEvents([
        ...events,
        {
          id: String(events.length + 1), // Unique ID for removal
          title: taskTitle,
          start: info.dateStr,
          allDay: true,
        },
      ]);
    }
  };

  // Function to remove a task when clicked
  const handleEventClick = (info) => {
    if (window.confirm(`Remove task: "${info.event.title}"?`)) {
      setEvents(events.filter((event) => event.id !== info.event.id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Task Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        events={events}
        dateClick={handleDateClick} // Allows adding tasks
        eventClick={handleEventClick} // Enables task removal
      />
    </div>
  );
}