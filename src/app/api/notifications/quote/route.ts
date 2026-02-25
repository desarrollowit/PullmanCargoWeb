import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid with API Key
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { formData, result } = body

        if (!process.env.SENDGRID_API_KEY) {
            console.error('SENDGRID_API_KEY is not defined')
            return NextResponse.json({ error: 'Mail service unavailable' }, { status: 500 })
        }

        const msg = {
            to: process.env.EMAIL_TO || 'admin@pullmancargo.cl',
            from: process.env.EMAIL_FROM || 'notificaciones@pullmancargo.cl',
            subject: `Nueva Cotización: ${formData.origen} -> ${formData.destino}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #071123;">
                    <h2 style="color: #ff5500; text-transform: uppercase;">Nueva Cotización Web</h2>
                    <hr style="border: 1px solid #003fa2;" />
                    <div style="margin-top: 20px;">
                        <p><strong>Cliente:</strong> ${formData.nombre || 'No especificado'}</p>
                        <p><strong>Email:</strong> ${formData.email}</p>
                        <p><strong>Teléfono:</strong> ${formData.telefono}</p>
                        <br />
                        <h3 style="color: #003fa2;">Detalles del Envío</h3>
                        <p><strong>Origen:</strong> ${formData.origen}</p>
                        <p><strong>Destino:</strong> ${formData.destino}</p>
                        <p><strong>Forma de Pago:</strong> ${formData.formaPago === 'EFE' ? 'Pago en Origen (Efectivo/Debito/Crédito)' : 'Pago en Destino'}</p>
                        <p><strong>Lugar de Entrega:</strong> ${formData.lugarEntrega === 'DOM' ? 'Domicilio' : 'Oficina Pullman Cargo'}</p>
                        <p><strong>Dimensiones:</strong> ${formData.largo}x${formData.ancho}x${formData.alto} cm</p>
                        <p><strong>Peso:</strong> ${formData.peso} kg</p>
                        <p><strong>Valor Declarado:</strong> $${formData.valorDeclarado}</p>
                        <br />
                        <div style="background-color: #fefcf4; padding: 15px; border-left: 4px solid #ff5500;">
                            <h3 style="margin: 0; color: #ff5500;">PRECIO TOTAL: $${result.precioTotal}</h3>
                        </div>
                    </div>
                </div>
            `,
        }

        console.log('Sending email with SendGrid...', { to: msg.to, from: msg.from, subject: msg.subject })
        const response = await sgMail.send(msg)
        console.log('SendGrid Response:', response[0].statusCode)

        return NextResponse.json({ success: true, message: 'Email sent successfully' })
    } catch (error: any) {
        console.error('Error sending SendGrid email:', error)
        if (error.response) {
            console.error(error.response.body)
        }
        return NextResponse.json(
            { error: 'Failed to send notification', details: error.message },
            { status: 500 }
        )
    }
}
