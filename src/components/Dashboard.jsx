import React from 'react';
import axios from "axios";

import Header from '../template/Header'
import {Apiurl} from "../services/apirest";


class Dashboard extends React.Component{

    state = {
        pacientes:[]
    }

    clickPaciente(id){
        this.props.history.push("/editar/"+ id)
    }
    componentDidMount(){
        let url = Apiurl + "pacientes?page=1";
        axios.get(url)
        .then(response =>{
            this.setState({
                pacientes:response.data

            })
        })
    }

    render() {
        return(
            <React.Fragment>
                <Header></Header>
                <div className="container">
                    <br/><br/><br/>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">DNI</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Correo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.pacientes.map((value, index) =>{
                            return(
                                <tr key={index} onClick={()=>this.clickPaciente(value.PacienteId)}>
                                    <td>{value.PacienteId}</td>
                                    <td>{value.DNI}</td>
                                    <td>{value.Nombre}</td>
                                    <td>{value.Telefono}</td>
                                    <td>{value.Correo}</td>
                                </tr>
                            )
                        })}

                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard