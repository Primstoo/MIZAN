"""Exécute les exemples Python d'un module et compare avec les blocs « sortie ».

    python3 scripts/verifier-code-module.py traitement-ad

- Chaque chapitre tourne dans son propre espace (les blocs d'un chapitre s'enchaînent).
- ```python nontest``` : bloc ignoré (erreur volontaire, fichier absent, saisie clavier...).
- Un bloc ```sortie``` placé juste après un bloc python doit être identique à ce qu'il affiche.
- Les exemples tournent dans un dossier temporaire : ils peuvent créer des fichiers (CSV, Excel...).
"""
import contextlib, io, json, os, re, sys, tempfile, traceback

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
slug = sys.argv[1]
dossier = os.path.join(RACINE, "content", "sources", slug)
mod = json.load(open(os.path.join(dossier, "module.json"), encoding="utf8"))
BLOC = re.compile(r"^```([^\n]*)\n(.*?)^```", re.S | re.M)
erreurs = 0
os.chdir(tempfile.mkdtemp())
for f in mod["chapitres"]:
    if not os.path.exists(os.path.join(dossier, f)):
        print(f"· {f} : absent, ignoré"); continue
    texte = open(os.path.join(dossier, f), encoding="utf8").read()
    blocs = [(m.group(1).split(), m.group(2)) for m in BLOC.finditer(texte)]
    env, n = {"__name__": "__main__"}, 0
    for i, (lang, code) in enumerate(blocs):
        if not lang or lang[0] != "python" or "nontest" in lang:
            continue
        n += 1
        out = io.StringIO()
        try:
            with contextlib.redirect_stdout(out):
                exec(compile(code, f"{f}#bloc{n}", "exec"), env)
        except Exception:
            erreurs += 1
            print(f"✘ {f} bloc {n} : exception\n{code}\n{traceback.format_exc(limit=2)}")
            continue
        suite = blocs[i + 1] if i + 1 < len(blocs) else None
        if suite and suite[0][:1] == ["sortie"]:
            a = [l.rstrip() for l in out.getvalue().strip().splitlines()]
            b = [l.rstrip() for l in suite[1].strip().splitlines()]
            if a != b:
                erreurs += 1
                print(f"✘ {f} bloc {n} : sortie différente\n--- attendu\n" + "\n".join(b) + "\n--- obtenu\n" + "\n".join(a) + "\n")
    print(f"{'✔' if not erreurs else '·'} {f} : {n} blocs exécutés")
print("TOUT EST BON" if not erreurs else f"{erreurs} problème(s)")
sys.exit(1 if erreurs else 0)
