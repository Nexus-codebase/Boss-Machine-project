const mockMinions = [
  {
    id: '1',
    name: 'Gloria Byte',
    title: 'Automation Specialist',
    weaknesses: 'Cannot do stealth coding before coffee, too dramatic',
    salary: 72000,
  },
  {
    id: '2',
    name: 'Nina Null',
    title: 'Shadow Architect',
    weaknesses: 'Unable to execute tasks on Mondays, too chaotic',
    salary: 68000,
  },
  {
    id: '3',
    name: 'Max Vector',
    title: 'Growth Operator',
    weaknesses: 'Will not build dashboards without neon colors, too picky',
    salary: 70500,
  },
  {
    id: '4',
    name: 'Iris Stack',
    title: 'Deal Closer',
    weaknesses: 'Cannot do paperwork after 5 PM, too honest',
    salary: 76000,
  },
];

const mockIdeas = [
  {
    id: '1',
    name: 'Codecademy but for Villains',
    description: 'A complete evil skill academy with subscription plans.',
    weeklyRevenue: 42000,
    numWeeks: 40,
  },
  {
    id: '2',
    name: 'Uber but for Secret Lairs',
    description: 'On-demand lair rentals in every major city.',
    weeklyRevenue: 65000,
    numWeeks: 24,
  },
  {
    id: '3',
    name: 'Snapchat but for Ransom Notes',
    description: 'Self-destructing demands with premium templates.',
    weeklyRevenue: 58000,
    numWeeks: 22,
  },
];

const mockWorkByMinionId = {
  '1': [
    {
      id: '1',
      title: 'Close Deal #7',
      description: 'Negotiate annual infrastructure contract.',
      hours: 6,
      minionId: '1',
    },
  ],
  '2': [
    {
      id: '2',
      title: 'Close Deal #9',
      description: 'Secure cross-border licensing agreement.',
      hours: 5,
      minionId: '2',
    },
  ],
  '3': [
    {
      id: '3',
      title: 'Close Deal #11',
      description: 'Expand product into new market.',
      hours: 7,
      minionId: '3',
    },
  ],
  '4': [
    {
      id: '4',
      title: 'Close Deal #13',
      description: 'Finalize strategic acquisition.',
      hours: 4,
      minionId: '4',
    },
  ],
};

const meetingNotes = [
  'Discussion about scaling villain operations',
  'Meeting for next quarter expansion',
  'Brainstorm on million-dollar idea pipeline',
  'Discussion about minion performance metrics',
];

let mockMeetingCounter = 100;

export const shouldUseMockApi =
  typeof window !== 'undefined' &&
  (window.location.protocol === 'file:' || /github\.io$/i.test(window.location.hostname));

export const getMockMinions = () => mockMinions.slice();
export const getMockIdeas = () => mockIdeas.slice();
export const getMockMeetings = () => [
  {
    id: '1',
    time: '09:30',
    day: 'Mon Jun 22 2026',
    date: '2026-06-22T09:30:00.000Z',
    note: meetingNotes[0],
  },
  {
    id: '2',
    time: '12:15',
    day: 'Tue Jun 23 2026',
    date: '2026-06-23T12:15:00.000Z',
    note: meetingNotes[1],
  },
  {
    id: '3',
    time: '16:00',
    day: 'Wed Jun 24 2026',
    date: '2026-06-24T16:00:00.000Z',
    note: meetingNotes[2],
  },
];

export const getMockMinionById = id => mockMinions.find(minion => minion.id === id) || null;
export const getMockIdeaById = id => mockIdeas.find(idea => idea.id === id) || null;
export const getMockWorkByMinionId = id => (mockWorkByMinionId[id] || []).slice();

export const createMockMeeting = () => {
  const now = new Date(Date.now() + Math.floor(Math.random() * 7200000));
  const hours = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');
  const note = meetingNotes[Math.floor(Math.random() * meetingNotes.length)];
  mockMeetingCounter += 1;

  return {
    id: `${mockMeetingCounter}`,
    time: `${hours}:${minutes}`,
    day: now.toDateString(),
    date: now.toISOString(),
    note,
  };
};