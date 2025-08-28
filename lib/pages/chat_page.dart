import 'package:flutter/material.dart';
import '../widgets/message_bubble.dart';
import '../widgets/drawer_menu.dart';
import 'main_page.dart';

class ChatPage extends StatefulWidget {
  final String? startWithMessage;

  const ChatPage({super.key, this.startWithMessage});

  @override
  State<ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  final _messages = <ChatMessage>[];
  final _input = TextEditingController();
  final _listController = ScrollController();

  @override
  void initState() {
    super.initState();

    // Optional: start with a message if provided
    if (widget.startWithMessage != null &&
        widget.startWithMessage!.trim().isNotEmpty) {
      _messages.add(ChatMessage(
        text: widget.startWithMessage!,
        isMe: true,
        time: _nowTime(),
      ));
    }
  }

  void _sendMessage(String text) {
    if (text.isEmpty) return;

    final msg = ChatMessage(
      text: text,
      isMe: true,
      time: _nowTime(),
    );

    setState(() => _messages.add(msg));
    _input.clear();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_listController.hasClients) {
        _listController.animateTo(
          _listController.position.maxScrollExtent + 72,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
        );
      }
    });
  }

  String _nowTime() {
    final t = TimeOfDay.now();
    final mm = t.minute.toString().padLeft(2, '0');
    return "${t.hour}:$mm";
  }

  @override
  void dispose() {
    _input.dispose();
    _listController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Scaffold(
      drawerEdgeDragWidth: 80,
      drawer: DrawerMenu(
        onSelectChannel: (channel) {
          Navigator.pop(context);
          ScaffoldMessenger.of(context)
              .showSnackBar(SnackBar(content: Text("Switched to $channel")));
        },
      ),
      appBar: AppBar(
        backgroundColor: Colors.black,
        elevation: 0,
        title: const Text("AI"),
        leading: Builder(
          builder: (context) {
            return IconButton(
              icon: const Icon(Icons.menu, color: Colors.pinkAccent),
              onPressed: () => Scaffold.of(context).openDrawer(),
            );
          },
        ),
        actions: [
          IconButton(
            tooltip: "New Chat",
            icon: const Icon(Icons.add_comment, color: Colors.cyanAccent),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (_) => const MainPage()),
              );
            },
          ),
        ],
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF050505), Color(0xFF101026)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Column(
          children: [
            // Message list
            Expanded(
              child: ListView.builder(
                controller: _listController,
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 16,
                ),
                itemCount: _messages.length,
                itemBuilder: (context, index) =>
                    MessageBubble(message: _messages[index]),
              ),
            ),

            // Input bar
            SafeArea(
              top: false,
              child: Container(
                padding: EdgeInsets.all(isMobile ? 6 : 8),
                decoration: BoxDecoration(
                  color: Colors.black.withOpacity(0.85),
                  border: const Border(
                    top: BorderSide(color: Colors.purpleAccent, width: 1),
                  ),
                ),
                child: Center(
                  child: ConstrainedBox(
                    constraints: BoxConstraints(
                      maxWidth: isMobile ? double.infinity : 800,
                    ),
                    child: Row(
                      children: [
                        Expanded(
                          child: Container(
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(
                                color: Colors.purpleAccent,
                                width: 1.5,
                              ),
                            ),
                            padding:
                                const EdgeInsets.symmetric(horizontal: 12),
                            child: TextField(
                              controller: _input,
                              style: const TextStyle(color: Colors.cyanAccent),
                              decoration: const InputDecoration(
                                hintText: "Type a message...",
                                hintStyle:
                                    TextStyle(color: Colors.white54),
                                border: InputBorder.none,
                              ),
                              onSubmitted: (value) {
                                _sendMessage(value.trim());
                              },
                            ),
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
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
