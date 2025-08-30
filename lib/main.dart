import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'pages/login_page.dart';
import 'pages/main_page.dart';
import 'pages/chat_page.dart';

/// Global configuration for your app
class AppConfig {
  /// 🔹 Paste your Azure API key here
  static const String apiKey =
      "8gqxThdqRaEhj8wtXbVVLovJ2CjEII61zQHq9FUHjg5wbkCPBDarJQQJ99BHACI8hq2XJ3w3AAAAACOG5WTz";

  /// 🔹 Azure AI Foundry endpoint
  static const String endpoint =
      "https://shinkai.services.ai.azure.com/models/chat/completions?api-version=2024-05-01-preview";
}

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const CyberpunkApp());
}

class CyberpunkApp extends StatelessWidget {
  const CyberpunkApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Cyberpunk Chat',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: Colors.black,
        textTheme: GoogleFonts.orbitronTextTheme(ThemeData.dark().textTheme),
        colorScheme: const ColorScheme.dark(
          primary: Colors.cyanAccent,
          secondary: Colors.pinkAccent,
        ),
      ),
      home: const LoginPage(),
      routes: {
        '/main': (_) => const MainPage(),
        '/chat': (_) => const ChatPage(channelName: 'General'),
      },
    );
  }
}
