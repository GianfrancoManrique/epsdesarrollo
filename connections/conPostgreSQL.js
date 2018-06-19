const {Client}=require('pg')

const environment='DESARROLLO';

let client;

if (environment=='DESARROLLO'){
    client=new Client({
        host:'ec2-23-21-246-25.compute-1.amazonaws.com',
        port:5432,
        database:'d3ria0knp3r1g',
        user:'tlffqsluavwbtn',
        password:'8af67196fb1dcdd1f8377a196915197e442745db0032be5c55ad110db5bf7fde',
        ssl:'true'
    })
}

if (environment=='PRODUCCION'){
     client=new Client({
        host:'ec2-50-19-105-188.compute-1.amazonaws.com',
        port:5432,
        database:'d9j66f96la2sl8',
        user:'omfmobapptjmda',
        password:'6210dfdd76d76d84783de8d11c63c3937a579dadd91b08e58a764f0175ad1cd3',
        ssl:'true'
    })
}


client.connect();

module.exports=client;