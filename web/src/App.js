import { useEffect, useState } from 'react';
import PCMPlayer from './player';

function App() {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const player = new PCMPlayer({
            encoding: '16bitInt',
            channels: 1,
            sampleRate: 44100,
        });

        const ws = new WebSocket('ws://localhost:8080');
        ws.binaryType = 'arraybuffer';

        ws.onmessage = (event) => {
            player.feed(event.data);
        };

        ws.onerror = () => console.error('WebSocket Error');
        ws.onclose = () => console.log('WebSocket Closed');

        setIsPlaying(true);

        return () => {
            ws.close();
            setIsPlaying(false);
        };
    }, []);

    return <h1>{isPlaying ? 'Playing PCM Audio...' : 'Stopped'}</h1>;
}

export default App;
