export interface StoredMessage {
  id: string;
  sender: "hoya" | "user";
  content: string;
}

export interface StoredConversation {
  id: string;
  medicine: string;
  messages: StoredMessage[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "hoya:conversations";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadConversations(): StoredConversation[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as StoredConversation[];
    return list.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (e) {
    console.error("conversation history load failed:", e);
    return [];
  }
}

export function loadConversation(id: string): StoredConversation | null {
  return loadConversations().find((c) => c.id === id) ?? null;
}

function writeAll(list: StoredConversation[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("conversation history save failed:", e);
  }
}

export function upsertConversation(conv: StoredConversation): void {
  const list = loadConversations();
  const idx = list.findIndex((c) => c.id === conv.id);
  if (idx >= 0) {
    list[idx] = conv;
  } else {
    list.unshift(conv);
  }
  writeAll(list);
}

export function createConversation(medicine: string): StoredConversation {
  const now = Date.now();
  return {
    id: `conv-${now}-${Math.random().toString(36).slice(2, 8)}`,
    medicine,
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function formatRelativeDate(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const day = 24 * 60 * 60 * 1000;
  if (diff < day) return "오늘";
  if (diff < 2 * day) return "어제";
  const days = Math.floor(diff / day);
  if (days < 7) return `${days}일 전`;
  if (days < 14) return "일주일 전";
  if (days < 30) return `${Math.floor(days / 7)}주 전`;
  return `${Math.floor(days / 30)}개월 전`;
}
