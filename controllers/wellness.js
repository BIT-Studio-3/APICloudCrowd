// controllers/wellnessController.js
const prisma = require('../prisma/client');

exports.createWellness = async (req, res) => {
  try {
    // Extract data from request body
    const { sleep, stress, fatigue, muscleSoreness, timeStamp, userId } = req.body;

    // Validate required fields
    if (sleep === undefined || stress === undefined || fatigue === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields: sleep, stress, and fatigue are required' 
      });
    }

    // Validate numeric values
    if (isNaN(sleep) || isNaN(stress) || isNaN(fatigue) || 
        (muscleSoreness !== undefined && isNaN(muscleSoreness))) {
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
        muscleSoreness: muscleSoreness !== undefined ? Number(muscleSoreness) : null,
        timeStamp: timeStamp ? new Date(timeStamp) : new Date(),
        //userId: userId || null // Can be null if not provided
      },
      include: {
        user: true // Include user data in response if needed
      }
    });

    return res.status(201).json({
      message: 'Wellness data saved successfully',
      data: wellness
    });

  } catch (err) {
    console.error('createWellness error:', err);
    
    // Handle Prisma errors
    if (err.code === 'P2003') {
      return res.status(400).json({ 
        error: 'Invalid user ID provided' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
};

// Optional: Get all wellness entries
exports.getAllWellness = async (req, res) => {
  try {
    const wellnessEntries = await prisma.wellness.findMany({
      include: {
        user: true
      },
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