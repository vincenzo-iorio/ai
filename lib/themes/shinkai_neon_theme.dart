// lib/themes/shinkai_neon_theme.dart
import 'package:flutter/material.dart';

/// Futuristic / neon syntax highlighting theme for flutter_highlight.
/// Designed to pair with Shinkai Systems' pink/cyan UI.
final Map<String, TextStyle> shinkaiNeonTheme = {
  'root': const TextStyle(
    backgroundColor: Colors.transparent,
    color: Color(0xFF00FFF7), // bright cyan default
  ),
  'keyword': const TextStyle(
    color: Color(0xFFFF00FF), // magenta
    fontWeight: FontWeight.bold,
  ),
  'built_in': const TextStyle(color: Color(0xFFFFA500)), // orange
  'type': const TextStyle(color: Color(0xFFFFA500)),
  'literal': const TextStyle(color: Color(0xFFFFA500)),
  'number': const TextStyle(color: Color(0xFFFFA500)),
  'regexp': const TextStyle(color: Color(0xFF00FF9F)), // teal-green
  'string': const TextStyle(color: Color(0xFF00FF00)), // neon green
  'subst': const TextStyle(color: Color(0xFF00FFF7)),
  'symbol': const TextStyle(color: Color(0xFF00FF9F)),
  'class': const TextStyle(
    color: Color(0xFFFF00FF),
    fontWeight: FontWeight.bold,
  ),
  'function': const TextStyle(color: Color(0xFFFFA500)),
  'title': const TextStyle(
    color: Color(0xFF00FFF7),
    fontWeight: FontWeight.bold,
  ),
  'params': const TextStyle(color: Color(0xFFCCCCCC)),
  'comment': const TextStyle(color: Color(0xFF8888FF)), // lilac
  'doctag': const TextStyle(color: Color(0xFFFF00FF)),
  'meta': const TextStyle(color: Color(0xFF00FF9F)),
  'meta-keyword': const TextStyle(color: Color(0xFFFF00FF)),
  'meta-string': const TextStyle(color: Color(0xFF00FF00)),
  'section': const TextStyle(color: Color(0xFFFF00FF)),
  'tag': const TextStyle(color: Color(0xFFFF00FF)),
  'name': const TextStyle(color: Color(0xFFFF00FF)),
  'builtin-name': const TextStyle(color: Color(0xFFFF00FF)),
  'attr': const TextStyle(color: Color(0xFFFFA500)),
  'attribute': const TextStyle(color: Color(0xFFFFA500)),
  'variable': const TextStyle(color: Color(0xFF00FFF7)),
  'bullet': const TextStyle(color: Color(0xFF00FF9F)),
  'code': const TextStyle(color: Color(0xFF00FFF7)),
  'emphasis': const TextStyle(fontStyle: FontStyle.italic),
  'strong': const TextStyle(fontWeight: FontWeight.bold),
  'formula': const TextStyle(color: Color(0xFF00FF9F)),
};
