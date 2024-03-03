import { useState, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Vector3, Plane } from "three";

import DragObj from './DragObj';
import Text from './Text';
import NumSensor from './NumSensor';

function NumSensorMult({role, position, handleSensedChange}){
  return(
    <>
      <NumSensor role={role} number={0} sensorPosition={[position[0]-54, 0, position[2]-45]} onSensedChange={handleSensedChange}/>
      <NumSensor role={role} number={1} sensorPosition={[position[0]-44, 0, position[2]-27]} onSensedChange={handleSensedChange}/>
      <NumSensor role={role} number={2} sensorPosition={[position[0]-34, 0, position[2]-12]} onSensedChange={handleSensedChange}/>
      <NumSensor role={role} number={3} sensorPosition={[position[0]-21, 0, position[2]-4]} onSensedChange={handleSensedChange}/>
      <NumSensor role={role} number={4} sensorPosition={[position[0]-7, 0, position[2]+0]} onSensedChange={handleSensedChange}/>
      
      <NumSensor role={role} number={5} sensorPosition={[position[0]+7, 0, position[2]+0]} onSensedChange={handleSensedChange}/>
      <NumSensor role={role} number={6} sensorPosition={[position[0]+21, 0, position[2]-4]} onSensedChange={handleSensedChange}/>
      <NumSensor role={role} number={7} sensorPosition={[position[0]+34, 0, position[2]-12]} onSensedChange={handleSensedChange}/>
      <NumSensor role={role} number={8} sensorPosition={[position[0]+44, 0, position[2]-27]} onSensedChange={handleSensedChange}/>
      <NumSensor role={role} number={9} sensorPosition={[position[0]+54, 0, position[2]-45]} onSensedChange={handleSensedChange}/>
    </>
  )
}

function CoinMult({position, setDragState, floorPlane}){
  return(
    <>
      <DragObj name="coin" startPosition={[position[0]-10, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-5, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-0, 1, position[2]-15]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+5, 1, position[2]-12]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-0, 1, position[2]-5]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+5, 1, position[2]+0]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-10, 1, position[2]-9]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-5, 1, position[2]-11]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]+10, 1, position[2]+4]} state={setDragState} plane={floorPlane} lift={10}/>
      <DragObj name="coin" startPosition={[position[0]-0, 1, position[2]+5]} state={setDragState} plane={floorPlane} lift={10}/>
    </>
  )
}

export default function Trust(props) {
  const { position } = props;
  const floorPlane = new Plane(new Vector3(0, 1, 0),0);
  const [dragState, setDragState] = useState(false);
  const [confedSensors, setConfedSensors] = useState({});
  const [userSensors, setUserSensors] = useState({});
  const [confedCounter, setConfedCounter] = useState(0);
  const [userCounter, setUserCounter] = useState(0);

    const handleSensedChange = (role, number, count) => {
      if(role == "confed"){
        setConfedSensors((prevSensors) => ({
          ...prevSensors,
          [number]:count,
        }));
      } else if(role == "user"){
        setUserSensors((prevSensors) => ({
          ...prevSensors,
          [number]:count,
        }));
      }
    };

    useEffect(() => {
    //acutal total sensed
      // const totalSensed = Object.values(sensors).reduce((acc, currentValue) => acc + currentValue, 0);
    //max 1 sensed allowed in each sensor 
      const totalConfedSensed = Object.values(confedSensors).map(value => Math.min(value, 1)).reduce((acc, currentValue) => acc + currentValue, 0);
      setConfedCounter(totalConfedSensed);

      //max 1 sensed
      // const totalUserSensed = Object.values(userSensors).map(value => Math.min(value, 1)).reduce((acc, currentValue) => acc + currentValue, 0);
      //total sensed
      // const totalUserSensed = Object.values(userSensors).reduce((acc, currentValue) => acc + currentValue, 0);
      // setUserCounter(totalUserSensed);
    }, [confedSensors, userSensors]);

  return (
    <>
      <Text text={`${confedCounter}`} state={true} position={[position[0], 0, position[2]+50]} rotation={[-Math.PI*0.1, 0, 0]}/>
      <Text text={`remaining: ${userCounter}`} state={true} position={[position[0]-17, 2, position[2]+170]} rotation={[-Math.PI*0.1, 0, 0]}/>



      <NumSensorMult role="confed" position={[position[0], position[1], position[2]+80]} handleSensedChange={handleSensedChange}/>
      {/* <NumSensorMult role="user" position={[position[0], position[1], position[2]+125]} handleSensedChange={handleSensedChange}/> */}

      <RigidBody name="trust" mass={1} type="fixed" colliders={false} position={[position[0], 0, position[2]+145]} >
        <mesh position={[0, 0.5, 0]} rotation={[-Math.PI/2, 0,0]}>
          <planeGeometry args={[40, 30]} />
          <meshBasicMaterial color={"gray"}/>
        </mesh>
        <CuboidCollider sensor args={[20, 4,15] } 
          onIntersectionEnter={(payload)=>{
            if(payload.other.rigidBodyObject.name == "coin"){
              setUserCounter((value) => value + 1)
            }
          }}
          onIntersectionExit={(payload)=>{
            if(payload.other.rigidBodyObject.name == "coin"){
              setUserCounter((value) => value - 1)
            }
          }}
        />
      </RigidBody>


      <CoinMult position={[position[0], position[1], position[2]+150]} setDragState = {setDragState} floorPlane = {floorPlane}/>
    
    </>
  );
}
