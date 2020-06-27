const Discord = require ('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const TK = auth.token;
const vocab = require('./vocab.js');
const high_ka = 'คะ';
const low_ka = 'ค่ะ';
const high_naka = 'นะคะ';
const low_naka = 'นะค่ะ';

client.once('ready', () => {
    console.log('Ready!');
});

client.on ('message', message =>{

    if(message.content.includes('ครับ')){
        message.channel.send('ไอหน้าหี')
    }

    var msg = message.content;

    vocab.ex_case.forEach(element => {
        const T_ex_case = element.concat(low_ka);
        const F_ex_case = element.concat(high_ka);
         if (message.content.includes(T_ex_case)){
            const splt = message.content.split(T_ex_case);
            msg = splt.join();
        }
        else if (message.content.includes(F_ex_case)){
            message.channel.send('ประหาร');
        }
    });

    vocab.q_case.forEach(element => {
        const T_ex_case = element.concat(high_ka);
        const F_ex_case = element.concat(low_ka);
         if (message.content.includes(T_ex_case)){
            const splt = message.content.split(T_ex_case);
            msg = splt.join();
        }
        else if (message.content.includes(F_ex_case)){
            message.channel.send('ประหาร');
        }
    });
    vocab.em_case.forEach(element => {
        const T_ex_case = element.concat(high_ka);
        const F_ex_case = element.concat(low_ka);
         if (message.content.includes(T_ex_case)){
            const splt = message.content.split(T_ex_case);
            msg = splt.join();
        }
        else if (message.content.includes(F_ex_case)){
            message.channel.send('ประหาร');
        }
    });

   /* vocab.n_case.forEach(element => {
        const T_ex_case = element.concat(low_naka);
        const F_ex_case = element.concat(high_naka);
         if (message.content.includes(T_ex_case)){
            const splt = message.content.split(T_ex_case);
            msg = splt.join();
        }
        else if (message.content.includes(F_ex_case)){
            message.channel.send('ประหาร');
        }
    }); */



     
});

client.login(TK);