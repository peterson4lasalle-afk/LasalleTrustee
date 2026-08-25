import { Pillar, SchoolInfo, FaqItem, CandidateProfile } from '../types';

export const INITIAL_CANDIDATE_PROFILE: CandidateProfile = {
  fullName: 'Adam Peterson',
  preferredName: 'Adam',
  slogan: 'Putting Students First: Collaborative Governance & Real Accountability',
  riding: 'Town of LaSalle and the Town of Amherstburg',
  schoolBoard: 'Greater Essex County District School Board (GECDSB)',
  location: 'Town of LaSalle & Town of Amherstburg, Ontario',
  email: 'Peterson4LaSalle@gmail.com',
  photoUrl: '/candidate-headshot.jpg',
  bioIntro:
    'Education has always been a central part of my life. I was raised by a teacher, am married to an educator, and have a family dedicated to learning and ongoing development. I see the daily effort it takes to support students and teachers in our community. As a former lecturer at Algonquin and St. Clair College, I’ve experienced teaching firsthand.',
  extendedBio: [
    'Professionally, I’ve worked at all levels of management in both Canada and the United States, and returned to school at 30 to complete an MBA.',
    'My background and education give me a practical perspective on how to manage resources responsibly and collaborate effectively. I’m running to make student success the priority. The school board needs steady leadership, clear communication, collaborative and supportive environments with a practical focus'
  ],
  credentials: [
    'Former Lecturer at Algonquin College and St. Clair College',
    'MBA Graduate with Multi-Level Management Experience (Canada & U.S.)',
    'Raised by a Teacher & Married to an Educator — Lifelong Dedication to Learning',
    'Practical Perspective on Responsible Resource Management & Budget Stewardship',
    'Committed to Collaborative Governance, Clear Communication & Student Success'
  ],
  whyRunningHighlights: [
    {
      title: 'Restoring Focus to the Classroom',
      description:
        'Too often, public discussions lose sight of what truly matters: high-quality teaching, safe classrooms, and strong foundational skills in math, reading, and science. I am running to ensure budget dollars directly reach students and educators.'
    },
    {
      title: 'Building Bridges, Not Walls',
      description:
        'School boards should be engines of constructive policy, not arenas of partisan conflict. I will bring a calm, respectful, consensus-building approach to the trustee table, partnering constructively with fellow trustees and school communities.'
    },
    {
      title: 'Strong, Accountable Voice for LaSalle & Amherstburg',
      description:
        'Our riding represents both fast-growing suburban neighbourhoods in LaSalle and historic, close-knit rural/urban communities in Amherstburg. I will advocate tirelessly for our local school facilities, busing equity, and specialized programming.'
    },
    {
      title: 'Transparent & Accessible Representation',
      description:
        'Parents, students, and taxpayers should never feel left in the dark. I commit to hosting regular town halls, maintaining open communication channels, and clearly explaining the rationale behind every major board vote.'
    }
  ]
};

export const CAMPAIGN_PILLARS: Pillar[] = [
  {
    id: 'pillar-1',
    number: 1,
    title: 'Focus on Student Success',
    badge: 'Academics & Well-Being',
    tagline: 'Centering all board decisions on academic achievement, well-being, and measurable outcomes.',
    summary:
      'Every policy and resource allocation must directly elevate the classroom experience. We will prioritize evidence-based foundational learning, nurture physical and mental safety, and guarantee equitable support across all schools.',
    icon: 'GraduationCap',
    colorClass: {
      badgeBg: 'bg-gecdsb-100 text-gecdsb-900 border-gecdsb-200',
      badgeText: 'text-gecdsb-700',
      border: 'border-gecdsb-600',
      accentBg: 'bg-gecdsb-600',
      lightBg: 'bg-gecdsb-50/70'
    },
    subPillars: [
      {
        title: 'Evidence-Based Academics',
        description:
          'Prioritize board-wide initiatives that boost foundational skills in literacy and STEM, ensuring resources directly target classroom support.',
        measurableGoal: 'Year-over-year gains in foundational benchmarks with increased direct-to-classroom budget allocation.'
      },
      {
        title: 'Student Well-Being & Safety',
        description:
          'Foster inclusive, safe, and positive school environments that support physical, mental, and emotional health to remove barriers to learning.',
        measurableGoal: 'Reduced wait times for in-school behavioral and wellness supports across all LaSalle and Amherstburg schools.'
      },
      {
        title: 'Equitable Opportunity',
        description:
          'Ensure every student across all schools in the district—regardless of background or geographic location—has access to specialized programs, modern technology, and necessary support services.',
        measurableGoal: 'Full technology and special education parity between all urban, suburban, and rural GECDSB schools.'
      }
    ]
  },
  {
    id: 'pillar-2',
    number: 2,
    title: 'Collaboration, Not Division',
    badge: 'Governance & Partnership',
    tagline: 'Restoring stability, constructive dialogue, and partnership to board governance.',
    summary:
      'Effective governance requires steady leadership, mutual respect, and listening to our community. We will bridge divides, work in lockstep with parent councils, and respect the dedication of our frontline educators.',
    icon: 'Users',
    colorClass: {
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      badgeText: 'text-emerald-700',
      border: 'border-emerald-500',
      accentBg: 'bg-emerald-600',
      lightBg: 'bg-emerald-50/50'
    },
    subPillars: [
      {
        title: 'Consensus-Based Governance',
        description:
          'Focus on finding common ground with fellow trustees to deliver a clear, unified direction for the school board rather than partisan conflict.',
        measurableGoal: 'A stable, unified Board of Trustees with productive committee deliberations and reduced procedural gridlock.'
      },
      {
        title: 'Strengthening Community Partnerships',
        description:
          'Build active, meaningful relationships with Parent Involvement Committees (PICs), school councils, local municipalities, and community organizations.',
        measurableGoal: 'Regular joint community feedback roundtables hosted alternately in LaSalle and Amherstburg.'
      },
      {
        title: 'Respecting Professional Roles',
        description:
          'Maintain clear boundaries between board oversight and administrative operations, partnering constructively with educators, administrators, and staff to support their work in schools.',
        measurableGoal: 'High morale and constructive labour-management relations focused on shared student achievement.'
      }
    ]
  },
  {
    id: 'pillar-3',
    number: 3,
    title: 'Transparency and Responsibility',
    badge: 'Accountability & Fiscal Care',
    tagline: 'Ensuring clear communication, public accountability, and fiscal stewardship.',
    summary:
      'Every public dollar must be managed with rigor and openness. We will maintain high ethical standards, communicate openly about board decisions, and ensure parents and taxpayers always have a seat at the table.',
    icon: 'ShieldCheck',
    colorClass: {
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
      badgeText: 'text-amber-800',
      border: 'border-amber-500',
      accentBg: 'bg-amber-600',
      lightBg: 'bg-amber-50/50'
    },
    subPillars: [
      {
        title: 'Fiscal Stewardship',
        description:
          'Rigorously review and monitor the annual budget to ensure public funds are allocated efficiently, prioritizing direct classroom investments over administrative overhead.',
        measurableGoal: 'A balanced, audit-approved budget with an increased proportion allocated directly into classrooms.'
      },
      {
        title: 'Open Community Consultation',
        description:
          'Engage proactively with parents, students, and community members during the multi-year strategic planning process through accessible town halls and open surveys.',
        measurableGoal: 'Broad public participation in strategic plan updates and timely responses to constituent inquiries.'
      },
      {
        title: 'Clear Policy & Accountability',
        description:
          'Establish clear metrics to evaluate board policies and report progress on strategic goals openly to the public, upholding high ethical standards and code-of-conduct compliance.',
        measurableGoal: '100% public visibility of voting records and annual progress reports on multi-year strategic goals.'
      }
    ]
  }
];

export const LOCAL_SCHOOLS: SchoolInfo[] = [
  {
    id: 'north-star',
    name: 'North Star High School',
    municipality: 'Amherstburg',
    grades: 'Grades 9 – 12',
    type: 'Secondary',
    address: '330 Simcoe St, Amherstburg, ON',
    specialFeatures: ['State-of-the-Art Skilled Trades Labs', 'Specialist High Skills Major (SHSM)', 'Athletics & Performing Arts'],
    focusArea: 'Strengthening high school academic pathways, technical vocational certifications, and community school spirit in Amherstburg.'
  },
  {
    id: 'sandwich-sec',
    name: 'Sandwich Secondary School',
    municipality: 'LaSalle',
    grades: 'Grades 9 – 12',
    type: 'Secondary',
    address: '7070 Malden Rd, LaSalle, ON',
    specialFeatures: ['French Immersion Secondary', 'Comprehensive Athletics & STEM', 'Advanced Placement (AP) Courses'],
    focusArea: 'Maintaining academic excellence, French Immersion continuity, and modernizing science & technological facilities.'
  },
  {
    id: 'sandwich-west',
    name: 'Sandwich West Public School',
    municipality: 'LaSalle',
    grades: 'JK – Grade 8',
    type: 'Elementary',
    address: '2055 Wyoming Ave, LaSalle, ON',
    specialFeatures: ['French Immersion Hub', 'Early Years Learning Center', 'Active Parent Involvement'],
    focusArea: 'Supporting French Immersion early literacy, traffic/drop-off safety, and playground enhancements.'
  },
  {
    id: 'legacy-oak',
    name: 'Legacy Oak Trail Public School',
    municipality: 'LaSalle',
    grades: 'JK – Grade 8',
    type: 'Elementary',
    address: 'Normandy St, LaSalle, ON',
    specialFeatures: ['Modern Energy-Efficient Facility', 'Dual-Track Programming', 'Inclusive Learning Spaces'],
    focusArea: 'Managing healthy enrollment growth, neighborhood walking safety, and classroom tech resources.'
  },
  {
    id: 'lasalle-ps',
    name: 'LaSalle Public School',
    municipality: 'LaSalle',
    grades: 'JK – Grade 8',
    type: 'Elementary',
    address: 'Mayfair Ave, LaSalle, ON',
    specialFeatures: ['Strong Foundational Literacy', 'Community Roots', 'Eco-School Initiatives'],
    focusArea: 'Classroom resource renewal, special education support staff, and student mental health initiatives.'
  },
  {
    id: 'anderdon-central',
    name: 'Anderdon Central Public School',
    municipality: 'Amherstburg',
    grades: 'JK – Grade 8',
    type: 'Elementary',
    address: '3920 Concession 3 N, Amherstburg, ON',
    specialFeatures: ['French Immersion & English', 'Spacious Rural Campus', 'Active STEM Clubs'],
    focusArea: 'Safe rural busing routes, French Immersion transition support, and outdoor experiential learning.'
  },
  {
    id: 'malden-central',
    name: 'Malden Central Public School',
    municipality: 'Amherstburg',
    grades: 'JK – Grade 8',
    type: 'Elementary',
    address: '5660 County Rd 20, Amherstburg, ON',
    specialFeatures: ['Tight-Knit Community', 'Rich Environmental Programs', 'Early Literacy Focus'],
    focusArea: 'Facility equity, individualized student support, and reliable bus scheduling for rural families.'
  }
];

export const VOTER_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Governance & Budget',
    question: 'What is the role of a School Board Trustee?',
    answer:
      'A school board trustee is an elected community representative who acts as a crucial link between local families and the school board. Trustees establish policy, set and monitor the multi-million dollar annual budget, advocate for local school needs, and hire/evaluate the Director of Education. Trustees do not manage day-to-day school operations or staff hiring, but they ensure public accountability and strategic vision.'
  },
  {
    id: 'faq-2',
    category: 'Local Riding',
    question: 'Who can vote in the LaSalle / Amherstburg GECDSB Trustee election?',
    answer:
      'Any Canadian citizen who is at least 18 years old on Election Day, resides in or owns/rents property in the Town of LaSalle or Town of Amherstburg (or is the spouse of an owner/tenant), and is registered as an English Public school board elector is eligible to vote for this trustee seat.'
  },
  {
    id: 'faq-3',
    category: 'Academics & Well-Being',
    question: 'How will you protect classroom funding when provincial budgets are tight?',
    answer:
      'By applying rigorous oversight to every budget line item. My commitment under Pillar 3 (Fiscal Stewardship) is to prioritize frontline educational assistants, classroom teachers, specialized reading coaches, and learning tools over administrative expansion. We will also actively seek out targeted provincial grants for ventilation, STEM equipment, and student mental health.'
  },
  {
    id: 'faq-4',
    category: 'Governance & Budget',
    question: 'What do you mean by "Collaboration, Not Division"?',
    answer:
      'In recent years, school boards across the province have faced heightened polarization that distracts from student achievement. "Collaboration, Not Division" means focusing on common-sense governance: treating fellow trustees, staff, and parents with dignity; respecting procedural rules; and working across differing viewpoints to pass pragmatic policies that directly benefit our classrooms.'
  },
  {
    id: 'faq-5',
    category: 'Local Riding',
    question: 'How will you ensure both LaSalle and Amherstburg receive equal attention?',
    answer:
      'While LaSalle and Amherstburg share a trustee riding, they have unique needs. LaSalle is experiencing rapid suburban growth requiring capacity management and modern facility planning, while Amherstburg benefits from tight-knit community schools and high school retention at North Star High School. I will maintain a visible presence in both municipalities and host town halls alternately in LaSalle and Amherstburg.'
  },
  {
    id: 'faq-6',
    category: 'Voting & Election',
    question: 'How can I make sure I am registered on the voters list as an English Public supporter?',
    answer:
      'You can verify and update your school support status through VoterLookup.ca (MPAC) or through your local municipal election office in LaSalle or Amherstburg. Making sure your designation is "English Public" ensures you receive the GECDSB trustee ballot.'
  }
];
