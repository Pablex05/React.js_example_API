import React from 'react';
import axios from 'axios';

//css
import '../assetss/css/Login.css';
//url api
import {Apiurl} from "../services/apirest";
//image
import logo from  '../assetss/img/Logo.png';



class Login extends React.Component{

    //ponemos el contructor para poder usar los props
    constructor(props){
        super(props);
    }
    
    state = {
        form:{
            "usuario":"",
            "password":""
        },
        error:false,
        errorMsg:""
    }
    //manejador que hace que prevenga la recarga de la pagina
    manejadorSubmit=e=>{
        e.preventDefault();
    }

    manejadorChange = async e=>{
        //asigna un valor a una variable del estado
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        //console.log(this.state.form);
    }

    manejadorButton=()=>{
        let url= Apiurl + "auth"
        axios.post(url,this.state.form)
            .then( response=>{
                if(response.data.status === "ok"){
                    localStorage.setItem("token",response.data.result.token);
                    //si el login es correcto, entonces nos redirige a la pagina
                    this.props.history.push("/dashboard");
                }else{
                    this.setState({
                        error: true.value,
                        //en .result.error_msg es donde nos muestra el error con respecto lo que este puesto en la api
                        errorMsg: response.data.result.error_msg
                    })
                }
        }).catch(error =>{
            console.log(error);
            this.setState({
                error: true.value,
                //en .result.error_msg es donde nos muestra el error con respecto lo que este puesto en la api
                errorMsg: "Error en conectar a la API"
            })

        })
    }

    render() {
        return(
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <br/><br/>
                            <img src={logo} width="100px" alt="User Icon"/>
                            <br/><br/>
                        </div>
                        <form onSubmit={this.manejadorSubmit}>
                            <input type="text" className="fadeIn second" name="usuario" placeholder="usuario" onChange={this.manejadorChange}/>
                            <input type="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.manejadorChange}/>
                            <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorButton}/>
                        </form>

                        {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMsg}
                            </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login