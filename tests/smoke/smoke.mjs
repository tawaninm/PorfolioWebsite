// Smoke test for the Bluebik Experience Designer update (tickets 02-07).
// Usage: start the site (`npm run dev` or `npm start`), then
//   node tests/smoke/smoke.mjs [baseUrl]
// Checks server-rendered HTML only. Browser checks (focus ring, reduced motion,
// screenshots) are done with Playwright MCP and recorded in tests/smoke/README.md.
// ponytail: plain fetch + string checks, no test runner. Upgrade to Playwright Test
// if the site gets more than a handful of checks.

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const SLUG = "gumon-monstask";
const RESUME_PDF = "Resume_Thanatpat_Promthong_Bluebik_2Page.pdf";

const results = [];
function check(name, ok, detail = "") {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
}

async function get(path) {
  const res = await fetch(base + path, { redirect: "follow" });
  return { status: res.status, html: await res.text() };
}

const home = await get("/");
const projectsPage = await get("/projects");
const caseStudy = await get(`/projects/${SLUG}`);
const resume = await get("/resume");
const pdf = await fetch(`${base}/${RESUME_PDF}`, { method: "HEAD" });

// Ticket 02: case study route exists with the 7 process sections
check("case study returns 200", caseStudy.status === 200, `got ${caseStudy.status}`);
for (const heading of [
  "Problem",
  "Context &amp; stakeholders",
  "User flow &amp; journey",
  "UI redesign",
  "Design system &amp; tokens",
  "Handoff to development",
  "What I learned",
]) {
  check(`case study has section "${heading}"`, caseStudy.html.includes(heading));
}
check("case study shows the token tiers (Brand 68)", caseStudy.html.includes("Brand 68"));
check("case study names the mentor", caseStudy.html.includes("Nop"));

// Ticket 04: real images with alt text
check(
  "case study uses a MonsTask screenshot",
  caseStudy.html.includes(`/projects/${SLUG}/monstask-landing-hero-desktop.webp`) ||
    caseStudy.html.includes(encodeURIComponent(`/projects/${SLUG}/monstask-landing-hero-desktop.webp`)),
);

// Ticket 05: positioning and ordering
check("home states the Experience Designer role", /Experience (\/ UX-UI )?Designer/.test(home.html));
check("home links the Gumon case study", home.html.includes(`/projects/${SLUG}`));
const firstSlug = projectsPage.html.match(/\/projects\/([a-z0-9-]+)/)?.[1];
check("Gumon is the first project on /projects", firstSlug === SLUG, `first: ${firstSlug}`);
check("/resume says Third-year", /Third-year/i.test(resume.html));
check("/resume lists Photoshop", resume.html.includes("Photoshop"));
check("/resume shows availability 2027", resume.html.includes("30 Jun 2027"));
check("/resume download points to Bluebik PDF", resume.html.includes(RESUME_PDF));
check("Bluebik PDF is served", pdf.status === 200, `got ${pdf.status}`);
for (const [name, html] of [["home", home.html], ["resume", resume.html], ["case study", caseStudy.html]]) {
  check(`${name} has no "Second-year"`, !/Second-year/i.test(html));
  check(`${name} has no misspelled Thai name`, !html.includes("ธนภัทร พร้อมทอง"));
}

// Ticket 07: external links in rendered pages are safe
for (const [name, html] of [["home", home.html], ["resume", resume.html], ["case study", caseStudy.html]]) {
  const blankLinks = html.match(/<a [^>]*target="_blank"[^>]*>/g) || [];
  const unsafe = blankLinks.filter((a) => !/rel="[^"]*noopener[^"]*"/.test(a));
  check(`${name} target=_blank links use noopener`, unsafe.length === 0, `${unsafe.length} unsafe`);
}

// Every route and every project detail page renders with its content in the HTML
const projectsHtml = projectsPage.html;
const slugs = [...new Set([...projectsHtml.matchAll(/\/projects\/([a-z0-9-]+)/g)].map((m) => m[1]))];
check("projects page lists 13 projects", slugs.length === 13, `found ${slugs.length}`);
for (const path of ["/about", "/mini-work", "/activities", "/experience", ...slugs.map((s) => `/projects/${s}`)]) {
  const page = await get(path);
  const text = page.html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, " ");
  check(`${path} returns 200 with content`, page.status === 200 && text.replace(/\s+/g, " ").length > 500, `status ${page.status}`);
}

const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
