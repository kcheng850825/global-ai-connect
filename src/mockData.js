const firstNames = ["Alice", "David", "Maria", "Satoshi", "Priya", "John", "Emma", "Luis", "Chen", "Sarah", "Michael", "Yuki", "Carlos", "Fatima", "James", "Elena", "Omar", "Nina", "Lars", "Chloe", "Hiroshi", "Aisha", "Wei", "Sofia"];
const lastNames = ["Smith", "Kim", "Garcia", "Tanaka", "Patel", "Doe", "Silva", "Chen", "Lee", "Muller", "Singh", "Wang", "Lopez", "Brown", "Nguyen", "Ivanov", "Dubois", "Gonzalez", "Martinez", "Takahashi", "Johansson", "Ali"];
const roles = ["AI Researcher", "Data Scientist", "ML Engineer", "AI Enthusiast", "Data Engineer", "Software Engineer", "AI Policy Analyst", "Product Manager", "Startup Founder", "VP of AI", "MLOps Lead"];
const expertiseList = ["LLMs", "Computer Vision", "MLOps", "Robotics", "Data Science", "AI Ethics", "Reinforcement Learning", "NLP", "Generative Audio", "Edge AI", "Federated Learning"];
const lookingForList = [
  "Looking for a co-founder for a GenAI startup",
  "Seeking an ML Engineer to help optimize my vision models",
  "Want to discuss AI ethics with researchers in the EU",
  "Looking for data engineers to build robust pipelines",
  "Hiring NLP experts for a new healthcare application",
  "Just wanting to network and learn about cutting-edge tech",
  "Looking for beta testers for a new ML development tool"
];

export const cities = [
  { loc: "San Francisco", country: "USA", continent: "North America", lat: 37.7749, lng: -122.4194 },
  { loc: "New York", country: "USA", continent: "North America", lat: 40.7128, lng: -74.0060 },
  { loc: "Austin", country: "USA", continent: "North America", lat: 30.2672, lng: -97.7431 },
  { loc: "Seattle", country: "USA", continent: "North America", lat: 47.6062, lng: -122.3321 },
  { loc: "Toronto", country: "Canada", continent: "North America", lat: 43.6510, lng: -79.3470 },
  { loc: "Vancouver", country: "Canada", continent: "North America", lat: 49.2827, lng: -123.1207 },
  { loc: "London", country: "UK", continent: "Europe", lat: 51.5074, lng: -0.1278 },
  { loc: "Berlin", country: "Germany", continent: "Europe", lat: 52.5200, lng: 13.4050 },
  { loc: "Paris", country: "France", continent: "Europe", lat: 48.8566, lng: 2.3522 },
  { loc: "Amsterdam", country: "Netherlands", continent: "Europe", lat: 52.3676, lng: 4.9041 },
  { loc: "Tokyo", country: "Japan", continent: "Asia", lat: 35.6762, lng: 139.6503 },
  { loc: "Bangalore", country: "India", continent: "Asia", lat: 12.9716, lng: 77.5946 },
  { loc: "Singapore", country: "Singapore", continent: "Asia", lat: 1.3521, lng: 103.8198 },
  { loc: "Seoul", country: "Japan", continent: "Asia", lat: 37.5665, lng: 126.9780 },
  { loc: "São Paulo", country: "Brazil", continent: "South America", lat: -23.5505, lng: -46.6333 },
  { loc: "Buenos Aires", country: "Argentina", continent: "South America", lat: -34.6037, lng: -58.3816 },
  { loc: "Sydney", country: "Australia", continent: "Oceania", lat: -33.8688, lng: 151.2093 },
  { loc: "Melbourne", country: "Australia", continent: "Oceania", lat: -37.8136, lng: 144.9631 },
  { loc: "Lagos", country: "Nigeria", continent: "Africa", lat: 6.5244, lng: 3.3792 },
  { loc: "Cape Town", country: "South Africa", continent: "Africa", lat: -33.9249, lng: 18.4241 },
  { loc: "Newport Beach", country: "USA", continent: "North America", lat: 33.6189, lng: -117.9298 }
];

export const clusters = [
  {
    id: 999,
    name: "Ticket500",
    topic: "Tech Center for Entrepreneurs",
    lat: 33.6189,
    lng: -117.9298,
    members: null,
    cityData: { loc: "Newport Beach", country: "USA", continent: "North America", lat: 33.6189, lng: -117.9298 },
    address: "2807 Villa Way, Newport Beach, CA 92663, USA",
    website: "https://theticket500.com/"
  },
  ...Array.from({ length: 150 }, (_, i) => {
    const groupPrefix = ["Global", "NextGen", "Open", "Future", "Applied", "Local", "Deep", "Neural", "Synaptic", "Quantum"];
    const groupSuffix = ["AI Innovators", "Vision Lab", "Data Group", "Robotics Club", "Ethics Board", "Quant & Data", "ML Guild", "Builders", "Tinkerers", "Research"];
    const topics = ["LLMs & GenAI", "Computer Vision", "Data Science", "Robotics AI", "AI Ethics", "Data Eng", "MLOps", "Generative Audio"];
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    return {
      id: i + 1,
      name: `${groupPrefix[Math.floor(Math.random() * groupPrefix.length)]} ${groupSuffix[Math.floor(Math.random() * groupSuffix.length)]}`,
      topic: topics[Math.floor(Math.random() * topics.length)],
      lat: city.lat + (Math.random() * 0.5 - 0.25),
      lng: city.lng + (Math.random() * 0.5 - 0.25),
      members: Math.floor(Math.random() * 1000) + 50,
      cityData: city
    };
  })
];

export const events = Array.from({ length: 300 }, (_, i) => {
  const types = ["Hackathon", "Conference", "Workshop", "Meetup", "Mixer", "Summit"];
  const topics = ["GenAI", "Vision", "AI Ethics", "MLOps", "Robotics", "Data Eng", "LLM Fine-tuning"];
  const city = cities[Math.floor(Math.random() * cities.length)];
  
  const today = new Date('2026-06-20');
  const randomDays = Math.floor(Math.random() * 360);
  const eventDate = new Date(today.getTime() + randomDays * 24 * 60 * 60 * 1000);
  const hostCluster = clusters[Math.floor(Math.random() * clusters.length)];
  
  return {
    id: i + 1,
    title: `${city.loc} ${topics[Math.floor(Math.random() * topics.length)]} ${types[Math.floor(Math.random() * types.length)]}`,
    date: eventDate.toISOString().split('T')[0],
    type: types[Math.floor(Math.random() * types.length)],
    lat: city.lat + (Math.random() * 0.5 - 0.25),
    lng: city.lng + (Math.random() * 0.5 - 0.25),
    location: city.loc,
    cityData: city,
    hostClusterId: hostCluster.id
  };
});

export const users = [
  {
    id: 999,
    name: "Don DiCostanzo",
    role: "Chief Entrepreneurial Officer",
    expertise: "Business & Strategy",
    lookingFor: "Building the AI innovators community.",
    lat: 33.6189,
    lng: -117.9298,
    location: "Newport Beach",
    cityData: { loc: "Newport Beach", country: "USA", continent: "North America", lat: 33.6189, lng: -117.9298 },
    nomadStatus: "Stationary",
    degrees: ["BS Business"],
    certificates: [],
    eventsAttended: 120,
    attendingEventIds: [],
    memberClusterIds: [999], // Linked to Ticket500
    bio: "Passionate about bridging the gap between innovative AI technologies and practical business applications. Experienced in growing communities and fostering global collaboration.",
    skills: ["Business Strategy", "Community Building", "AI Leadership"]
  },
  ...Array.from({ length: 300 }, (_, i) => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    const numEvents = Math.floor(Math.random() * 4); // 0 to 3 events
    const attendingEventIds = [];
    for(let j=0; j<numEvents; j++) {
      attendingEventIds.push(events[Math.floor(Math.random() * events.length)].id);
    }

    const numClusters = Math.floor(Math.random() * 3) + 1; // 1 to 3 clusters
    const memberClusterIds = [];
    for(let j=0; j<numClusters; j++) {
      memberClusterIds.push(clusters[Math.floor(Math.random() * clusters.length)].id);
    }

    return {
      id: i + 1,
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      role: roles[Math.floor(Math.random() * roles.length)],
      expertise: expertiseList[Math.floor(Math.random() * expertiseList.length)],
      lookingFor: lookingForList[Math.floor(Math.random() * lookingForList.length)],
      lat: city.lat + (Math.random() * 0.5 - 0.25),
      lng: city.lng + (Math.random() * 0.5 - 0.25),
      location: city.loc,
      cityData: city,
      nomadStatus: Math.random() > 0.8 ? "Digital Nomad" : "Stationary",
      degrees: ["BS Computer Science", "MS AI/ML"].slice(0, Math.floor(Math.random() * 2) + 1),
      certificates: Math.random() > 0.5 ? ["AWS Machine Learning Specialty"] : [],
      eventsAttended: Math.floor(Math.random() * 15),
      attendingEventIds,
      memberClusterIds
    };
  })
];

export const matches = [
  {
    id: 1,
    user: users[5],
    synergy: "AI Synergy: Your expertise in MLOps perfectly aligns with their need for scalable data pipelines. They are currently looking for a co-founder to build out a GenAI infrastructure, which is highly relevant to your background.",
    date: "2026-06-18"
  },
  {
    id: 2,
    user: users[12],
    synergy: "AI Synergy: You both attended the recent 'San Francisco Vision Summit'. They specialize in Computer Vision and are looking for ML Engineers. Combining your NLP knowledge with their Vision expertise could lead to strong multi-modal research.",
    date: "2026-06-15"
  },
  {
    id: 3,
    user: users[42],
    synergy: "AI Synergy: They are an AI Policy Analyst seeking technical perspective on EU regulations. Your practical experience building LLMs provides the exact ground-truth knowledge they are searching for.",
    date: "2026-06-10"
  },
  {
    id: 4,
    user: users[88],
    synergy: "AI Synergy: High location & interest match. You are both based in London and actively participating in 'Open AI Innovators'. They are looking for beta testers for a new edge AI deployment tool.",
    date: "2026-06-05"
  },
  {
    id: 5,
    user: users[110],
    synergy: "AI Synergy: Perfect skill complementarity. They are a Startup Founder with deep domain expertise in healthcare, actively searching for NLP experts to build out their core product. Your background makes you an ideal technical partner.",
    date: "2026-06-01"
  }
];

export const news = Array.from({ length: 150 }, (_, i) => {
  const types = ["Research", "Meetup", "News", "Announcement", "Tutorial"];
  const titles = [
    "New Efficient LLM Architecture Released",
    "SF AI Innovators Meetup: GenAI in Prod",
    "Breakthrough in 3D Computer Vision",
    "Global AI Connect reaches 1M users!",
    "How to optimize RAG pipelines",
    "The future of Edge AI devices",
    "Ethical considerations in autonomous agents",
    "Scaling MLOps for enterprise",
    "New funding for quantum computing startup"
  ];
  const tagsList = ["LLM", "Vision", "MLOps", "Ethics", "Robotics", "Startups", "Community"];
  const sources = ["AI Daily", "Community", "ML Papers", "Platform", "Tech Crunch", "AI Weekly"];
  
  const baseDate = new Date('2026-06-20T16:00:00Z');
  // subtract (i * 4) hours to simulate chronological feed over past ~25 days
  const itemDate = new Date(baseDate.getTime() - (i * 4 * 60 * 60 * 1000));
  
  const type = types[Math.floor(Math.random() * types.length)];
  const tags = [tagsList[Math.floor(Math.random() * tagsList.length)], tagsList[Math.floor(Math.random() * tagsList.length)]];
  
  return {
    id: i + 1,
    title: titles[Math.floor(Math.random() * titles.length)],
    date: itemDate.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
    timestamp: itemDate.getTime(),
    source: sources[Math.floor(Math.random() * sources.length)],
    type: type,
    tags: [...new Set(tags)]
  };
});

export const trendingData = [
  { month: 'Jan', LLMs: 400, Vision: 240, MLOps: 240 },
  { month: 'Feb', LLMs: 450, Vision: 260, MLOps: 221 },
  { month: 'Mar', LLMs: 500, Vision: 280, MLOps: 229 },
  { month: 'Apr', LLMs: 650, Vision: 390, MLOps: 200 },
  { month: 'May', LLMs: 780, Vision: 480, MLOps: 218 },
  { month: 'Jun', LLMs: 900, Vision: 520, MLOps: 250 },
];
