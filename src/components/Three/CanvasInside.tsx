//@ts-nocheck
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Box2, TextureLoader } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

export default function CanvasInside() {
  const myMesh = useRef();
  const colorMap = useLoader(TextureLoader, "/img/earth.png");

  const { setSize, size } = useThree();

  useEffect(() => {
    setSize(window.innerWidth / 1.2, window.innerHeight / 1.2);

    window.addEventListener('resize', () => {
      setSize(window.innerWidth / 1.2, window.innerHeight / 1.2);

    })
  }, [setSize]);

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
