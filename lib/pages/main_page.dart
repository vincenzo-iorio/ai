import 'package:flutter/material.dart';
import 'chat_page.dart';

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Scaffold(
      backgroundColor: Colors.black,
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF050505), Color(0xFF101026)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        width: double.infinity,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Futuristic greeting in the middle
            Stack(
              alignment: Alignment.center,
              children: [
                // Stroke / outline
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

                // Inner gradient + glow
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

            // "Fake" input that triggers navigation
            GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => const ChatPage(
                      startWithMessage: "Hello!",
                    ),
                  ),
                );
              },
              child: Container(
                width:
                    isMobile ? MediaQuery.of(context).size.width * 0.9 : 500,
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(
                    color: Colors.purpleAccent,
                    width: 1.5,
                  ),
                  color: Colors.black.withOpacity(0.5),
                ),
                child: Row(
                  children: const [
                    Icon(Icons.message, color: Colors.cyanAccent),
                    SizedBox(width: 12),
                    Text(
                      "Tap here to start chatting...",
                      style: TextStyle(
                        color: Colors.white54,
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
