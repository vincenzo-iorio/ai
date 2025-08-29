import 'package:flutter/material.dart';
import '../pages/login_page.dart';
import '../pages/settings_overlay.dart';
import '../pages/chat_page.dart';
import '../state/channel_manager.dart';

class DrawerMenu extends StatelessWidget {
  final void Function(String)? onSelectChannel;

  const DrawerMenu({super.key, this.onSelectChannel});

  @override
  Widget build(BuildContext context) {
    final channels = ChannelManager().channels;

    return Drawer(
      backgroundColor: const Color(0xFF0B0B0B),
      child: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Header
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                border: Border(
                  bottom: BorderSide(color: Colors.purpleAccent, width: 1),
                ),
              ),
              child: Row(
                children: [
                  const Icon(Icons.memory, color: Colors.cyanAccent, size: 28),
                  const SizedBox(width: 8),
                  Text(
                    "Neon Chat",
                    style: TextStyle(
                      color: Colors.cyanAccent,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.5,
                      shadows: [
                        Shadow(
                          blurRadius: 12,
                          color: Colors.cyanAccent.withOpacity(0.8),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // Channel list
            Expanded(
              child: channels.isEmpty
                  ? Center(
                      child: Text(
                        "No channels yet",
                        style: TextStyle(
                          color: Colors.white38,
                          fontSize: 16,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    )
                  : ListView.builder(
                      padding: EdgeInsets.zero,
                      itemCount: channels.length,
                      itemBuilder: (context, i) {
                        final channelName = channels[i];
                        return ListTile(
                          leading: const Icon(
                            Icons.bubble_chart,
                            color: Colors.purpleAccent,
                          ),
                          title: Text(
                            channelName,
                            style: const TextStyle(color: Colors.cyanAccent),
                          ),
                          onTap: () {
                            Navigator.pop(context);
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(
                                builder: (_) => ChatPage(
                                  channelName: channelName,
                                  startWithMessage: "Switched to $channelName",
                                ),
                              ),
                            );
                          },
                        );
                      },
                    ),
            ),

            const Divider(color: Colors.white24),

            // Settings
            ListTile(
              leading: const Icon(Icons.settings, color: Colors.pinkAccent),
              title: const Text(
                "Settings",
                style: TextStyle(color: Colors.cyanAccent),
              ),
              onTap: () {
                Navigator.pop(context);
                showDialog(
                  context: context,
                  barrierDismissible: true,
                  builder: (_) => const SettingsOverlay(),
                );
              },
            ),

            // Logout → goes to LoginPage
            ListTile(
              leading: const Icon(Icons.exit_to_app, color: Colors.pinkAccent),
              title: const Text(
                "Logout",
                style: TextStyle(color: Colors.cyanAccent),
              ),
              onTap: () {
                Navigator.pop(context);
                Navigator.pushAndRemoveUntil(
                  context,
                  MaterialPageRoute(builder: (_) => const LoginPage()),
                  (route) => false,
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
