import Event from "../Models/Event.js";

export const newevent = async (req, res) => {

        const { name, date, time, place } = req.body;
console.log(req.body);

  try {
//     const { name, date, time, place } = req.body;

//     // Validate required fields
    if (!name || !date || !time || !place) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, date, time, place) are required.",
      });
    }

//     //  Check if event already exists (optional)
    const existingEvent = await Event.findOne({ name, date, time, place });
    if (existingEvent) {
      return res.status(400).json({
        success: false,
        message: "Event already exists for the given details.",
      });
    }

//     //  Create new event
    const newEvent = new Event({
      name,
      date,
      time,
      place,
    });

//     //  Save to DB
    await newEvent.save();

//     //  Success Response
    return res.status(201).json({
      success: true,
      message: "Event added successfully!",
      event: newEvent,
    });
}catch (error) {
    console.error("Error adding event:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding event.",
      error: error.message,
    });
  }
};


export const fetchallevents = async (req, res) => {
  try {
    //  Fetch all events (newest first)
    const events = await Event.find().sort({ createdAt: -1 });

    //  If no events found
    if (!events || events.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No events found.",
      });
    }

    //  Success Response
    return res.status(200).json({
      success: true,
      message: "Events fetched successfully.",
      total: events.length,
      events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching events.",
      error: error.message,
    });
  }
};


export const editevent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, time, place } = req.body;

    //  Basic validation
    if (!id || !name || !date || !time || !place) {
      return res.status(400).json({
        success: false,
        message: "All fields (id, name, date, time, place) are required.",
      });
    }

    //  Find and update event
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, date, time, place },
      { new: true, runValidators: true }
    );

    // Check if event exists
    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    //  Success response
    return res.status(200).json({
      success: true,
      message: "Event updated successfully!",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating event.",
      error: error.message,
    });
  }
};



export const deleteevent = async (req, res) => {
  try {
    const { id } = req.params;

    //  Validate
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required.",
      });
    }

    //  Attempt to delete
    const deletedEvent = await Event.findByIdAndDelete(id);

    //  If not found
    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    //  Success response
    return res.status(200).json({
      success: true,
      message: "Event deleted successfully!",
      deletedEvent,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting event.",
      error: error.message,
    });
  }
};

// export const fetchdetails=async (req,res)=>{
//         const{id}=req.params
//         console.log(id);
//         try{
//                 const details=await Event.findById(id)
//                  return res.status(200).json({
//       success: true,
//       message: "Event fetched successfully!",
//       details,
//     });
//         }
//         catch(error){
//                 return res.status(500).json({
//       success: false,
//       message: "Server error while deleting event.",
//       error: error.message,
//     });
//         }
        
// }

export const fetchdetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ID format
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }

    const details = await Event.findById(id);

    // If event doesn't exist
    if (!details) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Event fetched successfully",
      details,
    });

  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching event",
      error: error.message,
    });
  }
};


import fs from "fs";
import path from "path";

// ✅ Add photos to an event
export const addEventPhotos = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No photos uploaded" });
    }

    const newPhotos = req.files.map((file) => ({
      filename: file.filename,
      url: `/uploads/events/${file.filename}`,
    }));

    event.photos.push(...newPhotos);
    await event.save();

    return res.status(201).json({
      success: true,
      message: "Photos added successfully",
      photos: event.photos,
    });
  } catch (error) {
    console.error("Error adding event photos:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding photos",
    });
  }
};

// ✅ Get photos for an event
export const getEventPhotos = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId).select("photos name");
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    return res.json({
      success: true,
      eventName: event.name,
      photos: event.photos,
    });
  } catch (error) {
    console.error("Error fetching event photos:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching photos",
    });
  }
};

// // ✅ Delete a specific event photo
// export const deleteEventPhoto = async (req, res) => {
//   try {
//     const { eventId, photoId } = req.params;

//     const event = await EVENT.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ success: false, message: "Event not found" });
//     }

//     const photo = event.photos.id(photoId);
//     if (!photo) {
//       return res.status(404).json({ success: false, message: "Photo not found" });
//     }

//     const filePath = path.join("uploads", "event", photo.filename);
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }

//     photo.remove();
//     await event.save();

//     return res.json({
//       success: true,
//       message: "Photo deleted successfully",
//       photos: event.photos,
//     });
//   } catch (error) {
//     console.error("Error deleting event photo:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while deleting photo",
//     });
//   }
// };

export const deleteEventPhoto = async (req, res) => {
  try {
    const { eventId, photoId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Find photo
    const photo = event.photos.find((p) => p._id.toString() === photoId);
    if (!photo) {
      return res.status(404).json({ success: false, message: "Photo not found" });
    }

    // Delete file from disk
    const filePath = path.join("uploads", "events", photo.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove photo from array (IMPORTANT FIX)
    event.photos = event.photos.filter((p) => p._id.toString() !== photoId);

    // Save updated event
    await event.save();

    return res.json({
      success: true,
      message: "Photo deleted successfully",
      photos: event.photos,
    });

  } catch (error) {
    console.error("Error deleting event photo:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting photo",
    });
  }
};