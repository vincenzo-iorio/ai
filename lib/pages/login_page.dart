import 'package:flutter/material.dart';
import 'main_page.dart'; // route after login

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool _isLoading = false;
  String? _errorMessage;

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  // Dummy login without backend
  Future<void> _login() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    await Future.delayed(const Duration(seconds: 1)); // simulate loading

    // For offline mode, allow any non-empty credentials
    if (_email.text.trim().isNotEmpty && _password.text.trim().isNotEmpty) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const MainPage()),
      );
    } else {
      setState(() => _errorMessage = "Please enter email and password");
    }

    setState(() => _isLoading = false);
  }

  // Dummy signup without backend
  Future<void> _signUp() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    await Future.delayed(const Duration(seconds: 1));

    if (_email.text.trim().isNotEmpty && _password.text.trim().isNotEmpty) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const MainPage()),
      );
    } else {
      setState(() => _errorMessage = "Please enter email and password");
    }

    setState(() => _isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    final neonBorder = OutlineInputBorder(
      borderSide: const BorderSide(color: Colors.purpleAccent, width: 2),
      borderRadius: BorderRadius.circular(12),
    );

    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'LOGIN',
                style: TextStyle(
                  fontSize: 42,
                  color: Colors.cyanAccent,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 2,
                ),
              ),
              const SizedBox(height: 40),

              // Email field
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

              // Password field
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
              const SizedBox(height: 16),

              if (_errorMessage != null)
                Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: Text(
                    _errorMessage!,
                    style: const TextStyle(color: Colors.redAccent),
                  ),
                ),

              _isLoading
                  ? const CircularProgressIndicator(color: Colors.pinkAccent)
                  : Column(
                      children: [
                        // Login button
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.pinkAccent,
                            foregroundColor: Colors.black,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 32, vertical: 14),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                            textStyle: const TextStyle(
                              fontWeight: FontWeight.bold,
                              letterSpacing: 1.1,
                            ),
                          ),
                          onPressed: _login,
                          child: const Text('LOGIN'),
                        ),
                        const SizedBox(height: 12),
                        // Signup button
                        TextButton(
                          onPressed: _signUp,
                          child: const Text(
                            "Create new account",
                            style: TextStyle(color: Colors.cyanAccent),
                          ),
                        ),
                      ],
                    ),
            ],
          ),
        ),
      ),
    );
  }
}
