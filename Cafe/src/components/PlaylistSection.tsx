import { useEffect, useState } from "react";
import { Playlist } from "../types";

const STORAGE_KEY = "userPlaylists";

const defaultPlaylists: Playlist[] = [
  {
    id: 1,
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3Ogo9pFvBkY",
    type: "default",
  },
];

export default function PlaylistSection() {
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setUserPlaylists(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userPlaylists));
  }, [userPlaylists]);

  const convertToEmbed = (url: string) => {
    try {
      if (url.includes("spotify.com")) {
        return url.replace("playlist/", "embed/playlist/");
      }
      if (url.includes("youtube.com")) {
        const listId = new URL(url).searchParams.get("list");
        if (!listId) return null;
        return `https://www.youtube.com/embed/videoseries?list=${listId}`;
      }
    } catch {
      return null;
    }
    return null;
  };

  const addPlaylist = () => {
    const embed = convertToEmbed(input.trim());
    if (!embed) return alert("ลิงก์ไม่ถูกต้อง");

    const newPlaylist: Playlist = {
      id: Date.now(),
      url: embed,
      type: "user",
    };

    setUserPlaylists(prev => [newPlaylist, ...prev]);
    setInput("");
  };

  const deletePlaylist = (id: number) => {
    setUserPlaylists(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="วางลิงก์ Spotify หรือ YouTube playlist"
          style={{ width: "60%", padding: 8 }}
        />
        <button onClick={addPlaylist} style={{ marginLeft: 10 }}>
          Add
        </button>
      </div>

      {userPlaylists.length > 0 && (
        <>
          <h3 style="text-align:left; font-weight: bold;">🎧 Your Playlists</h3>
          <Row playlists={userPlaylists} onDelete={deletePlaylist} />
        </>
      )}

      <h3 style="text-align:left; font-weight: bold;">🌿 Chill Picks</h3>
      <Row playlists={defaultPlaylists} />
    </div>
  );
}

function Row({
  playlists,
  onDelete,
}: {
  playlists: Playlist[];
  onDelete?: (id: number) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 20, overflowX: "auto" }}>
      {playlists.map(p => (
        <div
          key={p.id}
          style={{
            minWidth: 300,
            position: "relative",
            background: "#fff",
            padding: 10,
            borderRadius: 12,
          }}
        >
          {p.type === "user" && onDelete && (
            <button
              onClick={() => onDelete(p.id)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              ✕
            </button>
          )}

          <iframe
            src={p.url}
            width="100%"
            height="380"
            allow="autoplay; encrypted-media"
          />
        </div>
      ))}
    </div>
  );
}
