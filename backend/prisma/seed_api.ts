import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const BGs = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1558021211-6d1403321394?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600"
];

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePlacementStats(basePercent: number) {
  return [
    { year: 2020, placement_percent: Math.min(100, basePercent - getRandomInt(2, 5)), students_placed: getRandomInt(500, 1500), average_package: getRandomInt(6, 12) },
    { year: 2021, placement_percent: Math.min(100, basePercent - getRandomInt(1, 3)), students_placed: getRandomInt(600, 1600), average_package: getRandomInt(7, 14) },
    { year: 2022, placement_percent: Math.min(100, basePercent), students_placed: getRandomInt(700, 1800), average_package: getRandomInt(8, 16) },
    { year: 2023, placement_percent: Math.min(100, basePercent + getRandomInt(1, 3)), students_placed: getRandomInt(800, 2000), average_package: getRandomInt(9, 20) }
  ];
}

async function main() {
  console.log("Fetching universities from across India...");
  const res = await axios.get('http://universities.hipolabs.com/search?country=India');
  const allUniversities = res.data;

  // Take a generous sample of 100 colleges to ensure fast UI performance for the MVP but still a massive list
  const universities = allUniversities.slice(0, 100);

  console.log(`Found ${allUniversities.length} total. Processing ${universities.length} universities for database seeding...`);
  
  await prisma.placementStat.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.college.deleteMany({});
  
  for (let i = 0; i < universities.length; i++) {
    const uni = universities[i];
    
    // Generate realistic random stats
    const fees = getRandomInt(50000, 2000000);
    const rating = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
    const placementPercent = getRandomInt(65, 99);
    const estYear = getRandomInt(1900, 2010);
    const studentsPlaced = getRandomInt(500, 3000);

    const data = {
      name: uni.name,
      location: uni["state-province"] || "India",
      fees: fees,
      rating: parseFloat(rating),
      placement_percent: placementPercent,
      students_placed: studentsPlaced,
      top_companies: "TCS, Infosys, Wipro, Amazon, Cognizant",
      established_year: estYear,
      
      // Auto-generated detailed content based on college name
      description: `${uni.name} is a premier educational institution recognized for excellence in teaching and research.`,
      recent_updates: `Recently inaugurated a new interdisciplinary research center and launched several modernized curriculum tracks adhering to the latest educational policies.`,
      standout_features: `Known for its vast alumni network, state-of-the-art laboratory infrastructure, and highly active student-led tech incubation hubs.`,
      history: `Established in ${estYear}, ${uni.name} began with a vision to deliver world-class education. Over the decades, it has grown exponentially in both infrastructure and academic rigor, producing thousands of successful professionals globally.`,
      faculty_info: `The faculty at ${uni.name} consists of globally exposed academicians and experienced industry professionals dedicated to mentoring students through hands-on projects and deep theoretical foundations.`,
      
      // Random stunning background images
      image_url: getRandomItem(BGs),
      history_bg_image: getRandomItem(BGs),
      faculty_bg_image: getRandomItem(BGs),
      courses_bg_image: getRandomItem(BGs),

      courses: {
        create: [
          { name: "B.Tech Computer Science", duration: 4, fees: fees * 0.8 },
          { name: "B.Tech Mechanical", duration: 4, fees: fees * 0.7 },
          { name: "MBA in Finance", duration: 2, fees: fees * 1.2 }
        ]
      },
      placement_stats: {
        create: generatePlacementStats(placementPercent)
      }
    };

    await prisma.college.create({ data });
    if ((i+1) % 10 === 0) {
      console.log(`Seeded ${i+1}/${universities.length} colleges...`);
    }
  }
  
  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
