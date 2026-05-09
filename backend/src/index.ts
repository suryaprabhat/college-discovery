import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all colleges with optional search, location, and fees filters
app.get('/api/colleges', async (req, res) => {
  try {
    const { search, location, maxFees, collection } = req.query;
    
    let filter: any = {};
    
    if (search && search !== '') {
      filter.name = { contains: String(search), mode: 'insensitive' };
    }
    if (location && location !== '') {
      filter.location = { contains: String(location), mode: 'insensitive' };
    }
    if (maxFees && maxFees !== '') {
      filter.fees = { lte: Number(maxFees) };
    }
    
    let orderRule: any = { rating: 'desc' };
    if (collection === 'top_placements') {
      orderRule = { placement_percent: 'desc' };
    } else if (collection === 'affordable') {
      orderRule = { fees: 'asc' };
    } else if (collection === 'historical') {
      orderRule = { established_year: 'asc' };
    }
    
    const colleges = await prisma.college.findMany({
      where: filter,
      orderBy: orderRule
    });
    
    res.json(colleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Compare multiple colleges by their IDs (comma separated)
app.get('/api/colleges/compare', async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids || typeof ids !== 'string') {
      return res.status(400).json({ error: 'ids parameter is required' });
    }
    
    const idArray = ids.split(',');
    
    const colleges = await prisma.college.findMany({
      where: {
        id: { in: idArray }
      },
      include: {
        courses: true,
        placement_stats: true
      }
    });
    
    res.json(colleges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific college by ID including courses
app.get('/api/colleges/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const college = await prisma.college.findUnique({
      where: { id },
      include: { 
        courses: true,
        placement_stats: {
          orderBy: { year: 'asc' }
        },
        comments: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    res.json(college);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a comment to a specific college
app.post('/api/colleges/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { author, text } = req.body;
    
    if (!author || !text) {
      return res.status(400).json({ error: 'Author and text are required' });
    }
    
    const comment = await prisma.comment.create({
      data: {
        collegeId: id,
        author,
        text
      }
    });
    
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
