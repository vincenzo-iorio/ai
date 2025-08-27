import 'package:flutter/material.dart';
import 'chat_page.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _email = TextEditingController();
  final _password = TextEditingController();

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final neonBorder = OutlineInputBorder(
      borderSide: const BorderSide(color: Colors.purpleAccent, width: 2),
      borderRadius: BorderRadius.circular(12),
    );

    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'LOGIN',
                style: TextStyle(fontSize: 42, color: Colors.cyanAccent),
              ),
              const SizedBox(height: 40),
              SizedBox(
                width: 300,
                child: TextField(
                  controller: _email,
                  keyboardType: TextInputType.emailAddress,
                  style: const TextStyle(color: Colors.cyanAccent),
                  decoration: InputDecoration(
                    labelText: 'Email',
                    labelStyle: const TextStyle(color: Colors.purpleAccent),
                    enabledBorder: neonBorder,
                    focusedBorder: neonBorder,
                  ),
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: 300,
                child: TextField(
                  controller: _password,
                  obscureText: true,
                  style: const TextStyle(color: Colors.cyanAccent),
                  decoration: InputDecoration(
                    labelText: 'Password',
                    labelStyle: const TextStyle(color: Colors.purpleAccent),
                    enabledBorder: neonBorder,
                    focusedBorder: neonBorder,
                  ),
                ),
              ),
              const SizedBox(height: 28),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pushReplacement(
                    MaterialPageRoute(builder: (_) => const ChatPage()),
                  );
                },
                child: const Text('ENTER'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
