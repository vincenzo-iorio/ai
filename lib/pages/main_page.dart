import 'package:flutter/material.dart';
import 'chat_page.dart';
import '../state/channel_manager.dart';
import '../models/chat_message.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  final _input = TextEditingController();
  late String newChannelName;

  @override
  void initState() {
    super.initState();
    final channelCount = ChannelManager().channels.length + 1;
    newChannelName = "Channel #$channelCount";
    ChannelManager().addChannel(newChannelName);
  }

  void _sendMessage(String text) {
    if (text.isEmpty) return;

    final msg = ChatMessage(text: text, isMe: true, time: _nowTime());

    ChannelManager().addMessage(newChannelName, msg);
    _input.clear();

    Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => ChatPage(channelName: newChannelName)),
    );
  }

  String _nowTime() {
    final t = TimeOfDay.now();
    final mm = t.minute.toString().padLeft(2, '0');
    return "${t.hour}:$mm";
  }

  @override
  void dispose() {
    _input.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Scaffold(
      backgroundColor: Colors.black,
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF050505), Color(0xFF101026)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Futuristic greeting
              Stack(
                alignment: Alignment.center,
                children: [
                  Text(
                    "WELCOME TO SHINKAI SYSTEMS, USER",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: isMobile ? 22 : 26,
                      fontWeight: FontWeight.w900,
                      letterSpacing: 2.0,
                      foreground: Paint()
                        ..style = PaintingStyle.stroke
                        ..strokeWidth = 2
                        ..color = Colors.pinkAccent.withOpacity(0.9),
                    ),
                  ),
                  ShaderMask(
                    shaderCallback: (bounds) => const LinearGradient(
                      colors: [Colors.cyanAccent, Colors.pinkAccent],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ).createShader(bounds),
                    blendMode: BlendMode.srcIn,
                    child: Text(
                      "WELCOME TO SHINKAI SYSTEMS, USER",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: isMobile ? 22 : 26,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 2.0,
                        color: Colors.white,
                        shadows: [
                          Shadow(
                            blurRadius: 12,
                            color: Colors.cyanAccent.withOpacity(0.8),
                          ),
                          Shadow(
                            blurRadius: 24,
                            color: Colors.pinkAccent.withOpacity(0.5),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 40),

              // Centered input bar (ChatPage style)
              Container(
                padding: EdgeInsets.all(isMobile ? 6 : 8),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.85),
                  border: Border.all(color: Colors.purpleAccent, width: 1.5),
                  borderRadius: BorderRadius.circular(14),
                ),
                width: isMobile ? MediaQuery.of(context).size.width * 0.9 : 600,
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _input,
                        style: const TextStyle(color: Colors.cyanAccent),
                        decoration: const InputDecoration(
                          hintText: "Type a message...",
                          hintStyle: TextStyle(color: Colors.white54),
                          border: InputBorder.none,
                        ),
                        onSubmitted: (value) {
                          _sendMessage(value.trim());
                        },
                      ),
                    ),
                    const SizedBox(width: 10),
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.pinkAccent,
                        foregroundColor: Colors.black,
                        padding: EdgeInsets.symmetric(
                          horizontal: isMobile ? 12 : 16,
                          vertical: isMobile ? 12 : 14,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      onPressed: () {
                        _sendMessage(_input.text.trim());
                      },
                      icon: const Icon(Icons.send),
                      label: const Text("Send"),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
