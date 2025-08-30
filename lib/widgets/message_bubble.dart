import 'package:flutter/material.dart';
import 'package:flutter_highlight/flutter_highlight.dart';
import 'package:flutter_highlight/themes/github.dart'; // 👈 default theme
import '../models/chat_message.dart';

class MessageBubble extends StatelessWidget {
  final ChatMessage message;
  const MessageBubble({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    final isMine = message.isMe;
    final bubbleColor = isMine
        ? Colors.pinkAccent
        : const Color.fromARGB(255, 24, 116, 255);

    final segments = _parseMessage(message.text);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 6),
      child: Row(
        mainAxisAlignment: isMine
            ? MainAxisAlignment.end
            : MainAxisAlignment.start,
        children: [
          Flexible(
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
                              theme: githubTheme, // 👈 default theme here
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
                          maxLines: null,
                          textAlign: TextAlign.start,
                          textWidthBasis: TextWidthBasis.parent,
                          style: TextStyle(
                            color: isMine
                                ? Colors.cyanAccent
                                : Colors.pinkAccent,
                            fontWeight: FontWeight.bold,
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
      segments.add({'type': 'code', 'lang': lang, 'content': code});

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
