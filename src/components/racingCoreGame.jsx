import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";

const RacingCoreGame = () => {
  return (
    <Unity
      unityContent={
        new UnityContent(
          "/games/Racing Core/WebGL.json",
          "/games/Racing Core/UnityLoader.js"
        )
      }
    />
  );
};

export default RacingCoreGame;
