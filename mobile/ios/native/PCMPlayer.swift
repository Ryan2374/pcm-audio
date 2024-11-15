import Foundation
import AVFoundation

@objc(PCMPlayer)
class PCMPlayer: NSObject {
    private var audioEngine = AVAudioEngine()
    private var playerNode = AVAudioPlayerNode()
    private var audioFormat: AVAudioFormat

    override init() {
        audioFormat = AVAudioFormat(standardFormatWithSampleRate: 44100, channels: 1)
        audioEngine.attach(playerNode)
        audioEngine.connect(playerNode, to: audioEngine.mainMixerNode, format: audioFormat)
        try! audioEngine.start()
    }

    @objc func feedPCM(_ data: Data) {
        let buffer = AVAudioPCMBuffer(pcmFormat: audioFormat, frameCapacity: UInt32(data.count / 2))!
        buffer.frameLength = buffer.frameCapacity
        let channelData = buffer.int16ChannelData![0]
        data.copyBytes(to: channelData, count: data.count)
        playerNode.scheduleBuffer(buffer)
        if !playerNode.isPlaying {
            playerNode.play()
        }
    }
}
