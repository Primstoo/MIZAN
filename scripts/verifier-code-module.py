"""Exécute les exemples (Python, C, C++, JavaScript, SQL/SQLite) d'un module et compare avec les blocs « sortie ».

    python3 scripts/verifier-code-module.py traitement-ad

- Chaque chapitre tourne dans son propre espace (les blocs d'un chapitre s'enchaînent).
- C et C++ : chaque bloc est un programme complet (avec main), compilé par gcc / g++ -std=c++17.
- JavaScript : chaque bloc est exécuté seul par node. SQL : une base SQLite en mémoire par chapitre,
  les blocs s'enchaînent ; un SELECT affiche l'en-tête puis les lignes, colonnes séparées par « | ».
- ```<langage> nontest``` : bloc ignoré (erreur volontaire, fichier absent, saisie clavier...).
- Un bloc ```sortie``` placé juste après un bloc python doit être identique à ce qu'il affiche.
- Les exemples tournent dans un dossier temporaire : ils peuvent créer des fichiers (CSV, Excel...).
"""
import contextlib, io, json, os, re, sqlite3, subprocess, sys, tempfile, traceback

LANGS = {"python", "c", "cpp", "javascript", "js", "sql"}


def executer_externe(lang, code, sql_conn):
    """Exécute un bloc C, C++, JavaScript ou SQL et renvoie (sortie, erreur)."""
    if lang == "sql":
        out = []
        try:
            cur = sql_conn.cursor()
            for instr in [x for x in sqlite3_split(code) if x.strip()]:
                cur.execute(instr)
                if cur.description:
                    noms = [d[0] for d in cur.description]
                    out.append(" | ".join(noms))
                    for row in cur.fetchall():
                        out.append(" | ".join("NULL" if v is None else str(v) for v in row))
            sql_conn.commit()
        except Exception as e:
            return None, f"SQLite : {e}"
        return "\n".join(out), None
    if lang in ("javascript", "js"):
        r = subprocess.run(["node", "-e", code], capture_output=True, text=True, timeout=20)
        return (r.stdout, None) if r.returncode == 0 else (None, r.stderr)
    src = "prog.c" if lang == "c" else "prog.cpp"
    open(src, "w").write(code)
    cc = ["gcc", src, "-o", "prog", "-lm", "-w"] if lang == "c" else ["g++", "-std=c++17", src, "-o", "prog", "-w"]
    r = subprocess.run(cc, capture_output=True, text=True)
    if r.returncode != 0:
        return None, "compilation : " + r.stderr
    r = subprocess.run(["./prog"], capture_output=True, text=True, timeout=20, input="")
    return r.stdout, None


def sqlite3_split(code):
    instr, buf = [], ""
    for car in code:
        buf += car
        if car == ";" and sqlite3.complete_statement(buf):
            instr.append(buf); buf = ""
    if buf.strip():
        instr.append(buf)
    return instr

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
    sql_conn = sqlite3.connect(":memory:")
    for i, (lang, code) in enumerate(blocs):
        if not lang or lang[0] not in LANGS or "nontest" in lang:
            continue
        n += 1
        out = io.StringIO()
        if lang[0] != "python":
            res, err = executer_externe(lang[0], code, sql_conn)
            if err:
                erreurs += 1
                print(f"✘ {f} bloc {n} ({lang[0]}) : {err}\n{code}")
                continue
            out.write(res)
        else:
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
