import React from 'react'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BusinessIcon from '@material-ui/icons/Business';
import './Main.css'
import Axios from 'axios'
import Carteira from '../Components/Carteira'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
export default class Main extends React.Component {
    state = {
        gain: 0,
        vlcompra: '',
        vlvenda: '',
        qtd: 0
    }

    constructor(props) {
        super(props)
        this.calcLucro = this.calcLucro.bind(this)
        this.calc = this.calc.bind(this)
        this.Onchange = this.Onchange.bind(this)
        this.save = this.save.bind(this)

    }

    calc() {
        var lucro = document.getElementById('gain')
        var compra = this.state.vlcompra.replace(',', '.')
        var venda = this.state.vlvenda.replace(',', '.')
        var qtd = this.state.qtd
        var gain = ((venda - compra) * qtd) - 5
        var gain_fix = gain.toFixed(2)
        if (gain > 0) {
            this.setState({
                gain: gain_fix
            })
            lucro.style.backgroundColor = 'green'
            lucro.style.color = 'white'
        } else {
            this.setState({
                gain: gain_fix
            })
            lucro.style.backgroundColor = 'red'
            lucro.style.color = 'white'
        }
        this.setState({
            vlcompra: '',
            vlvenda: '',
            qtd: 0
        })

    }
    Onchange(e) {
        var lucro = document.getElementById('gain')
        lucro.style.backgroundColor = ''
        lucro.style.color = ''
        this.setState({ gain: 0 })
        if (e.target.name === "compra") {
            this.setState({ vlcompra: e.target.value })
        }
        else if (e.target.name === "venda") {
            this.setState({ vlvenda: e.target.value })
        } else if (e.target.name === "qtd") {
            this.setState({ qtd: e.target.value })
        } else {
            alert('Recarregue a aplicação')
        }

    }
    save() {
        Axios.post('http://localhost:8080/pay/save/wallet', { gain: this.state.gain })
            .then((res) => {
                console.log(res)
            })

    }

    calcLucro() {
        return (
            <React.Fragment>
                <div className="row d-flex justify-content-around">
                    <input type="text" className="input col-3 text-center form-control " placeholder="Valor de Compra" name="compra" value={this.state.vlcompra} onChange={this.Onchange} />
                    <input type="number" placeholder="Qtd" className="input col-2 text-center form-control" name="qtd" onChange={this.Onchange} value={this.state.qtd} />
                    <input type="text" className="input col-3 text-center form-control" placeholder="Valor de venda" name="venda" value={this.state.vlvenda} onChange={this.Onchange} />
                    <button className="btn btn-danger col-1 pl-1" onClick={this.calc}><ArrowForwardIcon /></button>
                </div>
                <div className="row d-flex justify-content-center my-5">
                    <input type="text" className="input col-5 text-center form-control" id="gain" value={this.state.gain} disabled />
                    <button className="btn btn-success col-1 ml-5" onClick={this.save}><AccountBalanceWalletIcon />
                    </button>
                </div>
            </React.Fragment>
        );
    }
    render() {
        return (
            <React.Fragment>
                <Router>
                    <div className="container mt-3">
                        <h1 className="text-center mt-5 ">Cálculo de Lucro</h1>
                        <hr className='bg-light' ></hr>
                        <div className="row d-flex py-2 justify-content-center ">
                            <Link to="/" className="link btn btn-danger col-2 mr-1"><BusinessIcon style={{ fontSize: 50 }} /></Link>
                            <Link to="/carteira" className="link btn btn-success col-2"><MonetizationOnIcon style={{ fontSize: 50 }} /></Link>
                           
                        </div>
                    </div>
                    <div className="container py-5 box">



                        <Switch>
                            <Route path="/" exact={true}>
                                {this.calcLucro()}
                            </Route>
                            <Route path="/carteira">
                                <Carteira />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}