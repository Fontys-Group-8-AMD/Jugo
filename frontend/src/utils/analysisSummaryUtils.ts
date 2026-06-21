export const LOW_CONFIDENCE_THRESHOLD = 70;
export const CRITICAL_CONFIDENCE_THRESHOLD = 30;

export const clampScore = (score: number) => {
  return Math.min(Math.max(score, 0), 100);
};

export const isLowConfidenceScore = (score: number) => {
  return clampScore(score) < LOW_CONFIDENCE_THRESHOLD;
};

export const getConfidenceCircleColor = (score: number) => {
  const safeScore = clampScore(score);

  if (safeScore >= LOW_CONFIDENCE_THRESHOLD) {
    return "text-emerald-500";
  }

  if (safeScore >= CRITICAL_CONFIDENCE_THRESHOLD) {
    return "text-amber-500";
  }

  return "text-red-500";
};

export const calculateCircleProgress = (score: number, radius: number) => {
  const safeScore = clampScore(score);

  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (safeScore / 100) * circumference;

  return {
    circumference,
    progressOffset,
  };
};
