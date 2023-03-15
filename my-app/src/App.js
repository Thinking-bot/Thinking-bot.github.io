import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import './App.css';

const lyrics = `Baby, I'm preying on you tonight
Hunt you down, eat you alive
Just like animals, animals
Like animals-mals
Maybe you think that you can hide
I can smell your scent for miles
Just like animals, animals
Like animals-mals, baby, I'm...
So, what you trying to do to me?
It's like we can't stop, we're enemies
But we get along when I'm inside you, yeah
You're like a drug that's killing me
I cut you out entirely
But I get so high when I'm inside you
Yeah, you can start over, you can run free
You can find other fish in the sea
You can pretend it's meant to be
But you can't stay away from me
I can still hear you making that sound
Taking me down, rolling on the ground
You can pretend that it was me, but no, oh
Baby, I'm preying on you tonight
Hunt you down, eat you alive
Just like animals, animals
Like animals-mals
Maybe you think that you can hide
I can smell your scent for miles
Just like animals, animals
Like animals-mals, baby, I'm...
So, if I run, it's not enough
You're still in my head, forever stuck
So you can do what you wanna do, yeah
I love your lies, I'll eat 'em up
But don't deny the animal
That comes alive when I'm inside you
Yeah, you can start over, you can run free
You can find other fish in the sea
You can pretend it's meant to be
But you can't stay away from me
I can still hear you making that sound
Taking me down, rolling on the ground
You can pretend that it was me, but no, oh!
Baby, I'm preying on you tonight
Hunt you down, eat you alive
Just like animals, animals
Like animals-mals
Maybe you think that you can hide (yeah)
I can smell your scent for miles
Just like animals, animals
Like animals-mals, baby, I'm...
Don't tell no lie, lie, lie, lie
You can't deny-ny-ny-ny
The beast inside, si-si-side
Yeah, yeah, yeah
No, girl, don't lie, lie, lie, lie (no, oh-oh)
You can't deny-ny-ny-ny (you can't deny)
The beast inside, si-si-side
Yeah, yeah, yeah
Yo-oh, oh
Whoa-oh, oh-oh
Whoa-oh, oh-oh-oh
Just like animals, animals
Like animals-mals
Just like animals (yeah), animals (yeah)
Like animals-mals (yeah)
Ah-ooh!
Baby, I'm preying on you tonight
Hunt you down, eat you alive
Just like animals (yeah), animals (oh)
Like animals-mals (oh-oh)
Maybe you think that you can hide
I can smell your scent for miles (for miles)
Just like animals (yeah), animals (yeah)
Like animals-mals (oh), baby, I'm...
Don't tell no lie, lie, lie, lie
You can't deny-ny-ny-ny (oh-oh, oh, oh)
The beast inside, si-si-side
Yeah, yeah, yeah
No, girl, don't lie, lie, lie, lie (no, no, don't lie)
You can't deny-ny-ny-ny (you can't deny)
The beast inside, si-si-side
Yeah, yeah, yeah
`;

function App() {
  const [showLyrics, setShowLyrics] = useState(false);
  const playerRef = useRef(null);

  const handleButtonClick = () => {
    setShowLyrics(!showLyrics);
  };

  useEffect(() => {
    if (showLyrics) {
      playerRef.current.seekTo(0);
    }
  }, [showLyrics]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Maroon 5 - Animals</h1>
        <button onClick={handleButtonClick}>
          {showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}
        </button>
        {showLyrics && (
          <pre className="Lyrics">
            {lyrics}
          </pre>
        )}
        <ReactPlayer
          ref={playerRef}
          url="https://www.youtube.com/watch?v=qpgTC9MDx1o"
          playing={showLyrics}
          width={0}
          height={0}
          controls={false}
          loop={true}
          muted={false}
        />
      </header>
    </div>
  );
}

export default App;
