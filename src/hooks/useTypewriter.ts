import { useEffect, useRef, useState } from "react";

interface TypewriterOptions {
  active: boolean;
  reducedMotion: boolean;
  charsPerTick?: number;
  tickMs?: number;
  lineGap?: number;
}

/**
 * Reveals an array of lines character-by-character, as if typed into a
 * terminal. When `active` flips true, starts typing; resets when the line
 * set changes. With reduced motion, all lines render fully and instantly.
 */
export function useTypewriter(lines: string[], options: TypewriterOptions) {
  const { active, reducedMotion, charsPerTick = 2, tickMs = 14, lineGap = 2 } = options;
  const [revealed, setRevealed] = useState<string[]>(() => (reducedMotion ? lines : []));
  const linesKey = lines.join("\n");

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(lines);
      return;
    }

    if (!active) {
      setRevealed([]);
      return;
    }

    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;
    const result = lines.map(() => "");
    setRevealed([...result]);

    const interval = setInterval(() => {
      if (cancelled || lineIndex >= lines.length) {
        clearInterval(interval);
        return;
      }

      const currentLine = lines[lineIndex];
      charIndex = Math.min(charIndex + charsPerTick, currentLine.length);
      result[lineIndex] = currentLine.slice(0, charIndex);
      setRevealed([...result]);

      if (charIndex >= currentLine.length) {
        lineIndex += 1;
        charIndex = -lineGap;
      }
    }, tickMs);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reducedMotion, linesKey]);

  return revealed;
}
