
export interface CrosswordClue {
  number: number;
  clue: string;
  enumeration: string;
  answer: string;
  source: string;
}

export const crosswordClues: CrosswordClue[] = [
  {
    number: 1,
    clue: 'Literal contribution to party politics',
    enumeration: '(4)',
    answer: 'TYPO',
    source: 'The Times Quick Cryptic No 2667 by Teazel',
  },
  {
    number: 2,
    clue: 'Note race error',
    enumeration: '(8)',
    answer: 'MISPRINT',
    source: 'The Times Quick Cryptic No 3077 by Hurley',
  },
  {
    number: 3,
    clue: 'Rejecting some cappuccino for tea',
    enumeration: '(5)',
    answer: 'CUPPA',
    source: 'The Times Quick Cryptic No 2690 by Teazel',
  },
  {
    number: 4,
    clue: 'Perhaps too haphazardly, it may be misplaced by writer?',
    enumeration: '(10)',
    answer: 'APOSTROPHE',
    source: 'Adapted from The Times Cryptic No 28578',
  },
  {
    number: 5,
    clue: 'Backward youth regularly seeks Doctor’s adversary',
    enumeration: '(5)',
    answer: 'DALEK',
    source: 'The Times Quick Cryptic No 2997 by Orpheus',
  },
];
