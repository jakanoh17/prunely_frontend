export default function AdminPlaylistManager({
  playlistUrl,
  setPlaylistUrl,
  savePlaylist,
}) {
  return (
    <div>
      <h2>Manage Playlist</h2>
      <input
        type="text"
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
        placeholder="Enter YouTube Playlist URL"
      />
      <button onClick={savePlaylist}>Save Playlist</button>
    </div>
  );
}
