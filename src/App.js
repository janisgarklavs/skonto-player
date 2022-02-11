import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";

import { ChatText, Envelope, Telephone, Whatsapp } from "react-bootstrap-icons";

import { Player } from "./Player";

import logoSrc from "./logo.png";

import styles from "./App.module.css";

const MAIN_STREAM = "https://stream.radioskonto.lv:8443/stereo";

const useAudio = () => {
  const audio = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [_, setPlayerVolume] = useState(1);

  useEffect(() => {
    audio.current = new Audio(MAIN_STREAM);

    audio.current.play();

    audio.current.addEventListener("playing", () => setIsPlaying(true));
    audio.current.addEventListener("emptied", () => setIsPlaying(false));

    return () => {
      audio.current.removeEventListener("playing", () => setIsPlaying(true));
      audio.current.removeEventListener("emptied", () => setIsPlaying(false));
    };
  }, []);

  const toggleStream = async () => {
    if (isPlaying) {
      // eslint-disable-next-line
      audio.current.src = audio.current.src;
      await audio.current.pause();
    } else {
      await audio.current.play();
    }
  };

  const setVolume = (vol) => {
    setPlayerVolume(vol);
    audio.current.volume = vol;
  };

  return {
    isPlaying,
    toggleStream,
    setVolume,
  };
};

const App = () => {
  const { isPlaying, toggleStream, setVolume } = useAudio();

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <img src={logoSrc} width={200} alt="Radio Skonto Logo" />
        </header>
        <section className={styles.players}>
          <div className={styles.player}>
            <Player
              title="RADIO SKONTO"
              toggleStream={toggleStream}
              isActive={isPlaying}
              isPlaying={isPlaying}
              setVolume={setVolume}
            />
            <div className={styles.contacts}>
              <a href="tel:67228855" className={styles.contact}>
                <Telephone />
                <span className={styles.label}>6722 8855</span>
              </a>
              <span className={styles.contact}>
                <a href="sms:27228855">
                  <ChatText />
                  <span className={styles.label}>2722 8855</span>
                </a>
              </span>
              <span className={styles.contact}>
                <a
                  href="https://wa.me/37127228855"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Whatsapp className={styles.whatsApp} />
                  <span className={styles.label}>2722 8855</span>
                </a>
              </span>
              <a
                href="mailto:studija@radioskonto.lv"
                className={styles.contact}
              >
                <Envelope className={styles.envelope} />
                <span className={classNames(styles.label, styles.email)}>
                  studija@radioskonto.lv
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.footer}>
        <div>
          Ja neko nedzirdi, raksti uz&nbsp;
          <a href="mailto: nedzirdu@radioskonto.lv">nedzirdu@radioskonto.lv</a>
        </div>
      </div>
    </div>
  );
};

export default App;
