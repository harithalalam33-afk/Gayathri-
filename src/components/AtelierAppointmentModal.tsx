import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ATELIERS } from '../data/products';

export const AtelierAppointmentModal: React.FC = () => {
  const { isAppointmentModalOpen, setIsAppointmentModalOpen } = useShop();

  const [selectedCity, setSelectedCity] = useState('Paris');
  const [selectedDate, setSelectedDate] = useState('2026-10-06');
  const [selectedTime, setSelectedTime] = useState('14:30');
  const [serviceType, setServiceType] = useState('Private Capsule Styling');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isAppointmentModalOpen) return null;

  const currentAtelier = ATELIERS.find((a) => a.city === selectedCity) || ATELIERS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    setIsAppointmentModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-white max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#FBFBFA]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-stone-900" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold block">
                Atelier Concierge Reservation
              </span>
              <h3 className="font-serif-display text-2xl text-stone-900">
                Private Fitting Appointment
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsAppointmentModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {isBooked ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="font-serif-display text-2xl text-stone-900">
                Fitting Session Reserved
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                We look forward to hosting you at our {currentAtelier.name}. A calendar invite and concierge contact details have been sent to <strong>{email || 'your email'}</strong>.
              </p>
              <div className="p-4 bg-stone-50 border border-stone-200 text-xs text-stone-700 text-left max-w-xs mx-auto space-y-1">
                <div><strong>Location:</strong> {currentAtelier.address}</div>
                <div><strong>Date & Time:</strong> {selectedDate} at {selectedTime}</div>
                <div><strong>Service:</strong> {serviceType}</div>
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* City Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1.5">
                  Select Flagship Atelier Location
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {ATELIERS.map((at) => (
                    <button
                      key={at.city}
                      type="button"
                      onClick={() => setSelectedCity(at.city)}
                      className={`p-2.5 text-xs text-center border transition-all ${
                        selectedCity === at.city
                          ? 'bg-stone-900 text-white font-semibold border-stone-900'
                          : 'bg-white border-stone-300 text-stone-700 hover:border-stone-900'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 mx-auto mb-1 opacity-70" />
                      <span>{at.city}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-stone-500 mt-1">{currentAtelier.address}</p>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1.5">
                  Appointment Type
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:outline-none"
                >
                  <option value="Private Capsule Styling">Private Capsule Styling (60 mins)</option>
                  <option value="Made-to-Measure Outerwear Consultation">Made-to-Measure Outerwear Consultation (90 mins)</option>
                  <option value="Japanese Selvedge Denim Fitting">Japanese Selvedge Denim Fitting (45 mins)</option>
                  <option value="Complimentary Garment Care & Mending Service">Complimentary Garment Care & Mending Drop-off (30 mins)</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:outline-none"
                  >
                    <option value="11:30">11:30 AM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:30">6:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Vandeberg"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555-0192"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 focus:border-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#141416] hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Confirm Reservation</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
