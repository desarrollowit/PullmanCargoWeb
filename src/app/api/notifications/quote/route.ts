import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid with API Key
if (process.env.NEXT_PUBLIC_SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY)
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { formData, result } = body

        if (!process.env.NEXT_PUBLIC_SENDGRID_API_KEY) {
            console.error('NEXT_PUBLIC_SENDGRID_API_KEY is not defined')
            return NextResponse.json({ error: 'Mail service unavailable' }, { status: 500 })
        }

        if (!formData.email) {
            return NextResponse.json({ error: 'Email address is required' }, { status: 400 })
        }

        const emailFrom = process.env.NEXT_PUBLIC_EMAIL_FROM || 'contacto@pullmancargo.cl'
        const emailTo = process.env.NEXT_PUBLIC_EMAIL_TO

        const htmlBody = `
                <div style="font-family: 'Outfit', Arial, sans-serif; padding: 40px; background-color: #f8f9fa;">
                    <div style="max-width: 600px; margin: 0 auto; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #e9ecef;">
                        <div style="background-color: #003fa2; padding: 30px; text-align: center;">
                            <img src="https://www.pullmancargo.cl/brand/LOGO%20CARGO.png" alt="Pullman Cargo" style="height: 60px; width: auto; margin-bottom: 20px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">COTIZACION PULLMAN</h1>
                        </div>
                        <div style="padding: 40px; background-color: #ffffff;">
                            <div style="margin-bottom: 30px;">
                                <h2 style="color: #003fa2; font-size: 18px; border-bottom: 2px solid #f1f3f5; padding-bottom: 10px; margin-bottom: 20px; text-transform: uppercase;">Datos del Cliente</h2>
                                <p style="margin: 8px 0;"><strong>Nombre:</strong> ${formData.nombre || 'No especificado'}</p>
                                <p style="margin: 8px 0;"><strong>Email:</strong> ${formData.email}</p>
                                <p style="margin: 8px 0;"><strong>Teléfono:</strong> ${formData.telefono}</p>
                                <h2 style="color: #003fa2; font-size: 18px; border-bottom: 2px solid #f1f3f5; padding-bottom: 10px; margin-bottom: 20px; text-transform: uppercase;">Resumen del Envío</h2>
                                <p style="margin: 8px 0;"><strong>Origen:</strong> ${formData.origen}</p>
                                <p style="margin: 8px 0;"><strong>Destino:</strong> ${formData.destino}</p>
                                <p style="margin: 8px 0;"><strong>Servicio:</strong> ${formData.servicio}</p>
                                <p style="margin: 8px 0;"><strong>Dimensiones:</strong> ${formData.largo}x${formData.ancho}x${formData.alto} cm</p>
                                <p style="margin: 8px 0;"><strong>Peso:</strong> ${formData.peso} kg</p>
                                <p style="margin: 8px 0;"><strong>Entrega:</strong> ${formData.lugarEntrega}</p>
                                <p style="margin: 8px 0;"><strong>Forma de Pago:</strong> ${formData.formaPago}</p>
                            </div>
                            
                            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 16px; text-align: center; border: 1px dashed #003fa2;">
                                <p style="margin: 0; color: #6c757d; font-size: 14px; text-transform: uppercase; font-weight: bold;">Precio Total Estimado</p>
                                <h3 style="margin: 10px 0 0 0; color: #003fa2; font-size: 32px; font-weight: 800;">$${result.precioTotal ? result.precioTotal.toLocaleString('es-CL') : '0'}</h3>
                            </div>

                            <div style="margin-top: 30px; text-align: center;">
                                <p style="color: #6c757d; font-size: 14px;">
                                    Recuerda que puedes contratar tu servicio directamente en nuestro sitio web o acercándote a cualquier agencia de Pullman Cargo.
                                </p>
                            </div>
                        </div>
                        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #adb5bd;">
                            Este es un mensaje automático del sistema de cotización web de Pullman Cargo.
                        </div>
                    </div>
                </div>
            `

        // 1. Send to client
        console.log('Sending email to client:', formData.email)
        await sgMail.send({
            to: formData.email,
            from: emailFrom,
            subject: `Cotización Pullman Cargo: ${formData.origen} → ${formData.destino}`,
            html: htmlBody,
        })

        // 2. Send internal copy to team if EMAIL_TO is configured
        if (emailTo && emailTo !== formData.email) {
            console.log('Sending internal copy to:', emailTo)
            await sgMail.send({
                to: emailTo,
                from: emailFrom,
                subject: `[Copia Interna] Cotización: ${formData.origen} → ${formData.destino} | ${formData.email}`,
                html: htmlBody,
            })
        }

        return NextResponse.json({ success: true, message: 'Email sent successfully' })
    } catch (error: any) {
        console.error('Error sending SendGrid email:', error)
        if (error.response?.body) {
            console.error('SendGrid Error Body:', JSON.stringify(error.response.body, null, 2))
        }
        return NextResponse.json(
            { error: 'Failed to send notification', details: error.message },
            { status: 500 }
        )
    }
}
