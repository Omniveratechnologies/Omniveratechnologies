import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Plus, Pencil, Trash2, X, Image as ImageIcon } from "lucide-react";

const emptyForm = () => ({
  title: "",
  category: "",
  client: "",
  summary: "",
  description: "",
  details: "",
  imageUrl: "",
  gallery: "",
  technologies: "",
  year: "",
  link: "",
  featured: false,
  order: 0,
});

function toPayload(form) {
  return {
    title: form.title.trim(),
    category: form.category.trim(),
    client: form.client.trim(),
    summary: form.summary.trim(),
    description: form.description.trim(),
    details: form.details.trim(),
    imageUrl: form.imageUrl,
    gallery: form.gallery.split(/[\\n,]/).map((s) => s.trim()).filter(Boolean),
    technologies: form.technologies.split(/[\\n,]/).map((s) => s.trim()).filter(Boolean),
    year: form.year.trim(),
    link: form.link.trim(),
    featured: !!form.featured,
    order: Number(form.order) || 0,
  };
}

export default function RecentWorkAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true); setError("");
    try {
      const res = await api.get("/recent-works");
      setItems(res.data.works || []);
    } catch (e) {
      setError(e.response?.data?.message || "Could not load recent work.");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm()); setModal("add"); };
  const openEdit = (item) => {
    setForm({
      title: item.title || "",
      category: item.category || "",
      client: item.client || "",
      summary: item.summary || "",
      description: item.description || "",
      details: item.details || "",
      imageUrl: item.imageUrl || "",
      gallery: (item.gallery || []).join(", "),
      technologies: (item.technologies || []).join(", "),
      year: item.year || "",
      link: item.link || "",
      featured: !!item.featured,
      order: item.order ?? 0,
    });
    setModal(item);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, imageUrl: reader.result }));
    reader.readAsDataURL(file);
  };
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError(""); setNotice("");
    try {
      const payload = toPayload(form);
      if (modal === "add") {
        const res = await api.post("/recent-works", payload);
        setItems((prev) => [res.data.work, ...prev]);
        setNotice("Recent work added.");
      } else {
        const res = await api.patch(`/recent-works/${modal._id}`, payload);
        setItems((prev) => prev.map((it) => (it._id === modal._id ? res.data.work : it)));
        setNotice("Recent work updated.");
      }
      setModal(null); setForm(emptyForm());
    } catch (e2) {
      setError(e2.response?.data?.message || "Could not save changes.");
    } finally { setBusy(false); }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    setError(""); setNotice("");
    try {
      await api.delete(`/recent-works/${item._id}`);
      setItems((prev) => prev.filter((it) => it._id !== item._id));
      setNotice("Recent work deleted.");
    } catch (e) {
      setError(e.response?.data?.message || "Could not delete.");
    }
  };
  return (
    <section className="studio-card" style={{ marginTop: 0 }}>
      <div className="studio-card-head">
        <div>
          <h2>Recent work</h2>
          <p>Add, edit and remove the projects shown in the “Our recent work” section of the Services page.</p>
        </div>
        <button className="studio-primary" onClick={openAdd}><Plus size={15} /> Add work</button>
      </div>

      {error && <p className="studio-form-error" role="alert">{error}</p>}
      {notice && <p style={{ color: "#68d7a7", fontSize: 12 }}>{notice}</p>}

      {loading ? (
        <p style={{ padding: "22px 0", color: "#8190a8", fontSize: 13 }}>Loading…</p>
      ) : items.length === 0 ? (
        <p style={{ padding: "22px 0", color: "#8190a8", fontSize: 13 }}>No recent work yet. Click “Add work” to create one.</p>
      ) : (
        <div className="studio-project-list" style={{ marginTop: 16 }}>
          {items.map((item) => (
            <article key={item._id} className="studio-project" style={{ alignItems: "center" }}>
              <div style={{ width: 52, height: 52, flexShrink: 0, borderRadius: 8, overflow: "hidden", background: "#0b1324", border: "1px solid #263650", display: "grid", placeItems: "center" }}>
                {item.imageUrl ? <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <ImageIcon size={18} color="#8190a8" />}
              </div>
              <div className="studio-project-info">
                <strong>{item.title}</strong>
                <span>{[item.category, item.client, item.year].filter(Boolean).join(" · ") || "No details"}</span>
                {item.summary && <small style={{ color: "#9eacc2", display: "block", marginTop: 4 }}>{item.summary}</small>}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ background: "transparent", border: "1px solid #263650", color: "#c4d1e4", borderRadius: 8, padding: 6, cursor: "pointer" }} onClick={() => openEdit(item)} aria-label="Edit"><Pencil size={15} /></button>
                <button style={{ background: "transparent", border: "1px solid #263650", color: "#c4d1e4", borderRadius: 8, padding: 6, cursor: "pointer" }} onClick={() => remove(item)} aria-label="Delete"><Trash2 size={15} /></button>
              </div>
            </article>
          ))}
        </div>
      )}

      {modal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,.72)", display: "grid", placeItems: "center", padding: 20 }}>
          <section className="studio-card" style={{ width: "min(720px,100%)", maxHeight: "90vh", overflow: "auto", position: "relative" }}>
            <button type="button" onClick={() => setModal(null)} style={{ float: "right", background: "transparent", color: "#fff", border: 0 }}><X /></button>
            <h2>{modal === "add" ? "Add recent work" : "Edit recent work"}</h2>
            <form className="studio-form" onSubmit={submit} style={{ marginTop: 16 }}>
              <label>Title<input value={form.title} required onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
              <label>Category<input value={form.category} placeholder="e.g. Mobile app" onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
              <label>Client<input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} /></label>
              <label>Year<input value={form.year} placeholder="e.g. 2025" onChange={(e) => setForm({ ...form, year: e.target.value })} /></label>
              <label>Summary<textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} /></label>
              <label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
              <label>Details<textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} /></label>
              <label>Image
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <input type="file" accept="image/*" onChange={handleFile} />
                  <input value={form.imageUrl.startsWith("data:") ? "" : form.imageUrl} placeholder="or paste image URL" onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
                </div>
                {form.imageUrl && <img src={form.imageUrl} alt="preview" style={{ marginTop: 10, maxWidth: "100%", maxHeight: 160, borderRadius: 8, border: "1px solid #263650" }} />}
              </label>
              <label>Gallery URLs (comma or newline separated)<textarea value={form.gallery} onChange={(e) => setForm({ ...form, gallery: e.target.value })} /></label>
              <label>Technologies (comma or newline separated)<input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} /></label>
              <label>Project link<input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} /></label>
              <label>Display order<input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /></label>
              <label style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured
              </label>
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button type="submit" className="studio-primary" disabled={busy}>{busy ? "Saving…" : "Save"}</button>
                <button type="button" onClick={() => setModal(null)}>Cancel</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
