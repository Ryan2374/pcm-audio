import React, { useEffect } from 'react';
import { NativeModules } from 'react-native';

const { PCMPlayer } = NativeModules;

export default function App() {
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.binaryType = 'arraybuffer';

        ws.onmessage = (event) => {
            PCMPlayer.feedPCM(event.data);
        };

        ws.onerror = () => console.error('WebSocket Error');
        ws.onclose = () => console.log('WebSocket Closed');
    }, []);

    return null; // Minimal interface for testing
}
