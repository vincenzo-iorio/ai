import 'package:flutter/material.dart';
import 'package:flutter_highlight/flutter_highlight.dart';
import '../models/chat_message.dart';
import '../themes/shinkai_neon_theme.dart';

class MessageBubble extends StatelessWidget {
  final ChatMessage message;
  const MessageBubble({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    final isMine = message.isMe;
    final bubbleColor = isMine
        ? Colors.pinkAccent.withOpacity(0.15)
        : Colors.cyanAccent.withOpacity(0.15);

    final segments = _parseMessage(message.text);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 6),
      child: Row(
        mainAxisAlignment: isMine
            ? MainAxisAlignment.end
            : MainAxisAlignment.start,
        children: [
          Flexible(
            // prevents overflow
            child: ConstrainedBox(
              constraints: BoxConstraints(
                maxWidth: MediaQuery.of(context).size.width * 0.9,
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
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: segments.map((seg) {
                      if (seg['type'] == 'code') {
                        return SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: ConstrainedBox(
                            constraints: BoxConstraints(
                              maxWidth:
                                  MediaQuery.of(context).size.width * 0.85,
                            ),
                            child: HighlightView(
                              seg['content'] ?? '',
                              language: seg['lang'] ?? 'plaintext',
                              theme: shinkaiNeonTheme,
                              padding: const EdgeInsets.all(8),
                              textStyle: const TextStyle(
                                fontFamily: 'SourceCodePro',
                                fontSize: 14,
                              ),
                            ),
                          ),
                        );
                      } else {
                        return SelectableText(
                          seg['content'] ?? '',
                          softWrap: true,
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w500,
                            letterSpacing: 0.2,
                          ),
                        );
                      }
                    }).toList(),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  /// Splits the message into text and code segments
  List<Map<String, String>> _parseMessage(String text) {
    final segments = <Map<String, String>>[];
    final regex = RegExp(r'```([\w+-]*)\n([\s\S]*?)```', multiLine: true);

    int lastIndex = 0;
    for (final match in regex.allMatches(text)) {
      if (match.start > lastIndex) {
        segments.add({
          'type': 'text',
          'content': text.substring(lastIndex, match.start).trim(),
        });
      }

      final lang = match.group(1)?.trim() ?? 'plaintext';
      final code = match.group(2)?.trim() ?? '';
      segments.add({
        'type': 'code',
        'lang': lang.isEmpty ? 'plaintext' : lang,
        'content': code,
      });

      lastIndex = match.end;
    }

    if (lastIndex < text.length) {
      segments.add({
        'type': 'text',
        'content': text.substring(lastIndex).trim(),
      });
    }

    return segments.where((seg) => seg['content']!.isNotEmpty).toList();
  }
}
