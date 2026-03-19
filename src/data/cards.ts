export interface CardData {
  id: string;
  artworkId: string;
  title: string;
  description: string;
}

export const cards: CardData[] = [
  {
    id: "I",
    artworkId: "sun",
    title: "The Sun",
    description: "太陽 · Vitality & Joy",
  },
  {
    id: "II",
    artworkId: "moon",
    title: "The Moon",
    description: "月 · Dreams & Intuition",
  },
  {
    id: "III",
    artworkId: "star",
    title: "The Star",
    description: "星 · Hope & Guidance",
  },
  {
    id: "IV",
    artworkId: "world",
    title: "The World",
    description: "世界 · Completion & Unity",
  },
];
