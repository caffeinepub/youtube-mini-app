import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import {
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  Gamepad2,
  Heart,
  Library,
  ListPlus,
  Loader2,
  Newspaper,
  Play,
  PlayCircle,
  Plus,
  Search,
  SearchX,
  Share2,
  SkipForward,
  Trash2,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CyborgGiraffeScene from "./components/CyborgGiraffeScene";

const YT_API_KEY = "AIzaSyC2HaCBT-IHKJnb8AXEXafzmanJQ5vzOCE";

// Dark theme color constants
const C = {
  bg: "#0a0a0a",
  surface: "#111111",
  surface2: "#141414",
  border: "1px solid #2a2a2a",
  borderMetal: "1px solid #3a3a3a",
  lime: "#aaff00",
  metal: "#c0c0c0",
  dim: "#555555",
  limeText: { color: "#aaff00" },
  metalText: { color: "#c0c0c0" },
  dimText: { color: "#555555" },
} as const;

interface VideoItem {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
}

interface Playlist {
  id: string;
  name: string;
  items: VideoItem[];
}

interface PlaylistContext {
  playlistId: string;
  items: VideoItem[];
  index: number;
}

type AppState = "idle" | "loading" | "results" | "error";
type Tab = "search" | "library";
type LibraryView = "main" | "playlist";
type SearchFilter = "all" | "music" | "news" | "gaming";

const FILTER_CONFIG: {
  id: SearchFilter;
  label: string;
  categoryId?: string;
  icon: React.ReactNode;
}[] = [
  { id: "all", label: "All", icon: <Youtube size={12} /> },
  { id: "music", label: "Music", categoryId: "10", icon: <Play size={12} /> },
  {
    id: "news",
    label: "News",
    categoryId: "25",
    icon: <Newspaper size={12} />,
  },
  {
    id: "gaming",
    label: "Gaming",
    categoryId: "20",
    icon: <Gamepad2 size={12} />,
  },
];

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        openTelegramLink: (url: string) => void;
      };
    };
  }
}

// ---- useLibrary hook ----
function useLibrary() {
  const [favorites, setFavorites] = useState<VideoItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("yt-favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("yt-playlists") || "[]");
    } catch {
      return [];
    }
  });

  const saveFavorites = useCallback((next: VideoItem[]) => {
    setFavorites(next);
    localStorage.setItem("yt-favorites", JSON.stringify(next));
  }, []);

  const savePlaylists = useCallback((next: Playlist[]) => {
    setPlaylists(next);
    localStorage.setItem("yt-playlists", JSON.stringify(next));
  }, []);

  const isFavorite = useCallback(
    (videoId: string) => favorites.some((v) => v.videoId === videoId),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (video: VideoItem) => {
      if (favorites.some((v) => v.videoId === video.videoId)) {
        saveFavorites(favorites.filter((v) => v.videoId !== video.videoId));
      } else {
        saveFavorites([video, ...favorites]);
      }
    },
    [favorites, saveFavorites],
  );

  const removeFromFavorites = useCallback(
    (videoId: string) => {
      saveFavorites(favorites.filter((v) => v.videoId !== videoId));
    },
    [favorites, saveFavorites],
  );

  const createPlaylist = useCallback(
    (name: string) => {
      const playlist: Playlist = {
        id: `pl-${Date.now()}`,
        name: name.trim(),
        items: [],
      };
      savePlaylists([...playlists, playlist]);
      return playlist;
    },
    [playlists, savePlaylists],
  );

  const deletePlaylist = useCallback(
    (id: string) => {
      savePlaylists(playlists.filter((p) => p.id !== id));
    },
    [playlists, savePlaylists],
  );

  const addToPlaylist = useCallback(
    (playlistId: string, video: VideoItem) => {
      savePlaylists(
        playlists.map((p) =>
          p.id === playlistId
            ? p.items.some((v) => v.videoId === video.videoId)
              ? p
              : { ...p, items: [...p.items, video] }
            : p,
        ),
      );
    },
    [playlists, savePlaylists],
  );

  const removeFromPlaylist = useCallback(
    (playlistId: string, videoId: string) => {
      savePlaylists(
        playlists.map((p) =>
          p.id === playlistId
            ? { ...p, items: p.items.filter((v) => v.videoId !== videoId) }
            : p,
        ),
      );
    },
    [playlists, savePlaylists],
  );

  return {
    favorites,
    playlists,
    isFavorite,
    toggleFavorite,
    removeFromFavorites,
    createPlaylist,
    deletePlaylist,
    addToPlaylist,
    removeFromPlaylist,
  };
}

// ---- AddToPlaylist Dialog ----
interface AddToPlaylistDialogProps {
  video: VideoItem | null;
  open: boolean;
  onClose: () => void;
  playlists: Playlist[];
  createPlaylist: (name: string) => Playlist;
  addToPlaylist: (playlistId: string, video: VideoItem) => void;
}

function AddToPlaylistDialog({
  video,
  open,
  onClose,
  playlists,
  createPlaylist,
  addToPlaylist,
}: AddToPlaylistDialogProps) {
  const [newName, setNewName] = useState("");

  function handleAddToExisting(playlist: Playlist) {
    if (!video) return;
    addToPlaylist(playlist.id, video);
    toast.success(`Added to "${playlist.name}"`);
    onClose();
  }

  function handleCreateAndAdd() {
    if (!video || !newName.trim()) return;
    const pl = createPlaylist(newName.trim());
    addToPlaylist(pl.id, video);
    toast.success(`Created playlist "${pl.name}" and added video`);
    setNewName("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        data-ocid="add_to_playlist.sheet"
        className="max-w-sm mx-auto"
        style={{
          backgroundColor: C.surface,
          color: C.lime,
          border: C.borderMetal,
          boxShadow: "0 0 24px rgba(170,255,0,0.1)",
        }}
      >
        <DialogHeader>
          <DialogTitle style={C.limeText}>Add to Playlist</DialogTitle>
        </DialogHeader>

        {playlists.length > 0 && (
          <div className="space-y-2 max-h-52 overflow-y-auto">
            {playlists.map((pl) => (
              <button
                key={pl.id}
                type="button"
                onClick={() => handleAddToExisting(pl)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all active:opacity-70"
                style={{
                  backgroundColor: C.surface2,
                  border: C.border,
                }}
              >
                <ListPlus size={16} style={C.limeText} />
                <span
                  className="flex-1 text-sm font-medium truncate"
                  style={C.limeText}
                >
                  {pl.name}
                </span>
                <span className="text-xs" style={C.metalText}>
                  {pl.items.length} videos
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <Input
            data-ocid="add_to_playlist.input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateAndAdd()}
            placeholder="New playlist name…"
            className="flex-1 text-sm"
            style={{
              backgroundColor: C.surface2,
              color: C.lime,
              border: "1px solid #3a3a3a",
            }}
          />
          <Button
            data-ocid="add_to_playlist.submit_button"
            size="sm"
            disabled={!newName.trim()}
            onClick={handleCreateAndAdd}
            style={{
              backgroundColor: C.lime,
              color: C.bg,
              fontWeight: 700,
            }}
          >
            <Plus size={14} />
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---- Main App ----
export default function App() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [appState, setAppState] = useState<AppState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("search");
  const [libraryView, setLibraryView] = useState<LibraryView>("main");
  const [openPlaylistId, setOpenPlaylistId] = useState<string | null>(null);
  const [addToPlaylistVideo, setAddToPlaylistVideo] =
    useState<VideoItem | null>(null);
  const [searchFilter, setSearchFilter] = useState<SearchFilter>("all");
  const [currentPlaylistContext, setCurrentPlaylistContext] =
    useState<PlaylistContext | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const lib = useLibrary();

  useEffect(() => {
    window.Telegram?.WebApp?.ready();
    window.Telegram?.WebApp?.expand();
  }, []);

  async function handleSearch(filterOverride?: SearchFilter) {
    const q = query.trim();
    if (!q) return;
    const activeFilter = filterOverride ?? searchFilter;
    setAppState("loading");
    setSelectedVideo(null);
    setVideos([]);
    try {
      const filterCfg = FILTER_CONFIG.find((f) => f.id === activeFilter);
      const categoryParam = filterCfg?.categoryId
        ? `&videoCategoryId=${filterCfg.categoryId}`
        : "";
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&q=${encodeURIComponent(q)}${categoryParam}&key=${YT_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      const items: VideoItem[] = (data.items || []).map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails?.medium?.url || "",
      }));
      setVideos(items);
      setAppState("results");
    } catch (e: any) {
      setErrorMsg(e.message || "Something went wrong");
      setAppState("error");
    }
  }

  function handleFilterChange(filter: SearchFilter) {
    setSearchFilter(filter);
    if (query.trim() && appState === "results") {
      handleSearch(filter);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  function openVideo(video: VideoItem, playlistContext?: PlaylistContext) {
    setSelectedVideo(video);
    setCurrentPlaylistContext(playlistContext ?? null);
  }

  function closePlayer() {
    setSelectedVideo(null);
    setCurrentPlaylistContext(null);
  }

  function playNextInPlaylist() {
    if (!currentPlaylistContext) return;
    const nextIndex = currentPlaylistContext.index + 1;
    const nextVideo = currentPlaylistContext.items[nextIndex];
    if (!nextVideo) return;
    openVideo(nextVideo, {
      ...currentPlaylistContext,
      index: nextIndex,
    });
  }

  const upNextItems = currentPlaylistContext
    ? currentPlaylistContext.items.slice(currentPlaylistContext.index + 1)
    : [];

  const hasNext = upNextItems.length > 0;

  const showResults = appState === "results";
  const showLoading = appState === "loading";
  const showError = appState === "error";
  const showIdle = appState === "idle";

  const openPlaylist = lib.playlists.find((p) => p.id === openPlaylistId);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: C.bg, color: C.lime, position: "relative" }}
    >
      {/* Cyborg Giraffe Background Scene */}
      <CyborgGiraffeScene />

      <Toaster position="top-center" />

      {/* Main content wrapper — above background */}
      <div style={{ position: "relative", zIndex: 1, display: "contents" }}>
        {/* Header */}
        <header
          className="sticky top-0 z-20 px-4 pt-3 pb-3"
          style={{
            backgroundColor: "rgba(10,10,10,0.92)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #2a2a2a",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 lime-glow"
              style={{ backgroundColor: C.lime }}
            >
              <Youtube size={16} style={{ color: C.bg }} />
            </div>
            <h1 className="text-lg font-semibold tracking-tight metal-shimmer">
              420 Music Paradise
            </h1>
          </div>

          {/* Search bar + filters — only show on search tab */}
          {activeTab === "search" && (
            <>
              <div className="flex gap-2 mb-2.5">
                <input
                  ref={inputRef}
                  data-ocid="search.search_input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search music, videos…"
                  className="tg-input flex-1 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: C.surface,
                    color: C.lime,
                    border: "1.5px solid #3a3a3a",
                  }}
                />
                <button
                  type="button"
                  data-ocid="search.primary_button"
                  onClick={() => handleSearch()}
                  disabled={showLoading || !query.trim()}
                  className="rounded-xl px-4 py-2.5 font-semibold text-sm flex items-center gap-1.5 transition-all disabled:opacity-40 flex-shrink-0"
                  style={{
                    backgroundColor: C.lime,
                    color: C.bg,
                    boxShadow: "0 0 10px rgba(170,255,0,0.4)",
                  }}
                >
                  {showLoading ? (
                    <Loader2 size={16} className="spinner" />
                  ) : (
                    <Search size={16} />
                  )}
                  Search
                </button>
              </div>

              {/* Filter Pills */}
              <div
                className="flex gap-2 overflow-x-auto pb-0.5"
                style={{ scrollbarWidth: "none" }}
              >
                {FILTER_CONFIG.map((filter) => {
                  const isActive = searchFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      data-ocid={`search.filter_${filter.id}_tab`}
                      onClick={() => handleFilterChange(filter.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-all"
                      style={{
                        backgroundColor: isActive ? C.lime : C.surface2,
                        color: isActive ? C.bg : C.metal,
                        border: isActive
                          ? "1px solid transparent"
                          : "1px solid #3a3a3a",
                        boxShadow: isActive
                          ? "0 0 8px rgba(170,255,0,0.35)"
                          : "none",
                      }}
                    >
                      {filter.icon}
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </header>

        {/* Main content */}
        <main
          className="flex-1 relative overflow-hidden pb-16"
          style={{ zIndex: 1 }}
        >
          <AnimatePresence mode="wait">
            {/* Player View — overlays any tab */}
            {selectedVideo && (
              <motion.div
                key="player"
                data-ocid="player.panel"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
                className="absolute inset-0 z-10 flex flex-col overflow-y-auto"
                style={{ backgroundColor: C.bg }}
              >
                {/* Back button */}
                <button
                  type="button"
                  data-ocid="player.close_button"
                  onClick={closePlayer}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium"
                  style={C.limeText}
                >
                  <ArrowLeft size={18} />
                  Back
                </button>

                {/* 16:9 iframe */}
                <div className="w-full" style={{ aspectRatio: "16/9" }}>
                  <iframe
                    key={selectedVideo.videoId}
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-full"
                    title={selectedVideo.title}
                  />
                </div>

                {/* Video info + actions */}
                <div className="px-4 pt-3 pb-4">
                  <p
                    className="font-semibold text-base leading-snug mb-1"
                    style={C.limeText}
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: YouTube API returns HTML entities
                    dangerouslySetInnerHTML={{ __html: selectedVideo.title }}
                  />
                  <p className="text-sm mb-3" style={C.metalText}>
                    {selectedVideo.channelTitle}
                  </p>

                  {/* Action row */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      type="button"
                      data-ocid="player.favorite_button"
                      onClick={() => {
                        lib.toggleFavorite(selectedVideo);
                        toast(
                          lib.isFavorite(selectedVideo.videoId)
                            ? "Removed from favorites"
                            : "Added to favorites",
                        );
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-opacity active:opacity-70"
                      style={{
                        backgroundColor: C.surface,
                        border: C.border,
                        color: lib.isFavorite(selectedVideo.videoId)
                          ? "#ef4444"
                          : C.metal,
                      }}
                    >
                      <Heart
                        size={15}
                        fill={
                          lib.isFavorite(selectedVideo.videoId)
                            ? "#ef4444"
                            : "none"
                        }
                      />
                      {lib.isFavorite(selectedVideo.videoId)
                        ? "Favorited"
                        : "Favorite"}
                    </button>
                    <button
                      type="button"
                      data-ocid="player.add_to_playlist_button"
                      onClick={() => setAddToPlaylistVideo(selectedVideo)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-opacity active:opacity-70"
                      style={{
                        backgroundColor: C.surface,
                        border: C.border,
                        color: C.metal,
                      }}
                    >
                      <ListPlus size={15} />
                      Add to playlist
                    </button>
                    <button
                      type="button"
                      data-ocid="player.share_button"
                      onClick={() => {
                        const url = `https://youtu.be/${selectedVideo.videoId}`;
                        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(selectedVideo.title)}`;
                        if (window.Telegram?.WebApp?.openTelegramLink) {
                          window.Telegram.WebApp.openTelegramLink(shareUrl);
                        } else {
                          window.open(shareUrl, "_blank");
                        }
                        toast.success("Link shared to chat!");
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-opacity active:opacity-70"
                      style={{
                        backgroundColor: C.surface,
                        border: `1px solid ${C.lime}`,
                        color: C.lime,
                      }}
                    >
                      <Share2 size={15} />
                      Share to Chat
                    </button>
                    {hasNext && (
                      <button
                        type="button"
                        data-ocid="player.next_button"
                        onClick={playNextInPlaylist}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all active:opacity-70"
                        style={{
                          backgroundColor: C.lime,
                          color: C.bg,
                          boxShadow: "0 0 8px rgba(170,255,0,0.3)",
                        }}
                      >
                        <SkipForward size={15} />
                        Next
                      </button>
                    )}
                  </div>
                </div>

                {/* Up Next Queue */}
                {hasNext && (
                  <div
                    className="mx-4 mb-6 rounded-2xl overflow-hidden"
                    style={{
                      border: "1px solid #2a2a2a",
                      backgroundColor: C.surface,
                    }}
                  >
                    {/* Section header */}
                    <div
                      className="flex items-center gap-2 px-4 py-3"
                      style={{ borderBottom: "1px solid #1e1e1e" }}
                    >
                      <SkipForward size={14} style={C.metalText} />
                      <span
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={C.metalText}
                      >
                        Up Next
                      </span>
                      <span
                        className="ml-auto text-xs rounded-full px-2 py-0.5"
                        style={{
                          backgroundColor: C.surface2,
                          color: C.metal,
                          border: "1px solid #3a3a3a",
                        }}
                      >
                        {upNextItems.length}
                      </span>
                    </div>

                    {/* List */}
                    <div data-ocid="player.upcoming_list">
                      {upNextItems.map((video, idx) => (
                        <motion.button
                          key={video.videoId}
                          type="button"
                          data-ocid={`player.upcoming_item.${idx + 1}`}
                          onClick={() => {
                            const newIndex =
                              (currentPlaylistContext?.index ?? 0) + 1 + idx;
                            openVideo(video, {
                              ...(currentPlaylistContext as PlaylistContext),
                              index: newIndex,
                            });
                          }}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04, duration: 0.2 }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all active:opacity-70"
                          style={{
                            borderBottom:
                              idx < upNextItems.length - 1
                                ? "1px solid #1a1a1a"
                                : "none",
                          }}
                        >
                          {/* Queue number */}
                          <span
                            className="flex-shrink-0 w-5 text-center text-xs font-bold"
                            style={C.dimText}
                          >
                            {idx + 1}
                          </span>

                          {/* Thumbnail */}
                          <div
                            className="relative flex-shrink-0 w-14 rounded-lg overflow-hidden"
                            style={{ aspectRatio: "16/9" }}
                          >
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                              <Play
                                size={12}
                                style={{ color: C.lime }}
                                className="ml-0.5"
                              />
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p
                              className="text-xs font-semibold leading-tight line-clamp-2 mb-0.5"
                              style={C.limeText}
                              // biome-ignore lint/security/noDangerouslySetInnerHtml: YouTube API returns HTML entities
                              dangerouslySetInnerHTML={{ __html: video.title }}
                            />
                            <p className="text-xs truncate" style={C.metalText}>
                              {video.channelTitle}
                            </p>
                          </div>

                          <ChevronRight size={14} style={C.dimText} />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Search Tab */}
            {activeTab === "search" && !selectedVideo && (
              <motion.div
                key="search-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 overflow-y-auto"
              >
                <AnimatePresence mode="wait">
                  {/* Loading */}
                  {showLoading && (
                    <motion.div
                      key="loading"
                      data-ocid="search.loading_state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-20 gap-4"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: C.surface,
                          border: C.borderMetal,
                        }}
                      >
                        <Loader2
                          size={24}
                          className="spinner"
                          style={C.limeText}
                        />
                      </div>
                      <p className="text-sm" style={C.metalText}>
                        Searching YouTube...
                      </p>
                    </motion.div>
                  )}

                  {/* Error */}
                  {showError && (
                    <motion.div
                      key="error"
                      data-ocid="search.error_state"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-20 gap-3 px-6 text-center"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "rgba(255,68,68,0.12)",
                          border: "1px solid #ff4444",
                        }}
                      >
                        <AlertCircle size={24} style={{ color: "#ff4444" }} />
                      </div>
                      <p className="font-semibold" style={C.limeText}>
                        Search failed
                      </p>
                      <p className="text-sm" style={C.metalText}>
                        {errorMsg}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleSearch()}
                        className="mt-2 px-5 py-2 rounded-xl text-sm font-semibold"
                        style={{ backgroundColor: C.lime, color: C.bg }}
                      >
                        Try again
                      </button>
                    </motion.div>
                  )}

                  {/* Idle */}
                  {showIdle && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-20 gap-4 px-6 text-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2.5,
                          ease: "easeInOut",
                        }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center lime-glow"
                        style={{
                          backgroundColor: C.surface,
                          border: C.borderMetal,
                        }}
                      >
                        <Youtube size={32} style={C.limeText} />
                      </motion.div>
                      <div>
                        <p
                          className="font-semibold text-base mb-1"
                          style={C.limeText}
                        >
                          Search for music &amp; videos
                        </p>
                        <p className="text-sm" style={C.metalText}>
                          Type a keyword, artist, or topic
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Results */}
                  {showResults && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {videos.length === 0 ? (
                        <div
                          data-ocid="search.empty_state"
                          className="flex flex-col items-center justify-center py-20 gap-3 text-center px-6"
                        >
                          <SearchX size={36} style={C.metalText} />
                          <p className="font-semibold" style={C.limeText}>
                            No results found
                          </p>
                          <p className="text-sm" style={C.metalText}>
                            Try a different keyword
                          </p>
                        </div>
                      ) : (
                        <div data-ocid="results.list" className="py-2">
                          {videos.map((video, idx) => (
                            <motion.div
                              key={video.videoId}
                              data-ocid={`results.item.${idx + 1}`}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.04, duration: 0.2 }}
                              className="video-card flex items-center gap-3 px-4 py-3"
                              style={{
                                borderBottom:
                                  idx < videos.length - 1
                                    ? "1px solid #1a1a1a"
                                    : "none",
                              }}
                            >
                              {/* Thumbnail */}
                              <button
                                type="button"
                                onClick={() => openVideo(video)}
                                className="relative flex-shrink-0 w-20 rounded-lg overflow-hidden"
                                style={{ aspectRatio: "16/9" }}
                              >
                                <img
                                  src={video.thumbnail}
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                                  <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: C.lime }}
                                  >
                                    <Play
                                      size={12}
                                      className="ml-0.5"
                                      style={{ color: C.bg }}
                                    />
                                  </div>
                                </div>
                              </button>

                              {/* Info */}
                              <button
                                type="button"
                                onClick={() => openVideo(video)}
                                className="flex-1 min-w-0 text-left"
                              >
                                <p
                                  className="text-sm font-semibold leading-tight line-clamp-2 mb-0.5"
                                  style={C.limeText}
                                  // biome-ignore lint/security/noDangerouslySetInnerHtml: YouTube API returns HTML entities
                                  dangerouslySetInnerHTML={{
                                    __html: video.title,
                                  }}
                                />
                                <p
                                  className="text-xs truncate"
                                  style={C.metalText}
                                >
                                  {video.channelTitle}
                                </p>
                              </button>

                              {/* Action buttons */}
                              <div className="flex-shrink-0 flex items-center gap-1">
                                <button
                                  type="button"
                                  data-ocid={`results.favorite_button.${idx + 1}`}
                                  onClick={() => {
                                    lib.toggleFavorite(video);
                                    toast(
                                      lib.isFavorite(video.videoId)
                                        ? "Removed from favorites"
                                        : "Saved to favorites ♥",
                                    );
                                  }}
                                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:opacity-60"
                                  style={{
                                    backgroundColor: C.surface2,
                                    border: C.border,
                                  }}
                                >
                                  <Heart
                                    size={14}
                                    style={{
                                      color: lib.isFavorite(video.videoId)
                                        ? "#ef4444"
                                        : C.metal,
                                    }}
                                    fill={
                                      lib.isFavorite(video.videoId)
                                        ? "#ef4444"
                                        : "none"
                                    }
                                  />
                                </button>

                                <button
                                  type="button"
                                  data-ocid={`results.add_to_playlist_button.${idx + 1}`}
                                  onClick={() => setAddToPlaylistVideo(video)}
                                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:opacity-60"
                                  style={{
                                    backgroundColor: C.surface2,
                                    border: C.border,
                                  }}
                                >
                                  <ListPlus size={14} style={C.metalText} />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Library Tab */}
            {activeTab === "library" && !selectedVideo && (
              <motion.div
                key="library-tab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 overflow-y-auto"
              >
                <AnimatePresence mode="wait">
                  {/* Playlist Detail */}
                  {libraryView === "playlist" && openPlaylist ? (
                    <motion.div
                      key={`playlist-detail-${openPlaylist.id}`}
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={{
                        type: "spring",
                        damping: 28,
                        stiffness: 280,
                      }}
                      className="flex flex-col"
                    >
                      <div
                        className="flex items-center gap-3 px-4 py-3"
                        style={{ borderBottom: "1px solid #2a2a2a" }}
                      >
                        <button
                          type="button"
                          data-ocid="playlist.back_button"
                          onClick={() => {
                            setLibraryView("main");
                            setOpenPlaylistId(null);
                          }}
                          style={C.limeText}
                        >
                          <ArrowLeft size={20} />
                        </button>
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-semibold text-base truncate"
                            style={C.limeText}
                          >
                            {openPlaylist.name}
                          </p>
                          <p className="text-xs" style={C.metalText}>
                            {openPlaylist.items.length} videos
                          </p>
                        </div>
                        {openPlaylist.items.length > 0 && (
                          <button
                            type="button"
                            data-ocid="playlist.play_all_button"
                            onClick={() => {
                              const firstVideo = openPlaylist.items[0];
                              if (firstVideo) {
                                openVideo(firstVideo, {
                                  playlistId: openPlaylist.id,
                                  items: openPlaylist.items,
                                  index: 0,
                                });
                              }
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold"
                            style={{ backgroundColor: C.lime, color: C.bg }}
                          >
                            <PlayCircle size={14} />
                            Play All
                          </button>
                        )}
                      </div>

                      {openPlaylist.items.length === 0 ? (
                        <div
                          data-ocid="playlist.empty_state"
                          className="flex flex-col items-center justify-center py-16 gap-3 text-center px-6"
                        >
                          <ListPlus size={32} style={C.metalText} />
                          <p className="font-semibold" style={C.limeText}>
                            Playlist is empty
                          </p>
                          <p className="text-sm" style={C.metalText}>
                            Search for videos and add them here
                          </p>
                        </div>
                      ) : (
                        <div>
                          {openPlaylist.items.map((video, idx) => (
                            <div
                              key={video.videoId}
                              data-ocid={`playlist.item.${idx + 1}`}
                              className="flex items-center gap-3 px-4 py-3"
                              style={{
                                borderBottom:
                                  idx < openPlaylist.items.length - 1
                                    ? "1px solid #1a1a1a"
                                    : "none",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  openVideo(video, {
                                    playlistId: openPlaylist.id,
                                    items: openPlaylist.items,
                                    index: idx,
                                  })
                                }
                                className="relative flex-shrink-0 w-16 rounded-lg overflow-hidden"
                                style={{ aspectRatio: "16/9" }}
                              >
                                <img
                                  src={video.thumbnail}
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  openVideo(video, {
                                    playlistId: openPlaylist.id,
                                    items: openPlaylist.items,
                                    index: idx,
                                  })
                                }
                                className="flex-1 min-w-0 text-left"
                              >
                                <p
                                  className="text-sm font-semibold leading-tight line-clamp-2 mb-0.5"
                                  style={C.limeText}
                                  // biome-ignore lint/security/noDangerouslySetInnerHtml: YouTube API returns HTML entities
                                  dangerouslySetInnerHTML={{
                                    __html: video.title,
                                  }}
                                />
                                <p className="text-xs" style={C.metalText}>
                                  {video.channelTitle}
                                </p>
                              </button>
                              <button
                                type="button"
                                data-ocid={`playlist.delete_button.${idx + 1}`}
                                onClick={() =>
                                  lib.removeFromPlaylist(
                                    openPlaylist.id,
                                    video.videoId,
                                  )
                                }
                                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-opacity active:opacity-60"
                                style={{
                                  backgroundColor: C.surface2,
                                  border: C.border,
                                }}
                              >
                                <Trash2 size={13} style={C.metalText} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    /* Library Main View */
                    <motion.div
                      key="library-main"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-0"
                    >
                      {/* Favorites Section */}
                      <section className="px-4 pt-4 pb-2">
                        <h2
                          className="text-xs font-semibold uppercase tracking-widest mb-3"
                          style={C.metalText}
                        >
                          Favorites
                        </h2>
                        {lib.favorites.length === 0 ? (
                          <div
                            data-ocid="favorites.empty_state"
                            className="flex flex-col items-center justify-center py-8 gap-2 text-center"
                            style={{
                              backgroundColor: C.surface,
                              borderRadius: "12px",
                              border: C.border,
                            }}
                          >
                            <Heart size={24} style={C.metalText} />
                            <p className="text-sm" style={C.metalText}>
                              No favorites yet — tap ♥ on any video
                            </p>
                          </div>
                        ) : (
                          <div
                            data-ocid="favorites.list"
                            className="flex flex-col"
                          >
                            {lib.favorites.map((video, idx) => (
                              <div
                                key={video.videoId}
                                data-ocid={`favorites.item.${idx + 1}`}
                                className="flex items-center gap-3 py-2.5"
                                style={{
                                  borderBottom:
                                    idx < lib.favorites.length - 1
                                      ? "1px solid #1a1a1a"
                                      : "none",
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => openVideo(video)}
                                  className="relative flex-shrink-0 w-16 rounded-lg overflow-hidden"
                                  style={{ aspectRatio: "16/9" }}
                                >
                                  <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openVideo(video)}
                                  className="flex-1 min-w-0 text-left"
                                >
                                  <p
                                    className="text-sm font-semibold leading-tight line-clamp-2 mb-0.5"
                                    style={C.limeText}
                                    // biome-ignore lint/security/noDangerouslySetInnerHtml: YouTube API returns HTML entities
                                    dangerouslySetInnerHTML={{
                                      __html: video.title,
                                    }}
                                  />
                                  <p className="text-xs" style={C.metalText}>
                                    {video.channelTitle}
                                  </p>
                                </button>
                                <button
                                  type="button"
                                  data-ocid={`favorites.delete_button.${idx + 1}`}
                                  onClick={() =>
                                    lib.removeFromFavorites(video.videoId)
                                  }
                                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-opacity active:opacity-60"
                                  style={{
                                    backgroundColor: C.surface2,
                                    border: C.border,
                                  }}
                                >
                                  <Heart
                                    size={13}
                                    fill="#ef4444"
                                    style={{ color: "#ef4444" }}
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </section>

                      {/* Divider */}
                      <div
                        className="mx-4 my-1"
                        style={{ height: "1px", backgroundColor: "#1a1a1a" }}
                      />

                      {/* Playlists Section */}
                      <section className="px-4 pt-3 pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <h2
                            className="text-xs font-semibold uppercase tracking-widest"
                            style={C.metalText}
                          >
                            Playlists
                          </h2>
                          <button
                            type="button"
                            data-ocid="playlists.primary_button"
                            onClick={() => {
                              const name = prompt("Playlist name:");
                              if (name?.trim()) {
                                lib.createPlaylist(name.trim());
                                toast.success(
                                  `Playlist "${name.trim()}" created`,
                                );
                              }
                            }}
                            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg"
                            style={{ backgroundColor: C.lime, color: C.bg }}
                          >
                            <Plus size={12} />
                            New Playlist
                          </button>
                        </div>

                        {lib.playlists.length === 0 ? (
                          <div
                            data-ocid="playlists.empty_state"
                            className="flex flex-col items-center justify-center py-8 gap-2 text-center"
                            style={{
                              backgroundColor: C.surface,
                              borderRadius: "12px",
                              border: C.border,
                            }}
                          >
                            <ListPlus size={24} style={C.metalText} />
                            <p className="text-sm" style={C.metalText}>
                              No playlists yet — create one above
                            </p>
                          </div>
                        ) : (
                          <div
                            data-ocid="playlists.list"
                            className="flex flex-col gap-2"
                          >
                            {lib.playlists.map((pl, idx) => (
                              <div
                                key={pl.id}
                                data-ocid={`playlists.item.${idx + 1}`}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl"
                                style={{
                                  backgroundColor: C.surface2,
                                  border: C.borderMetal,
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenPlaylistId(pl.id);
                                    setLibraryView("playlist");
                                  }}
                                  className="flex-1 flex items-center gap-3 text-left min-w-0"
                                >
                                  <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 lime-glow"
                                    style={{ backgroundColor: C.lime }}
                                  >
                                    <ListPlus
                                      size={16}
                                      style={{ color: C.bg }}
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <p
                                      className="text-sm font-semibold truncate"
                                      style={C.limeText}
                                    >
                                      {pl.name}
                                    </p>
                                    <p className="text-xs" style={C.metalText}>
                                      {pl.items.length} videos
                                    </p>
                                  </div>
                                </button>
                                <button
                                  type="button"
                                  data-ocid={`playlists.delete_button.${idx + 1}`}
                                  onClick={() => {
                                    if (
                                      confirm(`Delete playlist "${pl.name}"?`)
                                    ) {
                                      lib.deletePlaylist(pl.id);
                                      toast(`Deleted "${pl.name}"`);
                                    }
                                  }}
                                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-opacity active:opacity-60"
                                  style={{
                                    backgroundColor: C.surface,
                                    border: C.border,
                                  }}
                                >
                                  <Trash2 size={14} style={C.metalText} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </section>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <nav
          className="fixed bottom-0 left-0 right-0 z-30 flex"
          style={{
            backgroundColor: "rgba(10,10,10,0.95)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid #2a2a2a",
          }}
        >
          <button
            type="button"
            data-ocid="nav.search_tab"
            onClick={() => setActiveTab("search")}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-all"
            style={{
              color: activeTab === "search" ? C.lime : C.metal,
              textShadow:
                activeTab === "search" ? "0 0 8px rgba(170,255,0,0.6)" : "none",
            }}
          >
            <Search size={20} />
            <span>Search</span>
          </button>
          <button
            type="button"
            data-ocid="nav.library_tab"
            onClick={() => setActiveTab("library")}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-all"
            style={{
              color: activeTab === "library" ? C.lime : C.metal,
              textShadow:
                activeTab === "library"
                  ? "0 0 8px rgba(170,255,0,0.6)"
                  : "none",
            }}
          >
            <Library size={20} />
            <span>Library</span>
          </button>
        </nav>

        {/* Add to Playlist Dialog */}
        <AddToPlaylistDialog
          video={addToPlaylistVideo}
          open={addToPlaylistVideo !== null}
          onClose={() => setAddToPlaylistVideo(null)}
          playlists={lib.playlists}
          createPlaylist={lib.createPlaylist}
          addToPlaylist={lib.addToPlaylist}
        />
      </div>
    </div>
  );
}
