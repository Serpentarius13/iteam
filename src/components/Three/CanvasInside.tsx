//@ts-nocheck
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { Box2, TextureLoader } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

export default function CanvasInside() {
  const myMesh = useRef();
  const colorMap = useLoader(TextureLoader, "/img/earth.png");

  const { setSize, size } = useThree();

  const resize = useCallback(() => {
    if (window.innerWidth < 900) {
      setSize(window.innerWidth / 1.2, window.innerHeight * 0.8);
    } else {
      setSize(window.innerWidth / 1.2, window.innerHeight / 1.2);
    }
  }, [setSize]);

  useEffect(() => {
    resize();

    window.addEventListener("resize", resize);
  }, [resize]);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.y += 0.005;
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />

      <mesh ref={myMesh}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </>
  );
}
