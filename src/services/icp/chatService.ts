import { HttpAgent, Actor } from "@dfinity/agent";
import { Platform } from "react-native";

// Canister ID fisso per produzione
const PROD_CANISTER_ID = "mpz3d-aiaaa-aaaac-a4bnq-cai";

let chatActor: any = null;
let activeCanisterId = PROD_CANISTER_ID;

try {
  // In sviluppo, prova a leggere il canisterId dalle dichiarazioni generate
  if (process.env.NODE_ENV !== "production") {
    const { idlFactory, canisterId } = require("../../../declarations");
    if (canisterId) {
      activeCanisterId = canisterId;
    }
    const agent = new HttpAgent({ host: "https://icp0.io" });
    agent.fetchRootKey(); // necessario in locale
    chatActor = Actor.createActor(idlFactory, {
      agent,
      canisterId: activeCanisterId,
    });
  } else {
    // Produzione: usa sempre il canister fisso
    const { idlFactory } = require("../../../declarations");
    const agent = new HttpAgent({ host: "https://icp0.io" });
    chatActor = Actor.createActor(idlFactory, {
      agent,
      canisterId: activeCanisterId,
    });
  }
} catch (err) {
  console.error("Errore creando l'actor ICP:", err);
}

// Mappa {role, content} → variante Candid ChatMessage
function mapMessages(messages: { role: string; content: string }[]) {
  return messages.map((m) => {
    switch (m.role) {
      case "system":
        return { system: { content: m.content } };
      case "assistant":
        return { assistant: { content: [m.content], tool_calls: [] } };
      case "tool":
        return { tool: { content: m.content, tool_call_id: "" } };
      default:
        return { user: { content: m.content } };
    }
  });
}

/**
 * Ora sia web che native usano @dfinity/agent → update method `chat`
 */
export async function sendChat(messages: { role: string; content: string }[]) {
  if (!chatActor) {
    throw new Error("Actor ICP non inizializzato");
  }
  const candidMessages = mapMessages(messages);
  return await chatActor.chat(candidMessages);
}
