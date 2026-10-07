import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getAdminBeat, saveBeat, saveLicenses, setBeatPreview,
  type BeatWithLicenses, type LicenseInput, type BeatInput,
} from '../../lib/beats';
import { uploadFile, validateFile, publicUrl, AUDIO_TYPES, MAX_AUDIO_BYTES } from '../../lib/storage';
import { logActivity } from '../../lib/activity';
import { slugify, isValidSlug } from '../../lib/slug';
import { StatusBadge } from '../shared/StatusBadge';
import { Notice } from '../shared/Notice';
import type { ContentStatus } from '../../types/database';

// Fixed license set for the current product. Stored as rows, so new keys can be added later.
const DEFAULT_LICENSES: LicenseInput[] = [
  { license_key: 'MP3', name: 'MP3', description: null, price: null, purchase_url: null, enabled: true, sort_order: 1 },
  { license_key: 'WAV', name: 'WAV', description: null, price: null, purchase_url: null, enabled: true, sort_order: 2 },
  { license_key: 'EXCLUSIVE', name: 'Exclusive', description: null, price: null, purchase_url: null, enabled: true, sort_order: 3 },
];

type Form = Omit<BeatInput, 'status'> & { status: ContentStatus };
const EMPTY: Form = {
  title: '', slug: '', description: null, bpm: null, musical_key: null, genre: null, mood: null,
  purchase_url: null, inquiry_url: null, featured: false, status: 'DRAFT',
};

function toForm(b: BeatWithLicenses): Form {
  return {
    title: b.title, slug: b.slug, description: b.description, bpm: b.bpm, musical_key: b.musical_key,
    genre: b.genre, mood: b.mood, purchase_url: b.purchase_url, inquiry_url: b.inquiry_url,
    featured: b.featured, status: b.status,
  };
}

function validate(form: Form, licenses: LicenseInput[]): string[] {
  const errs: string[] = [];
  if (!form.title.trim()) errs.push('Title is required.');
  if (!isValidSlug(form.slug)) errs.push('Slug may only contain lowercase letters, numbers and single hyphens.');
  if (form.bpm !== null && (!Number.isInteger(form.bpm) || form.bpm < 1 || form.bpm > 400)) errs.push('BPM must be a whole number between 1 and 400.');
  if (form.purchase_url && !/^https?:\/\//.test(form.purchase_url)) errs.push('Purchase URL must start with https://');
  if (form.inquiry_url && !/^https?:\/\//.test(form.inquiry_url)) errs.push('Inquiry URL must start with https://');
  for (const l of licenses) {
    if (l.price !== null && l.price < 0) errs.push(`${l.name}: price cannot be negative.`);
    if (l.enabled && (l.price === null || Number.isNaN(l.price))) errs.push(`${l.name}: enabled licenses need a price.`);
    if (l.purchase_url && !/^https?:\/\//.test(l.purchase_url)) errs.push(`${l.name}: purchase URL must start with https://`);
  }
  return errs;
}

export default function BeatEditor() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>(EMPTY);
  const [licenses, setLicenses] = useState<LicenseInput[]>(DEFAULT_LICENSES);
  const [previewPath, setPreviewPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const [beatId, setBeatId] = useState<string | null>(id ?? null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const res = await getAdminBeat(id!);
      if (res.error || !res.data) { setLoadError(res.error ?? 'This beat could not be loaded.'); setLoading(false); return; }
      const b = res.data;
      setForm(toForm(b));
      setSlugTouched(true);
      setPreviewPath(b.preview_path);
      setLicenses(
        DEFAULT_LICENSES.map((d) => {
          const existing = b.licenses.find((l) => l.license_key === d.license_key);
          return existing
            ? { license_key: existing.license_key, name: existing.name, description: existing.description, price: existing.price, purchase_url: existing.purchase_url, enabled: existing.enabled, sort_order: existing.sort_order }
            : d;
        }),
      );
      setLoading(false);
    })();
  }, [id, isNew]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setDirty(true); setMessage(null);
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === 'title' && !slugTouched) next.slug = slugify(String(value));
      return next;
    });
  }

  function updateLicense(key: string, patch: Partial<LicenseInput>) {
    setDirty(true); setMessage(null);
    setLicenses((ls) => ls.map((l) => (l.license_key === key ? { ...l, ...patch } : l)));
  }

  async function handleSave(nextStatus?: ContentStatus) {
    const toSave: Form = { ...form, status: nextStatus ?? form.status };
    const errs = validate(toSave, licenses);
    setErrors(errs);
    setSaveError(null); setMessage(null);
    if (errs.length) return;

    setSaving(true);
    const res = await saveBeat(beatId, toSave);
    if (res.error || !res.data) { setSaveError(res.error ?? 'Could not save the beat.'); setSaving(false); return; }

    const savedId = res.data.id;

    const licRes = await saveLicenses(savedId, licenses);
    if (licRes.error) {
      setSaveError(`The beat was saved, but its prices were not: ${licRes.error}`);
      setBeatId(savedId);
      setSaving(false);
      return;
    }

    await logActivity(isNew ? 'CREATE' : 'UPDATE', 'beat', savedId, { title: toSave.title, status: toSave.status });
    setForm({ ...toSave, status: toSave.status });
    setDirty(false);
    setSaving(false);
    setForm((f) => ({ ...f, status: toSave.status }));
    if (isNew) {
      setBeatId(savedId);
      navigate(`/admin/beats/${savedId}`, { replace: true });
    }
    setMessage(toSave.status === 'PUBLISHED' ? 'Beat published.' : 'Beat saved.');
  }

  async function handlePreview(file: File | undefined) {
    if (!file || !beatId) {
      setSaveError('Save the beat first, then upload its preview.');
      return;
    }
    const problem = validateFile(file, AUDIO_TYPES, MAX_AUDIO_BYTES);
    if (problem) { setSaveError(problem); return; }
    setUploading(true); setSaveError(null); setMessage(null);
    const up = await uploadFile('audio-previews', `beats/${form.slug}`, file, 'Audio');
    if (up.error) { setSaveError(up.error); setUploading(false); return; }
    const attach = await setBeatPreview(beatId, up.path);
    if (attach.error) { setSaveError(attach.error); setUploading(false); return; }
    await logActivity('UPLOAD', 'beat', beatId, { kind: 'preview', filename: file.name.slice(0, 200) });
    setPreviewPath(up.path);
    setMessage('Preview uploaded.');
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  async function removePreview() {
    if (!beatId) return;
    if (!window.confirm('Remove this preview? The public player will be disabled. The file stays in storage.')) return;
    const res = await setBeatPreview(beatId, null);
    if (res.error) { setSaveError(res.error); return; }
    setPreviewPath(null);
    setMessage('Preview removed from the beat.');
  }

  if (loading) return <p className="text-[#A99EAE] text-sm" aria-busy="true">Loading beat…</p>;
  if (loadError) return (
    <div className="space-y-4">
      <Notice kind="error">{loadError}</Notice>
      <Link to="/admin/beats" className="text-[#B84DFF]">Back to beats</Link>
    </div>
  );

  const previewUrl = publicUrl('audio-previews', previewPath);
  const inputCls = 'w-full bg-[#070810] border border-[#18131D] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#B84DFF]';
  const labelCls = 'block text-xs uppercase tracking-wider text-[#A99EAE] mb-1';

  return (
    <form className="space-y-8" noValidate onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <Link to="/admin/beats" className="text-sm text-[#A99EAE] hover:text-[#F2EDF5]">← Beats</Link>
          <h1 className="text-3xl font-bold">{isNew ? 'New beat' : form.title || 'Untitled beat'}</h1>
          <div className="flex items-center gap-3 text-sm">
            <StatusBadge status={form.status} />
            <span className="text-[#A99EAE]">{dirty ? 'Unsaved changes' : 'All changes saved'}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="border border-[#A99EAE] px-4 py-2 rounded text-sm disabled:opacity-40">
            {saving ? 'Saving…' : 'Save'}
          </button>
          {form.status !== 'PUBLISHED' && (
            <button type="button" disabled={saving} onClick={() => handleSave('PUBLISHED')} className="bg-[#B84DFF] text-white px-4 py-2 rounded text-sm disabled:opacity-40">
              Save & publish
            </button>
          )}
        </div>
      </header>

      {errors.length > 0 && (
        <Notice kind="error">
          <ul className="list-disc pl-5 space-y-1">{errors.map((e) => <li key={e}>{e}</li>)}</ul>
        </Notice>
      )}
      {saveError && <Notice kind="error">{saveError}</Notice>}
      {message && <Notice kind="success">{message}</Notice>}

      <fieldset className="grid gap-5 md:grid-cols-2">
        <legend className="sr-only">Beat details</legend>
        <div>
          <label className={labelCls} htmlFor="title">Title *</label>
          <input id="title" className={inputCls} value={form.title} onChange={(e) => update('title', e.target.value)} required />
        </div>
        <div>
          <label className={labelCls} htmlFor="slug">Slug *</label>
          <input id="slug" className={inputCls} value={form.slug}
            onChange={(e) => { setSlugTouched(true); update('slug', e.target.value.toLowerCase()); }} />
          <p className="text-xs text-[#A99EAE] mt-1">Public address: /beats#{form.slug || '…'}</p>
        </div>
        <div>
          <label className={labelCls} htmlFor="bpm">BPM</label>
          <input id="bpm" type="number" min={1} max={400} className={inputCls} value={form.bpm ?? ''}
            onChange={(e) => update('bpm', e.target.value === '' ? null : Number(e.target.value))} />
        </div>
        <div>
          <label className={labelCls} htmlFor="key">Key</label>
          <input id="key" className={inputCls} placeholder="e.g. C# minor" value={form.musical_key ?? ''}
            onChange={(e) => update('musical_key', e.target.value || null)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="genre">Genre</label>
          <input id="genre" className={inputCls} value={form.genre ?? ''} onChange={(e) => update('genre', e.target.value || null)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="mood">Mood</label>
          <input id="mood" className={inputCls} placeholder="e.g. Melancholic Trap" value={form.mood ?? ''}
            onChange={(e) => update('mood', e.target.value || null)} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls} htmlFor="description">Description</label>
          <textarea id="description" rows={3} className={inputCls} value={form.description ?? ''}
            onChange={(e) => update('description', e.target.value || null)} />
        </div>
        <div>
          <label className={labelCls} htmlFor="purchase">Purchase URL (optional)</label>
          <input id="purchase" type="url" className={inputCls} placeholder="https://…" value={form.purchase_url ?? ''}
            onChange={(e) => update('purchase_url', e.target.value || null)} />
          <p className="text-xs text-[#A99EAE] mt-1">If empty, visitors are sent to the inquiry form.</p>
        </div>
        <div>
          <label className={labelCls} htmlFor="inquiry">Inquiry URL (optional)</label>
          <input id="inquiry" type="url" className={inputCls} placeholder="https://…" value={form.inquiry_url ?? ''}
            onChange={(e) => update('inquiry_url', e.target.value || null)} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
          Featured beat
        </label>
        <div>
          <label className={labelCls} htmlFor="status">Status</label>
          <select id="status" className={inputCls} value={form.status} onChange={(e) => update('status', e.target.value as ContentStatus)}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </fieldset>

      <section className="space-y-4" aria-labelledby="licenses-heading">
        <h2 id="licenses-heading" className="text-lg font-semibold">Licenses and prices</h2>
        <p className="text-sm text-[#A99EAE]">Only enabled licenses with a price appear on the public page.</p>
        <div className="space-y-3">
          {licenses.map((l) => (
            <div key={l.license_key} className="grid gap-3 md:grid-cols-[8rem_1fr_9rem_auto] items-end border border-[#18131D] rounded p-4">
              <div>
                <p className={labelCls}>{l.license_key}</p>
                <p className="text-sm">{l.name}</p>
              </div>
              <div>
                <label className={labelCls} htmlFor={`purchase-${l.license_key}`}>Purchase URL</label>
                <input id={`purchase-${l.license_key}`} type="url" className={inputCls} placeholder="Optional"
                  value={l.purchase_url ?? ''} onChange={(e) => updateLicense(l.license_key, { purchase_url: e.target.value || null })} />
              </div>
              <div>
                <label className={labelCls} htmlFor={`price-${l.license_key}`}>Price (R$)</label>
                <input id={`price-${l.license_key}`} type="number" min={0} step="0.01" className={inputCls}
                  value={l.price ?? ''} onChange={(e) => updateLicense(l.license_key, { price: e.target.value === '' ? null : Number(e.target.value) })} />
              </div>
              <label className="flex items-center gap-2 text-sm pb-2">
                <input type="checkbox" checked={l.enabled} onChange={(e) => updateLicense(l.license_key, { enabled: e.target.checked })} />
                Enabled
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="preview-heading">
        <h2 id="preview-heading" className="text-lg font-semibold">Preview audio</h2>
        {isNew && <p className="text-sm text-[#A99EAE]">Save the beat first, then upload a preview.</p>}
        {!isNew && previewUrl && (
          <div className="space-y-3">
            <audio controls preload="none" src={previewUrl} className="w-full" />
            <button type="button" onClick={removePreview} className="text-sm text-red-400 hover:text-red-300">Remove preview</button>
          </div>
        )}
        {!isNew && !previewUrl && <p className="text-sm text-[#A99EAE]">No preview yet. The public player stays disabled until one is uploaded.</p>}
        {!isNew && (
          <div>
            <label className={labelCls} htmlFor="preview-file">{previewUrl ? 'Replace preview' : 'Upload preview'} (MP3, WAV or FLAC, up to 50 MB)</label>
            <input id="preview-file" ref={fileRef} type="file" accept={AUDIO_TYPES.join(',')} disabled={uploading}
              onChange={(e) => handlePreview(e.target.files?.[0])} className="text-sm" />
            {uploading && <p className="text-sm text-[#A99EAE] mt-2" aria-live="polite">Uploading…</p>}
          </div>
        )}
      </section>
    </form>
  );
}
