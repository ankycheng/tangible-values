import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect } from "react";
import { Stats, PerspectiveCamera, OrbitControls, MapControls, KeyboardControls } from "@react-three/drei";

import { Physics } from '@react-three/rapier';

import Ground from './Ground';
import Person from './Person';
import NPC from './NPC';
import CameraRig from './CameraRig';

function Scene() { 

  return (
    <div id="canvas_wrapper">
      <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "w", "W"] },
        { name: "backward", keys: ["ArrowDown", "s", "S"] },
        { name: "left", keys: ["ArrowLeft", "a", "A"] },
        { name: "right", keys: ["ArrowRight", "d", "D"] },
      ]}>
      <Canvas shadows={true} tabIndex={0} >
        <color args={["#eeeeee"]} attach="background" />
        <fogExp2 attach="fog" args={["#eeeeee", 0.0003]} />
        <axesHelper args={[10]} />

        {/* Camera 🎥 */}
        {/* <PerspectiveCamera position={[0, 100, 150]} args={[60, window.innerWidth / window.innerHeight, 0.1, 4000]} makeDefault /> */}
 

        {/* Controls */}
        {/* <OrbitControls maxPolarAngle={Math.PI/2}/> */}
        {/* <OrbitControls enableZoom={false} minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI/4} /> */}
        {/* <MapControls enableZoom={false} maxPolarAngle={Math.PI/2} listenToKeyEvents={Window} /> */}

        {/* Lights 💡 */}
        <ambientLight intensity={1} />
        <directionalLight color="#ffffff" position={[50, 50, 0]} intensity={1} />

        {/* Objects 📦 */}
        <Suspense fallback={null}>
          <Physics debug>
            <Ground />

            <CameraRig>
              <Person />
              <NPC position={[70, 5, -150]} dialogue={"Hello !"} instruction={"test1 test1 test1 test1 test1 test1 test1 test1 test1 test1 test1 test1"} />
            </CameraRig>

            {/* <Person instructionCam={instructionCam}/> */}
            {/* <Person instructionCam={instructionCam} onPositionChange={(vector)=>{setPlayerPosition(vector); console.log(playerPosition)}}/> */}

            {/* <NPC position={[30, 5, -90]} dialogue={"Hello !"} instruction={"test1"} instructionCam={() => {setInstructionCam(!instructionCam); console.log(instructionCam)}}/> */}
            {/* <NPC position={[-100, 5, 10]}/> */}

          </Physics>
        </Suspense>
        <Stats />
      </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default Scene;
