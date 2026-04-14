// EventList.tsx
import Eventcard from "@/Component/Eventcard";

const EventList = async () => {
  const response = await fetch(`http://localhost:3000/api/events`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const { events } = await response.json();

  return (
    <div className="events ">
      {events.map((event: any) => (
        <Eventcard key={event._id} {...event} />
      ))}
    </div>
  );
};

export default EventList;