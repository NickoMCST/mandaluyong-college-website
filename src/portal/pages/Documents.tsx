import { useState } from 'react';
import { Download, Clock, CheckCircle2, FileText, Plus, Eye } from 'lucide-react';
import { cn } from '../lib/utils';

type DocStatus = 'available' | 'pending' | 'processing' | 'ready';

const documents = [
  { id: 1, name: 'Certificate of Enrollment', date: 'Aug 14, 2026', status: 'ready' as DocStatus, ref: 'DOC-2026-0041' },
  { id: 2, name: 'True Copy of Grades (1st Sem)', date: 'Aug 10, 2026', status: 'ready' as DocStatus, ref: 'DOC-2026-0038' },
  { id: 3, name: 'Certificate of Good Moral Character', date: 'Aug 16, 2026', status: 'processing' as DocStatus, ref: 'DOC-2026-0045' },
];

const available = [
  'Certificate of Enrollment',
  'True Copy of Grades',
  'Certificate of Good Moral Character',
  'Transcript of Records',
  'Authentication of Documents',
  'Certification (General Purpose)',
  'Diploma Verification',
];

const statusConfig: Record<DocStatus, { label: string; icon: typeof Clock; className: string }> = {
  available: { label: 'Available', icon: CheckCircle2, className: 'text-success bg-success/10' },
  pending: { label: 'Pending', icon: Clock, className: 'text-muted-foreground bg-secondary' },
  processing: { label: 'Processing', icon: Clock, className: 'text-warning bg-warning/10' },
  ready: { label: 'Ready', icon: CheckCircle2, className: 'text-primary bg-primary/10' },
};

function StatusBadge({ status }: { status: DocStatus }) {
  const cfg = statusConfig[status];
  return (
    <span className={cn('inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded', cfg.className)}>
      <cfg.icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

export default function Documents() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-foreground leading-[1.1]">Documents</h1>
          <p className="text-muted-foreground text-sm mt-2">Request, track, and download your official school documents.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 text-[12.5px] font-medium bg-primary text-primary-foreground px-3 py-2 rounded hover:bg-primary/90 transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Request Document
        </button>
      </div>

      {/* Requests */}
      <div className="bg-card border border-border rounded-md overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-[13px] font-semibold text-foreground">My Requests</h2>
        </div>
        {documents.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <FileText className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-[13px] text-muted-foreground">No document requests yet.</p>
            <p className="text-[12px] text-muted-foreground/60 mt-0.5">Click "Request Document" to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="px-5 py-2.5 text-left font-semibold text-muted-foreground">Document</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground hidden sm:table-cell">Reference</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground hidden sm:table-cell">Date Requested</th>
                  <th className="px-4 py-2.5 text-center font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-center font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {documents.map((d) => (
                  <tr key={d.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-3 text-foreground font-medium">{d.name}</td>
                    <td className="px-4 py-3 font-mono text-[11.5px] text-muted-foreground hidden sm:table-cell">{d.ref}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{d.date}</td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      {d.status === 'ready' ? (
                        <button className="inline-flex items-center gap-1 text-[11.5px] text-primary hover:underline font-medium">
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      ) : (
                        <button className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground hover:text-foreground">
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Available documents */}
      <div className="bg-card border border-border rounded-md">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-[13px] font-semibold text-foreground">Available Document Types</h2>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {available.map((name) => (
            <div key={name} className="flex items-center gap-2 px-3 py-2 rounded border border-border text-[12.5px] text-foreground">
              <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              {name}
            </div>
          ))}
        </div>
        <div className="px-5 pb-4">
          <p className="text-[11.5px] text-muted-foreground">
            Processing time is typically 3–5 working days. Rush requests may be accommodated. Visit the Registrar's Office for more information.
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-md w-full max-w-md shadow-lg">
              <div className="px-5 py-4 border-b border-border">
                <h3 className="text-[14px] font-semibold text-foreground">Request a Document</h3>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[12px] font-medium text-foreground mb-1.5">Document Type</label>
                  <select className="w-full border border-border rounded px-3 py-2 text-[13px] text-foreground bg-background outline-none focus:ring-1 focus:ring-ring">
                    <option value="">Select document...</option>
                    {available.map((name) => <option key={name}>{name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-foreground mb-1.5">Purpose</label>
                  <input
                    type="text"
                    placeholder="e.g. Scholarship application"
                    className="w-full border border-border rounded px-3 py-2 text-[13px] text-foreground bg-background outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-foreground mb-1.5">Number of Copies</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    defaultValue={1}
                    className="w-full border border-border rounded px-3 py-2 text-[13px] text-foreground bg-background outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="px-5 pb-5 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[12.5px] px-4 py-2 rounded border border-border text-muted-foreground hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[12.5px] px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
