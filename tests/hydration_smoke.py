#!/usr/bin/env python3
"""Hydration smoke tests: loads every route in a real browser and checks that
the server-rendered markup hydrates cleanly and stays interactive.

Usage:
    python3 tests/hydration_smoke.py [base_url]     # default http://localhost:8080
Exits non-zero on the first category of failure so it can gate CI.
"""

import asyncio
import re
import sys

from playwright.async_api import async_playwright

BASE_URL = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080").rstrip("/")

PAGE_ROUTES = [
    "/",
    "/position",
    "/logo",
    "/color",
    "/typography",
    "/iconography",
    "/imagery",
    "/data-viz",
    "/voice",
    "/applications",
    "/proof",
    "/resources",
    "/tools",
    "/newsletter",
    "/sketches",
]

REDIRECTS = {
    "/about": "/position",
    "/positioning": "/position",
    "/principles": "/position",
    "/logo-assets": "/logo",
    "/visual-system": "/iconography",
    "/social-media": "/applications",
    "/review": "/",
}

# Console noise that is not a hydration/runtime defect.
IGNORE_CONSOLE = re.compile(
    r"(favicon|Download the React DevTools|third-party cookie|Failed to load resource: the server responded with a status of 404)",
    re.I,
)
HYDRATION_HINT = re.compile(
    r"(hydrat|did not match|Text content does not match|server HTML)", re.I
)

failures: list[str] = []


def fail(msg: str) -> None:
    failures.append(msg)
    print(f"FAIL {msg}")


async def check_page(context, path: str) -> None:
    page = await context.new_page()
    errors: list[str] = []
    page.on(
        "console",
        lambda m: errors.append(m.text)
        if m.type == "error" and not IGNORE_CONSOLE.search(m.text)
        else None,
    )
    page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
    warnings: list[str] = []
    page.on(
        "console",
        lambda m: warnings.append(m.text)
        if m.type in ("warning", "error") and HYDRATION_HINT.search(m.text)
        else None,
    )

    response = await page.goto(f"{BASE_URL}{path}", wait_until="networkidle")
    status = response.status if response else 0
    if status != 200:
        fail(f"{path} returned {status}")

    # The router only sets this once the client app has mounted and hydrated.
    hydrated = await page.evaluate(
        "() => !!document.querySelector('h1') && document.body.innerText.trim().length > 200"
    )
    if not hydrated:
        fail(f"{path} has no visible hydrated content")

    # Navigation must exist and be wired up (this app navigates via buttons).
    interactive = await page.evaluate(
        "() => document.querySelectorAll('a[href], button').length > 0"
    )
    if not interactive:
        fail(f"{path} rendered no interactive navigation after hydration")

    if warnings:
        fail(f"{path} hydration mismatch: {warnings[0][:240]}")
    if errors:
        fail(f"{path} console errors: {[e[:240] for e in errors[:2]]}")


    print(f"ok   {path} ({status})")
    await page.close()


async def check_redirect(context, src: str, dest: str) -> None:
    page = await context.new_page()
    await page.goto(f"{BASE_URL}{src}", wait_until="domcontentloaded")
    landed = re.sub(r"^https?://[^/]+", "", page.url) or "/"
    if landed.split("?")[0] != dest:
        fail(f"{src} landed on {landed}, expected {dest}")
    else:
        print(f"ok   {src} -> {dest}")
    await page.close()


async def check_client_navigation(context) -> None:
    """Client-side routing must swap pages without a full document reload."""
    page = await context.new_page()
    await page.goto(BASE_URL, wait_until="networkidle")
    await page.evaluate("() => { window.__ssrSmokeMarker = true; }")

    target = page.locator('a[href="/position"]').first
    if await target.count() == 0:
        # The brand nav uses buttons + programmatic navigation.
        target = page.get_by_role("button", name=re.compile("position", re.I)).first
    if await target.count() == 0:
        fail("no in-app control to reach /position from the home page")
        await page.close()
        return

    await target.click()
    try:
        await page.wait_for_url("**/position", timeout=10_000)
        await page.wait_for_selector("h1")
    except Exception as exc:  # noqa: BLE001
        fail(f"client-side navigation to /position failed: {exc}")
        await page.close()
        return

    if not await page.evaluate("() => window.__ssrSmokeMarker === true"):
        fail("navigation to /position triggered a full page reload")
    else:
        print("ok   client-side navigation / -> /position")

    await page.close()


async def main() -> int:
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 1800})
        for path in PAGE_ROUTES:
            await check_page(context, path)
        for src, dest in REDIRECTS.items():
            await check_redirect(context, src, dest)
        await check_client_navigation(context)
        await browser.close()

    print()
    if failures:
        print(f"{len(failures)} hydration check(s) failed")
        return 1
    print("all hydration checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
