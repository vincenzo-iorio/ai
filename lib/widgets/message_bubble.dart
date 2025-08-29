import 'package:flutter/material.dart';
import 'package:flutter_highlight/flutter_highlight.dart';
import '../models/chat_message.dart';
import '../themes/shinkai_neon_theme.dart'; // your neon theme map

class MessageBubble extends StatelessWidget {
  final ChatMessage message;
  const MessageBubble({super.key, required this.message});

  bool get _isCodeBlock {
    final t = message.text.trim();
    return t.startsWith("```") && t.endsWith("```");
  }

  @override
  Widget build(BuildContext context) {
    final isMine = message.isMe;
    final bubbleColor = isMine
        ? Colors.pinkAccent.withOpacity(0.15)
        : Colors.cyanAccent.withOpacity(0.15);

    Widget content;

    if (_isCodeBlock) {
      final raw = message.text.trim();
      final firstNewline = raw.indexOf('\n');
      String lang = '';
      String code = '';

      if (firstNewline != -1) {
        lang = raw.substring(3, firstNewline).trim();
        code = raw.substring(firstNewline).replaceAll('```', '').trim();
      } else {
        lang = 'plaintext';
        code = raw.replaceAll('```', '').trim();
      }

      content = SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: HighlightView(
          code,
          language: lang.isEmpty ? 'plaintext' : lang,
          theme: shinkaiNeonTheme,
          padding: const EdgeInsets.all(8),
          textStyle: const TextStyle(fontFamily: 'SourceCodePro', fontSize: 14),
        ),
      );
    } else {
      content = SelectableText(
        message.text,
        style: const TextStyle(
          color: Colors.white,
          fontWeight: FontWeight.w500,
          letterSpacing: 0.2,
        ),
      );
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 6),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center, // Center horizontally
        children: [
          ConstrainedBox(
            constraints: const BoxConstraints(
              maxWidth: 800, // adjust if you want full width
            ),
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: bubbleColor,
                borderRadius: BorderRadius.circular(14),
                boxShadow: [
                  BoxShadow(
                    color: bubbleColor.withOpacity(0.5),
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
                child: content,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
