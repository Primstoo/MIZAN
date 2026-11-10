// Document en cours de traitement par le pipeline d'import (ou refusé / en erreur).
export default function Attente({ etat, note }: { id: string; etat: string; note: string | null; proprio: boolean }) {
  if (etat === "incoherent") return (
    <div className="card stack bloc">
      <h2>Document non reconnu</h2>
      <p className="muted">{note || "Ce fichier ne ressemble pas à un support de cours."}</p>
    </div>
  );
  return (
    <div className="card soft stack bloc" role="status">
      <h2>{etat === "erreur" ? "Traitement à relancer" : "Ton document est en cours de traitement"}</h2>
      <p className="muted">{note || "La fiche, le quiz et les flashcards apparaîtront ici dès qu'ils seront prêts : ton document est d'abord vérifié."}</p>
    </div>
  );
}
