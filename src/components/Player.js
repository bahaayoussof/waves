import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Player = props => {
	// destructuring props
	const { currentSong, isPlaying, setIsPlaying } = props;

	// State
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});

	// Refs
	const audioRef = React.useRef(null);

	// Event Handlers

	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const timeUpdateHandler = e => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;

		setSongInfo({ ...songInfo, currentTime, duration });
	};

	const getTime = time => {
		return Math.floor(time / 60) + ":" + "0" + Math.floor(time % 60);
	};

	const dragHandler = e => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.duration}
					value={songInfo.currentTime}
					type="range"
					onChange={dragHandler}
				/>
				<p>{getTime(songInfo.duration)}</p>
			</div>

			<div className="play-control">
				<FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
				<FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={!isPlaying? faPlay : faPause} />
				<FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
			</div>
			<audio
				ref={audioRef}
				onLoadedMetadata={timeUpdateHandler}
				onTimeUpdate={timeUpdateHandler}
				src={currentSong.audio}
			></audio>
		</div>
	);
};

export default Player;
