import prisma from '../prisma/client.js';

export const createInjury = async (req, res) => {
  try {
    // Extract data from request body
    const { userID, description, circumstances, timeInjury } = req.body;

    // Validate required fields
    if (description === undefined || circumstances === undefined ||
      timeInjury === undefined) {
      return res.status(400).json({
        error: 'Missing required fields: description, circumstances and timeInjury are required'
      });
    }

    // Create Injury entry
    const Injury = await prisma.Injury.create({
      data: {
        description: String(description),
        circumstances: String(circumstances),
        timeInjury: timeInjury ? new Date(timeInjury) : new Date(),
      },
    });

    return res.status(201).json({
      message: 'Injury data saved successfully',
      data: Injury
    });

  } catch (err) {
    console.error('createInjury error:', err);

    // Handle Prisma validation errors
    if (err.code === 'P2002') {
      return res.status(400).json({
        error: 'Validation error'
      });
    }

    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Optional: Get all Injury entries
export const getAllInjury = async (req, res) => {
  try {
    const InjuryEntries = await prisma.Injury.findMany({
        where:
        {
            
        },
      orderBy: {
        timeInjury: 'desc'
      }
    });

    return res.status(200).json(InjuryEntries);
  } catch (err) {
    console.error('getAllInjury error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};