const express = require('express')
const MercadoPago = require('mercadopago')
const app = express()

MercadoPago.configure({
    sandbox: true, 
    access_token: 'TEST-88230570437118-110101-963b3c1076ba216cfec31f44cbef00d3-152688826'
})

app.get('/.netlify/', (req, res) => {
    res.send("Olá mundo")
})

app.get('/.netlify//payment', async (req, res) => {

    var id = "" + Date.now()
    var payerMail = 'marcio@email.com'

    const data = {
        items: [
            item = {
                id: id,                                    //uuid --- Date.now
                title: 'Poderia ser uma variável dos params ou do banco',
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],

        payer: {
            email: payerMail
        },
        external_reference: id,
    }
    try {
        var pagto = await MercadoPago.preferences.create(data)
        console.log(pagto)
        
        return res.redirect(pagto.body.init_point)
    } catch (err) {
        res.send(err.message)
    }
})

app.post('/.netlify/notification', (req, res) => {
    console.log(req.query)
    res.send('ok')
})

app.listen(80, (req, res) => {
    console.log('Server on')
})