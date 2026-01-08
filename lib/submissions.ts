const SUBMISSIONS_FILE = process.cwd() + '/data/submissions.json';
const RATE_LIMIT_STORE = new Map<string, number[]>();

export class RateLimiter {
  private limit: number;
  private windowMs: number;

  constructor(limit = 5, windowMs = 3600000) {
    // 5 per hour by default
    this.limit = limit;
    this.windowMs = windowMs;
  }

  /**
   * Check if request is allowed
   * Returns true if under limit, false if over
   */
  isAllowed(ip: string): boolean {
    const now = Date.now();
    const timestamps = RATE_LIMIT_STORE.get(ip) || [];
    const recent = timestamps.filter((t) => now - t < this.windowMs);

    if (recent.length < this.limit) {
      recent.push(now);
      RATE_LIMIT_STORE.set(ip, recent);
      return true;
    }

    return false;
  }

  /**
   * Get remaining requests for IP
   */
  getRemaining(ip: string): number {
    const now = Date.now();
    const timestamps = RATE_LIMIT_STORE.get(ip) || [];
    const recent = timestamps.filter((t) => now - t < this.windowMs);
    return Math.max(0, this.limit - recent.length);
  }
}

export function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || 'unknown';
}

export interface SubmissionPayload {
  content: string;
  author?: string;
  tags?: string[];
  honeypot?: string;
}

/**
 * Validate submission
 */
export function validateSubmission(data: unknown): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid submission' };
  }

  const payload = data as Partial<SubmissionPayload>;

  // Check honeypot
  if (payload.honeypot) {
    return { valid: false, error: 'Spam detected' };
  }

  // Validate content
  if (!payload.content || typeof payload.content !== 'string') {
    return { valid: false, error: 'Joke content is required' };
  }

  if (payload.content.length < 10 || payload.content.length > 500) {
    return { valid: false, error: 'Joke must be between 10 and 500 characters' };
  }

  return { valid: true };
}
