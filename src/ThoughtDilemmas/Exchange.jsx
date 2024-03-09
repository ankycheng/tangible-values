import { useState, useRef, useEffect } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import Text from '../Text/Text';
import Sensor from '../Interaction/Sensor';
import Submit from '../Decision/Submit';
import Reset from '../Decision/Reset';
import gsap from 'gsap';

export default function Exchange(props) {
  const { position } = props;
  const[deceive, setDeceive] = useState(false)
  const[exchange, setExchange] = useState(false)

  const[confed, setConfed] = useState(null)
  const[confedState, setConfedState] = useState(false)
  const[confedText, setConfedText] = useState("null")
  const[confedText1, setConfedText1] = useState("n")

  const userFruit = useRef()
  const [userFruitPos, setUserFruitPos] = useState([position[0]-30, 5, position[2]+125])
  const confedFruit = useRef()
  const [confedFruitPos, setConfedFruitPos] = useState([position[0]+50, 1, position[2]+25])
  const [confedFruitRo, setConfedFruitRo] = useState([0, -Math.PI*0.1,0])

  const [payoutState, setPayoutState] = useState(false)
  const [resetPos, setResetPos] = useState(false)
  const [resetState, setResetState] = useState(false)

  const handleSensedChange = (option, bool) => {
    if(option == "deceive"){
      setDeceive(bool)
    } else if(option == "exchange"){
      setExchange(bool);
    } 
    // else if(option == "confed"){
    //   setConfed(bool);
    // }
  };

  useEffect(() => {
    if(resetPos == true){
      const tl = gsap.timeline();
      tl.to(confedFruit.current.parent.position, {
        x: position[0]+50, 
        z: position[2]+15, 
        duration: 7, 
        ease: "power2.inOut",
        onUpdate: () => {
          setConfedFruitPos([...confedFruit.current.parent.position]);
        }
      })
      tl.to(userFruit.current.parent.position, {
        x: position[0]-30, 
        z: position[2]+125, 
        duration: 6, 
        ease: "power2.inOut",
        onUpdate: () => {
          setUserFruitPos([...userFruit.current.parent.position]);
        }
      }, "<")
    }
  },[resetState])

  useEffect(() => {
    if(payoutState == true){
    if(confed == true){
      const tl = gsap.timeline();
      tl.to(confedFruit.current.parent.position, {
        x: position[0]-70, 
        z: position[2]+140, 
        duration: 5, 
        ease: "power2.inOut",
        onUpdate: () => {
          setConfedFruitPos([...confedFruit.current.parent.position]);
          // setConfedFruitPos(confedFruit.current.parent.position);
        }
      })
    }
    if (exchange==true) {
      const tl = gsap.timeline();
      tl.to(userFruit.current.parent.position, {
        x: position[0]+50, 
        z: position[2]+45, 
        duration: 5, 
        ease: "power2.inOut",
        onUpdate: () => {
          setUserFruitPos([...userFruit.current.parent.position]);
          // setUserFruitPos(userFruit.current.parent.position);
        }
      })
    }
  }
  },[payoutState])



  useEffect(() => {
    if(confed == true){
    const tl = gsap.timeline();
    tl.to(confedFruit.current.parent.position, {
      x: position[0], 
      z: position[2]+50, 
      duration: 5, 
      ease: "power2.inOut",
      onUpdate: () => {
        setConfedFruitPos([...confedFruit.current.parent.position]);
        // setConfedFruitPos(confedFruit.current.parent.position);
      }
    })
    tl.to(confedFruit.current.parent.rotation, {
      y: 0, 
      duration: 1, 
      ease: "power2.inOut",
      onUpdate: () => {
        setConfedFruitRo([...confedFruit.current.parent.rotation]);
        // setConfedFruitRo(confedFruit.current.parent.rotation);
      }
    }, ">-2")
    } else if (confed==false) {
      const tl = gsap.timeline();
    tl.to(confedFruit.current.parent.position, {
      x: position[0]+65, 
      z: position[2]+95, 
      duration: 5, 
      ease: "power2.inOut",
      onUpdate: () => {
        setConfedFruitPos([...confedFruit.current.parent.position]);
        // setConfedFruitPos(confedFruit.current.parent.position);
      }
    })
    tl.to(confedFruit.current.parent.rotation, {
      y: -Math.PI*0.3, 
      duration: 1, 
      ease: "power2.inOut",
      onUpdate: () => {
        setConfedFruitRo([...confedFruit.current.parent.rotation]);
        // setConfedFruitRo(confedFruit.current.parent.rotation);
      }
    }, ">-2")
    }
  },[confed, position])


  const reconcile = () => {
    setConfedState(true)
    
    if(confed == true && exchange == true){
      console.log(`equal trade: confed ${confed}, user ${exchange}`)
    } else if (confed == true && deceive == true || confed == false && exchange == true){
      console.log(`unequal trade: confed ${confed}, user ${exchange}`)
    } else if (confed == false && deceive == true){
      console.log(`no trade: confed ${confed}, user ${exchange}`)
    }

    if(confed == true){
      setConfedText("trade")
      setConfedText1("O")
    } else {
      setConfedText("deceive")
      setConfedText1("X")
    }

    setTimeout(() => {
      setPayoutState(true)
    }, 4000);

    setTimeout(() => {
      setResetState(true)
    }, 10000);
  }

  useEffect(() => {
    // console.log(confed)
    if (confed !== null) {
      reconcile();
      setResetState(false)
    }
  }, [confed]);

  const handleReset = () => {
    setConfed(null)
    setConfedState(false)
    setPayoutState(false)
    setResetPos(true)

    setResetState(false)
  }

  return (
    <>
      <Text text={`<-->`} state={true} position={[position[0]-30, 0, position[2]+50]} rotation={[-Math.PI/2, 0, 0]} />
      <Text text={`trade`} state={exchange} position={[position[0]-60, 15, position[2]+50]} />
      <Text text={`deceive`} state={deceive} position={[position[0]-60, 15, position[2]+190]} />
      <Text text={`${confedText}`} state={confedState} position={[position[0], 15, position[2]+50]} />
      <Text text={`${confedText1}`} state={confedState} position={[position[0], 5, position[2]+50]} />

      <Submit position={[position[0]-30, 0, position[2]+80]} valid={deceive || exchange} decisionType={"exchange"} decisionValue={exchange} onSubmit={(randomAssignment) => {setConfed(randomAssignment);}} errorPosition={[position[0]+40, 1, position[2]+15]}/>
      <Reset position={[position[0], 0, position[2]-100]} onReset={handleReset} resetState={resetState} />

      <Sensor type="boolean" args={[30, 20]} sensorArgs={[13, 5,9]} option="deceive" sensorPosition={[position[0]-60, 1, position[2]+190]} onSensedChange={handleSensedChange} /> 
      <Sensor type="boolean" args={[30, 20]} sensorArgs={[13, 5,9]} option="exchange" sensorPosition={[position[0]-60, 1, position[2]+50]} onSensedChange={handleSensedChange} /> 
      <Sensor type="boolean" args={[30, 20]} sensorArgs={[13, 5,9]} option="confed" sensorPosition={[position[0], 1, position[2]+50]} onSensedChange={handleSensedChange} /> 


      <RigidBody name="fruit" mass={800} gravityScale={800} type="dynamic" colliders="cuboid" position={userFruitPos} canSleep={false} lockRotations={true}>
        <mesh ref={userFruit}>
          <boxGeometry args={[15, 10, 10]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
        </mesh>
      </RigidBody>

      <RigidBody name="confedFruit" mass={800} gravityScale={800} type="dynamic" colliders="cuboid" position={confedFruitPos} rotation={confedFruitRo} canSleep={false} >
        <mesh ref = {confedFruit} >
          <boxGeometry args={[15, 10, 10]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.8} metalness={0.2} />
        </mesh>
      </RigidBody>


      <RigidBody name="wall" mass={1} type="fixed" colliders="cuboid" position={[position[0]-60, 5, position[2]+180]}>
      <mesh>
        <boxGeometry args={[40, 30, 2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0.2} />
       </mesh>
      </RigidBody>
      <RigidBody name="wall" mass={1} type="fixed" colliders="cuboid" position={[position[0]+60, 5, position[2]+100]} rotation={[0, -Math.PI*0.3,0]}>
      <mesh>
        <boxGeometry args={[40, 30, 2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} metalness={0.2} />
       </mesh>
      </RigidBody>
    </>
  );
}

