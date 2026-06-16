import { useState, type FormEvent } from "react";
import { BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";
import { supabase } from "@/integrations/supabase/client";
import { Lock } from "@/lib/icons";

/**
 * Foundation — Vision and Mission, embargoed behind a server-checked
 * password. The canonical statements only render after the edge
 * function `verify-embargo` confirms the password matches the secret.
 * Unlock persists in sessionStorage for the tab session.
 */

const UNLOCK_KEY = "rho.foundation.embargo.unlocked";

interface StatementRowProps {
  label: string;
  statement: React.ReactNode;
  unlocked: boolean;
}

const StatementRow = ({ label, statement, unlocked }: StatementRowProps) => (
  <div className="grid grid-cols-12 gap-y-6 gap-x-8 py-10 md:py-14 lg:py-16 px-6 md:px-10 lg:px-14">
    <div className="col-span-12 lg:col-span-3">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="block h-2 w-2 rounded-full bg-primary" />
        <span className="font-data text-sm tracking-[0.28em] uppercase text-primary font-medium">
          {label}
        </span>
      </div>
    </div>

    <div className="col-span-12 lg:col-span-9">
      {unlocked ? (
        <p
          className="font-ui font-medium tracking-[-0.025em] text-[hsl(var(--slate-50))] leading-[1.08]
                     [&_em]:not-italic [&_em]:text-primary"
          style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}
        >
          {statement}
        </p>
      ) : (
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="font-data text-[10px] md:text-xs tracking-[0.28em] uppercase text-[hsl(var(--slate-400))] border border-[hsl(224_18%_28%)] px-2.5 py-1"
          >
            Embargoed
          </span>
          <span
            className="font-ui font-medium tracking-[-0.025em] text-[hsl(var(--slate-500))] leading-[1.08] select-none"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}
            aria-hidden="true"
          >
            ████████ ███ ██████ ████████ ████.
          </span>
        </div>
      )}
    </div>
  </div>
);

const emphasize = (sentence: string, keyword: string): React.ReactNode => {
  const idx = sentence.indexOf(keyword);
  if (idx === -1) return sentence;
  return (
    <>
      {sentence.slice(0, idx)}
      <em>{keyword}</em>
      {sentence.slice(idx + keyword.length)}
    </>
  );
};

const UnlockBar = ({ onUnlock }: { onUnlock: () => void }) => {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setSubmitting(true);
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("verify-embargo", {
        body: { password },
      });
      if (fnErr || !data?.ok) {
        setError("Incorrect password.");
        return;
      }
      sessionStorage.setItem(UNLOCK_KEY, "1");
      onUnlock();
    } catch {
      setError("Verification failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-[hsl(224_18%_18%)] px-6 md:px-10 lg:px-14 py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
    >
      <div className="inline-flex items-center gap-2 font-data text-[10px] md:text-xs uppercase tracking-[0.18em] text-[hsl(var(--slate-400))]">
        <Lock className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Restricted · enter passphrase</span>
      </div>
      <div className="flex-1 flex items-center gap-2">
        <input
          type="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passphrase"
          aria-label="Embargo passphrase"
          className="flex-1 sm:max-w-[280px] bg-[hsl(224_18%_12%)] border border-[hsl(224_18%_22%)] focus:border-primary focus:outline-none px-3 py-2 rounded-[4px] font-data text-sm text-[hsl(var(--slate-50))] placeholder:text-[hsl(var(--slate-500))]"
        />
        <button
          type="submit"
          disabled={submitting || !password}
          className="bg-primary text-primary-foreground font-ui font-semibold text-sm px-4 py-2 rounded-[4px] hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Verifying…" : "Unlock"}
        </button>
      </div>
      {error && (
        <span className="font-data text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--destructive))]">
          {error}
        </span>
      )}
    </form>
  );
};

export const Foundation = () => {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(UNLOCK_KEY) === "1";
  });

  return (
    <div
      className="relative clip-chamfer-lg overflow-hidden"
      style={{ background: "hsl(var(--rho-obsidian))" }}
    >
      {/* Signal glow — subtle, top-right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 88% 12%, hsl(var(--rho-green) / 0.16), transparent 55%)",
        }}
      />

      <div className="relative divide-y divide-[hsl(224_18%_18%)]">
        <StatementRow
          label="Vision"
          statement={emphasize(BRAND_VISION, "measured")}
          unlocked={unlocked}
        />
        <StatementRow
          label="Mission"
          statement={emphasize(BRAND_MISSION, "automated")}
          unlocked={unlocked}
        />
        {!unlocked && <UnlockBar onUnlock={() => setUnlocked(true)} />}
      </div>
    </div>
  );
};

export default Foundation;
