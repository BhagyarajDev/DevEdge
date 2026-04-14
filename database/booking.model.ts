import mongoose, { Schema, model, models, Document, Types } from "mongoose";
import Event from "./event.model";

// --------------------
// Interface
// --------------------
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// --------------------
// Schema
// --------------------
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          return emailRegex.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true,
  }
);

// --------------------
// Pre-save Hook (Modern)
// --------------------
BookingSchema.pre("save", async function () {
  const booking = this as IBooking;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(booking.eventId)) {
    throw new Error("Invalid Event ID");
  }

  // Check if event exists
  const eventExists = await Event.findById(booking.eventId).select("_id");

  if (!eventExists) {
    throw new Error(`Event with ID ${booking.eventId} does not exist`);
  }
});

// --------------------
// Indexes
// --------------------

// Fast lookup by event
BookingSchema.index({ eventId: 1 });

// Event bookings sorted by date
BookingSchema.index({ eventId: 1, createdAt: -1 });

// Lookup bookings by email
BookingSchema.index({ email: 1 });

// Prevent duplicate booking per event per email
BookingSchema.index(
  { eventId: 1, email: 1 },
  { unique: true, name: "uniq_event_email" }
);

// --------------------
// Model Export (Next.js safe)
// --------------------
const Booking =
  models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;