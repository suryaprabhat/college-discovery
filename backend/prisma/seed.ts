import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const colleges = [
  {
    name: "Indian Institute of Technology, Bombay",
    location: "Mumbai, Maharashtra",
    fees: 1200000,
    rating: 4.8,
    placement_percent: 98,
    students_placed: 1250,
    top_companies: "Google, Microsoft, Amazon, Optiver, Tower Research",
    established_year: 1958,
    recent_updates: "Recently launched TRYST (Translational Research Yielding Solutions for Tomorrow) to bridge lab research and industry. Unveiled the 2026-2030 roadmap focusing on deep-tech startups, a new VC fund through SINE, and the 'Project Evergreen' campus expansion.",
    standout_features: "Located in India's financial capital, offering unmatched proximity to top VC firms and corporations. It is the leading Indian institute for deep-tech innovation and hosts the massive Mood Indigo and Techfest festivals.",
    description: "Premier engineering institute with top-notch facilities and faculty.",
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
    
    // Slide Content
    history: "Founded in 1958 with assistance from UNESCO and the Soviet Union, IIT Bombay was the second Indian Institute of Technology to be established. Over the decades, it has evolved into a global center of academic excellence, pioneering deep-tech innovation and producing some of the world's most influential tech leaders.",
    faculty_info: "Our faculty comprises world-renowned researchers, many of whom hold prestigious global fellowships and patents. With a strong focus on cutting-edge research in AI, Quantum Tech, and Climate Science, our professors actively guide students through the SINE incubator to turn academic projects into thriving startups.",
    history_bg_image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600",
    faculty_bg_image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1600",
    courses_bg_image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600",

    courses: [
      { name: "B.Tech Computer Science", duration: 4, fees: 1200000 },
      { name: "B.Tech Electrical", duration: 4, fees: 1200000 },
      { name: "M.Tech AI & Data Science", duration: 2, fees: 600000 }
    ],
    placement_stats: [
      { year: 2020, placement_percent: 92, students_placed: 1050, average_package: 16.5 },
      { year: 2021, placement_percent: 94, students_placed: 1100, average_package: 18.2 },
      { year: 2022, placement_percent: 96, students_placed: 1180, average_package: 21.0 },
      { year: 2023, placement_percent: 98, students_placed: 1250, average_package: 23.5 }
    ]
  },
  {
    name: "Delhi University, North Campus",
    location: "New Delhi, Delhi",
    fees: 30000,
    rating: 4.5,
    placement_percent: 85,
    students_placed: 850,
    top_companies: "Deloitte, KPMG, EY, PwC, McKinsey",
    established_year: 1922,
    recent_updates: "Fully transitioned to the Four Year Undergraduate Program (FYUP) under the NEP 2020. Significantly increased multidisciplinary courses allowing students to combine arts, science, and commerce streams seamlessly.",
    standout_features: "Historic legacy with a vibrant political and cultural life. It boasts one of the strongest alumni networks in Indian civil services, judiciary, and media, providing unparalleled networking opportunities.",
    description: "One of the most prestigious universities in India known for Arts and Commerce.",
    image_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1000",
    
    // Slide Content
    history: "Established in 1922 by an Act of the Central Legislative Assembly, the University of Delhi began with just three colleges and 750 students. Today, the legendary North Campus stands as a testament to India's educational heritage, heavily influencing the nation's political, cultural, and intellectual landscape.",
    faculty_info: "The faculty at DU includes distinguished academicians, renowned authors, and leading economists. With deeply interactive classroom debates and a rich tradition of liberal arts education, professors here shape the critical thinkers and policymakers of tomorrow.",
    history_bg_image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1600",
    faculty_bg_image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600",
    courses_bg_image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=1600",

    courses: [
      { name: "B.Com Honors", duration: 3, fees: 30000 },
      { name: "BA Economics Honors", duration: 3, fees: 28000 },
      { name: "B.Sc Physics", duration: 3, fees: 35000 }
    ],
    placement_stats: [
      { year: 2020, placement_percent: 75, students_placed: 600, average_package: 6.5 },
      { year: 2021, placement_percent: 78, students_placed: 650, average_package: 7.2 },
      { year: 2022, placement_percent: 82, students_placed: 750, average_package: 8.5 },
      { year: 2023, placement_percent: 85, students_placed: 850, average_package: 10.0 }
    ]
  },
  {
    name: "National Institute of Technology, Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    fees: 500000,
    rating: 4.6,
    placement_percent: 92,
    students_placed: 1100,
    top_companies: "TCS, Infosys, Wipro, Amazon, Oracle",
    established_year: 1964,
    recent_updates: "Established a massive new Centre of Excellence in Artificial Intelligence and inaugurated state-of-the-art interdisciplinary M.Tech programs catering to modern manufacturing and robotics.",
    standout_features: "Consistently ranked as the #1 NIT in India. Known for its extremely diverse student body (with strict state quotas ensuring pan-India representation) and a very strong focus on core engineering and public sector placements.",
    description: "Top ranked NIT offering excellent engineering education and placements.",
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000",
    
    // Slide Content
    history: "Founded in 1964 as the Regional Engineering College (REC) Trichy, it was upgraded to a National Institute of Technology in 2003. Situated on a sprawling 800-acre campus, NIT Trichy has consistently been ranked as the finest NIT in the country, deeply contributing to India's core engineering sectors.",
    faculty_info: "NIT Trichy is home to a deeply experienced faculty pool with strong industry ties. Professors actively consult for major public sector undertakings (PSUs) like BHEL and ISRO, directly integrating real-world engineering challenges into their dynamic curriculum.",
    history_bg_image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1600",
    faculty_bg_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600",
    courses_bg_image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1600",

    courses: [
      { name: "B.Tech Mechanical", duration: 4, fees: 500000 },
      { name: "B.Tech CSE", duration: 4, fees: 500000 }
    ],
    placement_stats: [
      { year: 2020, placement_percent: 85, students_placed: 900, average_package: 9.5 },
      { year: 2021, placement_percent: 88, students_placed: 950, average_package: 10.2 },
      { year: 2022, placement_percent: 90, students_placed: 1020, average_package: 11.5 },
      { year: 2023, placement_percent: 92, students_placed: 1100, average_package: 12.8 }
    ]
  },
  {
    name: "Birla Institute of Technology and Science",
    location: "Pilani, Rajasthan",
    fees: 1800000,
    rating: 4.7,
    placement_percent: 96,
    students_placed: 980,
    top_companies: "Microsoft, Amazon, Uber, Atlassian, Flipkart",
    established_year: 1964,
    recent_updates: "Introduced new undergraduate programs like B.E. in Environmental and Sustainability Engineering, and launched a Rs 2,200-crore 'Project Vistaar' to drastically expand capacity. Developing an 'AI-first' campus in Amaravati.",
    standout_features: "Famous for its 'Zero Attendance Policy' which fosters self-discipline. The mandatory 'Practice School' program ensures every student graduates with significant industry experience. Entirely merit-based admission via BITSAT.",
    description: "Renowned private engineering college with a strong alumni network.",
    image_url: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=1000",
    
    // Slide Content
    history: "The journey of BITS Pilani began in 1901 as a small school, blossoming into a university under the visionary leadership of G.D. Birla. Deemed a university in 1964, it broke away from traditional Indian education by heavily adopting the MIT model, ensuring complete academic flexibility.",
    faculty_info: "The institute attracts a vibrant, globally exposed faculty dedicated to research and entrepreneurial mentoring. Thanks to the zero-attendance policy, professors are highly motivated to deliver engaging, high-impact lectures that draw students organically.",
    history_bg_image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=1600",
    faculty_bg_image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1600",
    courses_bg_image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600",

    courses: [
      { name: "B.E. Computer Science", duration: 4, fees: 1800000 },
      { name: "B.E. Electronics", duration: 4, fees: 1800000 }
    ],
    placement_stats: [
      { year: 2020, placement_percent: 90, students_placed: 800, average_package: 14.5 },
      { year: 2021, placement_percent: 92, students_placed: 850, average_package: 16.2 },
      { year: 2022, placement_percent: 94, students_placed: 920, average_package: 18.0 },
      { year: 2023, placement_percent: 96, students_placed: 980, average_package: 20.5 }
    ]
  },
  {
    name: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    fees: 1400000,
    rating: 4.3,
    placement_percent: 88,
    students_placed: 2500,
    top_companies: "Cognizant, TCS, IBM, Accenture, Intel",
    established_year: 1984,
    recent_updates: "Pushing heavily into international collaborations, currently offering 2+2 international transfer programs with universities in the US and Australia. Continually upgrading campus with massive new research and housing blocks.",
    standout_features: "The Fully Flexible Credit System (FFCS) allows students completely to choose their own subjects, timings, and professors. Operates at a massive scale, providing exposure to an incredibly diverse international student body.",
    description: "Leading private institution with diverse academic programs.",
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000",
    
    // Slide Content
    history: "Founded in 1984 as Vellore Engineering College by G. Viswanathan, VIT was granted university status in 2001. Over the years, it has scaled massively to become one of India's largest and most cosmopolitan higher education campuses, housing tens of thousands of students from over 60 countries.",
    faculty_info: "VIT boasts a massive faculty body comprising over 1,700 educators and researchers. With a strict mandate on high-quality publications and project-based learning, the faculty continuously pushes the envelope on practical, hands-on engineering education.",
    history_bg_image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600",
    faculty_bg_image: "https://images.unsplash.com/photo-1558021211-6d1403321394?auto=format&fit=crop&q=80&w=1600",
    courses_bg_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600",

    courses: [
      { name: "B.Tech IT", duration: 4, fees: 1400000 },
      { name: "BCA", duration: 3, fees: 400000 }
    ],
    placement_stats: [
      { year: 2020, placement_percent: 80, students_placed: 1800, average_package: 6.5 },
      { year: 2021, placement_percent: 82, students_placed: 2000, average_package: 7.0 },
      { year: 2022, placement_percent: 85, students_placed: 2200, average_package: 7.8 },
      { year: 2023, placement_percent: 88, students_placed: 2500, average_package: 8.5 }
    ]
  }
];

async function main() {
  console.log("Start seeding...");
  
  await prisma.placementStat.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.college.deleteMany({});
  
  for (const c of colleges) {
    const { courses, placement_stats, ...collegeData } = c;
    const college = await prisma.college.create({
      data: {
        ...collegeData,
        courses: {
          create: courses
        },
        placement_stats: {
          create: placement_stats
        }
      }
    });
    console.log(`Created college: ${college.name}`);
  }
  
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
