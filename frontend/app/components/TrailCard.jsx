export default function TrailCard({ trail }) {
  return (
    <div className="trail-card">
      <h3>{trail?.title || trail?.name || "Trail name"}</h3>
      <p>{trail?.description || "Trail description"}</p>
    </div>
  );
}