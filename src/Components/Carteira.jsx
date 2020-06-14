import React from 'react'
import './Carteira.css'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Axios from 'axios'
export default class Carteira extends React.Component {
    state = {
        money: 200.00
    }
    constructor(props) {
        super(props)
        this.alter = this.alter.bind(this)
    }
    componentDidMount() {
        Axios.get('http://localhost/wallet/money/full')
            .then((res) => {
                this.setState({
                    money: res
                })
            })
    }
    alter(e) {
        var visibility = document.getElementsByName('visibility')
        var money = document.getElementsByName('money')
        if (e.target.className === 'money') {
            e.target.style.display = "none"
            visibility[0].style.display = 'flex'
        } else {
            visibility[0].style.display = 'none'
            money[0].style.display = 'flex'
        }
    }
    render() {
        return (

            <React.Fragment>
                <div className="container">
                    <div className="row d-flex justify-content-center mb-5">
                        <div className="col-2  d-flex justify-content-center eye align-items-center">

                            <h2 style={{ display: "none", margin: 0 }} name="money" onClick={this.alter} className='money' >
                                R$ {this.state.money}
                            </h2>
                            <i name="visibility" onClick={this.alter} className='icon' style={{ display: 'flex', width: '100%', height: '100%',alignItems:'center', justifyContent: 'center' }}>
                                <VisibilityIcon style={{ fontSize: 38 }} ></VisibilityIcon>
                            </i>
                        </div>
                    </div>

               
                </div>
            </React.Fragment>
        );
    }
}