/**
 * Determines if two numbers are approximately equal within a relative tolerance.
 *
 * @param a - First number to compare
 * @param b - Second number to compare
 * @param relativeTolerance - Relative tolerance for comparison (default: 1e-2 or 1%)
 * @returns Boolean indicating if the numbers are approximately equal
 *
 * @remarks
 * This function uses relative tolerance rather than absolute difference, making it suitable
 * for comparing numbers of different magnitudes. The comparison is considered valid when:
 * |a - b| ≤ max(|a|, |b|, 1) × relativeTolerance
 *
 * @example
 * // Returns true (within 1% tolerance)
 * isApproximatelyEqual(100, 101);
 *
 * @example
 * // Using custom tolerance (0.1%)
 * isApproximatelyEqual(100, 100.05, 0.001); // true
 */
export function isApproximatelyEqual(a: number, b: number, relativeTolerance: number = 1e-2): boolean {
  const diff = Math.abs(a - b);
  const largest = Math.max(Math.abs(a), Math.abs(b), 1);
  return diff <= largest * relativeTolerance;
}
