# Sivilize Studio

**Sivilize Studio** adalah platform _Business Document OS_ cerdas yang dirancang untuk mempercepat, mengotomatisasi, dan menyederhanakan proses pembuatan dokumen bisnis perusahaan.

Platform ini hadir sebagai solusi bagi korporasi dan tenaga profesional untuk tidak lagi membuang waktu dalam merancang draf surat penawaran, invoice, profil perusahaan, hingga dokumen legal lainnya secara manual.

> **Sivilize Studio** merupakan bagian tak terpisahkan dari ekosistem **PT Sivilize Corp Indonesia**, sebuah komitmen untuk mendorong transformasi digital di lingkungan bisnis tanah air.

---

## 🔑 1. Panduan Pendaftaran, Login, & Setup Perusahaan (Onboarding)

Sivilize Studio dirancang untuk memberikan kemudahan proses kolaborasi administrasi perusahaan secara terpusat:

### A. Registrasi Akun Baru

1. Buka halaman utama aplikasi Sivilize Studio, klik tombol **Daftar Sekarang** atau akses URL **`/register`**.
2. Isi nama lengkap Anda, alamat email aktif perusahaan, dan password Anda.
3. Klik **Daftar Akun**. Akun Anda akan dibuat secara otomatis dan sistem akan langsung mengarahkan Anda ke halaman persiapan awal (_onboarding_).

### B. Setup Perusahaan (Onboarding - `/setup-company`)

Setelah pertama kali berhasil mendaftar, Anda wajib mengisi data instansi/perusahaan Anda terlebih dahulu:

1. Anda akan diarahkan ke halaman **`/setup-company`**.
2. Masukkan **Nama Perusahaan/Instansi** (misal: _CV Karya Mandiri_).
3. Isi kategori industri, alamat fisik kantor, email operasional, nomor telepon, dan nomor NPWP perusahaan (jika ada).
4. Unggah **Logo Resmi Perusahaan** (format PNG transparan direkomendasikan). Logo ini akan digunakan sebagai kop surat resmi di setiap dokumen yang dihasilkan.
5. Klik **Simpan & Masuk ke Dashboard**.

### C. Melakukan Login

1. Akses halaman masuk di URL **`/login`**.
2. Masukkan email dan password terdaftar Anda.
3. Centang opsi **Ingat Saya (Remember Me)** untuk menyimpan token otentikasi di browser secara aman sehingga Anda tidak perlu login ulang di sesi berikutnya.
4. Klik **Masuk** untuk menuju dashboard utama.

---

## 🧭 2. Penjelasan Halaman & Menu Navigasi (Sidebar)

Setelah masuk ke halaman utama, sidebar sebelah kiri menyediakan menu utama untuk mengelola siklus hidup dokumen perusahaan Anda:

1. **📊 Dashboard**: Halaman beranda utama untuk melihat ringkasan status dokumen (Draft, In Review, Approved), memantau log audit aktivitas terbaru anggota tim, serta tombol cepat _Buat Dokumen Baru_.
2. **📂 Dokumen (`/dashboard/documents`)**: Pusat berkas digital Anda. Menampilkan daftar seluruh dokumen yang pernah dibuat oleh tim Anda. Dilengkapi dengan filter pencarian nama klien, filter status dokumen (Draft/Review/Approved), tombol share link publik, serta opsi hapus/edit.
3. **📄 Templates (`/dashboard/templates`)**: Galeri template dokumen bisnis formal standar industri yang telah dirancang khusus (misal: Surat Penawaran Harga (SPH), Surat Perjanjian Kerja (SPK), NDA, MoU, Invoice, dan Proposal). Anda bisa menduplikasi template ini ke editor Anda dengan satu klik.
4. **👥 Anggota Tim (`/dashboard/team`)**: Halaman untuk mengundang staf atau manajer baru ke dalam ruang kerja (_workspace_) perusahaan Anda. Di sini Anda bisa mengelola level otoritas akses mereka (contoh: _Admin_ untuk akses penuh, _Editor_ untuk mengedit dokumen, dan _Reviewer_ yang hanya bisa membaca serta memberi komentar).
5. **🏢 Brand Kit Perusahaan (`/dashboard/company`)**: Modul khusus untuk mengonfigurasi kit identitas visual perusahaan. Anda bisa menyesuaikan warna utama instansi, jenis font dokumen, susunan kalimat kop surat (_header_), hingga format tanda tangan direksi (_footer_).
6. **🎨 Editor Canvas (`/editor/[id]`)**: Halaman khusus penyuntingan visual dokumen dengan konsep kanvas dinamis (_Unbound Canvas_). Di dalam editor ini terdapat:
   - **AI Generator Panel**: Untuk menghasilkan teks draf otomatis berdasarkan perintah kalimat bebas.
   - **WYSIWYG Editor**: Toolbar penyuntingan teks (Bold, Italic, Bullet Point, Align, Font Size, dll.).
   - **Panel Kolaborasi**: Kolom komentar dan review real-time untuk diskusi revisi antar anggota tim.
   - **Tombol Print / Export**: Untuk mengekspor dokumen menjadi berkas PDF bersih bebas dari tombol-tombol antarmuka (clean print layout).

---

## 🚀 3. Panduan Alur Kerja Pembuatan Dokumen (Step-by-Step)

Berikut adalah panduan praktis cara membuat dokumen bisnis dari awal hingga siap dikirimkan ke klien:

### Langkah 1: Buat Dokumen Baru

- Masuk ke menu **Dashboard** atau **Dokumen**, lalu klik tombol **Buat Dokumen Baru** (atau duplikat dari galeri **Templates**).
- Masukkan judul dokumen (misal: _Surat Penawaran Pengadaan Komputer - CV Sentosa_) dan tentukan ukuran kertas dokumen (A4 / Letter / Legal).

### Langkah 2: Gunakan AI Generator untuk Menyusun Draf

- Di dalam halaman editor, buka panel **AI Assistant** di sisi kanan.
- Tulis perintah/konteks draf yang ingin dibuat secara spesifik.
  - _Contoh_: `"Buatkan surat penawaran harga untuk PT Sukses Makmur mengenai jasa pembuatan website company profile senilai Rp 15.000.000 dengan masa pengerjaan 14 hari."`
- Klik **Generate dengan AI**. Kecerdasan buatan akan menyusun draf formal ber-EYD baku dan otomatis menyuntikkannya ke kanvas editor.

### Langkah 3: Edit dan Rapikan Layout (WYSIWYG)

- Edit kalimat draf jika ada detail teknis yang ingin disesuaikan.
- Gunakan toolbar editor untuk memformat teks (misal: menebalkan harga nominal, memberi bullet points pada spesifikasi produk).
- Kop surat resmi dan data tanda tangan Anda akan terpasang otomatis sesuai dengan Brand Kit perusahaan yang Anda atur sebelumnya.

### Langkah 4: Tinjau dan Diskusikan Bersama Tim (In Review)

- Jika dokumen memerlukan persetujuan manajer, ubah status dokumen menjadi **In Review**.
- Bagikan dokumen ke manajer Anda. Manajer dapat membuka dokumen dan meninggalkan komentar revisi (contoh: _"Tolong diskon harganya diturunkan sedikit"_ atau _"Tambahkan poin garansi 1 tahun"_) pada panel komentar samping.
- Lakukan revisi pada draf teks berdasarkan masukan tersebut.

### Langkah 5: Berikan Persetujuan (Approved)

- Manajer atau Direktur yang memiliki hak akses approval menekan tombol **Setujui Dokumen (Approve)**. Status dokumen akan terkunci menjadi **Approved** (tercatat permanen di sistem log audit).

### Langkah 6: Ekspor dan Kirim Dokumen (PDF)

- Klik tombol **Cetak / Ekspor PDF** di bagian atas editor.
- Sistem akan memproses dan mengunduh berkas PDF dokumen bersih resolusi tinggi ke komputer Anda. Seluruh elemen antarmuka web (seperti menu sidebar, tombol edit, dan kolom chat komentar) otomatis disembunyikan.
- Dokumen PDF formal siap dikirim via Email atau WhatsApp ke klien Anda.

---

## 📖 Latar Belakang

Sistem persuratan dan pembuatan dokumen di mayoritas perusahaan Indonesia masih terjebak di era 90-an. Karyawan menghabiskan waktu berjam-jam hanya untuk mencari _template_ Word lama, menyesuaikan margin yang selalu berantakan, dan mengetik ulang data klien yang sama berulang kali. Kesalahan ketik (typo) pada Surat Penawaran Harga atau Kontrak seringkali berakibat fatal pada reputasi perusahaan. Sivilize Studio lahir dari rasa frustrasi tersebut—menggantikan alur kerja manual yang rentan kesalahan dengan orkestrasi AI yang cerdas, presisi, dan terpusat.

## 🎯 Visi & Misi

**Visi:**
Menjadi ekosistem infrastruktur digital (SaaS) nomor satu di Asia Tenggara yang mengotomatisasi seluruh beban administratif korporat, sehingga manusia dapat kembali fokus pada hal yang paling penting: _Berpikir dan Berinovasi_.

**Misi:**

1. Mendisrupsi cara kerja tradisional dengan menghadirkan kecerdasan buatan (AI) yang paham konteks bisnis lokal.
2. Memangkas SLA (Service Level Agreement) pembuatan dokumen bisnis dari ukuran hari menjadi hitungan menit.
3. Menciptakan standarisasi dokumen perusahaan yang bebas cacat (_zero-defect_) melalui pengawasan _Human-in-the-Loop_.

---

## Fitur Utama

### ✨ Pembuatan Dokumen Didukung AI

Sivilize Studio menggunakan kecerdasan buatan untuk merancang draf dokumen yang profesional, rapi, dan menggunakan tata bahasa baku (EYD). Cukup masukkan detail penerima, garis besar isi, dan instruksi khusus—sistem akan memolesnya menjadi dokumen siap pakai. Sistem juga mampu meniru gaya bahasa dari dokumen PDF referensi yang Anda unggah.

### 📝 Editor Dokumen Interaktif & Cerdas

Kertas kosong bukan lagi masalah. Hasil _generate_ AI akan secara otomatis di-inject ke dalam kanvas editor. Anda bisa menyunting dokumen dengan bebas seperti di atas kertas fisik (dengan pilihan ukuran A4, Letter, hingga Legal).

### 💬 Kolaborasi Tim Waktu Nyata (Real-Time)

Sistem memiliki panel kolaborasi di mana anggota tim, manajer, atau supervisor bisa meninggalkan catatan revisi, komentar, dan masukan secara langsung pada sebuah dokumen sebelum disetujui (_Approved_). Seluruh jejak pendapat direkam permanen dalam sistem agar tidak ada revisi yang terlewat.

### 🖨️ Cetak & Ekspor PDF Presisi

Aplikasi didesain memiliki fungsi cetak pintar. Saat Anda menekan tombol ekspor, sistem akan otomatis menghilangkan seluruh elemen UI (sidebar, tombol, header navigasi) dan hanya mencetak _kertas dokumen_ bersih dalam resolusi tinggi, siap untuk dibagikan ke klien.

---

## 🚀 Mengapa Sivilize Studio Berbeda? (Competitive Advantage)

Di pasar yang dipenuhi oleh pengolah kata tradisional (seperti MS Word atau Google Docs) dan pembuat template statis, **Sivilize Studio mendisrupsi cara kerja korporat dengan pendekatan "AI-First & Context-Aware"**. Berikut adalah pembeda absolut platform ini hingga ke akar-akarnya:

### 1. Bukan Sekedar Template Kosong, Melainkan "Konteks Aktif"

SaaS lain memberikan Anda template kosong yang memaksa Anda mengisi dari nol. Sivilize Studio tidak menggunakan template mati. Sistem meminta **Konteks Singkat** (Siapa pengirim, siapa penerima, apa garis besar masalahnya) dan AI akan membangun struktur kalimat, paragraf, dan tata letak secara organik. Anda bertindak sebagai direktur, AI bertindak sebagai staf administrasi Anda.

### 2. Mimikri Dokumen (Style Cloning) Berbasis PDF

Ini adalah fitur pembunuh (_killer feature_). Perusahaan seringkali ragu menggunakan AI karena takut bahasa yang dihasilkan "terlalu kaku" atau "tidak sesuai gaya bahasa perusahaan". Sivilize Studio memungkinkan pengguna **mengunggah dokumen lama perusahaan dalam bentuk PDF**. Sistem akan membedah PDF tersebut dan **meniru gaya bahasa, tonasi, serta hierarki penulisan** untuk diterapkan pada dokumen baru. Ini menghasilkan dokumen yang 100% berjiwa perusahaan Anda.

### 3. Editor Dokumen Visual Bebas (Unbound Canvas)

Berbeda dengan editor teks konvensional yang kaku dari atas ke bawah, Editor di Sivilize Studio beroperasi seperti perangkat desain modern (terinspirasi dari Figma & Canva). Kertas dokumen bertindak sebagai **kanvas visual** di mana setiap blok teks hasil AI dapat digeser, disesuaikan lebarnya, dan diformat secara independen. Ini membebaskan pengguna dari masalah _formatting margin_ yang membuat frustrasi di pengolah kata biasa.

### 4. Ekosistem Terpusat (Multi-Tenant Workspace)

Aplikasi ini bukan sekedar alat pembuat surat sekali pakai. Ini adalah **Sistem Operasi Bisnis (OS)**. Setiap dokumen terikat pada _Workspace_, Perusahaan, dan _Brand Kit_ spesifik. Artinya, pengguna agensi yang menangani banyak klien dapat memisahkan dokumen, logo, dan riwayat revisi antara Perusahaan A dan Perusahaan B tanpa pernah tercampur.

### 5. Jejak Audit & Kolaborasi Persisten

Di Google Docs, komentar seringkali hilang setelah teks dihapus. Di Sivilize Studio, **panel kolaborasi terpisah namun terikat pada ID Dokumen**. Seluruh perdebatan revisi, masukan klien, dan status _Approval_ (Draft -> Review -> Approved) terekam secara permanen di tingkat database. Hal ini menghilangkan kebingungan _versioning_ seperti "SPH_Final_Revisi_3_Banget.pdf".

---

## Sasaran Pengguna

1. **Pemilik Bisnis (CEO/Founder)** yang butuh dokumen kerja cepat tanpa harus menyewa agen legal mahal.
2. **Tim Sales & Marketing** yang perlu membuat _Surat Penawaran Harga (SPH)_ dan _Invoice_ massal dalam hitungan menit.
3. **Pekerja Lepas (Freelancer)** yang memerlukan kontrak dan _Company Profile_ premium.
4. **Instansi Pemerintah & BUMN** yang mewajibkan struktur persuratan dinas baku.

---

## Hak Cipta & Lisensi

Sivilize Studio adalah produk eksklusif. Seluruh antarmuka, alur kerja (workflow), logo, dan struktur logika sistem merupakan kekayaan intelektual yang dilindungi.

**&copy; 2026 Sivilize Studio | Part of Sivilize Corp Indonesia Ecosystem. All Rights Reserved.**
Dilarang keras menyalin, mendistribusikan, atau memodifikasi kode dan aset tanpa izin resmi dari pihak Sivilize Corp Indonesia.
