import { Fund, FactoryStageInfo } from '../types';

export const FUNDS: Fund[] = [
  {
    id: 'milk',
    name: 'Mjölkchokladfonden',
    description: 'Stabil och trygg tillväxt. Ingen negativ utveckling.',
    riskLevel: 'low',
    icon: 'M',
  },
  {
    id: 'nougat',
    name: 'Nougatmixen',
    description: 'Lite upp och ner. Medelrisk och medelavkastning.',
    riskLevel: 'medium',
    icon: 'N',
  },
  {
    id: 'gold',
    name: 'Guldchokladgruvan',
    description: 'Stora svängningar. Hög chans till vinst eller förlust.',
    riskLevel: 'high',
    icon: 'G',
  },
];

export const FACTORY_STAGES: FactoryStageInfo[] = [
  {
    id: 'foundation',
    name: 'Grund',
    cost: 100,
    order: 1,
    description: 'Lägg grunden för din chokladfabrik',
  },
  {
    id: 'machine1',
    name: 'Maskiner',
    cost: 150,
    order: 2,
    description: 'Installera de första maskinerna',
  },
  {
    id: 'formStation',
    name: 'Formstation',
    cost: 150,
    order: 3,
    description: 'Bygg stationen där chokladen får sin form',
  },
  {
    id: 'pralineLine',
    name: 'Pralinlinje',
    cost: 200,
    order: 4,
    description: 'Lägg till en pralinlinje för lyxigare choklad',
  },
  {
    id: 'sign',
    name: 'Skylt',
    cost: 50,
    order: 5,
    description: 'En fin skylt för din fabrik',
  },
  {
    id: 'grandOpening',
    name: 'Grand Opening',
    cost: 100,
    order: 6,
    description: 'Invigning av din färdiga fabrik!',
  },
];

export const WEEKLY_PRODUCTION = 1;
