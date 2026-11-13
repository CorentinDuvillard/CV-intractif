/* CV interactif : construit la page à partir de contenu.json.
   Pour modifier le CV, on change contenu.json ou les fichiers de fichiers/, jamais ce script. */

/* ---------- Icônes ---------- */
var ICONES = {
  telecharger: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  fichier: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
  telephone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
  email: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  localisation: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  calendrier: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  voiture: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  couches: '<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
  graphique: '<path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  ecran: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  equipe: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  medaille: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  certificat: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  chevron: '<polyline points="6 9 12 15 18 9"/>',
  pleinEcran: '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>',
  lien: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
};
var LINKEDIN_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';

function icone(nom, attrs) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' + (attrs || '') + '>' + (ICONES[nom] || '') + '</svg>';
}

/* ---------- Texte ---------- */
function echap(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/* **gras**, [texte](lien) et retours à la ligne */
function texte(s) {
  return echap(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\n/g, '<br>');
}
function age(dateNaissance) {
  var n = new Date(dateNaissance), a = new Date();
  var x = a.getFullYear() - n.getFullYear();
  if (a.getMonth() < n.getMonth() || (a.getMonth() === n.getMonth() && a.getDate() < n.getDate())) x--;
  return x;
}
function el(id) { return document.getElementById(id); }
function liste(items, fn) { return (items || []).map(fn).join(''); }

/* ---------- Rendu ---------- */
function rendre(c) {
  var id = c.identite;
  var ageActuel = age(id.dateNaissance);
  document.title = id.nom + ', CV';

  /* Hero */
  var h = '';
  if (c.statut && c.statut.afficher) h += '<p class="hero-badge"><span class="dot" aria-hidden="true"></span>' + texte(c.statut.texte) + '</p>';
  h += '<div class="photo-container"><button type="button" class="photo-ring" id="photoBouton" aria-label="Agrandir la photo de ' + echap(id.nom) + '"><img src="' + echap(id.photo) + '" alt="" width="140" height="140" fetchpriority="high"/></button></div>';
  el('photoGrandeImg').dataset.src = id.photoGrande || id.photo;
  el('photoGrandeImg').alt = 'Photo de ' + id.nom;
  h += '<h1 class="hero-name">' + echap(id.nom) + '</h1>';
  h += '<p class="hero-tagline">' + texte(id.accroche) + '</p>';
  h += '<div class="hero-contact">'
    + '<a href="tel:' + echap(id.telephone) + '">' + icone('telephone') + echap(id.telephoneAffiche) + '</a>'
    + '<a href="mailto:' + echap(id.email) + '">' + icone('email') + echap(id.email) + '</a>'
    + '<a href="' + echap(id.linkedin) + '" target="_blank" rel="noopener">' + LINKEDIN_SVG + 'LinkedIn</a>'
    + '<span>' + icone('localisation') + echap(id.ville) + '</span></div>';
  h += '<div class="hero-divider"></div>';
  el('heroContent').innerHTML = h;

  /* Téléchargement du CV */
  var dl = el('dlBtn');
  dl.href = c.telechargement.cvPdf;
  dl.setAttribute('download', c.telechargement.nomFichier);

  /* Profil */
  el('profilCard').innerHTML = '<p class="profil-text">' + texte(c.profil.texte) + '</p><div class="profil-badges">'
    + liste(c.profil.badges, function (b) { return '<span class="profil-badge">' + icone(b.icone) + texte(String(b.texte).replace('{age}', ageActuel)) + '</span>'; })
    + '</div>';

  /* Expériences */
  el('timeline').innerHTML = liste(c.experiences, function (e, i) {
    var d = e.description, desc = '';
    if (d) {
      var did = 'desc-exp-' + (i + 1);
      desc = '<div class="timeline-description-block"><div class="timeline-description-header"><h4 class="timeline-description-title">Description</h4>'
        + (d.details && d.details.length ? '<button type="button" class="timeline-description-toggle" aria-expanded="false" aria-controls="' + did + '"><span class="toggle-label">Voir plus</span>' + icone('chevron', ' aria-hidden="true"') + '</button>' : '')
        + '</div>'
        + (d.resume ? '<p class="timeline-description-summary">' + texte(d.resume) + '</p>' : '')
        + (d.details && d.details.length ? '<div class="timeline-description-content" id="' + did + '"><div class="timeline-description-inner">'
          + liste(d.details, function (p) { return '<p class="timeline-description-text">' + texte(p) + '</p>'; }) + '</div></div>' : '')
        + '</div>';
    }
    return '<div class="timeline-item' + (e.actuel ? ' current' : '') + '"><div class="timeline-card">'
      + '<div class="timeline-meta"><span class="timeline-date">' + echap(e.dates) + '</span>'
      + (e.duree ? '<span class="timeline-duration">' + echap(e.duree) + '</span>' : '')
      + (e.lieu ? '<span class="timeline-location">' + icone('localisation', ' width="12" height="12"') + echap(e.lieu) + '</span>' : '') + '</div>'
      + '<h3 class="timeline-role">' + echap(e.poste) + '</h3><p class="timeline-company">' + echap(e.entreprise) + '</p>'
      + '<ul class="timeline-tasks">' + liste(e.missions, function (m) { return '<li>' + texte(m) + '</li>'; }) + '</ul>'
      + desc + '</div></div>';
  });

  el('studentJobs').innerHTML = liste(c.jobsEtudiants, function (j) {
    return '<div class="student-job-card"><h3>' + echap(j.poste) + '</h3><p class="company-name">' + echap(j.entreprise) + '</p><p class="job-date">' + echap(j.infos) + '</p><div class="job-skills">'
      + liste(j.competences, function (s) { return '<span>' + echap(s) + '</span>'; }) + '</div></div>';
  });

  /* Formation */
  el('formationList').innerHTML = liste(c.formations, function (f) {
    return '<div class="formation-card"><div class="formation-year">' + echap(f.annees) + '</div><div class="formation-info"><h3>' + echap(f.diplome)
      + (f.precision ? ' <span style="font-size:.85rem;font-weight:400;color:var(--text-muted)">' + echap(f.precision) + '</span>' : '') + '</h3>'
      + '<p class="school">' + echap(f.ecole) + '</p>'
      + (f.matieres && f.matieres.length ? '<div class="courses">' + liste(f.matieres, function (m) { return '<span>' + echap(m) + '</span>'; }) + '</div>' : '')
      + (f.mention ? '<p class="mention">' + icone('check', ' width="14" height="14"') + echap(f.mention) + '</p>' : '')
      + '</div></div>';
  });

  /* Compétences */
  el('skillsBars').innerHTML = liste(c.competences.barres, function (g) {
    return '<div class="skill-group"><h3>' + icone(g.icone) + echap(g.titre) + '</h3>' + liste(g.items, function (s) {
      return '<div class="skill-bar-container"><div class="skill-bar-label"><span>' + echap(s.nom) + '</span>' + (s.libelle ? '<span class="level">' + echap(s.libelle) + '</span>' : '') + '</div>'
        + '<div class="skill-bar"><div class="skill-bar-fill" data-width="' + Number(s.niveau) + '" style="--target-width:' + Number(s.niveau) + '%"></div></div></div>';
    }) + '</div>';
  });
  el('skillsTags').innerHTML = liste(c.competences.etiquettes, function (g) {
    return '<div class="skill-group"><h3>' + icone(g.icone) + echap(g.titre) + '</h3><div class="skill-tags">'
      + liste(g.items, function (s) { return '<span class="skill-tag">' + echap(s) + '</span>'; }) + '</div></div>';
  });

  /* Distinctions */
  el('distinctions').innerHTML = liste(c.distinctions, function (d) {
    var medaille = d.type === 'medaille';
    return '<div class="distinction-card ' + (medaille ? 'medal' : 'certif') + '"><div class="distinction-icon">' + icone(medaille ? 'medaille' : 'certificat', ' stroke-width="1.5"') + '</div>'
      + '<h3>' + echap(d.titre) + '</h3><p>' + texte(d.texte) + '</p>'
      + (d.statut ? '<span class="status-badge"><span class="dot"></span>' + echap(d.statut) + '</span>' : '') + (d.image ? '<a class="distinction-voir" href="' + echap(d.image) + '" target="_blank" rel="noopener">' + icone('lien', ' width="14" height="14" aria-hidden="true"') + 'Voir le diplôme</a>' : '') + '</div>';
  });

  /* Intérêts */
  el('interets-grid').innerHTML = liste(c.interets, function (x) {
    return '<div class="interest-card"><h3><span class="interest-emoji" aria-hidden="true">' + echap(x.emoji) + '</span>' + echap(x.titre) + '</h3><p>' + texte(x.texte) + '</p></div>';
  });

  /* Recommandations */
  el('recommandations').innerHTML = liste(c.recommandations, function (r) {
    return '<div class="doc-card"><a class="doc-card-preview" href="' + echap(r.fichier) + '" target="_blank" rel="noopener" aria-label="Lire la lettre de ' + echap(r.nom) + ' en grand"><canvas data-pdf="' + echap(r.fichier) + '" aria-hidden="true"></canvas><span class="preview-fallback">' + icone('fichier') + 'Lire la lettre</span></a>'
      + '<div class="doc-card-body"><h3>' + echap(r.nom) + '</h3><p class="doc-card-role">' + echap(r.role) + '</p><p class="doc-card-date">' + echap(r.date) + '</p>'
      + '<a class="doc-card-dl" href="' + echap(r.fichier) + '" download>' + icone('telecharger') + 'Télécharger</a></div></div>';
  });

  /* Biographie : une ligne qui commence par "> " devient une citation */
  el('biographie').innerHTML = liste(c.biographie, function (b) {
    return '<div class="bio-block"><div class="bio-block-label">' + echap(b.titre) + '</div>' + liste(b.paragraphes, function (p) {
      return p.indexOf('> ') === 0 ? '<span class="bio-pullquote">' + texte(p.slice(2)) + '</span>' : '<p class="bio-text">' + texte(p) + '</p>';
    }) + '</div>';
  });

  rendrePortfolio(c.portfolio);

  /* Pied de page */
  el('footer').innerHTML = '<div class="footer-qr"><img src="' + echap(c.qrCode.image) + '" alt="QR code"/><p>' + echap(c.qrCode.texte) + '</p></div>'
    + '<div class="footer-links"><a href="tel:' + echap(id.telephone) + '">' + echap(id.telephoneAffiche) + '</a><a href="mailto:' + echap(id.email) + '">' + echap(id.email) + '</a><a href="' + echap(id.linkedin) + '" target="_blank" rel="noopener">LinkedIn</a></div>'
    + '<p class="footer-copy">© ' + new Date().getFullYear() + ' ' + echap(id.nom) + ', CV interactif</p>';
}

/* ---------- Portfolio ----------
   Vitrine : WizeFile et l'Assistant IA en grand avec leur vraie vue, puis les outils et dashboards en grille, chacun avec son aperçu.
   Les cadres portent data-src et ne se chargent qu'à l'ouverture de l'onglet Portfolio. */

function etiquettes(liste_) {
  return liste_ && liste_.length ? '<ul class="pf-outils" aria-label="Outils utilisés">' + liste(liste_, function (o) { return '<li>' + echap(o) + '</li>'; }) + '</ul>' : '';
}

function boutonsTelechargement(p) {
  return '<div class="portfolio-dl-group">'
    + '<a class="portfolio-dl-btn demo" href="' + echap(p.demo) + '" download>' + icone('telecharger') + ' Démo</a>'
    + '<div class="portfolio-dl-sep"></div>'
    + '<a class="portfolio-dl-btn template" href="' + echap(p.template) + '" download>' + icone('fichier') + ' Template</a></div>';
}

function apercuDashboard(a) {
  var prev = '';
  if (a.kpis) prev += '<div class="dashboard-section"><p class="dashboard-title">' + echap(a.titre) + '</p>' + (a.sousTitre ? '<p class="dashboard-subtitle">' + echap(a.sousTitre) + '</p>' : '')
    + '<div class="kpi-grid">' + liste(a.kpis, function (k) { return '<div class="kpi-card"><div class="kpi-value' + (k.accent ? ' accent' : '') + '">' + echap(k.valeur) + '</div><div class="kpi-label">' + echap(k.label) + '</div></div>'; }) + '</div></div>';
  if (a.tableau) prev += '<div class="dashboard-section"><p class="dashboard-title">' + echap(a.tableau.titre) + '</p><div class="pf-scroll"><table class="data-table"><thead><tr>'
    + liste(a.tableau.colonnes, function (h) { return '<th scope="col">' + echap(h) + '</th>'; }) + '</tr></thead><tbody>'
    + liste(a.tableau.lignes, function (l) { return '<tr>' + liste(l, function (v) { return '<td>' + echap(v) + '</td>'; }) + '</tr>'; }) + '</tbody></table></div></div>';
  if (a.barres) prev += '<div class="dashboard-section"><p class="dashboard-title">' + echap(a.barres.titre) + '</p><div class="kpi-bar-section">'
    + liste(a.barres.items, function (b) { return '<div class="kpi-bar-row"><span class="kpi-bar-label">' + echap(b.label) + '</span><div class="kpi-bar-track" aria-hidden="true"><div class="kpi-bar-fill" style="width:' + Number(b.pourcentage) + '%"></div></div><span class="kpi-bar-val">' + echap(b.valeur) + '</span></div>'; })
    + '</div></div>';
  return '<div class="portfolio-group--dashboards pf-dash"><div class="portfolio-preview-dashboard">' + prev + '</div></div>';
}

/* Capture du site en ligne, utilisée tant que WizeFile n'autorise pas l'affichage dans le CV.
   Le service renvoie d'abord une image d'attente le temps de prendre la capture, on redemande quelques fois. */
function capture(img, url) {
  var essais = 0, base = 'https://s.wordpress.com/mshots/v1/' + encodeURIComponent(url) + '?w=1280&h=800';
  img.onload = function () {
    if (img.naturalWidth !== 1280 && essais < 6) { essais++; setTimeout(function () { img.src = base + '&r=' + essais; }, 3000); }
  };
  img.src = base;
}

/* Projets phares : en-tête compact (type, titre, bouton, description, points clés), puis un grand écran avec ses onglets */
function enTete(id, x, cta, note) {
  return '<header class="pp-tete"><div class="pp-ligne"><div class="pp-nom"><h3 class="pp-titre" id="' + id + '">' + echap(x.titre) + '</h3></div>'
    + '<div class="pp-cta">' + cta + (note || '') + '</div></div>'
    + '<p class="pp-desc">' + texte(x.description) + '</p>'
    + (x.chiffres && x.chiffres.length ? '<ul class="pp-faits">' + liste(x.chiffres, function (c) { return '<li>' + echap(c) + '</li>'; }) + '</ul>' : '')
    + '</header>';
}

function ecran(label, onglets, vue) {
  return '<div class="pp-zone">' + (onglets ? '<div class="pp-onglets" role="group" aria-label="' + label + '">' + onglets + '</div>' : '') + '<div class="pp-ecran">' + vue + '</div></div>';
}

function blocWizefile(w) {
  var url = w.url.replace(/\/?$/, '/');
  var vue = w.apercuEnDirect
    ? '<iframe class="pf-vue-cadre" id="wfVue" data-src="' + echap(url) + '" title="Site ' + echap(w.titre) + ' en direct"></iframe>'
    : '<a class="wf-live" id="wfLien" href="' + echap(url) + '" target="_blank" rel="noopener"><img id="wfVue" data-capture="' + echap(url) + '" alt="Capture de la page affichée de ' + echap(w.titre) + '" width="1280" height="800">'
      + '<span class="wf-live-badge"><span class="dot" aria-hidden="true"></span>Capture du site en ligne</span><span class="wf-live-cta">' + icone('lien') + ' Ouvrir cette page</span></a>';
  var onglets = liste(w.pages, function (pg, i) {
    return '<button type="button" class="wf-nav-btn' + (i === 0 ? ' wf-nav-active' : '') + '" aria-pressed="' + (i === 0) + '" data-chemin="' + echap(pg.chemin) + '">' + echap(pg.nom) + '</button>';
  });
  var cta = '<a class="doc-card-dl" href="' + echap(w.url) + '" target="_blank" rel="noopener">' + icone('lien') + ' Visiter le site</a>';
  /* Pas d'onglets de pages : on navigue directement dans le site affiché */
  return '<article class="pp" aria-labelledby="pf-wizefile">' + enTete('pf-wizefile', w, cta) + ecran('', '', vue) + '</article>';
}

function blocAssistant(a) {
  var cta = a.pack
    ? '<a class="doc-card-dl" href="' + echap(a.pack) + '" download="Assistant IA - Pack (' + echap(a.packVersion || '') + ').zip" title="Zip de ' + echap(a.packTaille || '') + '">' + icone('telecharger') + ' Pack · ' + echap(a.packVersion || '') + '</a>'
    : '<a class="doc-card-dl" href="' + echap(a.tutoriel) + '" target="_blank" rel="noopener">' + icone('lien') + ' Lire le tutoriel</a>';
  var note = false ? '<span class="pp-note">Version ' + echap(a.packVersion) + (a.packTaille ? ' · ' + echap(a.packTaille) : '') + '</span>' : '';
  /* L'écran montre l'ouverture de session. La bulle en haut à droite ouvre le tutoriel en grand */
  var bulle = '<button type="button" class="ia-bulle" data-plein-ecran="' + echap(a.tutoriel) + '" aria-label="Ouvrir le tutoriel de l\'Assistant IA">'
    + '<span class="ia-bulle-onde" aria-hidden="true"></span><span class="ia-bulle-onde ia-bulle-onde--2" aria-hidden="true"></span>'
    + '<img src="' + echap(a.tutorielApercu || '') + '" alt="" width="360" height="360" loading="lazy">'
    + '<span class="ia-bulle-label">Tutoriel</span></button>';
  var vue = a.capture
    ? '<div class="ia-vue ia-vue--capture"><img class="pf-capture" src="' + echap(a.capture) + '" alt="Exemple d\'ouverture de session avec la commande /prime dans Claude Code" width="1740" height="1560" loading="lazy">' + bulle + '</div>'
    : '<div class="ia-vue"><iframe class="pf-vue-cadre" data-src="' + echap(a.tutoriel) + '" title="Tutoriel de l\'Assistant IA"></iframe></div>';
  return '<article class="pp" aria-labelledby="pf-assistant">' + enTete('pf-assistant', a, cta, note) + ecran('', '', vue) + '</article>';
}

function carteOutil(o) {
  return '<article class="pf-carte">'
    + '<div class="pf-carte-vue"><iframe data-src="' + echap(o.demo) + '" sandbox="allow-scripts allow-same-origin allow-downloads" title="Démonstration de ' + echap(o.titre) + '" loading="lazy"></iframe></div>'
    + '<div class="pf-corps"><p class="pf-type">Outil interactif</p><h3 class="pf-titre pf-titre--petit">' + echap(o.titre) + '</h3><p class="pf-description">' + texte(o.description) + '</p>' + etiquettes(o.outils)
    + '<div class="pf-actions">' + boutonsTelechargement(o) + '<button type="button" class="portfolio-fullscreen-btn" data-plein-ecran="' + echap(o.demo) + '">' + icone('pleinEcran') + ' Plein écran</button></div></div></article>';
}

function carteDashboard(d) {
  return '<article class="pf-carte">'
    + '<div class="pf-carte-vue pf-carte-vue--dash">' + apercuDashboard(d.apercu || {}) + '</div>'
    + '<div class="pf-corps"><p class="pf-type">Dashboard Excel</p><h3 class="pf-titre pf-titre--petit">' + echap(d.titre) + '</h3><p class="pf-description">' + texte(d.description) + '</p>' + etiquettes(d.outils)
    + '<div class="pf-actions">' + boutonsTelechargement(d) + '</div></div></article>';
}

function rendrePortfolio(p) {
  el('portfolioDisclaimer').textContent = p.avertissement || '';
  el('pfPhares').innerHTML = (p.wizefile ? blocWizefile(p.wizefile) : '') + (p.assistantIA ? blocAssistant(p.assistantIA) : '');
  el('pfAutres').innerHTML = liste(p.outils, carteOutil) + liste(p.dashboards, carteDashboard);

  /* WizeFile s'affiche comme sur un écran d'ordinateur de 1280 px, réduit pour tenir dans la carte */
  var cadreWf = el('wfVue');
  if (cadreWf && cadreWf.tagName === 'IFRAME') {
    var LARGEUR = 900, zone = cadreWf.parentElement;
    zone.classList.add('pp-ecran--echelle');
    var ajuster = function () {
      var w = zone.clientWidth, h = zone.clientHeight;
      if (!w || !h) return;
      /* Sur téléphone, la carte est trop étroite pour réduire : WizeFile garde sa version mobile */
      var k = w < 500 ? 1 : Math.min(1, w / LARGEUR);
      cadreWf.style.width = (w / k) + 'px';
      cadreWf.style.height = (h / k) + 'px';
      cadreWf.style.transform = 'scale(' + k + ')';
    };
    window.ajusterWizefile = ajuster;
    if ('ResizeObserver' in window) new ResizeObserver(ajuster).observe(zone);
    window.addEventListener('resize', ajuster);
    ajuster();
  }

  /* Pages de WizeFile */
  if (p.wizefile) {
    var url = p.wizefile.url.replace(/\/?$/, '/');
    document.querySelectorAll('.wf-nav-btn:not(.ia-btn)').forEach(function (b) {
      b.addEventListener('click', function () {
        document.querySelectorAll('.wf-nav-btn:not(.ia-btn)').forEach(function (x) { var on = x === b; x.classList.toggle('wf-nav-active', on); x.setAttribute('aria-pressed', on); });
        var vue = el('wfVue'), cible = url + b.dataset.chemin;
        if (vue.tagName === 'IFRAME') vue.src = cible;
        else { capture(vue, cible); el('wfLien').href = cible; }
      });
    });
  }

  /* Vues de l'Assistant IA */
  document.querySelectorAll('.ia-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.ia-btn').forEach(function (x) { var on = x === b; x.classList.toggle('wf-nav-active', on); x.setAttribute('aria-pressed', on); });
      document.querySelectorAll('.ia-vue').forEach(function (v) { v.hidden = v.dataset.vue !== b.dataset.vue; });
    });
  });

  /* Plein écran des outils */
  document.querySelectorAll('[data-plein-ecran]').forEach(function (b) {
    b.addEventListener('click', function () {
      el('portfolioModalIframe').src = b.dataset.pleinEcran;
      el('portfolioModal').classList.add('open');
      document.body.style.overflow = 'hidden';
      el('portfolioModalClose').focus();
    });
  });
}

/* Captures chargées seulement à l'ouverture de l'onglet Portfolio */
function chargerPortfolio() {
  if (window.ajusterWizefile) { window.ajusterWizefile(); setTimeout(window.ajusterWizefile, 50); }
  document.querySelectorAll('#page-portfolio img[data-capture]').forEach(function (img) { capture(img, img.dataset.capture); img.removeAttribute('data-capture'); });
}

/* ---------- Lettres de recommandation ----------
   Les PDF dans un cadre ne s'affichent pas partout (Android, certains navigateurs).
   On dessine la première page avec pdf.js, chargé seulement à l'ouverture de l'onglet. */
var PDFJS = 'fichiers/pdfjs/';
var pdfjsPret = null;
function chargerPdfjs() {
  if (pdfjsPret) return pdfjsPret;
  pdfjsPret = new Promise(function (ok, ko) {
    var s = document.createElement('script');
    s.src = PDFJS + 'pdf.min.js';
    s.onload = function () { window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + 'pdf.worker.min.js'; ok(window.pdfjsLib); };
    s.onerror = ko;
    document.head.appendChild(s);
  });
  return pdfjsPret;
}
function dessinerLettres() {
  var cibles = document.querySelectorAll('canvas[data-pdf]');
  if (!cibles.length) return;
  chargerPdfjs().then(function (lib) {
    cibles.forEach(function (cv) {
      var url = cv.dataset.pdf; cv.removeAttribute('data-pdf');
      lib.getDocument(url).promise.then(function (doc) { return doc.getPage(1); }).then(function (page) {
        var largeur = cv.parentElement.clientWidth || 400;
        var echelle = (largeur * (window.devicePixelRatio || 1)) / page.getViewport({ scale: 1 }).width;
        var vp = page.getViewport({ scale: echelle });
        cv.width = vp.width; cv.height = vp.height;
        return page.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
      }).then(function () { cv.closest('.doc-card-preview').classList.add('pret'); })
        .catch(function () { cv.closest('.doc-card-preview').classList.add('echec'); });
    });
  }).catch(function () { document.querySelectorAll('.doc-card-preview').forEach(function (x) { x.classList.add('echec'); }); });
}

/* ---------- Comportements ---------- */
var NAV_HEIGHT = 72;

function chargerCadres(conteneur) {
  conteneur.querySelectorAll('iframe[data-src]').forEach(function (f) { f.src = f.dataset.src; f.removeAttribute('data-src'); });
}

function switchPage(page) {
  document.querySelectorAll('.page-section').forEach(function (s) { s.classList.toggle('active', s.id === 'page-' + page); });
  document.querySelectorAll('.page-nav-btn').forEach(function (b) {
    var actif = b.dataset.page === page;
    b.classList.toggle('active', actif);
    if (actif) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
  el('cvSidebar').classList.toggle('visible', page === 'cv');
  var cible = el('page-' + page);
  if (cible) chargerCadres(cible);
  if (page === 'portfolio') chargerPortfolio();
  if (page === 'recommandations') dessinerLettres();
  if (location.hash !== '#page-' + page) history.replaceState(null, '', page === 'cv' ? location.pathname : '#page-' + page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  /* Le focus suit le changement d'onglet, pour le clavier et les lecteurs d'écran */
  if (switchPage.parUtilisateur && cible) {
    var titre = cible.querySelector('h1, .section-title');
    if (titre) titre.focus({ preventScroll: true });
  }
  switchPage.parUtilisateur = false;
}

function smoothScrollTo(id) {
  var e = el(id);
  if (!e) return;
  var page = e.closest('.page-section');
  if (page && !page.classList.contains('active')) switchPage(page.id.replace('page-', ''));
  window.scrollTo({ top: e.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT, behavior: 'smooth' });
}

function brancherComportements() {
  var nb = el('navbar'), pb = el('progressBar');
  window.addEventListener('scroll', function () {
    nb.classList.toggle('scrolled', window.scrollY > 40);
    var h = document.documentElement;
    pb.style.height = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
  }, { passive: true });

  document.querySelectorAll('.page-nav-btn').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); switchPage.parUtilisateur = true; switchPage(b.dataset.page); });
  });

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || a.closest('.page-nav')) return;
    var id = a.getAttribute('href').substring(1);
    if (!id) return;
    e.preventDefault();
    fermerMenu(false);
    if (a.dataset.page) { switchPage.parUtilisateur = true; switchPage(a.dataset.page); } else smoothScrollTo(id);
  });

  /* Menu mobile */
  var menu = el('mobileMenu'), burger = el('hamburger');
  function ouvrirMenu() {
    menu.hidden = false; menu.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    el('mobileClose').focus();
  }
  function fermerMenu(rendreFocus) {
    if (menu.hidden) return;
    menu.classList.remove('open'); menu.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (rendreFocus) burger.focus();
  }
  burger.addEventListener('click', ouvrirMenu);
  el('mobileClose').addEventListener('click', function () { fermerMenu(true); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    fermerMenu(true);
    if (el('portfolioModal').classList.contains('open')) el('portfolioModalClose').click();
  });

  /* Voir plus / Voir moins */
  document.querySelectorAll('.timeline-description-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var content = el(btn.getAttribute('aria-controls'));
      if (!content) return;
      var ouvert = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
      content.classList.toggle('open', ouvert);
      btn.querySelector('.toggle-label').textContent = ouvert ? 'Voir moins' : 'Voir plus';
    });
  });

  /* Photo en grand */
  var dlg = el('photoGrande');
  document.addEventListener('click', function (e) {
    if (e.target.closest('#photoBouton')) {
      var g = el('photoGrandeImg');
      if (g.dataset.src) { g.src = g.dataset.src; g.removeAttribute('data-src'); }
      dlg.showModal(); return;
    }
    if (e.target === dlg || e.target.closest('#photoFermer')) dlg.close();
  });

  /* Fermeture du plein écran */
  el('portfolioModalClose').addEventListener('click', function () {
    el('portfolioModal').classList.remove('open');
    el('portfolioModalIframe').src = 'about:blank';
    document.body.style.overflow = '';
  });

  /* Section active dans la barre latérale */
  var sections = ['profil', 'experience', 'formation', 'competences', 'distinction', 'interets'];
  var liens = document.querySelectorAll('.cv-sidebar-link');
  function majActive() {
    var pos = window.pageYOffset + NAV_HEIGHT + 100, courant = '';
    sections.forEach(function (s) { var e = el(s); if (e && e.offsetTop <= pos) courant = s; });
    liens.forEach(function (l) { l.classList.toggle('active', l.dataset.section === courant); });
  }
  window.addEventListener('scroll', majActive, { passive: true });
  majActive();

  /* Apparition progressive, seulement si le navigateur sait le faire et que le visiteur n'a pas demandé moins d'animations */
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return ouvrirOngletDepuisAdresse();
  document.documentElement.classList.add('anim');
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var d = e.target.dataset.delay || 0;
      setTimeout(function () {
        e.target.classList.add('visible');
        e.target.style.willChange = 'auto';
        e.target.querySelectorAll('.skill-bar-fill').forEach(function (b) { b.style.width = b.dataset.width + '%'; });
      }, d * 100);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  var selecteurs = '.reveal,.timeline-item,.formation-card,.student-job-card,.skill-group,.distinction-card,.interest-card,.bio-block';
  document.querySelectorAll('section, .bio-skeleton').forEach(function (sec) {
    sec.querySelectorAll(selecteurs).forEach(function (e, i) { e.dataset.delay = i; obs.observe(e); });
  });

  ouvrirOngletDepuisAdresse();
}

/* Ouvrir directement un onglet via l'adresse, par exemple #page-portfolio */
function ouvrirOngletDepuisAdresse() {
  var m = location.hash.match(/^#page-(\w+)$/);
  if (m && el('page-' + m[1])) switchPage(m[1]);
}

/* ---------- Démarrage ---------- */
fetch('contenu.json', { cache: 'no-cache' })
  .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(function (c) { rendre(c); brancherComportements(); })
  .catch(function (err) {
    el('heroContent').innerHTML = '<p class="hero-tagline">Le contenu du CV n\'a pas pu être chargé (' + echap(err.message) + '). Vérifie que contenu.json est valide et que la page est ouverte depuis un serveur, pas en double-cliquant sur le fichier.</p>';
  });
