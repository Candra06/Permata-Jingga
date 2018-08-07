import * as firebase from 'firebase';

const config = {
	apiKey: "AIzaSyBCbdVAczniARyW1P75tNx5xsY3meOCVEU",
    authDomain: "permatajingga-3de57.firebaseapp.com",
    databaseURL: "https://permatajingga-3de57.firebaseio.com",
    projectId: "permatajingga-3de57",
    storageBucket: "permatajingga-3de57.appspot.com",
    messagingSenderId: "407288547430"
};
firebase.initializeApp(config);

export const rootRef = firebase.database().ref();
export const RefWarga = rootRef.child('WARGA');
export const RefGaleri = rootRef.child('Galeri');
export const RefRW = rootRef.child('RW');
export const RefProgram = rootRef.child('Program');
export const RefRT = rootRef.child('RT');
export const RefBerita = rootRef.child('Berita');
export const RefKK = rootRef.child('KK');
export const RefSurat = rootRef.child('Surat');
export const User = rootRef.child('User');
export const upRef = firebase.storage().ref('gambar');
export const upRefWarga = firebase.storage().ref('gambarwarga');
export const upRefpengurus = firebase.storage().ref('pengurus');
export const Pengumuman = rootRef.child('Pengumuman');
export const RefPengumuman = rootRef.child('Pengumuman');
export const RefPengajuan = rootRef.child('Pengajuan');
export const RefAgenda = rootRef.child('Agenda');
export const RefBlog = rootRef.child('Blog');
export const RefEvent = rootRef.child('Blog');
export const RefNotif = rootRef.child('Notifikasi');
export const RefUser = rootRef.child('User');
export const RefUserTest = rootRef.child('UserTest');
export const RefNoSurat = rootRef.child('NoSurat');
export const RefWargaTest = rootRef.child('WARGATest');
export const RefWargaTmp = rootRef.child('WARGATMP');
export const RefDataKK = rootRef.child('DataKK');
export const RefKelurahan = rootRef.child('Kelurahan');
export const RefPenitipan = rootRef.child('Penitipan');
export const RefPengurus = rootRef.child('Pengurus');
export const RefLaporan = rootRef.child('Laporan');
export const RefHapus = rootRef.child('TmpHapus');
export const RefImport = rootRef.child('TmpImport');
export const RefDeskripsi = rootRef.child('deskripsirt');
export const RefQurban = rootRef.child('Qurban');
export const Refpengeluaran = rootRef.child('Uangkeluar');
export const Refpemasukan = rootRef.child('Uangmasuk');
export const Refkeuangan = rootRef.child('Keuangan');
export const Refriwayat = rootRef.child('Riwayat');
export const RefIuran = rootRef.child('MasterIuran');
export const Refpesertaiuran = rootRef.child('PesertaIuran');
export const RefBayarIuran = rootRef.child('DataBayarIuran');
export const timeRef = firebase.database.ServerValue.TIMESTAMP;
