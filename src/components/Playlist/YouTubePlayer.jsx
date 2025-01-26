import React, { useEffect, useRef, useState } from "react";
import PlayButtonIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import PauseButtonIcon from "@mui/icons-material/PauseCircleFilledOutlined";
import RestartButtonIcon from "@mui/icons-material/ReplayCircleFilled";
import SkipButtonIcon from "@mui/icons-material/SkipNextOutlined";
import SkipPreviousButtonIcon from "@mui/icons-material/SkipPreviousOutlined";
import ShuffleButtonIcon from "@mui/icons-material/Shuffle";

export default function YouTubePlayer({ playlistId }) {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({ title: "", videoId: "" });

  const pollVideoData = (ytPlayer) => {
    const interval = setInterval(() => {
      const videoData = ytPlayer.getVideoData();
      if (videoData && videoData.title && videoData.video_id) {
        console.log("Video Data:", videoData);
        setCurrentVideo({
          title: videoData.title,
          videoId: videoData.video_id,
        });
        clearInterval(interval); // Stop polling once data is available
      }
    }, 1000); // Poll every second
  };

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player(playerRef.current, {
        height: "0", // Hide video
        width: "0", // Hide video
        playerVars: {
          listType: "playlist",
          list: playlistId,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          autoplay: 1,
        },
        events: {
          onReady: (event) => {
            const playerInstance = event.target;
            setPlayer(playerInstance);
            playerInstance.playVideo();
            pollVideoData(playerInstance); // Start polling for video data
            setIsPlaying(true);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              pollVideoData(event.target); // Poll again when playback starts
            }
          },
        },
      });
    };

    return () => {
      const scriptTag = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );
      if (scriptTag) scriptTag.remove();
    };
  }, [playlistId]);

  const fetchCurrentVideo = (ytPlayer) => {
    const videoData = ytPlayer.getVideoData();
    console.log("Video Data:", videoData);
    if (videoData) {
      setCurrentVideo({
        title: videoData.title,
        videoId: videoData.video_id,
      });
    }
  };

  const handlePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
        setIsPlaying(false);
      } else {
        player.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const handleNext = () => {
    if (player) player.nextVideo();
  };

  const handlePrevious = () => {
    if (player) player.previousVideo();
  };

  const handleRestart = () => {
    if (player) player.seekTo(0);
  };

  const handleShuffle = () => {
    if (player) player.setShuffle(true);
  };

  return (
    <div className="youtube-player youtube-player_positioning-container">
      <div className="youtube-player__data">
        {currentVideo.videoId && (
          <>
            <h3 className="youtube-playlist__title">{currentVideo.title}</h3>
            <img
              className="youtube-playlist__img"
              src={`https://img.youtube.com/vi/${currentVideo.videoId}/0.jpg`}
              alt={currentVideo.title}
            />
          </>
        )}
      </div>
      <div className="youtube-playlist__iframe" ref={playerRef}></div>

      <div className="youtube-playlst__controls">
        <button
          className="youtube-playlst__control-btn"
          onClick={handleRestart}
        >
          <RestartButtonIcon />
        </button>
        <button
          className="youtube-playlst__control-btn"
          onClick={handlePrevious}
        >
          <SkipPreviousButtonIcon />
        </button>
        <button
          className="youtube-playlst__control-btn"
          onClick={handlePlayPause}
        >
          {isPlaying ? <PauseButtonIcon /> : <PlayButtonIcon />}
        </button>
        <button className="youtube-playlst__control-btn" onClick={handleNext}>
          <SkipButtonIcon />
        </button>
        <button
          className="youtube-playlst__control-btn"
          onClick={handleShuffle}
        >
          <ShuffleButtonIcon />
        </button>
      </div>
    </div>
  );
}
