import { beforeAll, describe, expect, it } from "vitest";
import { BASE_URL, PAGE_ROUTES, REDIRECT_ROUTES } from "./routes";

async function fetchHtml(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { accept: "text/html" },
    redirect: "manual",
  });
  const body = await res.text();
  return { res, body };
}

function stripTags(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");
}

describe("SSR smoke", () => {
  beforeAll(async () => {
    const res = await fetch(BASE_URL, { redirect: "manual" }).catch(
      () => undefined,
    );
    if (!res) {
      throw new Error(
        `No server reachable at ${BASE_URL}. Start the dev server or set SMOKE_BASE_URL.`,
      );
    }
  });

  describe.each(PAGE_ROUTES)("page $path", (route) => {
    let res: Response;
    let body: string;
    let text: string;

    beforeAll(async () => {
      ({ res, body } = await fetchHtml(route.path));
      text = stripTags(body);
    });

    it("responds 200 with HTML", () => {
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type") ?? "").toContain("text/html");
      expect(body).toMatch(/<!DOCTYPE html>/i);
    });

    it("is not an SSR error page", () => {
      expect(body).not.toContain('"unhandled":true');
      expect(body).not.toContain("HTTPError");
      expect(text).not.toMatch(/Something went wrong/i);
    });

    it("ships head metadata", () => {
      const title = /<title[^>]*>([\s\S]*?)<\/title>/.exec(body)?.[1] ?? "";
      expect(title.trim().length).toBeGreaterThan(3);
      expect(title).not.toMatch(/Lovable (App|Generated Project)/i);
      expect(body).toMatch(/<meta name="description" content="[^"]{10,}"/);
      if (route.title) expect(title).toContain(route.title);
    });

    it("renders crawler-visible content on the server", () => {
      // Real markup, not just an empty shell hydrated later.
      expect(text.length).toBeGreaterThan(500);
      expect(body).toMatch(/<h1[\s>]/);
      const hit = route.contains.some((needle) =>
        text.toLowerCase().includes(needle.toLowerCase()),
      );
      expect(
        hit,
        `expected one of ${JSON.stringify(route.contains)} in ${route.path}`,
      ).toBe(true);
    });
  });

  describe.each(REDIRECT_ROUTES)("redirect $from", ({ from, to }) => {
    it(`redirects to ${to}`, async () => {
      const res = await fetch(`${BASE_URL}${from}`, { redirect: "manual" });
      expect([301, 302, 307, 308]).toContain(res.status);
      const location = res.headers.get("location") ?? "";
      expect(new URL(location, BASE_URL).pathname).toBe(to);
    });

    it("lands on a working page when followed", async () => {
      const res = await fetch(`${BASE_URL}${from}`);
      expect(res.status).toBe(200);
      expect(new URL(res.url).pathname).toBe(to);
    });
  });

  it("returns 404 for an unknown path", async () => {
    const res = await fetch(`${BASE_URL}/this-route-does-not-exist`, {
      redirect: "manual",
    });
    expect(res.status).toBe(404);
  });
});
