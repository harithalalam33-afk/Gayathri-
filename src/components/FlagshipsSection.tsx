import React from 'react';
import { MapPin, Calendar, Clock, Phone, Mail } from 'lucide-react';
import { ATELIERS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const FlagshipsSection: React.FC = () => {
  const { setIsAppointmentModalOpen } = useShop();

  return (
    <section id="flagships-section" className="py-20 px-6 lg:px-12 bg-[#FBFBFA] border-b border-stone-200">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-stone-200 gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium mb-2">
              Physical Boutiques & Consultation Spaces
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-display font-light text-stone-900">
              Flagship Ateliers
            </h2>
          </div>

          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="px-6 py-3 bg-[#141416] text-white hover:bg-stone-800 transition-colors text-xs uppercase tracking-wider font-semibold flex items-center gap-2 self-start md:self-auto"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Private Fitting Appointment</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ATELIERS.map((atelier) => (
            <div key={atelier.city} className="p-6 bg-white border border-stone-200/90 flex flex-col justify-between hover:border-stone-400 transition-colors">
              <div>
                <div className="flex items-center gap-2 text-stone-500 text-xs uppercase tracking-widest mb-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-800" />
                  <span>{atelier.city} Flagship</span>
                </div>
                <h3 className="font-serif-display text-xl text-stone-900 mb-3">
                  {atelier.name}
                </h3>

                <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                  {atelier.address}
                </p>

                <div className="space-y-2 text-xs text-stone-500 pt-3 border-t border-stone-100 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{atelier.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{atelier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>{atelier.email}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  Atelier Services
                </div>
                <ul className="text-xs text-stone-600 space-y-1 mb-6">
                  {atelier.services.map((svc, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-stone-400 rounded-full" />
                      <span>{svc}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="w-full py-2.5 border border-stone-300 hover:border-stone-950 text-stone-900 hover:text-black transition-colors text-xs uppercase tracking-wider font-semibold"
                >
                  Schedule Private Fitting
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
