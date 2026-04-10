import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, addDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { SiteContent, StageType, GalleryItem, BlogPost, Inquiry } from '../../types';
import { LayoutDashboard, Image as ImageIcon, FileText, MessageSquare, Settings, LogOut, Plus, Trash2, Save, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AdminPanel({ onExit }: { onExit: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'stages' | 'gallery' | 'blogs' | 'inquiries'>('content');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'masud') {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[100] bg-brand-primary flex items-center justify-center p-6">
        <div className="w-full max-w-md luxury-card p-10 rounded-3xl">
          <h2 className="text-3xl font-serif text-center mb-8">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-brand-primary/40">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-brand-neutral border-b border-brand-primary/10 py-3 outline-none focus:border-brand-accent transition-colors"
                placeholder="Enter password"
              />
            </div>
            <button className="w-full py-4 bg-brand-accent text-brand-primary font-bold rounded-full hover:bg-brand-accent/90 transition-all">
              Login
            </button>
            <button 
              type="button"
              onClick={onExit}
              className="w-full text-xs font-bold uppercase tracking-widest text-brand-primary/40 hover:text-brand-primary"
            >
              Back to Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-brand-neutral flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-primary text-brand-neutral flex flex-col">
        <div className="p-8 border-b border-brand-neutral/10">
          <h1 className="text-xl font-serif font-bold tracking-tighter">
            MASUD <span className="text-brand-accent">ADMIN</span>
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={<Settings />} label="Site Content" />
          <NavItem active={activeTab === 'stages'} onClick={() => setActiveTab('stages')} icon={<LayoutDashboard />} label="Stages" />
          <NavItem active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon={<ImageIcon />} label="Gallery" />
          <NavItem active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')} icon={<FileText />} label="Blogs" />
          <NavItem active={activeTab === 'inquiries'} onClick={() => setActiveTab('inquiries')} icon={<MessageSquare />} label="Inquiries" />
        </nav>

        <div className="p-4 border-t border-brand-neutral/10">
          <button 
            onClick={onExit}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-brand-neutral/60 hover:text-brand-neutral transition-colors"
          >
            <LogOut className="w-4 h-4" /> Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12">
        {activeTab === 'content' && <ContentEditor />}
        {activeTab === 'stages' && <StagesEditor />}
        {activeTab === 'gallery' && <GalleryEditor />}
        {activeTab === 'blogs' && <BlogsEditor />}
        {activeTab === 'inquiries' && <InquiriesList />}
      </main>
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all",
        active ? "bg-brand-accent text-brand-primary font-bold" : "text-brand-neutral/60 hover:bg-brand-neutral/5"
      )}
    >
      {icon} {label}
    </button>
  );
}

// --- Editors ---

function ContentEditor() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    return onSnapshot(doc(db, 'settings', 'content'), (doc) => {
      if (doc.exists()) setContent(doc.data() as SiteContent);
    });
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    await setDoc(doc(db, 'settings', 'content'), content);
    setSaving(false);
    alert('Saved successfully');
  };

  if (!content) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif">Site Content</h2>
        <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-brand-accent text-brand-primary rounded-full font-bold flex items-center gap-2">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Field label="Hero Title" value={content.heroTitle} onChange={v => setContent({...content, heroTitle: v})} />
        <Field label="Hero Subtitle" value={content.heroSubtitle} onChange={v => setContent({...content, heroSubtitle: v})} />
        <Field label="About Text" value={content.aboutText} onChange={v => setContent({...content, aboutText: v})} textarea />
        <Field label="Contact Email" value={content.contactEmail} onChange={v => setContent({...content, contactEmail: v})} />
        <Field label="Contact Phone" value={content.contactPhone} onChange={v => setContent({...content, contactPhone: v})} />
        <Field label="Address" value={content.address} onChange={v => setContent({...content, address: v})} />
      </div>
    </div>
  );
}

function StagesEditor() {
  const [stages, setStages] = useState<StageType[]>([]);
  const [editing, setEditing] = useState<Partial<StageType> | null>(null);

  useEffect(() => {
    return onSnapshot(collection(db, 'stages'), (snap) => {
      setStages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as StageType)));
    });
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    if (editing.id) {
      await updateDoc(doc(db, 'stages', editing.id), editing);
    } else {
      await addDoc(collection(db, 'stages'), editing);
    }
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this stage?')) {
      await deleteDoc(doc(db, 'stages', id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif">Stage Types</h2>
        <button onClick={() => setEditing({ name: '', description: '', imageUrl: '', features: [] })} className="px-6 py-2 bg-brand-accent text-brand-primary rounded-full font-bold flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New Stage
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stages.map(stage => (
          <div key={stage.id} className="luxury-card p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <img src={stage.imageUrl} className="w-full h-32 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-serif mb-2">{stage.name}</h3>
              <p className="text-xs text-brand-primary/60 line-clamp-2">{stage.description}</p>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setEditing(stage)} className="flex-1 py-2 text-xs font-bold uppercase tracking-widest border border-brand-primary/10 rounded-lg hover:bg-brand-neutral transition-colors">Edit</button>
              <button onClick={() => handleDelete(stage.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[110] bg-brand-primary/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-xl bg-brand-neutral p-10 rounded-3xl shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-serif">{editing.id ? 'Edit Stage' : 'New Stage'}</h3>
              <button onClick={() => setEditing(null)}><X /></button>
            </div>
            <Field label="Name" value={editing.name || ''} onChange={v => setEditing({...editing, name: v})} />
            <Field label="Description" value={editing.description || ''} onChange={v => setEditing({...editing, description: v})} textarea />
            <Field label="Image URL" value={editing.imageUrl || ''} onChange={v => setEditing({...editing, imageUrl: v})} />
            <button onClick={handleSave} className="w-full py-4 bg-brand-accent text-brand-primary font-bold rounded-full">Save Stage</button>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryEditor() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [newItem, setNewItem] = useState({ title: '', imageUrl: '', category: 'Concert' });

  useEffect(() => {
    return onSnapshot(collection(db, 'gallery'), (snap) => {
      setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem)));
    });
  }, []);

  const handleAdd = async () => {
    await addDoc(collection(db, 'gallery'), { ...newItem, createdAt: serverTimestamp() });
    setNewItem({ title: '', imageUrl: '', category: 'Concert' });
  };

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-serif">Gallery Management</h2>
      
      <div className="luxury-card p-8 rounded-3xl grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        <Field label="Title" value={newItem.title} onChange={v => setNewItem({...newItem, title: v})} />
        <Field label="Image URL" value={newItem.imageUrl} onChange={v => setNewItem({...newItem, imageUrl: v})} />
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-primary/40">Category</label>
          <select 
            value={newItem.category}
            onChange={e => setNewItem({...newItem, category: e.target.value as any})}
            className="w-full bg-transparent border-b border-brand-primary/10 py-3 outline-none"
          >
            <option>Concert</option>
            <option>Corporate</option>
            <option>Exhibition</option>
            <option>Wedding</option>
          </select>
        </div>
        <button onClick={handleAdd} className="py-3 bg-brand-accent text-brand-primary font-bold rounded-full">Add Photo</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map(item => (
          <div key={item.id} className="relative group aspect-square rounded-xl overflow-hidden">
            <img src={item.imageUrl} className="w-full h-full object-cover" />
            <button 
              onClick={() => deleteDoc(doc(db, 'gallery', item.id))}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogsEditor() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);

  useEffect(() => {
    return onSnapshot(collection(db, 'blogs'), (snap) => {
      setBlogs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost)));
    });
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    if (editing.id) {
      await updateDoc(doc(db, 'blogs', editing.id), editing);
    } else {
      await addDoc(collection(db, 'blogs'), { ...editing, publishedAt: serverTimestamp(), author: 'Admin' });
    }
    setEditing(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif">Blog Posts</h2>
        <button onClick={() => setEditing({ title: '', content: '', imageUrl: '' })} className="px-6 py-2 bg-brand-accent text-brand-primary rounded-full font-bold flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {blogs.map(post => (
          <div key={post.id} className="luxury-card p-6 rounded-2xl flex justify-between items-center">
            <div className="flex items-center gap-6">
              <img src={post.imageUrl} className="w-24 h-24 object-cover rounded-xl" />
              <div>
                <h3 className="text-xl font-serif">{post.title}</h3>
                <p className="text-xs text-brand-primary/40">Published: {post.publishedAt?.toDate().toLocaleDateString() || 'Draft'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(post)} className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-brand-primary/10 rounded-lg">Edit</button>
              <button onClick={() => deleteDoc(doc(db, 'blogs', post.id))} className="p-2 text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[110] bg-brand-primary/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-brand-neutral p-10 rounded-3xl shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-serif">{editing.id ? 'Edit Post' : 'New Post'}</h3>
              <button onClick={() => setEditing(null)}><X /></button>
            </div>
            <Field label="Title" value={editing.title || ''} onChange={v => setEditing({...editing, title: v})} />
            <Field label="Content" value={editing.content || ''} onChange={v => setEditing({...editing, content: v})} textarea />
            <Field label="Image URL" value={editing.imageUrl || ''} onChange={v => setEditing({...editing, imageUrl: v})} />
            <button onClick={handleSave} className="w-full py-4 bg-brand-accent text-brand-primary font-bold rounded-full">Save Post</button>
          </div>
        </div>
      )}
    </div>
  );
}

function InquiriesList() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    return onSnapshot(collection(db, 'inquiries'), (snap) => {
      setInquiries(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry)));
    });
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif">Customer Inquiries</h2>
      <div className="space-y-4">
        {inquiries.map(inq => (
          <div key={inq.id} className="luxury-card p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-lg">{inq.name}</h4>
                <p className="text-xs text-brand-primary/40">{inq.email} | {inq.phone}</p>
              </div>
              <button onClick={() => deleteDoc(doc(db, 'inquiries', inq.id))} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
            <p className="text-sm text-brand-primary/70 bg-brand-neutral p-4 rounded-xl">{inq.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, textarea }: { label: string, value: string, onChange: (v: string) => void, textarea?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest font-bold text-brand-primary/40">{label}</label>
      {textarea ? (
        <textarea 
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          className="w-full bg-transparent border-b border-brand-primary/10 py-3 outline-none focus:border-brand-accent transition-colors resize-none"
        />
      ) : (
        <input 
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-transparent border-b border-brand-primary/10 py-3 outline-none focus:border-brand-accent transition-colors"
        />
      )}
    </div>
  );
}
