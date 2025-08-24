import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  HeartHandshake, Store, Bike, Trees,
  Dumbbell, FileSignature, Handshake, KeyRound, Banknote, ArrowUp, Calendar, Waves, Sun, Thermometer, HeartPulse
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "Курортный кластер TEMPO — Саки, первая линия моря | сервисные апартаменты";

  const meta = [
    { name: "description", content: "TEMPO в Саках (Крым): семейный курортный кластер бизнес‑класса на 1‑й береговой линии (~50 м до моря). 4 корпуса, 8–12 этажей, апартаменты с террасами и патио, подземный паркинг, медицинский и оздоровительный центр, променада с кафе. ДДУ 214‑ФЗ, эскроу. Сроки — 2027–2028 по очередям." },
    { property: "og:title", content: "TEMPO — сервисные апартаменты на первой линии (Саки)" },
    { property: "og:description", content: "14 га, 4 корпуса, частный пляж, SPA и спорт, променада со стрит‑ритейлом. Планировки: студии — 3‑комн., white box/без отделки, опции дизайнерской отделки." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-image-tempo.jpg" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://example.com/" }
  ];

  meta.forEach((m) => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(key, m.name || m.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  });

  // canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = typeof location !== "undefined" ? location.href : "https://example.com/";

  // preload hero (замените на визуал проекта при наличии)
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"; // море — заглушка
    document.head.appendChild(pl);
  }
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" }
  ];
  links.forEach(cfg => {
    const l = document.createElement("link");
    Object.entries(cfg).forEach(([k, v]) => v !== undefined && l.setAttribute(k, v as string));
    document.head.appendChild(l);
  });
}

/* ================= ВСПОМОГАТЕЛЬНЫЕ UI ================= */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full relative overflow-hidden"
      style={{ borderColor: "#BFE0F2", backgroundColor: "#FFFFFF", color: "#0B1E2A" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #0284C7 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#3E6B84" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
         style={{ borderColor: "#BFE0F2", backgroundColor: "#F0F9FF", color: "#0B1E2A" }}>
      {children}
    </div>
  );
}

/* ================= ПРИЛОЖЕНИЕ ================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    injectFonts();
    injectSEO();
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    const onScroll = () => setShowUp(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#F5FBFF", color: "#0B1E2A", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: морские волны */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #E6F6FF 0%, #F5FBFF 45%, #F5FBFF 100%)" }} />
        <motion.svg initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="absolute top-0 left-1/2 -translate-x-1/2" width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z" fill="#BFE0F2" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z" fill="#D6EEFA" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION: airy grid */}
      <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ backgroundColor: "rgba(245,251,255,0.9)", borderColor: "#BFE0F2" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 grid grid-cols-12 items-center gap-4">
          <a href="#" className="col-span-8 sm:col-span-6 md:col-span-4 flex items-center gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow flex-none" style={{ backgroundColor: "#0B1E2A", color: "#E6F6FF" }}>T</div>
            <div className="leading-tight truncate">
              <div className="font-extrabold flex items-center gap-2 truncate" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} className="flex-none" /> <span className="truncate">Кластер TEMPO</span>
              </div>
              <div className="text-[11px] truncate" style={{ color: "#3E6B84" }}>
                <MapPin size={12} className="inline mr-1" /> Саки, ул. Морская · первая линия моря
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex col-span-4 md:col-span-5 justify-center items-center text-[13px]" aria-label="Главное меню">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["О кластере", "Форматы", "Инженерия", "Локация", "Сроки", "FAQ"].map((t, i) => (
                <a key={i} href={['#about','#plans','#tech','#location','#phases','#faq'][i]} className="hover:text-sky-700 whitespace-nowrap transition-colors" style={{ color: "#3E6B84" }}>{t}</a>
              ))}
            </div>
          </nav>

          <div className="col-span-4 sm:col-span-6 md:col-span-3 flex justify-end">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-end">
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 md:px-4 py-2 rounded-2xl border hover:shadow-md" style={{ borderColor: "#A6D3EB", color: "#0B1E2A" }}>WhatsApp</a>
              <a href="#cta" className="px-3 md:px-4 py-2 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#0284C7", color: "#F5FBFF" }}>Подбор</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-2" aria-label="Меню">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t" style={{ borderColor: '#BFE0F2' }}>
            <div className="px-4 py-3 flex flex-col gap-2">
              {[['О кластере','#about'],['Форматы','#plans'],['Инженерия','#tech'],['Локация','#location'],['Сроки','#phases'],['FAQ','#faq'],['Контакты','#cta']].map(([t,href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-sky-50" style={{ color: '#3E6B84' }}>{t}</a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl border text-center" style={{ borderColor: '#A6D3EB', color: '#0B1E2A' }}>WhatsApp</a>
                <a href="#cta" className="px-3 py-2 rounded-xl text-center" style={{ backgroundColor: '#0284C7', color: '#F5FBFF' }}>Подбор</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "Prata, serif", color: "#0B1E2A", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.1, maxWidth: "18ch" }}>
              TEMPO — сервисные апартаменты у моря
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#3E6B84", maxWidth: 680 }}>
              Семейный курортный кластер бизнес‑класса на первой линии: собственная променада, SPA и спорт, медицинский центр, частный пляж и апартаменты с террасами. Продажи по ДДУ (214‑ФЗ) с эскроу.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[["1‑я береговая линия (~50 м)", <Waves size={18} key="w" />],["4 корпуса / 8–12 этажей", <Building2 size={18} key="b" />],["White box / без отделки", <Hammer size={18} key="h" />],["Подземный паркинг", <ParkingSquare size={18} key="p" />]].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white" style={{ borderColor: "#BFE0F2", color: "#0B1E2A" }}>{icon} {t}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#0284C7", color: "#F5FBFF" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: "#A6D3EB", color: "#0B1E2A" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden shadow-lg border relative" style={{ height: 520, borderColor: "#BFE0F2" }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(191,224,242,0.7), transparent)" }} />
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop" alt="Море рядом с комплексом TEMPO" className="w-full h-full object-cover" loading="eager" fetchpriority="high" width={1600} height={1040} />
          </motion.div>
        </div>
      </section>

      {/* КЛЮЧЕВЫЕ ЧИСЛА */}
      <section id="benefits" className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full"><Stat value="14 га" label="Территория" sub="закрытый курортный кластер" icon={<Trees size={18} />} /></div>
          <div className="h-full"><Stat value="4" label="Корпуса" sub="8–12 этажей" icon={<Building2 size={18} />} /></div>
          <div className="h-full"><Stat value="2027–2028" label="Сроки по очередям" sub="по проекту и маркетплейсам" icon={<Calendar size={18} />} /></div>
          <div className="h-full"><Stat value="Бизнес" label="Класс" sub="ДДУ, эскроу" icon={<ShieldCheck size={18} />} /></div>
        </div>
      </section>

      {/* О КЛАСТЕРЕ */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О кластере</h2>
            <p className="mt-4" style={{ color: '#3E6B84' }}>
              TEMPO — семейный курортный кластер бизнес‑класса на бальнеологическом курорте Саки. Первая линия, собственная променада с кафе и магазинами, частный пляж, медицинский и оздоровительный центр, а также спортивные зоны делают проект полноценным местом для отдыха и длительного проживания.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Пляж и променада', t: 'Собственный выход к морю и прогулочная улица со стрит‑ритейлом.', icon: <Waves size={18} /> },
                { h: 'Оздоровление', t: 'Медицинский/SPA‑центр, климатотерапия курорта Саки.', icon: <HeartPulse size={18} /> },
                { h: 'Форматы', t: 'Апартаменты с террасами и патио; планировки от студий до 3‑комн.', icon: <Ruler size={18} /> },
                { h: 'Правовой формат', t: 'ДДУ по 214‑ФЗ, расчёты через эскроу‑счета. Застройщик: ООО СЗ «САКИ».', icon: <ShieldCheck size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ borderColor: '#BFE0F2', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#0B1E2A' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#3E6B84' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#E6F6FF', borderColor: '#BFE0F2' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0B1E2A' }}>
              <Store size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#3E6B84' }}>
              <li><MapPin size={14} className="inline mr-2" /> Саки, ул. Морская / Симферопольское шоссе</li>
              <li><ParkingSquare size={14} className="inline mr-2" /> Подземный паркинг, дворы без машин</li>
              <li><Hammer size={14} className="inline mr-2" /> White box / без отделки; возможно дизайнерское оформление</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md" style={{ backgroundColor: '#0284C7', color: '#F5FBFF' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* ИНЖЕНЕРИЯ И УДОБСТВА */}
      <section id="tech" className="py-14 md:py-20" style={{ backgroundColor: '#E6F6FF' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><CircuitBoard size={22} /> Инженерия и удобства</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#3E6B84' }}>
              {[
                { t: 'Панорамное остекление, террасы и патио', icon: <Sun size={16} /> },
                { t: 'Подземный паркинг, кладовые, колясочные', icon: <ParkingSquare size={16} /> },
                { t: 'Детские и спортивные площадки, озеленённые дворы', icon: <Trees size={16} /> },
                { t: 'Медицинский и SPA‑комплекс на территории', icon: <HeartPulse size={16} /> },
              ].map((i, idx) => (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#BFE0F2' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0B1E2A' }}>
              <ShieldCheck size={18} /> Преимущества для владельца
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: '#3E6B84' }}>
              {["Первая линия и видовые сценарии", "Курортная инфраструктура 365 дней", "Охрана и закрытая территория", "Ипотека и рассрочка"].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: '#F5FBFF', borderColor: '#BFE0F2' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ФОРМАТЫ */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Форматы апартаментов</h2>
          <p className="mt-3" style={{ color: '#3E6B84' }}>
            Студии, 1‑, 2‑ и 3‑комнатные апартаменты, в т.ч. планировки с террасами или собственными патио. По запросу пришлём PDF‑каталог с ценами и этажами.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Студии", d: "Рациональные форматы, отличны для старта/аренды", icon: <Home size={18} /> },
              { t: "1–2‑комнатные", d: "Кухни‑гостиные, лоджии/террасы, виды на море", icon: <Home size={18} /> },
              { t: "3‑комнатные", d: "Семейные сценарии, увеличенные зоны хранения", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#BFE0F2' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#0B1E2A' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#3E6B84' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: '#0369A1' }}>Запросить PDF‑подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="py-14 md:py-20" style={{ backgroundColor: '#E6F6FF' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><MapPin size={22} /> Локация и окружение</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#3E6B84' }}>
              {[
                'Первая береговая линия Чёрного моря (выход к пляжу)',
                'Променад с кафе и магазинами внутри кластера',
                'Санаторно‑курортная зона Саки и природные ресурсы для оздоровления',
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start"><span className="mt-0.5"><Waves size={16} /></span> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#BFE0F2' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?text=%D0%A1%D0%B0%D0%BA%D0%B8%2C%20%D1%83%D0%BB.%20%D0%9C%D0%BE%D1%80%D1%81%D0%BA%D0%B0%D1%8F&z=15" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* СРОКИ */}
      <section id="phases" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Calendar size={22} /> Сроки и очереди</h2>
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            {[
              { t: "Корпуса", d: "4 корпуса (8–12 эт.)", icon: <Building2 size={18} /> },
              { t: "Формат сделки", d: "ДДУ 214‑ФЗ, эскроу‑счета", icon: <ShieldCheck size={18} /> },
              { t: "Сдача по проекту", d: "2027–2028 (поэтапно)", icon: <Calendar size={18} /> },
              { t: "Застройщик", d: "ООО СЗ «САКИ»", icon: <FileText size={18} /> },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#BFE0F2' }}>
                <IconWrap>{s.icon}</IconWrap>
                <div>
                  <div className="text-lg font-semibold" style={{ color: '#0B1E2A' }}>{s.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#3E6B84' }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20" style={{ backgroundColor: '#E6F6FF' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где расположен TEMPO?", a: "Республика Крым, г. Саки, ул. Морская / Симферопольское шоссе. Первая линия моря." },
              { q: "Какая этажность и корпуса?", a: "4 корпуса, 8–12 этажей." },
              { q: "Какая отделка?", a: "White box / без отделки. Возможны пакеты дизайнерской отделки." },
              { q: "Что по инфраструктуре?", a: "Пляж, променада с кафе, медицинский и SPA‑центр, детские/спортплощадки." },
              { q: "Формат сделки и сроки?", a: "ДДУ 214‑ФЗ, эскроу; по очередям — ориентир 2027–2028 гг." },
              { q: "Есть ли паркинг?", a: "Да, предусмотрен подземный паркинг и гостевые места." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#BFE0F2' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#0B1E2A' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#3E6B84' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Где расположен TEMPO?", "acceptedAnswer": { "@type": "Answer", "text": "Республика Крым, г. Саки, ул. Морская / Симферопольское шоссе. Первая линия моря." } },
            { "@type": "Question", "name": "Какая этажность и корпуса?", "acceptedAnswer": { "@type": "Answer", "text": "4 корпуса, 8–12 этажей." } },
            { "@type": "Question", "name": "Какая отделка?", "acceptedAnswer": { "@type": "Answer", "text": "White box / без отделки. Возможны пакеты дизайнерской отделки." } },
            { "@type": "Question", "name": "Что по инфраструктуре?", "acceptedAnswer": { "@type": "Answer", "text": "Пляж, променада, медицинский и SPA‑центр, детские и спортивные площадки." } },
            { "@type": "Question", "name": "Формат сделки и сроки?", "acceptedAnswer": { "@type": "Answer", "text": "ДДУ 214‑ФЗ, эскроу; сроки — 2027–2028 по очередям." } },
            { "@type": "Question", "name": "Есть ли паркинг?", "acceptedAnswer": { "@type": "Answer", "text": "Подземный паркинг и гостевые места." } }
          ]
        }) }} />
      </section>

      {/* CTA + ФОРМА */}
      <section id="cta" className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#3E6B84' }}>
              Пришлём PDF с планировками, этажами и видами, действующие цены, условия ипотеки/рассрочки и статус очередей TEMPO.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: '#A6D3EB', color: '#0B1E2A' }}>Связаться в WhatsApp</a>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#BFE0F2' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#0B1E2A' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#3E6B84' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#0B1E2A' }}>Получить подборку</div>
                <p className="text-sm mt-1" style={{ color: '#3E6B84' }}>
                  Оставьте контакты — вышлем актуальные предложения по кластеру TEMPO.
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#BFE0F2' }} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#BFE0F2' }} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#BFE0F2' }} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#BFE0F2' }} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending} className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70" style={{ backgroundColor: '#0284C7', color: '#F5FBFF' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#5B87A1' }}>Политика конфиденциальности</a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#5B87A1' }}>Согласие на обработку ПДн</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#BFE0F2' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#3E6B84' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0B1E2A' }}>
              <Home size={16} /> Кластер TEMPO
            </div>
            <p className="mt-2">Республика Крым, г. Саки, ул. Морская / Симферопольское шоссе</p>
            <p className="mt-1">ДДУ по 214‑ФЗ, расчёты через эскроу‑счета. Застройщик: ООО СЗ «САКИ».</p>
          </div>
          <div className="md:text-right">
            <a href="/policy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* JSON-LD Residence */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Residence",
        "name": "Курортный кластер TEMPO",
        "url": typeof location !== "undefined" ? location.href : "https://example.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Морская / Симферопольское ш.",
          "addressLocality": "Саки",
          "addressRegion": "Республика Крым",
          "addressCountry": "RU"
        }
      }) }} />

      {/* Scroll to top */}
      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 rounded-full shadow-lg" style={{ backgroundColor: "#0284C7", color: "#F5FBFF", padding: 12 }} aria-label="Наверх">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
