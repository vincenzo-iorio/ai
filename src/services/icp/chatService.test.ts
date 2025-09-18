// Mock delle declarations per evitare di caricare file ESM e idlFactory reale
jest.mock("../../../declarations", () => ({
  idlFactory: jest.fn(), // funzione finta per evitare "interfaceFactory is not a function"
  canisterId: "test-canister-id"
}));

// Mock di @dfinity/agent per evitare creazione reale dell'actor
jest.mock("@dfinity/agent", () => ({
  HttpAgent: jest.fn().mockImplementation(() => ({
    fetchRootKey: jest.fn(),
  })),
  Actor: {
    createActor: jest.fn().mockReturnValue({
      chat: jest.fn().mockResolvedValue("Risposta simulata dal canister")
    }),
  },
}));

import { mapMessages, sendChat } from "./chatService";

describe("mapMessages", () => {
  it("mappa i messaggi di tipo system", () => {
    expect(mapMessages([{ role: "system", content: "Benvenuto" }]))
      .toEqual([{ system: { content: "Benvenuto" } }]);
  });

  it("mappa i messaggi di tipo user", () => {
    expect(mapMessages([{ role: "user", content: "Ciao" }]))
      .toEqual([{ user: { content: "Ciao" } }]);
  });

  it("mappa i messaggi di tipo assistant", () => {
    expect(mapMessages([{ role: "assistant", content: "Come posso aiutarti?" }]))
      .toEqual([{ assistant: { content: ["Come posso aiutarti?"], tool_calls: [] } }]);
  });

  it("mappa i messaggi di tipo tool", () => {
    expect(mapMessages([{ role: "tool", content: "Risultato" }]))
      .toEqual([{ tool: { content: "Risultato", tool_call_id: "" } }]);
  });

  it("mappa ruoli sconosciuti come user", () => {
    expect(mapMessages([{ role: "alieno", content: "👽" }]))
      .toEqual([{ user: { content: "👽" } }]);
  });
});

describe("sendChat", () => {
  it("ritorna la risposta mockata", async () => {
    const res = await sendChat([{ role: "user", content: "Ping" }]);
    expect(res).toBe("Risposta simulata dal canister");
  });
});
