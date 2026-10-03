/**
 * Cleans AI-specific markdown artifacts like **, ###, etc.
 * ensuring pure, natural, human-like speech and text.
 */
export function cleanAiArtifacts(text: string): string {
  if (!text) return '';
  return text
    // Remove all markdown double asterisks **
    .replace(/\*\*/g, '')
    // Remove markdown headers like ### or ##
    .replace(/#{1,6}\s+/g, '')
    // Remove stray single asterisks used for AI lists or emphasis
    .replace(/(^|\n)\*\s+/g, '$1• ')
    .trim();
}

/**
 * Recursively cleans all string properties in an object
 */
export function deepCleanAiArtifacts<T>(obj: T): T {
  if (typeof obj === 'string') {
    return cleanAiArtifacts(obj) as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepCleanAiArtifacts(item)) as unknown as T;
  }
  if (obj !== null && typeof obj === 'object') {
    const cleaned: any = {};
    for (const key of Object.keys(obj)) {
      cleaned[key] = deepCleanAiArtifacts((obj as any)[key]);
    }
    return cleaned as T;
  }
  return obj;
}
