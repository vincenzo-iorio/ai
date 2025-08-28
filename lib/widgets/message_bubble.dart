import 'package:flutter/material.dart';

/// Simple model for a chat message.
/// You can create instances of this from anywhere in your app
/// and pass them to a MessageBubble to render.
class ChatMessage {
  final String text;
  final bool isMe;
  final String time;

  const ChatMessage({
    required this.text,
    required this.isMe,
    required this.time,
  });
}

/// A single message bubble UI element.
/// Does not fetch or manage messages — purely visual.
class MessageBubble extends StatelessWidget {
  final ChatMessage message;

  const MessageBubble({
    super.key,
    required this.message,
  });

  @override
  Widget build(BuildContext context) {
    final isMine = message.isMe;
    final align = isMine ? CrossAxisAlignment.end : CrossAxisAlignment.start;
    final bgColor = isMine ? Colors.pinkAccent : Colors.cyanAccent;
    const fgColor = Colors.black;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 6),
      child: Column(
        crossAxisAlignment: align,
        children: [
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 360),
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: bgColor,
                borderRadius: BorderRadius.circular(14),
                boxShadow: [
                  BoxShadow(
                    color: bgColor.withOpacity(0.5),
                    blurRadius: 16,
                    spreadRadius: 0.5,
                  ),
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 10,
                ),
                child: Text(
                  message.text,
                  style: const TextStyle(
                    color: fgColor,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 0.2,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 4),
          Text(
            message.time,
            style: const TextStyle(
              color: Colors.white70,
              fontSize: 11,
            ),
          ),
        ],
      ),
    );
  }
}
