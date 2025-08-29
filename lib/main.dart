import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'pages/login_page.dart';
import 'pages/main_page.dart';
import 'pages/chat_page.dart';

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
