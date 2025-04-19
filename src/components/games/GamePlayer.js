"use client";
import { useEffect, useState, useRef } from "react";
import "@/app/unity.css";

import GameNavBar from "./GameNavBar";

export default function GamePlayer({ game }) {
  const [isMobile, setIsMobile] = useState(false);
  const unityInstanceRef = useRef(null);
  const scriptRef = useRef(null);
  const isInitializedRef = useRef(false);
  const unmountingRef = useRef(false);

  useEffect(() => {
    unmountingRef.current = false;
    // 이미 초기화되었다면 리턴
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    const buildUrl = game.buildPath;
    const loaderUrl = `${buildUrl}/Build.loader.js`;

    const config = {
      dataUrl: `${buildUrl}/webgl.data`,
      frameworkUrl: `${buildUrl}/build.framework.js`,
      codeUrl: `${buildUrl}/build.wasm`,
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: game.title,
      productVersion: "0.1",
      showBanner: unityShowBanner,
    };

    // 기존 인스턴스 정리
    if (unityInstanceRef.current) {
      unityInstanceRef.current.Quit();
      unityInstanceRef.current = null;
    }

    // 기존 스크립트 정리
    if (scriptRef.current) {
      document.body.removeChild(scriptRef.current);
      scriptRef.current = null;
    }

    const handleUserInteraction = () => {
      if (typeof AudioContext !== "undefined") {
        const audioContext = new AudioContext();
        audioContext.resume();
      }
    };

    const initializeUnity = () => {
      const canvas = document.querySelector("#unity-canvas");
      if (!canvas || unmountingRef.current) return;

      createUnityInstance(canvas, config, (progress) => {
        if (unmountingRef.current) return;
        const progressBar = document.querySelector("#unity-progress-bar-full");
        if (progressBar) {
          progressBar.style.width = `${100 * progress}%`;
        }
      })
        .then((instance) => {
          if (unmountingRef.current) {
            instance.Quit();
            return;
          }

          unityInstanceRef.current = instance;
          const loadingBar = document.querySelector("#unity-loading-bar");
          if (loadingBar) {
            loadingBar.style.display = "none";
          }
        })
        .catch((message) => {
          console.error("Unity 초기화 실패:", message);
        });
    };

    const script = document.createElement("script");
    scriptRef.current = script;
    script.src = loaderUrl;
    script.async = true;
    script.onload = initializeUnity;
    document.body.appendChild(script);

    // 이벤트 리스너 등록
    document.addEventListener("click", handleUserInteraction, { once: true });

    return () => {
      unmountingRef.current = true;

      document.removeEventListener("click", handleUserInteraction);

      if (unityInstanceRef.current) {
        try {
          unityInstanceRef.current.Quit();
          unityInstanceRef.current = null;
        } catch (error) {
          console.warn("Unity instance cleanup error:", error);
        }
      }

      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
        scriptRef.current = null;
      }

      isInitializedRef.current = false;

      // const setVh = () => {
      //   document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      // };

      // setVh();
      // window.addEventListener('resize', setVh);
      // return () => window.removeEventListener('resize', setVh);
    };
  }, [game]); // game prop이 변경될 때만 실행

  return (
    <div
      id="unity-container"
      className={isMobile ? "unity-mobile" : "unity-desktop"}
    >
      <GameNavBar />
      <canvas
        id="unity-canvas"
        style={{
          background: "#231F20",
          width: isMobile ? "100%" : game.width,
          height: isMobile ? "100vh" : game.height,
        }}
      />
      <div id="unity-loading-bar">
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full"></div>
        </div>
      </div>
      <div id="unity-warning"></div>
      {!isMobile && (
        <div id="unity-footer">
          <div id="unity-webgl-logo"></div>
          <div id="unity-fullscreen-button"></div>
          {/* <div id="unity-build-title">{game.title}</div> */}
        </div>
      )}
    </div>
  );
}

function unityShowBanner(msg, type) {
  const warningBanner = document.querySelector("#unity-warning");
  if (!warningBanner) return;

  const div = document.createElement("div");
  div.innerHTML = msg;
  warningBanner.appendChild(div);

  if (type === "error") {
    div.style = "background: red; padding: 10px;";
  } else if (type === "warning") {
    div.style = "background: yellow; padding: 10px;";
    setTimeout(() => {
      warningBanner.removeChild(div);
    }, 5000);
  }
}
