(function() {
  'use strict';

  let target = 2000,
    nama = "Ni Luh Sari",
    desa = "Desa Padang Bulia",
    transaksi = [],
    totalSetor = 0,
    totalHari = 0,
    aktif = false;
  const TOTAL_HARI = 210;
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // Tab navigation
  $$('.tab-btn').forEach(b => b.addEventListener('click', function() {
    $$('.tab-btn').forEach(x => { x.classList.remove('active');
      x.style.background = 'transparent';
      x.style.color = '#777';
      x.style.boxShadow = 'none'; });
    this.classList.add('active');
    this.style.background = '#fff';
    this.style.color = '#000';
    this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
    $$('.panel').forEach(p => { p.classList.remove('active');
      p.style.display = 'none'; });
    const targetPanel = $(`#${this.dataset.tab}`);
    targetPanel.classList.add('active');
    targetPanel.style.display = 'block';
    refresh();
  }));

  function fRp(v) { return 'Rp' + Math.floor(v).toLocaleString('id-ID'); }

  function fDate(d) { const t = new Date(d); return t.getDate() + '/' + (t.getMonth() + 1) + '/' + t.getFullYear(); }

  function fDateISO(d) { return d.toISOString().split('T')[0]; }

  function fDateTime(d) { return fDateISO(d) + ' ' + d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes()
      .toString().padStart(2, '0'); }

  function kodeTanggal(d) { const t = new Date(d); return t.getFullYear() + ('0' + (t.getMonth() + 1)).slice(-2) + ('0' +
      t.getDate()).slice(-2) + '_' + ('0' + t.getHours()).slice(-2) + ('0' + t.getMinutes()).slice(-2); }

  function toast(msg) { const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove('show'), 2500); }

  function hitungUlang() { totalSetor = transaksi.reduce((s, t) => s + t.nominal, 0);
    totalHari = transaksi.reduce((s, t) => s + t.hari, 0); }

  function refresh() {
    $('#namaSetor').textContent = aktif ? nama : '-';
    $('#targetSetor').textContent = aktif ? fRp(target) + '/hari' : '-';
    $('#hariDibayar').textContent = totalHari;
    $('#progressFill').style.width = Math.min(100, (totalHari / TOTAL_HARI) * 100) + '%';
    $('#sisaHari').textContent = Math.max(0, TOTAL_HARI - totalHari) + ' hari tersisa';
    $('#ketLebih').textContent = totalHari > TOTAL_HARI ? '+ ' + (totalHari - TOTAL_HARI) + ' hari' : '';
    $('#nominalSetor').value = target;
    $('#namaEdit').textContent = aktif ? nama : '-';
    $('#jmlTransaksi').textContent = transaksi.length + ' transaksi';
    const el = $('#editList');
    el.innerHTML = '';
    if (transaksi.length === 0) { $('#editKosong').style.display = 'block'; } else {
      $('#editKosong').style.display = 'none';
      transaksi.forEach((t, i) => {
        el.innerHTML += `
          <div class="flex items-center justify-between py-2.5 border-b border-[#f5f3f0] gap-2">
            <div class="flex-1 min-w-0"><div class="text-[11px] text-[#aaa]">${fDateTime(t.tanggal)}</div>
            <div class="font-semibold text-sm">${fRp(t.nominal)} <span class="text-xs text-[#888]">(${t.hari} hari)</span></div></div>
            <div class="flex gap-1.5">
              <button class="px-3 py-1.5 rounded-[20px] border border-[#ddd] bg-white text-[11px] font-semibold text-[#555] cursor-pointer edit-btn" data-index="${i}">Edit</button>
              <button class="px-3 py-1.5 rounded-[20px] border border-[#fcc] bg-white text-[11px] font-semibold text-danger cursor-pointer hapus-btn" data-index="${i}">Hapus</button>
            </div></div>`;
      });
    }
    $('#namaRiwayat').textContent = aktif ? nama : '-';
    $('#totalSetorDisplay').textContent = aktif ? fRp(totalSetor) : '0';
    $('#totalHariDisplay').textContent = totalHari + ' hari';
    const tb = $('#tabelBody');
    tb.innerHTML = '';
    if (transaksi.length === 0) { $('#tabelKosong').style.display = 'block'; } else {
      $('#tabelKosong').style.display = 'none';
      let r = 0;
      transaksi.forEach(t => { r += t.nominal;
        tb.innerHTML +=
          `<tr><td class="p-2 border-b border-[#f5f3f0]">${fDate(t.tanggal)}</td><td class="p-2 border-b border-[#f5f3f0]">${fRp(t.nominal)}</td><td class="p-2 border-b border-[#f5f3f0]">${t.hari} hr</td><td class="p-2 border-b border-[#f5f3f0] font-semibold">${fRp(r)}</td></tr>`; });
    }
  }

  function bangunStruk(trx) {
    const tglMulai = new Date(trx.tanggal),
      jml = trx.hari,
      tglAkhir = new Date(tglMulai);
    tglAkhir.setDate(tglAkhir.getDate() + jml - 1);
    let h = '';
    h += `<div class="center judul">-JIMPITAN Mangsatria-</div>`;
    h += `<div class="center sub">${desa}</div>`;
    h += `<div class="garis-tebal"></div>`;
    h += `<div class="row"><span>Nasabah</span><span>: ${nama}</span></div>`;
    h += `<div class="row"><span>Target/hari</span><span>: ${fRp(target)}/hari</span></div>`;
    h += `<div class="row"><span>Tgl setor</span><span>: ${fDate(tglMulai)} s.d. ${fDate(tglAkhir)}</span></div>`;
    h += `<div class="row"><span></span><span class="kanan">(${jml} hari)</span></div>`;
    h += `<div class="garis-tebal"></div>`;
    for (let i = 0; i < jml; i++) { const t = new Date(tglMulai);
      t.setDate(t.getDate() + i);
      h += `<div class="row"><span>${fDate(t)}</span><span class="kanan">${fRp(target)}</span></div>`; }
    h += `<div class="garis"></div>`;
    h += `<div class="row total"><span>Jumlah Setor</span><span class="kanan">${fRp(trx.nominal)}</span></div>`;
    h += `<div class="garis"></div>`;
    h += `<div class="center">Terima kasih</div><div class="center">Om Swastiastu 🙏</div>`;
    return h;
  }

  async function generatePNG(html) {
    $('#strukContent').innerHTML = html;
    const wrapper = document.querySelector('.struk-wrapper');
    wrapper.style.cssText =
      'left:0;top:0;z-index:1;position:fixed;display:block;background:#fff;width:340px;height:auto;';
    await document.fonts.ready;
    return new Promise((resolve) => {
      html2canvas($('#strukContent'), { scale: 2, backgroundColor: '#ffffff', logging: false, useCORS: true,
          allowTaint: true, windowWidth: 340, windowHeight: $('#strukContent').scrollHeight })
        .then(canvas => { wrapper.style.cssText = 'left:-9999px;z-index:-1;position:fixed;';
          resolve(canvas.toDataURL('image/png')); });
    });
  }

  function downloadPNG(dataUrl, filename) { const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); }

  async function saveDanShare(html, trx) {
    try {
      toast('⏳ Membuat struk...');
      const pngData = await generatePNG(html);
      const namaFile = nama.replace(/\s+/g, '_') + '_' + kodeTanggal(trx.tanggal) + '.png';
      downloadPNG(pngData, namaFile);
      toast('✅ Tersimpan: ' + namaFile);
      const res = await fetch(pngData);
      const blob = await res.blob();
      const file = new File([blob], namaFile, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Struk Jimpitan', text: 'Struk - ' + nama });
      } else {
        window.open('https://wa.me/?text=' + encodeURIComponent('*JIMPITAN*\n' + nama + '\nSetor: ' + fRp(trx
          .nominal) + '\n🙏'), '_blank');
      }
    } catch (e) { toast('⚠️ Gagal share, struk tetap tersimpan'); }
  }

  function setor(nominal) {
    if (!aktif) return alert('Atur dulu di tab Atur'), document.querySelector('[data-tab="setup"]').click();
    if (isNaN(nominal) || nominal <= 0) return;
    const trx = { tanggal: new Date(), nominal, hari: Math.floor(nominal / target) };
    transaksi.push(trx);
    hitungUlang();
    refresh();
    saveDanShare(bangunStruk(trx), trx);
  }

  $('#btnSetor').addEventListener('click', () => setor(parseInt($('#nominalSetor').value)));
  $('#nominalSetor').addEventListener('keypress', e => { if (e.key === 'Enter') setor(parseInt($('#nominalSetor')
    .value)); });
  $('#chipRow').addEventListener('click', e => { if (e.target.classList.contains('chip')) setor(parseInt(e.target.dataset
      .hari) * target); });

  $('#btnMulai').addEventListener('click', () => {
    nama = $('#namaNasabah').value.trim() || 'Tanpa Nama';
    desa = $('#desa').value.trim() || 'Desa Padang Bulia';
    target = parseInt($('#targetHarian').value) || 2000;
    if (target < 100) target = 1000;
    transaksi = [];
    totalSetor = 0;
    totalHari = 0;
    aktif = true;
    refresh();
    document.querySelector('[data-tab="setor"]').click();
  });

  $('#editList').addEventListener('click', e => {
    const i = parseInt(e.target.dataset.index);
    if (isNaN(i)) return;
    if (e.target.classList.contains('edit-btn')) {
      $('#editIndex').value = i;
      $('#editNominal').value = transaksi[i].nominal;
      $('#modalEdit').style.display = 'flex';
      setTimeout(() => $('#editNominal').focus(), 100);
    }
    if (e.target.classList.contains('hapus-btn')) {
      $('#hapusIndex').value = i;
      $('#hapusInfo').textContent = 'Hapus ' + fRp(transaksi[i].nominal) + ' (' + transaksi[i].hari + ' hari)?';
      $('#modalHapus').style.display = 'flex';
    }
  });

  $('#btnBatalEdit').addEventListener('click', () => $('#modalEdit').style.display = 'none');
  $('#btnSimpanEdit').addEventListener('click', () => {
    const i = parseInt($('#editIndex').value),
      b = parseInt($('#editNominal').value);
    if (isNaN(b) || b <= 0) return alert('Nominal > 0');
    transaksi[i].nominal = b;
    transaksi[i].hari = Math.floor(b / target);
    hitungUlang();
    refresh();
    $('#modalEdit').style.display = 'none';
  });
  $('#editNominal').addEventListener('keypress', e => { if (e.key === 'Enter') $('#btnSimpanEdit').click(); });

  $('#btnBatalHapus').addEventListener('click', () => $('#modalHapus').style.display = 'none');
  $('#btnKonfirmasiHapus').addEventListener('click', () => {
    transaksi.splice(parseInt($('#hapusIndex').value), 1);
    hitungUlang();
    refresh();
    $('#modalHapus').style.display = 'none';
  });

  document.querySelectorAll('.fixed.inset-0').forEach(o => o.addEventListener('click', function(e) { if (e.target ===
      this) this.style.display = 'none'; }));

  $('#btnReset').addEventListener('click', () => {
    if (confirm('Hapus semua data?')) {
      transaksi = [];
      totalSetor = 0;
      totalHari = 0;
      aktif = false;
      $('#targetHarian').value = 2000;
      $('#namaNasabah').value = 'Ni Luh Sari';
      $('#desa').value = 'Desa Padang Bulia';
      refresh();
      document.querySelector('[data-tab="setup"]').click();
    }
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(reg => console.log('SW registered:', reg.scope)).catch(err => console
      .log('SW failed:', err));
  }

  // Init first tab active style
  const firstTab = document.querySelector('.tab-btn.active');
  if (firstTab) { firstTab.style.background = '#fff';
    firstTab.style.color = '#000';
    firstTab.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }
  const firstPanel = document.querySelector('.panel.active');
  if (firstPanel) firstPanel.style.display = 'block';

  refresh();
})();