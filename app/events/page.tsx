// page.tsx
import { Suspense } from "react";
import EventList from "@/Component/EventList";

const EventPage = () => {
  return (
    <div className="m-20 space-y-7">
      <h1>Events</h1>

      <Suspense fallback={<p>Loading events...</p>}>
        <EventList />
      </Suspense>
    </div>
  );
};

export default EventPage;