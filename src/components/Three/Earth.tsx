"use client";

import { Canvas } from "@react-three/fiber";

import CanvasInside from "@/components/Three/CanvasInside";

export default function Earth() {
  return (
    <>
      <Canvas>
        <CanvasInside />
      </Canvas>
    </>
  );
}
