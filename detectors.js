const high_ka = 'คะ';
const low_ka = 'ค่ะ';
const high_naka = 'นะคะ';
const low_naka = 'นะค่ะ';

module.exports = {

    ex_case : function(msg, message, died){
        const vocab = require('./vocab.js');
        vocab.ex_case.forEach(element => {
            const T_ex_case = element.concat(low_ka);
            const F_ex_case = element.concat(high_ka);
            if (msg.includes(T_ex_case)){
                const splt = msg.split(T_ex_case);
                msg = splt.join();
            }
            else if (msg.includes(F_ex_case)){
                //message.channel.send('ประหาร');
                const splt = msg.split(F_ex_case);
                msg = splt.join();
                died++;
        }
        });
        return{
            msg,
            died,
        };
    },
    
    q_case : function(msg, message, died){
        const vocab = require('./vocab.js');
        vocab.q_case.forEach(element => {
            const T_q_case = element.concat(high_ka);
            const F_q_case = element.concat(low_ka);
            if (msg.includes(T_q_case)){
                const splt = msg.split(T_q_case);
                msg = splt.join();
            }
            else if (msg.includes(F_q_case)){
                //message.channel.send('ประหาร');
                const splt = msg.split(F_q_case);
                msg = splt.join();
                died++;
            }
        });
        return{
            msg,
            died,
        };
    },
    
    em_case : function(msg, message, died){
        const vocab = require('./vocab.js');
        vocab.em_case.forEach(element => {
            const T_em_case = element.concat(high_ka);
            const F_em_case = element.concat(low_ka);
            if (msg.includes(T_em_case)){
                const splt = msg.split(T_em_case);
                msg = splt.join();
            }
            else if (msg.includes(F_em_case)){
                //message.channel.send('ประหาร');
                died++;
            }
        });
        if (msg.includes('คะ')){
            //message.channel.send('ประหาร');
             died++;
        }
        return{
            msg,
            died,
        };
    },
    
    fn_case : function(msg, message, died){
        const vocab = require('./vocab.js');
        vocab.fn_case.forEach(element => {
            const T_fn_case = element.concat(low_naka);
            const F_fn_case = element.concat(high_naka);
            if (msg.includes(T_fn_case)){
                const splt = msg.split(T_fn_case);
                msg = splt.join();
            }
            else if (msg.includes(F_fn_case)){
                //message.channel.send('ประหาร');
                const splt = msg.split(F_fn_case);
                msg = splt.join();
                died++;
            }
        });
        return{
            msg,
            died,
        };
    },

    n_case : function(msg, message, died){
        const vocab = require('./vocab.js');
        vocab.n_case.forEach(element => {
            if (msg.includes(element)){
                const splt = msg.split(element);
                msg = splt.join();
            }
        });
        return{
            msg,
            died,
        };
    },
};