import '../models/chat_message.dart';

class ChannelManager {
  static final ChannelManager _instance = ChannelManager._internal();
  factory ChannelManager() => _instance;
  ChannelManager._internal();

  final List<String> _channels = [];
  final Map<String, List<ChatMessage>> _channelMessages = {};

  List<String> get channels => List.unmodifiable(_channels);

  void addChannel(String name) {
    if (!_channels.contains(name)) {
      _channels.add(name);
      _channelMessages[name] = [];
    }
  }

  List<ChatMessage> getMessages(String channel) {
    return _channelMessages[channel] ?? [];
  }

  void addMessage(String channel, ChatMessage message) {
    _channelMessages[channel]?.add(message);
  }

  void clearMessages(String channel) {
    _channelMessages[channel]?.clear();
  }

  void clearAll() {
    _channels.clear();
    _channelMessages.clear();
  }
}
