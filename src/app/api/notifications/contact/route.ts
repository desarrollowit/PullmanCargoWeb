import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid with API Key
if (process.env.NEXT_PUBLIC_SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY)
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { nombre, email, telefono, mensaje } = body

        if (!process.env.NEXT_PUBLIC_SENDGRID_API_KEY) {
            console.error('NEXT_PUBLIC_SENDGRID_API_KEY is not defined')
            return NextResponse.json({ error: 'Mail service unavailable' }, { status: 500 })
        }

        const msg = {
            to: process.env.NEXT_PUBLIC_EMAIL_TO || 'admin@pullmancargo.cl',
            from: process.env.NEXT_PUBLIC_EMAIL_FROM || 'contacto@pullmancargo.cl',
            subject: `Nuevo Mensaje de Contacto: ${nombre}`,
            html: `
                <div style="font-family: 'Outfit', Arial, sans-serif; padding: 40px; background-color: #f8f9fa;">
                    <div style="max-width: 600px; margin: 0 auto; bg-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #e9ecef;">
                        <div style="background-color: #003fa2; padding: 30px; text-align: center;">
                            <img src="https://www.pullmancargo.cl/brand/LOGO%20CARGO.png" alt="Pullman Cargo" style="height: 60px; width: auto; margin-bottom: 20px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Nuevo Mensaje de Contacto</h1>
                        </div>
                        <div style="padding: 40px; background-color: #ffffff;">
                            <div style="margin-bottom: 30px;">
                                <h2 style="color: #003fa2; font-size: 18px; border-bottom: 2px solid #f1f3f5; padding-bottom: 10px; margin-bottom: 20px; text-transform: uppercase;">Datos de Contacto</h2>
                                <p style="margin: 8px 0;"><strong>Nombre:</strong> ${nombre}</p>
                                <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
                                <p style="margin: 8px 0;"><strong>Teléfono:</strong> ${telefono || 'No especificado'}</p>
                            </div>
                            
                            <div style="margin-bottom: 30px;">
                                <h2 style="color: #003fa2; font-size: 18px; border-bottom: 2px solid #f1f3f5; padding-bottom: 10px; margin-bottom: 20px; text-transform: uppercase;">Mensaje</h2>
                                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 12px; color: #495057; line-height: 1.6;">
                                    ${mensaje.replace(/\n/g, '<br>') || 'Sin mensaje'}
                                </div>
                            </div>
                        </div>
                        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #adb5bd;">
                            Este es un mensaje automático del sistema de contacto web de Pullman Cargo.
                        </div>
                    </div>
                </div>
            `,
        }

        console.log('Sending contact email with SendGrid...', { to: msg.to, from: msg.from, subject: msg.subject })
        const response = await sgMail.send(msg)
        console.log('SendGrid Response Status:', response[0].statusCode)

        return NextResponse.json({ success: true, message: 'Message sent successfully' })
    } catch (error: any) {
        console.error('Error sending contact email:', error)
        if (error.response?.body) {
            console.error('SendGrid Error Body:', JSON.stringify(error.response.body, null, 2))
        }
        return NextResponse.json(
            { error: 'Failed to send message', details: error.message },
            { status: 500 }
        )
    }
}
