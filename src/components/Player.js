import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Player = props => {
	// destructuring props
	const { audioRef, currentSong, isPlaying, setIsPlaying, songInfo, setSongInfo } = props;

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
					max={songInfo.duration || 0}
					value={songInfo.currentTime}
					type="range"
					onChange={dragHandler}
				/>
				<p>{getTime(songInfo.duration)}</p>
			</div>

			<div className="play-control">
				<FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					size="2x"
					icon={!isPlaying ? faPlay : faPause}
				/>
				<FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
			</div>
		</div>
	);
};

export default Player;
