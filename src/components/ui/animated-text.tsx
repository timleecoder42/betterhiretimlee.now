import { motion } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
};

type SpecialPhrase = {
  text: string;
  type: 'ai' | 'passionate';
};

type TextMatch = {
  start: number;
  end: number;
  text: string;
  type: SpecialPhrase['type'];
};

// Define special phrases as constants
const SPECIAL_PHRASES: SpecialPhrase[] = [
  { text: 'AI Agents', type: 'ai' },
  { text: 'passionate', type: 'passionate' },
  { text: '情熱を注ぐ', type: 'passionate' }, // Complete Japanese phrase
  { text: '热衷于', type: 'passionate' }, // Complete Chinese phrase
];

// Helper function to split CJK text
function splitCJKText(text: string): string[] {
  const parts: string[] = [];
  text.split('').forEach(char => {
    if (char.trim()) parts.push(char);
    else parts.push(' ');
  });
  return parts;
}

// Helper function to split regular text
function splitRegularText(text: string): string[] {
  return text.split(/(\s+)/).filter(Boolean);
}

// Helper function to split text considering CJK characters and special phrases
function splitTextIntoParts(text: string): string[] {
  const parts: string[] = [];
  let remainingText = text;

  // Add line breaks based on language
  if (text.includes('Web Developer')) {
    // English: Break after "Web Developer" and before "through", trim spaces
    remainingText = text
      .replace('Web Developer ', 'Web Developer\n') // Note: space after "Developer" is included in replace
      .replace(' through', '\nthrough');
  } else if (text.includes('Web Apps')) {
    if (text.includes('情熱を注ぐ')) {
      // Japanese: Break after "Web Apps" for balanced lines
      remainingText = text.replace('Web Apps', 'Web Apps\n');
    } else if (text.includes('热衷于')) {
      // Chinese: Break after "对话"
      remainingText = text.replace('对话', '对话\n');
    }
  }

  // Find all special phrases and their positions
  const matches: TextMatch[] = [];
  SPECIAL_PHRASES.forEach(({ text: phraseText, type }) => {
    let startIndex = 0;
    while (true) {
      const index = remainingText.indexOf(phraseText, startIndex);
      if (index === -1) break;
      matches.push({
        start: index,
        end: index + phraseText.length,
        text: phraseText,
        type,
      });
      startIndex = index + 1;
    }
  });

  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);

  // Process text in order
  let currentPosition = 0;
  matches.forEach(match => {
    // Handle text before the match
    if (match.start > currentPosition) {
      const textBefore = remainingText.slice(currentPosition, match.start);
      const parts_before = textBefore.split('\n');
      parts_before.forEach((part, index) => {
        if (index > 0) parts.push('\n');
        const isCJK = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]/.test(part);
        parts.push(...(isCJK ? splitCJKText(part) : splitRegularText(part)));
      });
    }
    // Add the special phrase as a single unit
    parts.push(match.text);
    currentPosition = match.end;
  });

  // Handle remaining text after last match
  if (currentPosition < remainingText.length) {
    const textAfter = remainingText.slice(currentPosition);
    const parts_after = textAfter.split('\n');
    parts_after.forEach((part, index) => {
      if (index > 0) parts.push('\n');
      const isCJK = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]/.test(part);
      parts.push(...(isCJK ? splitCJKText(part) : splitRegularText(part)));
    });
  }

  return parts;
}

export function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const parts = splitTextIntoParts(text);

  return (
    <motion.span className={`block ${className}`}>
      {parts.map((part, i) => {
        // Handle line breaks
        if (part === '\n') {
          return <br key={i} />;
        }

        // Handle whitespace
        if (/^\s+$/.test(part)) {
          return (
            <span key={i} className="inline-block w-[0.25em]">
              {part}
            </span>
          );
        }

        let segmentClassName = 'inline-block';

        // Find matching special phrase
        const matchingPhrase = SPECIAL_PHRASES.find(phrase => phrase.text === part);

        // Apply highlight styles based on type
        if (matchingPhrase?.type === 'ai') {
          segmentClassName +=
            ' animate-gradient bg-[length:200%_auto] bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 dark:from-purple-400 dark:via-blue-300 dark:to-purple-400 text-transparent bg-clip-text font-bold';
        } else if (matchingPhrase?.type === 'passionate') {
          segmentClassName +=
            ' animate-gradient bg-[length:200%_auto] bg-gradient-to-r from-blue-600 via-pink-500 to-blue-600 dark:from-blue-400 dark:via-pink-300 dark:to-blue-400 text-transparent bg-clip-text font-bold';
        }

        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.6 + i * 0.05,
              ease: [0.33, 1, 0.68, 1],
            }}
            className={segmentClassName}
          >
            {part}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
