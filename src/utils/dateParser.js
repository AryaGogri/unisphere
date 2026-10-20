/**
 * Utility for parsing fuzzy date strings commonly used by university students
 * Examples: "tomorrow", "next Monday", "this Friday", "in two weeks", "after Diwali", "end of the month", "at 10 AM"
 */

export function parseFuzzyDate(text) {
  if (!text) return { date: null, time: null, formatted: 'No date set' };

  const lower = text.toLowerCase().trim();
  const now = new Date();
  let targetDate = new Date(now);
  let timeStr = null;

  // Extract time if present e.g. "at 10am", "by 5 pm", "10:30"
  const timeMatch = lower.match(/(?:at|by|before)?\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
  if (timeMatch && (timeMatch[3] || lower.includes('at ') || lower.includes('by ') || timeMatch[2])) {
    let hours = parseInt(timeMatch[1], 10);
    const minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    const ampm = timeMatch[3];
    
    if (ampm === 'pm' && hours < 12) hours += 12;
    if (ampm === 'am' && hours === 12) hours = 0;
    
    timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  // Handle specific relative terms
  if (lower.includes('today')) {
    // keep today
  } else if (lower.includes('tomorrow')) {
    targetDate.setDate(now.getDate() + 1);
  } else if (lower.includes('day after tomorrow')) {
    targetDate.setDate(now.getDate() + 2);
  } else if (lower.includes('next week') || lower.includes('in a week')) {
    targetDate.setDate(now.getDate() + 7);
  } else if (lower.includes('in two weeks') || lower.includes('in 2 weeks')) {
    targetDate.setDate(now.getDate() + 14);
  } else if (lower.includes('end of the month') || lower.includes('end of month')) {
    targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  } else if (lower.includes('after diwali') || lower.includes('diwali')) {
    // Festival approximation
    targetDate = new Date(now.getFullYear(), 10, 15); // Mid-November
  } else {
    // Day of week matching
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const matchedDay = daysOfWeek.find(d => lower.includes(d));

    if (matchedDay) {
      const targetDayIndex = daysOfWeek.indexOf(matchedDay);
      const currentDayIndex = now.getDay();
      let daysAhead = targetDayIndex - currentDayIndex;

      if (lower.includes('next ')) {
        daysAhead = daysAhead <= 0 ? daysAhead + 7 : daysAhead + 7;
      } else {
        if (daysAhead <= 0) daysAhead += 7;
      }

      targetDate.setDate(now.getDate() + daysAhead);
    } else {
      // Look for specific days count like "in 3 days"
      const inDaysMatch = lower.match(/in (\d+) days?/);
      if (inDaysMatch) {
        targetDate.setDate(now.getDate() + parseInt(inDaysMatch[1], 10));
      }
    }
  }

  // Calculate urgency based on days left
  const diffTime = targetDate.getTime() - new Date().setHours(0,0,0,0);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let urgency = 'subtle'; // default (>7 days)
  if (diffDays <= 0) {
    urgency = 'critical'; // Due today or past
  } else if (diffDays <= 1) {
    urgency = 'high'; // 1 day
  } else if (diffDays <= 3) {
    urgency = 'medium'; // 2-3 days
  } else if (diffDays <= 7) {
    urgency = 'moderate'; // 4-7 days
  }

  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const formattedDate = targetDate.toLocaleDateString('en-US', options);

  return {
    date: targetDate.toISOString().split('T')[0],
    formatted: `${formattedDate}${timeStr ? ` at ${timeStr}` : ''}`,
    time: timeStr || '23:59',
    daysRemaining: diffDays,
    urgency
  };
}

export function calculateUrgencyLevel(dateString) {
  if (!dateString) return 'subtle';
  const target = new Date(dateString);
  const now = new Date();
  const diffTime = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'overdue';
  if (diffDays === 0) return 'critical';
  if (diffDays <= 1) return 'high';
  if (diffDays <= 3) return 'medium';
  if (diffDays <= 7) return 'moderate';
  return 'subtle';
}
