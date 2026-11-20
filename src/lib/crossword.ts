import { crosswordClues, type CrosswordClue } from '../data/crossword-clues';

export function isoWeekNumber(date: Date): number {
  const day = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const weekday = day.getUTCDay() || 7; // Sunday is 7, not 0
  day.setUTCDate(day.getUTCDate() + 4 - weekday);
  const yearStart = Date.UTC(day.getUTCFullYear(), 0, 1);
  return Math.ceil(((day.getTime() - yearStart) / 86_400_000 + 1) / 7);
}

export function clueOfTheWeek(date = new Date()): CrosswordClue {
  return crosswordClues[isoWeekNumber(date) % crosswordClues.length];
}

export function answerWords(clue: CrosswordClue): string[] {
  const letters = clue.answer.toUpperCase().replace(/[^A-Z]/g, '');
  const lengths = (clue.enumeration.match(/\d+/g) ?? []).map(Number);
  const total = lengths.reduce((sum, length) => sum + length, 0);

  if (total !== letters.length) {
    return clue.answer
      .toUpperCase()
      .split(/[\s-]+/)
      .map((word) => word.replace(/[^A-Z]/g, ''))
      .filter(Boolean);
  }

  let start = 0;
  return lengths.map((length) => {
    const word = letters.slice(start, start + length);
    start += length;
    return word;
  });
}
