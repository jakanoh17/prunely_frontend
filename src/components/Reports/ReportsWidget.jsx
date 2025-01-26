export default function ReportsWidget({ classModifier, caption, icon, stat }) {
  return (
    <div className={`reports__widget ${classModifier}`}>
      <div className="reports__widget-top">
        {icon}
        <p className="reports__widget-stat">{stat}</p>
      </div>
      <p className="reports__widget-caption">{caption}</p>
    </div>
  );
}
