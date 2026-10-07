import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listAdminBeats, setBeatStatus, deleteBeat, type BeatWithLicenses } from '../../lib/beats';
import { logActivity } from '../../lib/activity';
import { StatusBadge } from '../shared/StatusBadge';
import { Notice } from '../shared/Notice';
import type { ContentStatus } from '../../types/database';

export default function BeatsList() {
  const [beats, setBeats] = useState<BeatWithLicenses[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ContentStatus | 'ALL'>('ALL');
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setError(null);
    const res = await listAdminBeats({ search, status });
    if (res.error) setError(res.error);
    else setBeats(res.data);
  }

  useEffect(() => {
    const t = setTimeout(load, 200); // debounce search
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status]);

  async function changeStatus(beat: BeatWithLicenses, next: ContentStatus) {
    setBusyId(beat.id); setMessage(null); setError(null);
    const res = await setBeatStatus(beat.id, next);
    if (res.error) setError(res.error);
    else {
      await logActivity(next === 'PUBLISHED' ? 'PUBLISH' : next === 'ARCHIVED' ? 'ARCHIVE' : 'UPDATE', 'beat', beat.id, { title: beat.title, status: next });
      setMessage(`"${beat.title}" is now ${next.toLowerCase()}.`);
      await load();
    }
    setBusyId(null);
  }

  async function remove(beat: BeatWithLicenses) {
    if (!window.confirm(`Delete "${beat.title}" permanently? This also removes its prices. Archive instead if you may need it again.`)) return;
    setBusyId(beat.id); setError(null);
    const res = await deleteBeat(beat.id);
    if (res.error) setError(res.error);
    else {
      await logActivity('DELETE', 'beat', beat.id, { title: beat.title });
      setMessage(`"${beat.title}" was deleted.`);
      await load();
    }
    setBusyId(null);
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Beats</h1>
          <p className="text-[#A99EAE] mt-1 text-sm">Prices and licenses are edited inside each beat.</p>
        </div>
        <Link to="/admin/beats/new" className="bg-[#B84DFF] text-white px-4 py-2 rounded text-sm font-medium">+ New Beat</Link>
      </header>

      <div className="flex flex-wrap gap-3">
        <label className="sr-only" htmlFor="beat-search">Search beats</label>
        <input id="beat-search" type="search" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title…" className="bg-[#11101A] border border-[#18131D] rounded px-3 py-2 text-sm flex-1 min-w-[12rem]" />
        <label className="sr-only" htmlFor="beat-status">Filter by status</label>
        <select id="beat-status" value={status} onChange={(e) => setStatus(e.target.value as ContentStatus | 'ALL')}
          className="bg-[#11101A] border border-[#18131D] rounded px-3 py-2 text-sm">
          <option value="ALL">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {error && <Notice kind="error">{error}</Notice>}
      {message && <Notice kind="success">{message}</Notice>}

      {beats === null && !error && <p className="text-[#A99EAE] text-sm" aria-busy="true">Loading beats…</p>}

      {beats && beats.length === 0 && (
        <div className="border border-dashed border-[#18131D] rounded p-10 text-center">
          <p className="text-[#F2EDF5]">{search || status !== 'ALL' ? 'No beats match these filters.' : 'No beats yet.'}</p>
          {!search && status === 'ALL' && (
            <Link to="/admin/beats/new" className="inline-block mt-4 text-[#B84DFF]">Create your first beat</Link>
          )}
        </div>
      )}

      {beats && beats.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[#A99EAE] border-b border-[#18131D]">
              <tr>
                <th className="py-2 pr-4 font-medium">Title</th>
                <th className="py-2 pr-4 font-medium">BPM / Key</th>
                <th className="py-2 pr-4 font-medium">Licenses</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {beats.map((b) => (
                <tr key={b.id} className="border-b border-[#18131D] align-middle">
                  <td className="py-3 pr-4">
                    <Link to={`/admin/beats/${b.id}`} className="text-[#F2EDF5] hover:text-[#B84DFF]">{b.title}</Link>
                    {b.featured && <span className="ml-2 text-xs text-[#B84DFF]">featured</span>}
                  </td>
                  <td className="py-3 pr-4 text-[#A99EAE]">{b.bpm ?? '—'} · {b.musical_key ?? '—'}</td>
                  <td className="py-3 pr-4 text-[#A99EAE]">{b.licenses.filter((l) => l.enabled).length}</td>
                  <td className="py-3 pr-4"><StatusBadge status={b.status} /></td>
                  <td className="py-3 text-right space-x-3 whitespace-nowrap">
                    <Link to={`/admin/beats/${b.id}`} className="text-[#A99EAE] hover:text-[#F2EDF5]">Edit</Link>
                    {b.status !== 'PUBLISHED' && (
                      <button type="button" disabled={busyId === b.id} onClick={() => changeStatus(b, 'PUBLISHED')} className="text-[#A99EAE] hover:text-[#F2EDF5] disabled:opacity-40">Publish</button>
                    )}
                    {b.status === 'PUBLISHED' && (
                      <button type="button" disabled={busyId === b.id} onClick={() => changeStatus(b, 'DRAFT')} className="text-[#A99EAE] hover:text-[#F2EDF5] disabled:opacity-40">Unpublish</button>
                    )}
                    {b.status !== 'ARCHIVED' && (
                      <button type="button" disabled={busyId === b.id} onClick={() => changeStatus(b, 'ARCHIVED')} className="text-[#A99EAE] hover:text-[#F2EDF5] disabled:opacity-40">Archive</button>
                    )}
                    <button type="button" disabled={busyId === b.id} onClick={() => remove(b)} className="text-red-400 hover:text-red-300 disabled:opacity-40">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
