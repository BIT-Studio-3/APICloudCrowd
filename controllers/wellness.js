import prisma from '../prisma/client.js';

export const createWellness = async (req, res) => {
  try {
    // Extract data from request body
    const { sleep, stress, fatigue, muscleSoreness, timeStamp, userId } = req.body;

    // Validate required fields
    if (sleep === undefined || stress === undefined ||
      fatigue === undefined || muscleSoreness === undefined ||
      userId === undefined) {
      return res.status(400).json({
        error: 'Missing required fields: sleep, stress, fatigue, muscleSoreness and userId are required'
      });
    }

    // Validate numeric values
    if (isNaN(sleep) || isNaN(stress) || isNaN(fatigue) || isNaN(muscleSoreness)) {
      return res.status(400).json({
        error: 'All values must be numbers'
      });
    }

    // Create wellness entry
    const wellness = await prisma.wellness.create({
      data: {
        sleep: Number(sleep),
        stress: Number(stress),
        fatigue: Number(fatigue),
        muscleSoreness: Number(muscleSoreness),
        timeStamp: timeStamp ? new Date(timeStamp) : new Date(),
         userId: userId,
      },
    });

    return res.status(201).json({
      message: 'Wellness data saved successfully',
      data: wellness
    });

  } catch (err) {
    console.error('createWellness error:', err);

    // Handle Prisma validation errors
    if (err.code === 'P2002') {
      return res.status(400).json({
        error: 'Validation error'
      });
    }else  // P2003: Foreign key constraint failed (e.g., userId does not exist)
    if (err.code === 'P2003') {
      // This addresses your requirement to "reply user is not available"
      return res.status(404).json({
        error: 'User not available. Invalid userId.'
      });
    }

    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Optional: Get all wellness entries
export const getAllWellness = async (req, res) => {
  try {
    const wellnessEntries = await prisma.wellness.findMany({
      orderBy: {
        timeStamp: 'desc'
      }
    });

    return res.status(200).json(wellnessEntries);
  } catch (err) {
    console.error('getAllWellness error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};