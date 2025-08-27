import 'package:flutter/material.dart';

class SettingsOverlay extends StatefulWidget {
  const SettingsOverlay({super.key});

  @override
  State<SettingsOverlay> createState() => _SettingsOverlayState();
}

class _SettingsOverlayState extends State<SettingsOverlay> {
  String selectedSection = "General";

  final List<String> sections = ["General", "Security", "Account", "Memory"];

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    final bool isMobile = screenSize.width < 600;

    return Center(
      child: Material(
        color: Colors.transparent,
        child: Container(
          width: isMobile ? screenSize.width * 0.95 : screenSize.width * 0.8,
          height: isMobile ? screenSize.height * 0.9 : screenSize.height * 0.8,
          decoration: BoxDecoration(
            color: Colors.black.withOpacity(0.95),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.purpleAccent, width: 2),
          ),
          child: Row(
            children: [
              // Sidebar
              Container(
                width: isMobile ? 120 : 200,
                decoration: const BoxDecoration(
                  border: Border(
                    right: BorderSide(color: Colors.purpleAccent, width: 1),
                  ),
                ),
                child: ListView(
                  children: sections.map((section) {
                    final bool isSelected = section == selectedSection;
                    return ListTile(
                      title: Text(
                        section,
                        style: TextStyle(
                          color: isSelected
                              ? Colors.pinkAccent
                              : Colors.cyanAccent,
                          fontWeight: isSelected
                              ? FontWeight.bold
                              : FontWeight.normal,
                        ),
                      ),
                      onTap: () {
                        setState(() {
                          selectedSection = section;
                        });
                      },
                    );
                  }).toList(),
                ),
              ),

              // Content area
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  child: Center(
                    child: Text(
                      "Content for $selectedSection",
                      style: const TextStyle(
                        color: Colors.white70,
                        fontSize: 18,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
