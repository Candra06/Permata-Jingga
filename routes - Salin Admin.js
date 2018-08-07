import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';
/*backend page*/
import AdminPage from '././page/pg-admin/Home';
import RWPage from '././page/pg-admin/RW';
import RTPage from '././page/pg-admin/RT';
import Warga from '././page/pg-admin/Warga';
import KK from '././page/pg-admin/KK';
import Pengumuman from '././page/pg-admin/Pengumuman';
import Akun from "./page/pg-admin/Akun";
import Event from "./page/pg-admin/Event";
import Kegiatan from "./page/pg-admin/Kegiatan";
import AdminProfil from '././page/pg-admin/Profil';
import TambahKK from '././page/pg-admin/AddKK';
import PengaturanKK from '././page/pg-admin/PengaturanKK';
import AdminKelurahan from '././page/pg-admin/Kelurahan';
/*frontend pages*/
import HomePage from "./page/frontend/pages/homePage";
import Signin from "./page/frontend/pages/signin";
import DetailEvent from "./page/frontend/pages/detailEvent";

/*rt pages*/
import RtPage from "./page/pg-rt/Home";
import DataWarga from './page/pg-rt/Warga';
import DataKK from './page/pg-rt/KK';
import DataPengumuman from './page/pg-rt/Pengumuman';
import DataPengajuan from './page/pg-rt/Pengajuan';
import SuratPengantar from './page/pg-rt/suratPengantar';
import RTProfil from '././page/pg-rt/Profil';
/*warga pages*/
import WargaPage from '././page/pg-warga/Home';
import WargaPengajauan from '././page/pg-warga/Pengajuan';
import WargaPengumuman from '././page/pg-warga/Pengumuman';
import WargaPengumumanUmum from '././page/pg-warga/PengumumanUmum';
import WargaProfil from '././page/pg-warga/Profil';
import Logout from './page/logout';

import RWController from '././page/pg-rw/Home';
import RTController from '././page/pg-rw/DataRT';
import WargaController from '././page/pg-rw/DataWarga';
import PengumumanController from '././page/pg-rw/Pengumuman';
import KKController from '././page/pg-rw/DataKK';
import Pengajuan from '././page/pg-rw/Pengajuan';
import RwProfil from '././page/pg-rw/Profil';


import RedirectLink from "./page/RedirectLink";

const Routes = () => (
  <BrowserRouter >
      <Switch>
          <Route  exact={true} path="/" component={HomePage}/>
          <Route path="/Signin" component={Signin}/>
          <Route path="/Logout" component={Logout}/>
          <Route path="/detailEvent" component={DetailEvent}/>
        {/* backend pages route */}
          <Route path="/Admin/Home" component={AdminPage}/>
          <Route path="/Admin/RW" component={RWPage}/>
          <Route path="/Admin/RT" component={RTPage}/>
          <Route path="/Admin/Warga" component={Warga}/>
          <Route path="/Admin/KK" component={KK}/>
          <Route path="/Admin/Pengumuman" component={Pengumuman}/>
          <Route path="/Admin/Akun" component={Akun}/>
          <Route path="/Admin/Event" component={Event}/>
          <Route exact path="/Admin/Profil" component={AdminProfil}/>
          <Route exact path="/Admin/AddKK" component={TambahKK}/>
          <Route exact path="/Admin/PengaturanKK" component={PengaturanKK}/>
          <Route exact path="/Admin/Kelurahan" component={AdminKelurahan}/>
        {/* end backend route page */}
        {/*  */}
        <Route path="/RT/Home" component={RtPage}/>
        <Route path='/RT/Warga' component={DataWarga}/>
        <Route path='/RT/Pengumuman' component={DataPengumuman}/>
        <Route path='/RT/KK' component={DataKK}/>
        <Route path='/RT/Pengajuan' component={DataPengajuan}/>
        <Route path='/RT/SuratPengantar' component={SuratPengantar}/>
        <Route path='/RT/Profil' component={RTProfil}/>
        {/*warga pages*/}
        <Route exact path="/Warga/Home" component={WargaPage}/>
          <Route exact path="/Warga/Pengajuan" component={WargaPengajauan}/>
          <Route exact path="/Warga/PengumumanPribadi" component={WargaPengumuman}/>
          <Route exact path="/Warga/PengumumanUmum" component={WargaPengumumanUmum}/>
          <Route exact path="/Warga/Profil" component={WargaProfil}/>

          <Route path="/RW/Home" component={RWController}/>
          <Route path="/RW/DataRT" component={RTController}/>
          <Route path="/RW/DataWarga" component={WargaController}/>
          <Route path="/RW/DataKK" component={KKController}/>
          <Route path="/RW/Pengumuman" component={PengumumanController}/>
          <Route path="/RW/Pengajuan" component={Pengajuan}/>
          <Route exact path="/RW/Profil" component={RwProfil}/>
          <Route path="/RedirectLink" component={RedirectLink}/>
      </Switch>


  </BrowserRouter>
);

export default Routes;
