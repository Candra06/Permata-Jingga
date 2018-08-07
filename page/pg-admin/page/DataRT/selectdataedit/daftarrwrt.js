import React from 'react';
import orderBy from 'lodash/orderBy';
import ListRW from './listitemrw';
import { RefRW, RefRT, RefKK, RefWarga } from './../../../../../db';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
export default class daftarrwrt extends React.Component {


  constructor(props) {
    super(props);
     this.state = {
      tasks: [],
      tasks2: [],
      tasks3: [],
    idrw:'',idrt:'',
    kd_rw:'',
    nikWarga: '',
    value: '',
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }

  componentWillMount() {
    this.setState({idrw: localStorage.getItem("DataRW"),nikWarga: localStorage.getItem("NikRT")});

    RefRW.on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ tasks, idrw: localStorage.getItem("DataRW") });
    });
  }
  handleChangeOption(event) {
    localStorage.setItem('DataRW', event.target.value);
    this.setState({idrw: localStorage.getItem("DataRW")});


                RefWarga.on('value', snap =>{
                    const tasks3 = [];
                    snap.forEach(shot => {
                            let hitung = 0;
                            RefRT.orderByChild("nik").equalTo(shot.val().nik).on('value', snap => {
                            snap.forEach(shot => {
                                hitung++;
                                });
                            });
                            if(hitung >= 1){

                            }else{

                                tasks3.push({ ...shot.val(), key: shot.key, alamatku: shot.val().email });
                            }
                    })
                    this.setState({tasks3, taskLoading: false });
                })
  }
  handleChangePilihan = event => {

    try{
      this.setState({nikWarga: event.value});
      localStorage.setItem("NikRT", event.value)
     localStorage.setItem("AlamatRT", event.alamat);
      localStorage.setItem("NamaRT", event.nama);
      localStorage.setItem("NoHPRT", event.nohp);
    }catch(error){

    }

  }
  render() {
    const { tasks, tasks3, option } = this.state;
    const orderedTasks = orderBy(
      tasks
    );

      const options = []
        { tasks3.map( task =>(
            options.push({value:task.nik, nohp:task.nohp, alamat:task.alamatku, nama:task.nama, label:task.nama+"("+task.alamatku+")"})

        ))}
    let taskList;
      taskList = (
      <div className="row col-md-12">
          <div className="col-md-12">
            <div className="form-group col-md-12">
              <select className="form-control" value={this.state.idrw} onChange={this.handleChangeOption} style={{height: 3 + 'em'}}>
                <option value="">Pilih RW</option>
                {orderedTasks.map(task => (
                  <ListRW key={task.key} task={task} />
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-12">
              <div className="form-group col-md-12">

            <Select className="form-control" name="form-field-name" placeholder="Masukkan Nama RT"
            value={this.state.nikWarga}
            multi={this.state.multi}
            onChange={this.handleChangePilihan}
            onSelect={ this.handleSelect }
            options = { options }
            />

              </div>
          </div>


        </div>
      );
    return taskList;
  }
}
