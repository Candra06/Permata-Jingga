import React, { Component } from 'react';
import image from "../../../asset/img/bg1.jpg";
class ActivityPage extends Component {

  render() {
    return (
     <div className="container-fluid">
        <div className="row">
            <div className='col-12'>
                <h2 className="text-center">Activity</h2>
            </div>
            <div className="col-md-4 col-sm-4">
                <div className="card shadow">
                    <div className="card-head overflow">
                        <img src={image} alt="Wargaku.id" className="img-responsive"/>
                    </div>
                    <div className="card-body">
                        <h4 className="text-center">Team Work</h4>
                        <p className="text-sm text-justify text-gray">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut</p>
                        <a href="" className="right">Read More</a>
                    </div>
                </div>

            </div>
            <div className="col-md-4 col-sm-4">
                <div className="card shadow">
                    <div className="card-head overflow">
                        <img src={image} alt="Wargaku.id" className="img-responsive"/>
                    </div>
                    <div className="card-body">
                        <h4 className="text-center">Presentation</h4>
                        <p className="text-sm text-justify text-gray">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut</p>
                        <a href="" className="right">Read More</a>
                    </div>
                </div>

            </div>
            <div className="col-md-4 col-sm-4">
                <div className="card shadow">
                    <div className="card-head overflow">
                        <img src={image} alt="Wargaku.id" className="img-responsive"/>
                    </div>
                    <div className="card-body">
                        <h4 className="text-center">Annoucement</h4>
                        <p className="text-sm text-justify text-gray">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut</p>
                        <a href="" className="right">Read More</a>
                    </div>
                </div>

            </div>
            
        </div>
     </div>
    );
  }
}

export default ActivityPage;
