const cliente = require("../connections/conPostgreSQL");

let modelo =()=>{};

modelo.validar=(codigo,contraseña,cb)=>{

        let comando="select id,codigo,contraseña,tipo,nombres,apellido_pat,apellido_mat from nasca.usuario where ";
        comando=comando.concat("upper(codigo)=upper\(\'",codigo,"\'\)");
        //comando=comando.concat("contraseña=\'",contraseña,"\'");
        cliente.query(comando,cb);
}
module.exports = modelo;