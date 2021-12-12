import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";

import { ChatText, Envelope, Telephone, Whatsapp } from "react-bootstrap-icons";

import { Player } from "./Player";

import styles from "./App.module.css";

const MAIN_STREAM = "https://stream.radioskonto.lv:8443/stereo";
const SECONDARY_STREAM = "https://stream.radioskonto.lv:8443/rs";

const STREAMS = [MAIN_STREAM, SECONDARY_STREAM];

const useAudio = () => {
  const audio = useRef(null);

  const [activePlayer, setActivePlayer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerVolume, setPlayerVolume] = useState({ 0: 1, 1: 1 });

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

  const toggleStream = async (id) => {
    if (activePlayer === id) {
      if (isPlaying) {
        // eslint-disable-next-line
        audio.current.src = audio.current.src;
        await audio.current.pause();
      } else {
        await audio.current.play();
      }
      return;
    }

    await audio.current.pause();
    audio.current.src = STREAMS[id];
    setActivePlayer(id);
    setTimeout(() => {
      audio.current.play();
      audio.current.volume = playerVolume[id];
    }, 100);
  };

  const setVolume = (id, vol) => {
    setPlayerVolume({ ...playerVolume, [id]: vol });
    audio.current.volume = vol;
  };

  return {
    activePlayer,
    isPlaying,
    toggleStream,
    setVolume,
  };
};

const App = () => {
  const { activePlayer, isPlaying, toggleStream, setVolume } = useAudio();

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <header className={styles.header}>RADIO SKONTO</header>
        <section className={styles.players}>
          <div className={classNames(styles.player, styles.withMargin)}>
            <Player
              id={0}
              title="107.2"
              toggleStream={toggleStream}
              isPlaying={isPlaying}
              isActive={activePlayer === 0}
              setVolume={setVolume}
            />
            <div className={styles.contacts}>
              <a href="tel:67228855" className={styles.contact}>
                <Telephone />
                <span className={styles.label}>67 22 88 55</span>
              </a>
              <span className={styles.contact}>
                <a href="sms:27228855">
                  <ChatText />
                  <span className={styles.label}>27 22 88 55</span>
                </a>
              </span>
              <span className={styles.contact}>
                <a
                  href="https://wa.me/37127228855"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Whatsapp className={styles.whatsApp} />
                  <span className={styles.label}>27 22 88 55</span>
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
          <div className={styles.player}>
            <Player
              id={1}
              title="LV"
              toggleStream={toggleStream}
              isPlaying={isPlaying}
              isActive={activePlayer === 1}
              setVolume={setVolume}
            />
            <div className={styles.contacts}>
              <a href="tel:27292729" className={styles.contact}>
                <Telephone />
                <span className={styles.label}>2729 2729</span>
              </a>
              <span className={styles.contact}>
                <a href="sms:27292729">
                  <ChatText />
                  <span className={styles.label}>2729 2729</span>
                </a>
              </span>
              <span className={styles.contact}>
                <a
                  href="https://wa.me/37127292729"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Whatsapp className={styles.whatsApp} />
                  <span className={styles.label}>2729 2729</span>
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
          ja neko nedzirdi, raksti uz&nbsp;
          <a href="mailto: nedzirdu@radioskonto.lv">nedzirdu@radioskonto.lv</a>
        </div>
      </div>
    </div>
  );
};

export default App;
