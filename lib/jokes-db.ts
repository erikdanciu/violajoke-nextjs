import fs from 'fs/promises';
import path from 'path';

export interface Joke {
  id: string;
  content: string;
  tags: string[];
  author?: string;
  approved: boolean;
  createdAt?: string;
}

export interface JokesDB {
  getJoke(id: string): Promise<Joke | null>;
  getRandomJoke(): Promise<Joke | null>;
  listJokes(page?: number, pageSize?: number): Promise<{ jokes: Joke[]; total: number }>;
  listApprovedJokes(): Promise<Joke[]>;
  listByTag(tag: string): Promise<Joke[]>;
  searchJokes(query: string): Promise<Joke[]>;
  addJoke(joke: Omit<Joke, 'id'>): Promise<Joke>;
  getAllTags(): Promise<string[]>;
  getUnapprovedJokes(): Promise<Joke[]>;
  approveJoke(id: string): Promise<void>;
  deleteJoke(id: string): Promise<void>;
}

class JSONJokesDB implements JokesDB {
  private dataPath: string;
  private cache: Joke[] | null = null;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'data', 'jokes.json');
  }

  private async loadJokes(): Promise<Joke[]> {
    if (this.cache) return this.cache;
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      this.cache = JSON.parse(data);
      return this.cache;
    } catch {
      return [];
    }
  }

  private async saveJokes(jokes: Joke[]): Promise<void> {
    this.cache = jokes;
    await fs.writeFile(this.dataPath, JSON.stringify(jokes, null, 2));
  }

  async getJoke(id: string): Promise<Joke | null> {
    const jokes = await this.loadJokes();
    return jokes.find((j) => j.id === id) || null;
  }

  async getRandomJoke(): Promise<Joke | null> {
    const jokes = await this.listApprovedJokes();
    if (jokes.length === 0) return null;
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  async listJokes(page = 1, pageSize = 10): Promise<{ jokes: Joke[]; total: number }> {
    const jokes = await this.listApprovedJokes();
    const total = jokes.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      jokes: jokes.slice(start, end),
      total,
    };
  }

  async listApprovedJokes(): Promise<Joke[]> {
    const jokes = await this.loadJokes();
    return jokes.filter((j) => j.approved);
  }

  async listByTag(tag: string): Promise<Joke[]> {
    const jokes = await this.listApprovedJokes();
    return jokes.filter((j) => j.tags.includes(tag.toLowerCase()));
  }

  async searchJokes(query: string): Promise<Joke[]> {
    const jokes = await this.listApprovedJokes();
    const lower = query.toLowerCase();
    return jokes.filter((j) => j.content.toLowerCase().includes(lower));
  }

  async addJoke(joke: Omit<Joke, 'id'>): Promise<Joke> {
    const jokes = await this.loadJokes();
    const newJoke: Joke = {
      ...joke,
      id: String(Date.now()),
    };
    jokes.push(newJoke);
    await this.saveJokes(jokes);
    return newJoke;
  }

  async getAllTags(): Promise<string[]> {
    const jokes = await this.listApprovedJokes();
    const tags = new Set<string>();
    jokes.forEach((j) => j.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }

  async getUnapprovedJokes(): Promise<Joke[]> {
    const jokes = await this.loadJokes();
    return jokes.filter((j) => !j.approved);
  }

  async approveJoke(id: string): Promise<void> {
    const jokes = await this.loadJokes();
    const joke = jokes.find((j) => j.id === id);
    if (joke) {
      joke.approved = true;
      await this.saveJokes(jokes);
    }
  }

  async deleteJoke(id: string): Promise<void> {
    const jokes = await this.loadJokes();
    await this.saveJokes(jokes.filter((j) => j.id !== id));
  }
}

export const db = new JSONJokesDB();
