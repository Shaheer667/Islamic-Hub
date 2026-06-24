"use client";

import { useState } from "react";

type Props = {
  sources: string[];
};

export default function AyahAudioPlayer({ sources }: Props) {
  const [sourceIndex, setSourceIndex] = useState(0);

  if (!sources || sources.length === 0) {
    return null;
  }

  const currentSource = sources[sourceIndex];

  function handleAudioError() {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex((prev) => prev + 1);
    }
  }

  return (
    <audio
      key={currentSource}
      controls
      className="mt-5 w-full"
      onError={handleAudioError}
    >
      <source src={currentSource} type="audio/mpeg" />
    </audio>
  );
}