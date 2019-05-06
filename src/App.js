import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bannerCode: {},
            allowance: {},
            allowancePCT: '',
            frequencyCode: '',
            methodCode: '',
            data: ''
        }
    }
    handleChange(option, stateValue){
        let state = this.state;
        state[stateValue] = option
        this.setState({ ...this.state,
                        ...state
                        });
    }

    handleClick() {
        const {bannerCode,allowance,allowancePCT,frequencyCode,methodCode} = this.state;

        const params = {
            "gsm_banner_code": bannerCode.value,
            "allowance_type_code": allowance.value,
            "allowance_pct": allowancePCT,
            "payment_method_code": methodCode,
            "payment_frequency_code": frequencyCode,
        }

         axios.get('http://127.0.0.1:8000/getPrediction/',
              {
               params
              }).then((response) => {
              this.setState({ data: response.data});
            });

    }

    render() {
        const bannerCodes = [{value: "3", label: "Walmart"},
                             {value: "4", label: "Sam's Club"},
                             {value: "5", label: "Walmart.com"},
                             {value: "7", label: "Sam’s Club.com"}];
        const allowances =   [{value: "01", label: "New Store Allowance"},
                             {value: "03", label: "Warehouse Allowance"},
                             {value: "05", label: "Warehouse Distribution Allowance"},
                             {value: "16", label: "Defective/Returned Mdse. Allowance"},
                             {value: "19", label: "Swell Allowance (SW or DM)"}];
          return (
              <div className="container">
                <div className="row">
                <div className="col-md-4">
                      <b> Banner Code : </b> <Select options={ bannerCodes } onChange={(option)=>this.handleChange(option, "bannerCode")}/>
                      {
                        this.state.bannerCode &&  this.state.bannerCode.value &&
                        (
                            <div>
                            <b> Allowance : </b><Select options={allowances} onChange={(allowance) => this.handleChange(allowance, "allowance")}/>
                            <br/>
                            <b> Allowance PCT : </b><input value={this.state.allowancePCT} onChange={(e) => this.handleChange(e.target.value, "allowancePCT")} />
                            <br/>
                            <b> Payment method code : </b> <input value={this.state.methodCode} onChange={(e) => this.handleChange(e.target.value, "methodCode")} />
                            <br/>
                            <b> Payment frequency code : </b> <input value={this.state.frequencyCode} onChange={(e) => this.handleChange(e.target.value, "frequencyCode")} />

                            <button onClick={()=> this.handleClick()}>Submit</button>
                            </div>
                        )
                      }
                      {
                        this.state.data && (
                            <b> There are no exceptions </b>
                        )
                      }
                </div>
            </div>
            </div>
          );
    }
}

export default App;
