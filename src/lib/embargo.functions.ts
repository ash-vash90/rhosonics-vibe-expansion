import { createServerFn } from "@tanstack/react-start";

type VerifyEmbargoInput = { password: string };

export const verifyEmbargo = createServerFn({ method: "POST" })
  .inputValidator((input: unknown): VerifyEmbargoInput => {
    const password = (input as { password?: unknown })?.password;
    if (typeof password !== "string" || password.length === 0) {
      throw new Error("missing_password");
    }
    return { password };
  })
  .handler(async ({ data }): Promise<{ ok: boolean; reason?: string }> => {
    const expected = process.env["FOUNDATION_EMBARGO_PASSWORD"] ?? "";
    if (expected.length === 0) {
      return { ok: false, reason: "secret_not_configured" };
    }

    // Constant-time compare
    const a = new TextEncoder().encode(data.password);
    const b = new TextEncoder().encode(expected);
    let mismatch = a.length ^ b.length;
    for (let i = 0; i < Math.min(a.length, b.length); i++) mismatch |= a[i] ^ b[i];

    return { ok: mismatch === 0 };
  });
