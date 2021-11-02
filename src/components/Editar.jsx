import React from 'react';
import axios from 'axios';
//Api
import {Apiurl} from "../services/apirest";
//template
import Header from '../template/Header'

class Editar extends React.Component{

    state = {
        form: {
                "nombre" : "",
                "direccion" : "",
                "dni" : "",
                "correo" : "",
                "codigoPostal" : "",
                "genero" : "",
                "telefono" : "",
                "fechaNacimiento" : "",
                "token" : ""
            },
            error:false,
            errorMsg: ""
    }

    manejadorChange = async e=>{
        //asigna un valor a una variable del estado
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form);
    }

    put =()=>{
        let url = Apiurl + "pacientes";
        axios.put(url, this.state.form)
            .then(response=>{
                console.log(response)
            })
    }

    delete =()=>{
        let url = Apiurl + "pacientes";
        let pacienteId = this.props.match.params.id;
        let datos = {
            "token": localStorage.getItem("token"),
            "pacienteId": pacienteId
        }
        axios.delete(url, {headers:datos})
            .then(response=>{
                this.props.history.push("/dashboard");
            })
    }

    manejadorSubmit=e=>{
        e.preventDefault();
    }

    componentDidMount(){
        let pacienteId = this.props.match.params.id;
        let url = Apiurl + '/pacientes?id=' + pacienteId;
        axios.get(url)
            .then(response =>{
                this.setState({
                    form:{
                        nombre: response.data[0].Nombre,
                        direccion: response.data[0].Direccion,
                        dni: response.data[0].DNI,
                        correo: response.data[0].Correo,
                        codigoPostal: response.data[0].CodigoPostal,
                        genero: response.data[0].Genero,
                        telefono: response.data[0].Telefono,
                        fechaNacimiento: response.data[0].FechaNacimiento,
                        token: localStorage.getItem("token"),
                        pacienteId: pacienteId
                    }
                })
            })
    }

    render() {
        const form = this.state.form
        return(
            <React.Fragment>
                    <Header></Header>
                    <div className="container">
                        <h3>Editar paciente</h3>
                    </div>
                    <div className="container">
                        <br/>
                        <form className="form-horizontal" onSubmit={this.manejadorSubmit}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="col-md-2 control-label">Nombre</label>
                                        <div className="col-md-10">
                                            <input className="form-control" name="nombre" placeholder="Nombre" type="text"
                                                value={form.nombre}
                                                onChange={this.manejadorChange}
                                            />
                                        </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="col-md-2 control-label">Direccion</label>
                                    <div className="col-md-10">
                                        <input className="form-control" name="direccion" placeholder="Direccion" type="text"
                                               value={form.direccion}
                                               onChange={this.manejadorChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="col-md-2 control-label">DNI</label>
                                    <div className="col-md-10">
                                        <input className="form-control" name="dni" placeholder="DNI" type="text"
                                               value={form.dni}
                                               onChange={this.manejadorChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="col-md-2 control-label">Correo</label>
                                    <div className="col-md-10">
                                        <input className="form-control" name="correo" placeholder="Correo" type="text"
                                               value={form.correo}
                                               onChange={this.manejadorChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="col-md-2 control-label">CodigoPostal</label>
                                    <div className="col-md-10">
                                        <input className="form-control" name="codigoPostal" placeholder="CodigoPostal" type="text"
                                               value={form.codigoPostal}
                                               onChange={this.manejadorChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="col-md-2 control-label">Genero</label>
                                    <div className="col-md-10">
                                        <input className="form-control" name="genero" placeholder="Genero" type="text"
                                               value={form.genero}
                                               onChange={this.manejadorChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="col-md-2 control-label">Telefono</label>
                                    <div className="col-md-10">
                                        <input className="form-control" name="telefono" placeholder="Telefono" type="text"
                                               value={form.telefono}
                                               onChange={this.manejadorChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="col-md-2 control-label">fechaNacimiento</label>
                                    <div className="col-md-10">
                                        <input className="form-control" name="fechaNacimiento" placeholder="fechaNacimiento" type="text"
                                               value={form.fechaNacimiento}
                                               onChange={this.manejadorChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br/><br/>
                            <button type="submit" className="btn btn-primary" style={{marginRight: "10px"}} onClick={()=>this.put()}>Editar</button>
                            <button type="submit" className="btn btn-danger" style={{marginRight: "10px"}} onClick={()=>this.delete()}>Eliminar</button>
                            <a className="btn btn-dark" href="/dashboard">Salir</a>
                        </form>
                    </div>

            </React.Fragment>
        );
    }
}

export default Editar