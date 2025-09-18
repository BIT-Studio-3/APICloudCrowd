// controllers/wellnessController.js
const prisma = require('../prisma/client');

export const createWellness = async (req, res) => {
  try {
    // Change parameter name from "sleep" to "sleepHours"
    const { sleepHours, stress, fatigue, muscleSoreness, timeStamp } = req.body;

    // Validate required fields (update field names)
    if (sleepHours === undefined || stress === undefined || fatigue === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields: sleepHours, stress, and fatigue are required' 
      });
    }

    // Update validation ranges to match new scales
    if (sleepHours < 0 || sleepHours > 24) {
      return res.status(400).json({ error: 'Sleep hours must be between 0-24' });
    }
    if (stress < 0 || stress > 10) {
      return res.status(400).json({ error: 'Stress must be between 0-10' });
    }
    if (fatigue < 0 || fatigue > 10) {
      return res.status(400).json({ error: 'Fatigue must be between 0-10' });
    }
    if (muscleSoreness !== undefined && (muscleSoreness < 0 || muscleSoreness > 10)) {
      return res.status(400).json({ error: 'Muscle soreness must be between 0-10' });
    }

    // Update field names in the create operation
    const wellness = await prisma.wellness.create({
      data: {
        sleepHours: Number(sleepHours),    // Changed from "sleep"
        stress: Number(stress),
        fatigue: Number(fatigue),
        muscleSoreness: muscleSoreness !== undefined ? Number(muscleSoreness) : null,
        timeStamp: timeStamp ? new Date(timeStamp) : new Date(),
      }
    });

    return res.status(201).json({
      message: 'Wellness data saved successfully',
      data: wellness
    });

  } catch (err) {
    console.error('createWellness error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};