export type PlaylistType = "user" | "default";

export interface Playlist {
  id: number;
  url: string;
  type: PlaylistType;
}

// admin add ไร จะไปเข้า default
