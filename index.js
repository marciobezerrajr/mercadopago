const express = require('express')
const MercadoPago = require('mercadopago')
const app = express()

MercadoPago.configure({
    sandbox: true,
    access_token: 'TEST-88230570437118-110101-963b3c1076ba216cfec31f44cbef00d3-152688826'
})

app.get('/', (req, res) => {
    res.send("Olá mundo")
})

app.get('/payment', async (req, res) => {

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

app.post('/notification', (req, res) => {
    var id = req.query.id
    // console.log(req.query)
    setTimeout(() => {
        const filter = {
            "order.id": id
        }

        MercadoPago.payment.search({
            qs: filter
        }).then((data) => {

            const payment = data.body.results[0]

            if (payment != undefined) {
                console.log(payment)
                console.log(payment.external_reference)
                console.log(payment.status)

                // if(payment.status === "approved"){
                //     //banco.pagamentos.salvo(payment.externnal_refence)
                // }
            } else {
                console.log('Pagamento não encontrado')
            }

        }).catch((err) => {
            console.log(err)
        })

    }, 2000)

    res.send('ok')
})

app.listen(80, (req, res) => {
    console.log('Server on')
})