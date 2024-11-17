import { customAlphabet } from 'nanoid';

// Prefixes for different tables (keep them short)
type Prefix =
  | 'BLD'
  | 'APT'
  | 'OWN'
  | 'POW'
  | 'TNT'
  | 'LEA'
  | 'AGR'
  | 'DOC'
  | 'DUT';

// Create nanoid with custom alphabet (no special chars, no ambiguous chars)
const generateId = customAlphabet(
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz',
  24
);

/**
 * Generates a unique ID with table prefix
 * Example outputs:
 * - BLD-1-1X2Y3Z4WabcdABCDEFGHijkm
 * - APT-1-5A6B7C8DpqrsJKLMNPQRtuvw
 * - OWN-1-9E8F7G6HxyzsSTUVWXYZabcd
 */
export function createId(table: Prefix): string {
  return `${table}-1-${generateId()}`;
}

// Type guard to check if a string is a valid ID for a specific table
export function isValidId(table: Prefix, id: string): boolean {
  return id.startsWith(`${table}-`);
}
