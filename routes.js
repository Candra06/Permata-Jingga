import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';
/*backend page*/
import AdminPage from '././page/pg-admin/Home';
import RWPage from '././page/pg-admin/RW';
import RTPage from '././page/pg-admin/RT';
import Warga from '././page/pg-admin/Warga';
import DataWargaAdmin from '././page/pg-admin/DataWarga';
import KK from '././page/pg-admin/KK';
import Pengumuman from '././page/pg-admin/Pengumuman';
import Akun from "./page/pg-admin/Akun";
import Event from "./page/pg-admin/Event";
import AdminProfil from '././page/pg-admin/Profil';
import TambahKK from '././page/pg-admin/AddKK';
import PengaturanKK from '././page/pg-admin/PengaturanKK';
import AdminKelurahan from '././page/pg-admin/Kelurahan';
import LihatKK from '././page/pg-admin/ViewKK';
import AkunAdmin from './page/pg-admin/AkunAdmin';
import EditBlog from './page/pg-admin/EditEvent';
import ImWargaAsli from './page/pg-admin/ImportWargaAsli';
import ImWargaTambahan from './page/pg-admin/ImportWargaTambahan';
import ImWargaKK from './page/pg-admin/ImportWargaKK';
/*frontend pages*/
import HomePage from "./page/frontend/pages/homePage";
import PengurusRTFront from "./page/frontend/pages/pengurusRT"
import Signin from "./page/frontend/pages/signin";
import Qurban from "./page/frontend/pages/qurban";
import RTHome from "./page/frontend/pages/RTHome";
import DetailEvent from "./page/frontend/pages/detailEvent";
import ProgramKerja from "./page/frontend/pages/ProgramKerja";
import PengajuanFront from "./page/frontend/pages/Pengajuan"
import DetailBlog from "./page/frontend/pages/detailBlog"
import AgendaFront from "./page/frontend/pages/Agenda"
import Keuangan from "./page/frontend/pages/keuangan"
/*rt pages*/
import RtPage from "./page/pg-rt/Home";
import DataWarga from './page/pg-rt/Warga';
import DataKK from './page/pg-rt/KK';
import DataPengumuman from './page/pg-rt/Pengumuman';
import DataPengajuan from './page/pg-rt/Pengajuan';
import SuratPengantar from './page/pg-rt/suratPengantar';
import Pesan from './page/pg-rt/Pesan';
import Surat from './page/pg-rt/Surat';
import RTProfil from '././page/pg-rt/Profil';
import ViewKK from '././page/pg-rt/ViewKK';
import AddKK from '././page/pg-rt/AddKK';
import addAgenda from '././page/pg-rt/Agenda';
import Test from '././page/pg-rt/test';
import WargaRT from '././page/pg-rt/Warga';
import DataWargaRT from '././page/pg-rt/DataWarga';
import ImWargaAslirt from './page/pg-rt/ImportWargaAsli';
import ImWargaTambahanrt from './page/pg-rt/ImportWargaTambahan';
import ImWargaKKrt from './page/pg-rt/ImportWargaKK';
import ViewPesertaRT from './page/pg-rt/ViewPeserta';
import PengurusRT from './page/pg-rt/Pengurus';
import ProgramKerjaRT from './page/pg-rt/Program';
import GaleriRT from './page/pg-rt/Galeri';
import AkunPengurusRT from './page/pg-rt/Akun';
import DeskripsiRT from './page/pg-rt/deskripsirt';
import DataQurban from './page/pg-rt/qurban';
/*warga pages*/
import WargaPage from '././page/pg-warga/Home';
import WargaPengajauan from '././page/pg-warga/Pengajuan';
import WargaPengumuman from '././page/pg-warga/Pengumuman';
import WargaPengumumanUmum from '././page/pg-warga/PengumumanUmum';
import WargaProfil from '././page/pg-warga/Profil';
import Penitipan from "./page/pg-warga/Penitipan";
import Laporan from "./page/pg-warga/Laporan";
import Agenda from '././page/pg-warga/Agenda';
import Logout from './page/logout';
import Keluarga from './page/pg-warga/Warga';
/*RW Pages */
import RWController from '././page/pg-rw/Home';
import RTController from '././page/pg-rw/DataRT';
import WargaController from '././page/pg-rw/DataWarga';
import PengumumanController from '././page/pg-rw/Pengumuman';
import KKController from '././page/pg-rw/KK';
import TampilKK from '././page/pg-rw/ViewKK';
import Pengajuan from '././page/pg-rw/Pengajuan';
import DaftarAgenda from '././page/pg-rw/Agenda';
import TambahDataKK from '././page/pg-rw/AddKK';
import RwProfil from '././page/pg-rw/Profil';
import DataSurat from '././page/pg-rw/Surat';
import WargaRW from '././page/pg-rw/Warga';
import DataWargaRW from '././page/pg-rw/DataWarga';
import ImWargaAslirw from './page/pg-rw/ImportWargaAsli';
import ImWargaTambahanrw from './page/pg-rw/ImportWargaTambahan';
import ImWargaKKrw from './page/pg-rw/ImportWargaKK';

/* Page Panitia */
import PanitiaHome from '././page/pg-panitia/Home';
import PanitiaQurban from './page/pg-panitia/qurban';

import SatpamPage from "./page/pg-satpam/Home";
import PengajuanSatpam from './page/pg-satpam/Penitipan';
import SatpamLaporan from './page/pg-satpam/Laporan';
import SatpamProfil from '././page/pg-satpam/Profil';


import SekretarisPage from "./page/pg-sekretaris/Home";
import PengajuanSekretaris from './page/pg-sekretaris/Pengajuan';
import SekretarisProfil from '././page/pg-sekretaris/Profil';


import BendaharaPage from "./page/pg-bendahara/Home";
import Bendaharapengeluaran from "./page/pg-bendahara/Pengeluaran";
import BendaharaPemasukan from "./page/pg-bendahara/Pemasukan";
import BendaharaIuran from "./page/pg-bendahara/Iuran";
import BendaharaPesertaIuran from "./page/pg-bendahara/ViewPeserta";
import BendaharaProfil from "./page/pg-bendahara/Profil";
import BendaharaKeuangan from "./page/pg-bendahara/Keuangan";

import RedirectLink from "./page/RedirectLink";

const Routes = () => (
  <BrowserRouter >
      <Switch>
      <Route  exact={true} path="/" component={HomePage}/>
          <Route path="/Signin" component={Signin}/>
          <Route path="/qurban" component={Qurban}/>
          <Route path="/RT:number" component={RTHome}/>
          <Route path="/Keuangan/:number" component={Keuangan}/>
          <Route path="/PengurusRT/:number" component={PengurusRTFront}/>
          <Route path="/ProgramKerja/:number" component={ProgramKerja}/>
          <Route path="/Logout" component={Logout}/>
          <Route path="/detailEvent" component={DetailEvent}/>
          <Route path="/pengajuan/:number" component={PengajuanFront}/>
          <Route path="/Agenda/:number" component={AgendaFront}/>
          <Route path="/blog/:permalink" component={DetailBlog}/>
          {/* <Route path="/repos/:userName/:repoName" component={Repo}/> */}
        {/* backend pages route */}
          <Route path="/Admin/Home" component={AdminPage}/>
          <Route path="/Admin/RW" component={RWPage}/>
          <Route path="/Admin/RT" component={RTPage}/>
          <Route path="/Admin/WargaTambahan" component={Warga}/>
          <Route path="/Admin/DataWarga" component={DataWargaAdmin}/>
          <Route path="/Admin/KK" component={KK}/>
          <Route path="/Admin/Pengumuman" component={Pengumuman}/>
          <Route path="/Admin/AkunWarga" component={Akun}/>
          <Route path="/Admin/AkunAdmin" component={AkunAdmin}/>
          <Route path="/Admin/Event" component={Event}/>
          <Route path="/Admin/Blog" component={Event}/>
          <Route exact path="/Admin/Profil" component={AdminProfil}/>
          <Route exact path="/Admin/AddKK" component={TambahKK}/>
          <Route exact path="/Admin/ViewKK" component={LihatKK}/>
          <Route exact path="/Admin/PengaturanKK" component={PengaturanKK}/>
          <Route exact path="/Admin/Kelurahan" component={AdminKelurahan}/>
          <Route exact path="/Admin/EditBlog" component={EditBlog}/>
          <Route exact path="/Admin/ImportWargaAsli" component={ImWargaAsli}/>
          <Route exact path="/Admin/ImportWargaTambahan" component={ImWargaTambahan}/>
          <Route exact path="/Admin/ImportKK" component={ImWargaKK}/>
        {/* end backend route page */}
        {/*  */}
        <Route path="/RT/Home" component={RtPage}/>
        <Route path='/RT/Warga' component={DataWarga}/>
        <Route path='/RT/Pengumuman' component={DataPengumuman}/>
        <Route path='/RT/KK' component={DataKK}/>
        <Route path='/RT/Pengajuan' component={DataPengajuan}/>
        <Route path='/RT/Pesan' component={Pesan}/>
        <Route path='/RT/SuratPengantar' component={SuratPengantar}/>
        <Route path='/RT/Profil' component={RTProfil}/>
        <Route exact path="/RT/ViewKK" component={ViewKK}/>
        <Route exact path="/RT/AddKK" component={AddKK}/>
        <Route exact path="/RT/Agenda" component={addAgenda}/>
        <Route exact path="/RT/Surat" component={Surat}/>
        <Route exact path="/RT/Test" component={Test}/>
        <Route path="/RT/WargaTambahan" component={WargaRT}/>
        <Route path="/RT/DataWarga" component={DataWargaRT}/>
        <Route exact path="/RT/ImportWargaAsli" component={ImWargaAslirt}/>
        <Route exact path="/RT/ImportWargaTambahan" component={ImWargaTambahanrt}/>
        <Route exact path="/RT/ImportKK" component={ImWargaKKrt}/>
        <Route exact path="/RT/ViewPeserta" component={ViewPesertaRT}/>
        <Route exact path="/RT/Pengurus" component={PengurusRT}/>
        <Route exact path="/RT/AkunPengurus" component={AkunPengurusRT}/>
        <Route exact path="/RT/ProgramKerja" component={ProgramKerjaRT}/>
        <Route exact path="/RT/Galeri" component={GaleriRT}/>
        <Route exact path="/RT/Deskripsi" component={DeskripsiRT}/>
        <Route exact path="/RT/Qurban" component={DataQurban}/>
        {/*warga pages*/}
        <Route exact path="/Warga/Home" component={WargaPage}/>
        <Route exact path="/Warga/Pengajuan" component={WargaPengajauan}/>
        <Route exact path="/Warga/PengumumanPribadi" component={WargaPengumuman}/>
        <Route exact path="/Warga/PengumumanUmum" component={WargaPengumumanUmum}/>
        <Route exact path="/Warga/Profil" component={WargaProfil}/>
        <Route exact path="/Warga/Penitipan" component={Penitipan}/>
        <Route exact path="/Warga/Agenda" component={Agenda}/>
        <Route exact path="/Warga/Laporan" component={Laporan}/>
        <Route exact path="/Warga/KeluargaSaya" component={Keluarga}/>

        <Route path="/RW/Home" component={RWController}/>
        <Route path="/RW/DataRT" component={RTController}/>
        <Route path="/RW/DataWarga" component={WargaController}/>
        <Route path="/RW/DataKK" component={KKController}/>
        <Route path="/RW/Pengumuman" component={PengumumanController}/>
        <Route path="/RW/Pengajuan" component={Pengajuan}/>
        <Route path="/RW/DaftarAgenda" component={DaftarAgenda}/>
        <Route path="/RW/AddKK" component={TambahDataKK}/>
        <Route path="/RW/ViewKK" component={TampilKK}/>
        <Route path="/RW/DataSurat" component={DataSurat}/>
        <Route exact path="/RW/Profil" component={RwProfil}/>
        <Route path="/RedirectLink" component={RedirectLink}/>
          <Route path="/RW/WargaTambahan" component={WargaRW}/>
          <Route path="/RW/DataWarga" component={DataWargaRW}/>
          <Route exact path="/RW/ImportWargaAsli" component={ImWargaAslirw}/>
          <Route exact path="/RW/ImportWargaTambahan" component={ImWargaTambahanrw}/>
          <Route exact path="/RW/ImportKK" component={ImWargaKKrw}/>


        {/*security pages*/}
        <Route path="/Security/Home" component={SatpamPage}/>
        <Route path='/Security/Penitipan' component={PengajuanSatpam}/>
        <Route path='/Security/Laporan' component={SatpamLaporan}/>
        <Route path='/Security/Profil' component={SatpamProfil}/>

        {/*sekretaris pages*/}
        <Route path="/Sekretaris/Home" component={SekretarisPage}/>
        <Route path='/Sekretaris/Pengajuan' component={PengajuanSekretaris}/>
        {/* <Route path='/Sekretaris/Laporan' component={SekretarisLaporan}/> */}
        <Route path='/Sekretaris/Profil' component={SekretarisProfil}/>


        {/*bendahara pages*/}
        <Route path="/Bendahara/Home" component={BendaharaPage}/>
        <Route path="/Bendahara/Pengeluaran" component={Bendaharapengeluaran}/>
        <Route path="/Bendahara/Pemasukan" component={BendaharaPemasukan}/>
        <Route path='/Bendahara/Profil' component={BendaharaProfil}/>
        <Route path='/Bendahara/Iuran' component={BendaharaIuran}/>
        <Route path='/Bendahara/ViewPesertaIuran' component={BendaharaPesertaIuran}/>
        <Route path='/Bendahara/Keuangan' component={BendaharaKeuangan}/>

        {/*Panitia Page*/}
        <Route path="/Panitia/Home" component={PanitiaHome}/>
        <Route path="/Panitia/Qurban" component={PanitiaQurban}/>
      </Switch>


  </BrowserRouter>
);

export default Routes;
