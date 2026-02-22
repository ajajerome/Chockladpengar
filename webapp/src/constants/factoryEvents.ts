export interface FactoryEventTemplate {
  type: 'maintenance' | 'breakdown' | 'upgrade' | 'bonus';
  title: string;
  description: string;
  costMultiplier?: number; // Multiplicera med factorys maintenanceCost
}

export const FACTORY_EVENTS: FactoryEventTemplate[] = [
  // Maintenance events (normala underhåll)
  {
    type: 'maintenance',
    title: 'Kakaoförrådet tar slut',
    description: 'Fabriken behöver köpa in mer kakao för att fortsätta producera chokladpengar.',
    costMultiplier: 1,
  },
  {
    type: 'maintenance',
    title: 'Maskinsköt Dagarna',
    description: 'Det är dags för regelbundet underhåll av maskinerna. Olja, polering och lite kärlek!',
    costMultiplier: 0.8,
  },
  {
    type: 'maintenance',
    title: 'Sockerleverans behövs',
    description: 'Vi har slut på socker! Beställ ny leverans för att hålla produktionen igång.',
    costMultiplier: 0.9,
  },
  {
    type: 'maintenance',
    title: 'Städdag i fabriken',
    description: 'Fabriken behöver en ordentlig städning. Chokladfläckar överallt!',
    costMultiplier: 0.6,
  },
  {
    type: 'maintenance',
    title: 'Mjölkleverans krävs',
    description: 'Tiden för ny mjölkleverans! Mjölkchokladen väntar inte på någon.',
    costMultiplier: 1.1,
  },
  
  // Breakdown events (haveri som kostar mer)
  {
    type: 'breakdown',
    title: 'Maskinhaveri!',
    description: 'Den stora blandningsmaskinen har stannat! Behöver akut reparation.',
    costMultiplier: 2,
  },
  {
    type: 'breakdown',
    title: 'Strömavbrott',
    description: 'Fabriken drabbades av strömavbrott. Behöver byta säkringar och starta om alla maskiner.',
    costMultiplier: 1.8,
  },
  {
    type: 'breakdown',
    title: 'Rörledningsläcka',
    description: 'Det läcker flytande choklad! Rörmokaren måste fixa detta snabbt.',
    costMultiplier: 2.2,
  },
  {
    type: 'breakdown',
    title: 'Överhettad ugn',
    description: 'Chokladugnen blev för varm och stängde av sig. Behöver kyla ner och service.',
    costMultiplier: 1.9,
  },
  {
    type: 'breakdown',
    title: 'Transportbandstopp',
    description: 'Transportbandet har fastnat! Chokladbitarna står stilla på löpande bandet.',
    costMultiplier: 1.7,
  },
  
  // Bonus events (positiva händelser)
  {
    type: 'bonus',
    title: 'Perfekt batch!',
    description: 'Dagens produktion blev exceptionell! Får extra chokladpengar som bonus.',
    costMultiplier: 0,
  },
  {
    type: 'bonus',
    title: 'Snabb leverans',
    description: 'Råvaruleverantören kom tidigt! Får rabatt på nästa underhåll.',
    costMultiplier: 0,
  },
  {
    type: 'bonus',
    title: 'Effektivitetsbonus',
    description: 'Maskinerna går som smort! Produktionen ökar tillfälligt med 50%.',
    costMultiplier: 0,
  },
  {
    type: 'bonus',
    title: 'Besök från Kakaoexpert',
    description: 'En expert gav gratis tips! Fabriken producerar bättre choklad nu.',
    costMultiplier: 0,
  },
  
  // Upgrade opportunities
  {
    type: 'upgrade',
    title: 'Ny maskin tillgänglig',
    description: 'En leverantör erbjuder uppgradering av din fabrik för ökad produktion.',
    costMultiplier: 3,
  },
  {
    type: 'upgrade',
    title: 'Automatisering möjlig',
    description: 'Kan installera robotar som minskar framtida underhållskostnader.',
    costMultiplier: 4,
  },
];

export function getRandomFactoryEvent(): FactoryEventTemplate {
  // Viktning: 50% maintenance, 30% breakdown, 15% bonus, 5% upgrade
  const rand = Math.random();
  
  let eventType: 'maintenance' | 'breakdown' | 'upgrade' | 'bonus';
  if (rand < 0.5) {
    eventType = 'maintenance';
  } else if (rand < 0.8) {
    eventType = 'breakdown';
  } else if (rand < 0.95) {
    eventType = 'bonus';
  } else {
    eventType = 'upgrade';
  }
  
  const eventsOfType = FACTORY_EVENTS.filter(e => e.type === eventType);
  return eventsOfType[Math.floor(Math.random() * eventsOfType.length)];
}








