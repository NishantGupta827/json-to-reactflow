import { useState, useEffect } from "react";

type Option = {
  label: string;
  value: any;
};

type Props = {
  options: Option[];
  onSelect: (value: Option) => void;
  height?: string;
};

export default function SearchableMenu({
  options,
  onSelect,
  height = "200px",
}: Props) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Option[]>(options);

  useEffect(() => {
    setFiltered(
      options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, options]);

  return (
    <div
      style={{
        padding: "8px",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxShadow: "rgba(0, 0, 0, 0.15) 2px 2px 6px",
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          padding: "6px 8px",
          marginBottom: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          maxHeight: height,
          overflowY: "auto",
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((opt, id) => (
            <div
              key={`${opt.value}_${id}`}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => onSelect(opt)}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              {opt.label}
            </div>
          ))
        ) : (
          <div style={{ padding: "6px 10px", color: "#999" }}>
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}
