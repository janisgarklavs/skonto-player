import React from "react";
import classNames from "classnames";

import { PlayIcon } from "./PlayIcon";
import { StopIcon } from "./StopIcon";

import styles from "./Player.module.css";
import { VolumeDownFill } from "react-bootstrap-icons";

export const Player = ({
  title,
  toggleStream,
  isPlaying,
  isActive,
  setVolume,
}) => {
  return (
    <>
      <button
        onClick={toggleStream}
        className={classNames(styles.root, { [styles.isActive]: isActive })}
      >
        <div>
          <span className={styles.iconParent}>
            {isActive && isPlaying ? (
              <StopIcon className={styles.icon} style={{ color: "#fff" }} />
            ) : (
              <PlayIcon className={styles.icon} style={{ color: "#fff" }} />
            )}
          </span>
          {title}
        </div>
      </button>
      <div className={styles.volumeContainer}>
        <div className={styles.iconUp}>
          <VolumeDownFill />
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          onChange={(e) => setVolume(e.target.value)}
          className={classNames(styles.volume)}
          disabled={!isActive}
        />
      </div>
    </>
  );
};
