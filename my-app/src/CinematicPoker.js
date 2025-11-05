import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import gsap from 'gsap';

// Character component with facial expressions
function Character({ position, rotation, expressionState }) {
  const headRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const mouthRef = useRef();
  const leftEyebrowRef = useRef();
  const rightEyebrowRef = useRef();
  const bodyRef = useRef();

  useFrame(() => {
    if (!headRef.current) return;

    // Animate based on expression state
    switch (expressionState) {
      case 'confident':
        // Smirk - one side of mouth up
        if (mouthRef.current) {
          mouthRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.1 + 0.1;
        }
        // Eyebrows slightly raised
        if (leftEyebrowRef.current) leftEyebrowRef.current.position.y = 1.85;
        if (rightEyebrowRef.current) rightEyebrowRef.current.position.y = 1.85;
        break;

      case 'nervous':
        // Slight head shake
        headRef.current.rotation.y = Math.sin(Date.now() * 0.005) * 0.05;
        // Sweat drop animation
        if (bodyRef.current) {
          bodyRef.current.material.emissive.setHex(0x111133);
        }
        // Tense eyebrows
        if (leftEyebrowRef.current) leftEyebrowRef.current.position.y = 1.9 + Math.sin(Date.now() * 0.003) * 0.02;
        if (rightEyebrowRef.current) rightEyebrowRef.current.position.y = 1.9 + Math.sin(Date.now() * 0.003) * 0.02;
        break;

      case 'intense':
        // Wide eyes
        if (leftEyeRef.current) leftEyeRef.current.scale.y = 1.3;
        if (rightEyeRef.current) rightEyeRef.current.scale.y = 1.3;
        // Furrowed brow
        if (leftEyebrowRef.current) {
          leftEyebrowRef.current.position.y = 1.88;
          leftEyebrowRef.current.rotation.z = 0.2;
        }
        if (rightEyebrowRef.current) {
          rightEyebrowRef.current.position.y = 1.88;
          rightEyebrowRef.current.rotation.z = -0.2;
        }
        break;

      case 'shocked':
        // Wide eyes and open mouth
        if (leftEyeRef.current) leftEyeRef.current.scale.y = 1.5;
        if (rightEyeRef.current) rightEyeRef.current.scale.y = 1.5;
        if (mouthRef.current) {
          mouthRef.current.scale.set(0.6, 0.8, 0.3);
        }
        // Raised eyebrows
        if (leftEyebrowRef.current) leftEyebrowRef.current.position.y = 1.95;
        if (rightEyebrowRef.current) rightEyebrowRef.current.position.y = 1.95;
        break;

      case 'victorious':
        // Slight smile
        if (mouthRef.current) {
          mouthRef.current.scale.set(0.7, 0.3, 0.3);
          mouthRef.current.rotation.z = 0;
        }
        // Relaxed eyes
        if (leftEyeRef.current) leftEyeRef.current.scale.y = 0.9;
        if (rightEyeRef.current) rightEyeRef.current.scale.y = 0.9;
        break;

      case 'defeated':
        // Downcast look
        headRef.current.rotation.x = 0.3;
        // Droopy eyes
        if (leftEyeRef.current) leftEyeRef.current.scale.y = 0.7;
        if (rightEyeRef.current) rightEyeRef.current.scale.y = 0.7;
        // Sad eyebrows
        if (leftEyebrowRef.current) {
          leftEyebrowRef.current.position.y = 1.82;
          leftEyebrowRef.current.rotation.z = -0.15;
        }
        if (rightEyebrowRef.current) {
          rightEyebrowRef.current.position.y = 1.82;
          rightEyebrowRef.current.rotation.z = 0.15;
        }
        break;

      default:
        // Neutral
        if (leftEyeRef.current) leftEyeRef.current.scale.y = 1;
        if (rightEyeRef.current) rightEyeRef.current.scale.y = 1;
        if (leftEyebrowRef.current) {
          leftEyebrowRef.current.position.y = 1.85;
          leftEyebrowRef.current.rotation.z = 0;
        }
        if (rightEyebrowRef.current) {
          rightEyebrowRef.current.position.y = 1.85;
          rightEyebrowRef.current.rotation.z = 0;
        }
        break;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 2, 0.8]} />
        <meshStandardMaterial color="#2c3e50" roughness={0.7} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 1.5, 0]}>
        <mesh>
          <boxGeometry args={[0.9, 1.1, 0.8]} />
          <meshStandardMaterial color="#f5d3b3" roughness={0.6} />
        </mesh>

        {/* Left Eye */}
        <mesh ref={leftEyeRef} position={[-0.25, 0.2, 0.35]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.25, 0.2, 0.45]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" emissive="#000000" />
        </mesh>

        {/* Right Eye */}
        <mesh ref={rightEyeRef} position={[0.25, 0.2, 0.35]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.25, 0.2, 0.45]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" emissive="#000000" />
        </mesh>

        {/* Left Eyebrow */}
        <mesh ref={leftEyebrowRef} position={[-0.25, 1.85, 0.4]}>
          <boxGeometry args={[0.3, 0.08, 0.08]} />
          <meshStandardMaterial color="#3a3a3a" />
        </mesh>

        {/* Right Eyebrow */}
        <mesh ref={rightEyebrowRef} position={[0.25, 1.85, 0.4]}>
          <boxGeometry args={[0.3, 0.08, 0.08]} />
          <meshStandardMaterial color="#3a3a3a" />
        </mesh>

        {/* Mouth */}
        <mesh ref={mouthRef} position={[0, -0.2, 0.38]}>
          <boxGeometry args={[0.4, 0.15, 0.15]} />
          <meshStandardMaterial color="#8b4545" />
        </mesh>
      </group>

      {/* Arms */}
      <mesh position={[-0.8, 0.5, 0]}>
        <boxGeometry args={[0.3, 1.5, 0.3]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0.8, 0.5, 0]}>
        <boxGeometry args={[0.3, 1.5, 0.3]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
    </group>
  );
}

// Poker Table
function PokerTable() {
  return (
    <group>
      {/* Table top */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[3, 3, 0.2, 32]} />
        <meshStandardMaterial color="#1a4d2e" roughness={0.3} />
      </mesh>

      {/* Table edge/border */}
      <mesh position={[0, -0.35, 0]}>
        <torusGeometry args={[3, 0.15, 16, 32]} />
        <meshStandardMaterial color="#654321" roughness={0.5} />
      </mesh>

      {/* Table legs */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh
          key={i}
          position={[Math.cos(angle) * 2, -1.5, Math.sin(angle) * 2]}
        >
          <cylinderGeometry args={[0.1, 0.15, 2, 16]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}
    </group>
  );
}

// Playing Card
function PlayingCard({ position, rotation, value, color }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.9, 0.02]} />
        <meshStandardMaterial color={color === 'red' ? '#cc0000' : '#000000'} />
      </mesh>
      {/* Card back/design */}
      <mesh position={[0, 0, 0.011]}>
        <planeGeometry args={[0.5, 0.8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Value display */}
      <mesh position={[0, 0.3, 0.012]}>
        <planeGeometry args={[0.2, 0.25]} />
        <meshStandardMaterial color={color === 'red' ? '#ff0000' : '#000000'} />
      </mesh>
    </group>
  );
}

// Chip Stack
function ChipStack({ position, count, color }) {
  return (
    <group position={position}>
      {[...Array(count)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.04, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.6}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Camera Animation Controller
function CameraController({ sceneState }) {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  useEffect(() => {
    if (!cameraRef.current) return;

    const cam = cameraRef.current;

    // Define camera sequences based on scene state
    switch (sceneState) {
      case 'opening':
        // Dramatic opening shot - sweeping around the table
        gsap.to(cam.position, {
          x: 0,
          y: 5,
          z: 8,
          duration: 3,
          ease: 'power2.inOut',
        });
        gsap.to(cam.rotation, {
          x: -0.5,
          y: 0,
          z: 0,
          duration: 3,
          ease: 'power2.inOut',
        });
        break;

      case 'player1-reveal':
        // Yu-Gi-Oh style dramatic angle on player 1
        // Low angle, looking up at player 1
        gsap.to(cam.position, {
          x: -2,
          y: 1,
          z: 3,
          duration: 1.5,
          ease: 'power3.inOut',
        });
        gsap.to(cam.rotation, {
          x: 0.1,
          y: -0.5,
          z: 0,
          duration: 1.5,
          ease: 'power3.inOut',
        });
        break;

      case 'card-reveal-player1':
        // Fast sweep to slow pan across Player 1's face
        const timeline1 = gsap.timeline();
        timeline1
          .to(cam.position, {
            x: 3,
            y: 2.5,
            z: 2,
            duration: 0.8,
            ease: 'power4.in',
          })
          .to(cam.position, {
            x: -1,
            y: 2.5,
            z: 2,
            duration: 2.5,
            ease: 'power1.out',
          });
        break;

      case 'player2-reaction':
        // Dramatic push-in on Player 2
        gsap.to(cam.position, {
          x: 0,
          y: 2.5,
          z: -1.5,
          duration: 2,
          ease: 'power2.inOut',
        });
        gsap.to(cam.rotation, {
          x: 0,
          y: Math.PI,
          z: 0,
          duration: 2,
          ease: 'power2.inOut',
        });
        break;

      case 'bet-player1':
        // Yu-Gi-Oh dramatic angle - dutch angle, low shot
        gsap.to(cam.position, {
          x: -2.5,
          y: 0.5,
          z: 2,
          duration: 1.2,
          ease: 'power3.out',
        });
        gsap.to(cam.rotation, {
          x: 0.3,
          y: -0.7,
          z: -0.3,
          duration: 1.2,
          ease: 'power3.out',
        });
        break;

      case 'bet-player2':
        // Opposite dramatic angle for Player 2
        gsap.to(cam.position, {
          x: 2.5,
          y: 0.5,
          z: -2,
          duration: 1.2,
          ease: 'power3.out',
        });
        gsap.to(cam.rotation, {
          x: 0.3,
          y: Math.PI + 0.7,
          z: 0.3,
          duration: 1.2,
          ease: 'power3.out',
        });
        break;

      case 'showdown-wide':
        // Wide shot of both players
        gsap.to(cam.position, {
          x: 5,
          y: 3,
          z: 0,
          duration: 2,
          ease: 'power2.inOut',
        });
        gsap.to(cam.rotation, {
          x: -0.3,
          y: Math.PI / 2,
          z: 0,
          duration: 2,
          ease: 'power2.inOut',
        });
        break;

      case 'card-reveal-player2':
        // Slow dramatic reveal of Player 2's card
        gsap.to(cam.position, {
          x: 0,
          y: 1,
          z: -2,
          duration: 3,
          ease: 'power1.inOut',
        });
        break;

      case 'player1-defeated':
        // Close-up on Player 1's defeated face
        gsap.to(cam.position, {
          x: -1,
          y: 2.8,
          z: 2.5,
          duration: 2,
          ease: 'power2.inOut',
        });
        gsap.to(cam.rotation, {
          x: -0.1,
          y: -0.3,
          z: 0,
          duration: 2,
          ease: 'power2.inOut',
        });
        break;

      case 'player2-victorious':
        // Slow push on victorious Player 2
        gsap.to(cam.position, {
          x: 0.5,
          y: 2.5,
          z: -2,
          duration: 2.5,
          ease: 'power1.inOut',
        });
        break;

      case 'ending':
        // Pull back to reveal the whole scene
        gsap.to(cam.position, {
          x: 0,
          y: 6,
          z: 10,
          duration: 4,
          ease: 'power1.inOut',
        });
        gsap.to(cam.rotation, {
          x: -0.5,
          y: 0,
          z: 0,
          duration: 4,
          ease: 'power1.inOut',
        });
        break;

      default:
        break;
    }
  }, [sceneState, camera]);

  return null;
}

// Main Scene
function Scene() {
  const [sceneState, setSceneState] = useState('opening');
  const [player1Expression, setPlayer1Expression] = useState('neutral');
  const [player2Expression, setPlayer2Expression] = useState('neutral');

  useEffect(() => {
    // Story sequence with timing
    const sequence = [
      { time: 0, state: 'opening', p1: 'neutral', p2: 'neutral' },
      { time: 3000, state: 'player1-reveal', p1: 'confident', p2: 'neutral' },
      { time: 5000, state: 'card-reveal-player1', p1: 'confident', p2: 'neutral' },
      { time: 8000, state: 'player2-reaction', p1: 'confident', p2: 'intense' },
      { time: 11000, state: 'bet-player1', p1: 'confident', p2: 'intense' },
      { time: 13000, state: 'bet-player2', p1: 'confident', p2: 'intense' },
      { time: 15000, state: 'showdown-wide', p1: 'nervous', p2: 'intense' },
      { time: 18000, state: 'card-reveal-player2', p1: 'shocked', p2: 'intense' },
      { time: 22000, state: 'player1-defeated', p1: 'defeated', p2: 'victorious' },
      { time: 25000, state: 'player2-victorious', p1: 'defeated', p2: 'victorious' },
      { time: 28000, state: 'ending', p1: 'defeated', p2: 'victorious' },
    ];

    sequence.forEach(({ time, state, p1, p2 }) => {
      setTimeout(() => {
        setSceneState(state);
        setPlayer1Expression(p1);
        setPlayer2Expression(p2);
      }, time);
    });

    // Loop the animation
    const loopTimeout = setTimeout(() => {
      setSceneState('opening');
      setPlayer1Expression('neutral');
      setPlayer2Expression('neutral');
    }, 33000);

    return () => clearTimeout(loopTimeout);
  }, []);

  return (
    <>
      <CameraController sceneState={sceneState} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <spotLight
        position={[5, 10, 5]}
        angle={0.5}
        penumbra={1}
        intensity={1.5}
        castShadow
      />
      <spotLight
        position={[-5, 10, -5]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffaa88" />

      {/* Environment */}
      <fog attach="fog" args={['#000000', 10, 30]} />

      {/* Table */}
      <PokerTable />

      {/* Player 1 - Confident player (initially) */}
      <Character
        position={[-2, -1, 2]}
        rotation={[0, 0, 0]}
        expressionState={player1Expression}
      />

      {/* Player 2 - Mystery player */}
      <Character
        position={[2, -1, -2]}
        rotation={[0, Math.PI, 0]}
        expressionState={player2Expression}
      />

      {/* Cards */}
      <PlayingCard
        position={[-1, -0.3, 1]}
        rotation={[Math.PI / 2, 0, 0]}
        value="3"
        color="red"
      />
      <PlayingCard
        position={[1, -0.3, -1]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        value="K"
        color="black"
      />

      {/* Chip stacks */}
      <ChipStack position={[-1.5, -0.4, 0.5]} count={5} color="#ff0000" />
      <ChipStack position={[-1.2, -0.4, 0.5]} count={5} color="#0000ff" />
      <ChipStack position={[1.5, -0.4, -0.5]} count={5} color="#ff0000" />
      <ChipStack position={[1.2, -0.4, -0.5]} count={5} color="#0000ff" />

      {/* Center pot */}
      <ChipStack position={[-0.3, -0.4, 0]} count={8} color="#ffff00" />
      <ChipStack position={[0.3, -0.4, 0]} count={8} color="#ffff00" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
    </>
  );
}

// Main Component
export default function CinematicPoker() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas shadows camera={{ position: [0, 5, 8], fov: 60 }}>
        <Scene />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
          <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={3} />
          <Vignette eskil={false} offset={0.1} darkness={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
