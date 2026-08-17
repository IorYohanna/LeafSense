export function parseFrequencyToDays(frequency?: string): number {
  if (!frequency) return 7; // valeur par défaut raisonnable

  const text = frequency.toLowerCase();

  // "2 fois par semaine" / "2-3 fois par semaine"
  const perWeekMatch = text.match(/(\d+)(?:-(\d+))?\s*fois\s*par\s*semaine/);
  if (perWeekMatch) {
    const times = parseInt(perWeekMatch[2] ?? perWeekMatch[1], 10);
    return Math.max(1, Math.round(7 / times));
  }

  // "Toutes les 2-3 semaines" / "Toutes les 21 jours"
  const everyXWeeks = text.match(/toutes les (\d+)(?:-(\d+))?\s*semaines?/);
  if (everyXWeeks) {
    const weeks = parseInt(everyXWeeks[2] ?? everyXWeeks[1], 10);
    return weeks * 7;
  }

  const everyXDays = text.match(/toutes les (\d+)(?:-(\d+))?\s*jours?/);
  if (everyXDays) {
    return parseInt(everyXDays[2] ?? everyXDays[1], 10);
  }

  // "Une fois par semaine"
  if (text.includes('une fois par semaine')) return 7;

  // Défaut si non reconnu
  return 7;
}