// Verrou des annales (décision D33 : « annales visibles floutées avec cadenas »).
// Un chapitre est payant s'il porte `payant: true` dans son en-tête, ou si son id parle
// d'annales / d'examen blanc. L'élève gratuit garde le titre, la séance, le plan (titres h2)
// et le nombre d'exercices et de QCM : il sait ce qu'il manque, sans pouvoir le lire.
type Chap = { id: string; t: string; seance?: string; html: string; ex?: unknown[]; qcm?: unknown[]; payant?: boolean };

export const estPayant = (c: Chap) => c.payant === true || /annale|examen|blanc/i.test(c.id);

const WA = "https://wa.me/212672951255?text=";

function apercu(c: Chap, titreModule: string) {
  const plan = Array.from(c.html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)).map((x) => x[1].replace(/<[^>]+>/g, "")).slice(0, 8);
  const nEx = (c.html.match(/class="ex[ "]/g) || []).length || c.ex?.length || 0;
  const nQ = c.qcm?.length || 0;
  const msg = encodeURIComponent(`Bonjour, je veux débloquer les annales de « ${titreModule.split(" (")[0]} » sur ToumaiLearn (abonnement ou Pass examen).`);
  const lignes = plan.map((t) => `<li>${t}</li>`).join("");
  return `<div class="verrou" style="border:1px solid #D9824F;border-radius:14px;padding:18px;margin:8px 0 20px">
<p style="margin:0 0 6px;font-size:22px">🔒 Réservé aux abonnés</p>
<p style="margin:0 0 12px">Ce chapitre contient ${nEx ? `<b>${nEx} exercice${nEx > 1 ? "s" : ""} corrigé${nEx > 1 ? "s" : ""}</b>` : "des sujets corrigés"}${nQ ? ` et <b>${nQ} QCM</b>` : ""}, au format de l'examen.</p>
${lignes ? `<p style="margin:0 0 4px"><b>Au programme :</b></p><ul>${lignes}</ul>` : ""}
<div aria-hidden="true" style="filter:blur(5px);user-select:none;pointer-events:none;opacity:.7;margin:14px 0">
<p>Exercice 1 (6 pts) — ████████ ██████ ███ ████████ ██ ████ █████████ ██ ██████.</p>
<p>1) ██████ ███ ██████████ ██ ████ ███████. 2) ████████ ██ ██████ ███ █████.</p>
<p>Corrigé : ██ ████ █ ███ ███████ ████ ██████████ █ ███ ████ ███████ ██.</p></div>
<p style="margin:0 0 12px">Débloque-les avec l'<b>abonnement mensuel</b> ou le <b>Pass examen</b> (accès complet pendant la période d'examens).</p>
<a href="${WA}${msg}" target="_top" rel="noopener" style="display:inline-block;background:#D9824F;color:#fff;padding:10px 18px;border-radius:22px;text-decoration:none;font-weight:600">Débloquer sur WhatsApp</a>
</div>`;
}

export function verrouillerAnnales(html: string, titreModule: string) {
  return html.replace(/const CHAPS=(.*?);\n/, (tout, json: string) => {
    let chaps: Chap[];
    try { chaps = JSON.parse(json); } catch { return tout; }
    const out = chaps.map((c) => (estPayant(c) ? { ...c, html: apercu(c, titreModule), ex: [], qcm: [], verrouille: true } : c));
    // Même échappement que le constructeur : « </ » ne doit jamais fermer la balise <script>.
    return `const CHAPS=${JSON.stringify(out).replace(/<\//g, "<\\/")};\n`;
  });
}
