import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SiteContent } from '../types';

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'content'), (doc) => {
      if (doc.exists()) {
        setContent(doc.data() as SiteContent);
      } else {
        // Default content if none exists
        setContent({
          heroTitle: "Premium Event Stages",
          heroSubtitle: "Expert Steel Fabrication & Stage Construction in Riyadh",
          aboutText: "Masud Enterprise specializes in high-quality steel stage construction for events across Saudi Arabia. From corporate exhibitions to massive concert stages, we deliver excellence.",
          contactEmail: "info@masudenterprise.com",
          contactPhone: "+966 123 456 789",
          address: "Riyadh, Saudi Arabia"
        });
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { content, loading };
}
