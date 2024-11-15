package com.pcmplayer;

import android.media.AudioTrack;
import android.media.AudioFormat;
import android.media.AudioManager;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.LinkedList;
import java.util.Queue;

public class PCMPlayer extends ReactContextBaseJavaModule {
    private AudioTrack audioTrack;
    private Queue<byte[]> audioQueue;

    public PCMPlayer(ReactApplicationContext reactContext) {
        super(reactContext);
        audioQueue = new LinkedList<>();

        int bufferSize = AudioTrack.getMinBufferSize(
                44100,
                AudioFormat.CHANNEL_OUT_MONO,
                AudioFormat.ENCODING_PCM_16BIT
        );

        audioTrack = new AudioTrack(
                AudioManager.STREAM_MUSIC,
                44100,
                AudioFormat.CHANNEL_OUT_MONO,
                AudioFormat.ENCODING_PCM_16BIT,
                bufferSize,
                AudioTrack.MODE_STREAM
        );
        audioTrack.play();
    }

    @Override
    public String getName() {
        return "PCMPlayer";
    }

    @ReactMethod
    public void feedPCM(byte[] data) {
        audioQueue.add(data);
        if (audioQueue.size() > 10) { // Avoid overflow
            audioQueue.poll();
        }
        processQueue();
    }

    private void processQueue() {
        while (!audioQueue.isEmpty()) {
            byte[] chunk = audioQueue.poll();
            audioTrack.write(chunk, 0, chunk.length);
        }
    }
}
