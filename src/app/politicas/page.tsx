"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ShieldCheck, FileText, Cookie, Scale } from "lucide-react"

export default function PoliticasPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <ScrollReveal animation="fade-in">
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-16 h-16 bg-[#003fa2]/10 rounded-2xl flex items-center justify-center">
                                <ShieldCheck className="w-8 h-8 text-[#003fa2]" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black uppercase text-secondary tracking-tight">
                                    Política de <br />
                                    <span className="text-primary">Privacidad</span>
                                </h1>
                            </div>
                        </div>

                        <div className="space-y-12">
                            {/* Section I */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-[2px] w-8 bg-primary" />
                                    <h2 className="text-xl font-black uppercase text-secondary tracking-tight">
                                        I. POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS PERSONALES
                                    </h2>
                                </div>
                                <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
                                    <p>
                                        El sitio web WWW.PULLMANCARGO.CL, en adelante "PULLMAN CARGO S A" o "el sitio web" indistintamente, pone en conocimiento de las personas que hagan uso del mismo, en adelante "personas usuarias", la presente política de privacidad y protección de los datos personales.
                                    </p>
                                    <p>
                                        Esta política forma parte de los Términos y Condiciones Generales de Uso del sitio web. Su lectura permitirá a las personas usuarias conocer el modo en que PULLMAN CARGO S A recolecta, trata y protege sus datos personales. El acceso, uso y permanencia en el sitio implica la aceptación de la presente política.
                                    </p>
                                    <p>
                                        Resultan de particular importancia la aplicación de la Ley N° 19.628 de Protección de Datos Personales y la Ley N° 19.496 sobre Derechos del Consumidor. Esta política está adaptada al Reglamento Europeo de Protección de Datos (RGPD) en lo que no contravenga la legislación chilena.
                                    </p>
                                </div>
                            </section>

                            {/* Subsections */}
                            {[
                                {
                                    id: "1",
                                    title: "Definiciones",
                                    items: [
                                        { label: "a. Almacenamiento de datos", text: "Conservación o custodia de datos en un registro, banco o base de datos." },
                                        { label: "b. Dato estadístico", text: "Aquel que en su origen, o por su tratamiento, no puede ser asociado a un titular identificado o identificable." },
                                        { label: "c. Datos de carácter personal", text: "Información concerniente a personas naturales, identificadas o identificables." },
                                        { label: "d. Datos sensibles", text: "Datos que se refieren a características físicas o morales, o hechos de la vida privada o intimidad, tales como hábitos, origen racial, ideologías, creencias religiosas, estados de salud o vida sexual." },
                                        { label: "e. Registro, banco o base de datos", text: "Conjunto organizado de datos de carácter personal que permita relacionar los datos entre sí y realizar su tratamiento." },
                                        { label: "f. Responsable del tratamiento", text: "Persona natural o jurídica a quien competen las decisiones relacionadas con el tratamiento de los datos personales." },
                                        { label: "g. Titular de los datos", text: "Persona natural a la que se refieren los datos personales." },
                                        { label: "h. Tratamiento de datos", text: "Cualquier operación técnica que permita recolectar, almacenar, grabar, organizar, comunicar, transferir o cancelar datos de carácter personal." }
                                    ]
                                },
                                {
                                    id: "2",
                                    title: "Principios aplicables al tratamiento de los datos personales",
                                    items: [
                                        { label: "a. Licitud, lealtad y transparencia", text: "Se requerirá siempre el consentimiento previo e informado de la personausuaria." },
                                        { label: "b. Limitación de la finalidad", text: "Los datos serán recogidos con fines determinados, explícitos y legítimos." },
                                        { label: "c. Minimización de datos", text: "Se recogerán únicamente los datos estrictamente necesarios." },
                                        { label: "d. Exactitud", text: "Los datos deben ser exactos y estar siempre actualizados." },
                                        { label: "e. Limitación del plazo de conservación", text: "Solo se mantendrán durante el tiempo necesario para los fines de su tratamiento." },
                                        { label: "f. Integridad y confidencialidad", text: "Se garantiza la seguridad y confidencialidad de los datos." },
                                        { label: "g. Responsabilidad proactiva", text: "La responsable del tratamiento asegurará el cumplimiento de estos principios." }
                                    ]
                                },
                                {
                                    id: "3",
                                    title: "Responsable del registro, banco o base de datos",
                                    content: "La responsable del tratamiento es PULLMAN CARGO S A, RUT N° 89.622.400-K, representada por LUIS PEDRO FARIAS, cédula nacional de identidad N° 8.828.003-2.\nCorreo electrónico: contacto@pullmancargo.cl."
                                },
                                {
                                    id: "4",
                                    title: "Recolección y registro de datos y finalidad",
                                    content: "Los datos obtenidos mediante formularios se incorporarán a nuestras bases de datos para facilitar y cumplir los compromisos establecidos, mantener la relación contractual o atender consultas. Específicamente, los datos se obtienen al ingresar la información del remitente y del destinatario del envío."
                                },
                                {
                                    id: "5",
                                    title: "Categoría de datos personales",
                                    content: "Se tratan únicamente datos identificativos. En ningún caso se tratan datos de carácter sensible, salvo autorización legal o consentimiento expreso para beneficios de salud."
                                },
                                {
                                    id: "6",
                                    title: "Base legal para el tratamiento",
                                    content: "El tratamiento solo se efectúa cuando la ley lo autoriza o el titular consiente expresamente por escrito. No requiere autorización el tratamiento de datos de fuentes accesibles al público de carácter económico, comercial o financiero, ni los realizados por personas jurídicas privadas para uso exclusivo de sus asociados. La persona usuaria tiene derecho a retirar su consentimiento en cualquier momento."
                                },
                                {
                                    id: "7",
                                    title: "Período de retención de los datos",
                                    content: "Los datos serán retenidos durante el tiempo mínimo necesario, con un plazo máximo de 3 años, o hasta que la persona usuaria solicite su supresión."
                                },
                                {
                                    id: "8",
                                    title: "Destinatarios de los datos personales",
                                    content: "Los datos podrán ser compartidos con terceros, dejando constancia de la identidad del destinatario y el propósito de la transmisión. En caso de transferencias internacionales, se informará debidamente a las personas usuarias."
                                },
                                {
                                    id: "9",
                                    title: "Datos personales de menores de edad",
                                    content: "Personas mayores de 14 años pueden otorgar su consentimiento lícitamente. Para menores de 14 años, se requiere el consentimiento de padres o representantes legales. Los datos sensibles de menores de 16 años sólo se tratarán con autorización de sus representantes."
                                },
                                {
                                    id: "10",
                                    title: "Secreto y seguridad de los datos",
                                    content: "PULLMAN CARGO S A adopta medidas técnicas para garantizar la seguridad y evitar la alteración o acceso no autorizado. El sitio cuenta con certificado SSL (Secure Socket Layer) para una transmisión cifrada. Ante cualquier violación de seguridad de alto riesgo, se comunicará sin dilación a las personas usuarias."
                                },
                                {
                                    id: "11",
                                    title: "Derechos derivados del tratamiento",
                                    items: [
                                        { label: "a. Acceso", text: "Confirmar si se están tratando sus datos y obtener información sobre su origen." },
                                        { label: "b. Rectificación", text: "Modificar datos inexactos o incompletos." },
                                        { label: "c. Supresión (\"derecho al olvido\")", text: "Obtener la eliminación de datos cuando ya no sean necesarios o el tratamiento sea ilícito." },
                                        { label: "d. Limitación del tratamiento", text: "Suspender el tratamiento bajo ciertas impugnaciones o reclamaciones." },
                                        { label: "e. Portabilidad", text: "Recibir sus datos en formato estructurado y de lectura mecánica." },
                                        { label: "f. Oposición", text: "Solicitar el cese del tratamiento de sus datos." },
                                        { label: "g. No ser objeto de decisiones automatizadas", text: "Incluida la elaboración de perfiles." }
                                    ]
                                },
                                {
                                    id: "12",
                                    title: "Enlaces a sitios web de terceros",
                                    content: "El sitio puede incluir hipervínculos a páginas de terceros con sus propias políticas de privacidad, de las cuales PULLMAN CARGO S A no es responsable."
                                },
                                {
                                    id: "13",
                                    title: "Reclamaciones ante la autoridad de control",
                                    content: "Ante infracciones a la normativa, la persona usuaria podrá ejercer acciones ante los Tribunales de Justicia."
                                }
                            ].map((sub) => (
                                <div key={sub.id} className="group">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-6 w-6 bg-[#003fa2]/10 rounded-lg flex items-center justify-center text-[10px] font-black text-[#003fa2]">
                                            {sub.id}
                                        </div>
                                        <h3 className="font-bold text-secondary uppercase text-sm tracking-wider">
                                            {sub.title}
                                        </h3>
                                    </div>
                                    {sub.content && (
                                        <p className="text-gray-600 leading-relaxed font-medium whitespace-pre-line pl-9">
                                            {sub.content}
                                        </p>
                                    )}
                                    {sub.items && (
                                        <ul className="space-y-3 pl-9">
                                            {sub.items.map((item, idx) => (
                                                <li key={idx} className="text-gray-600 leading-relaxed font-medium">
                                                    <span className="text-secondary font-bold mr-2">{item.label}:</span>
                                                    {item.text}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}

                            <hr className="border-gray-100" />

                            {/* Section II */}
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="h-[2px] w-8 bg-primary" />
                                    <h2 className="text-xl font-black uppercase text-secondary tracking-tight">
                                        II. POLÍTICA DE COOKIES
                                    </h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed font-medium mb-8 pl-0 md:pl-0">
                                    El acceso a este sitio puede implicar el uso de cookies, que son pequeñas cantidades de información almacenadas en el navegador para recordar ciertos datos. Estas facilitan la navegación y no dañan el dispositivo. Pueden recoger fecha, hora de visitas y sitios visitados.
                                </p>
                                <div className="grid gap-6 pl-0 md:pl-0">
                                    {[
                                        { title: "1. Cookies propias", text: "Gestionadas exclusivamente por PULLMAN CARGO S A para mejorar el funcionamiento, la calidad del contenido y la experiencia del usuario." },
                                        { title: "2. Cookies de redes sociales", text: "Se incorporan plugins que permiten acceder a redes sociales, las cuales disponen de sus propias políticas de privacidad y cookies." },
                                        { title: "3. Deshabilitar, rechazar y eliminar cookies", text: "La persona usuaria puede configurar su navegador (Chrome, Firefox, Safari) para deshabilitar o eliminar las cookies total o parcialmente. Esto podría limitar algunas prestaciones del sitio." }
                                    ].map((cookie, idx) => (
                                        <div key={idx} className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                            <h4 className="font-bold text-secondary text-sm uppercase mb-2">{cookie.title}</h4>
                                            <p className="text-gray-500 text-sm font-medium">{cookie.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Section III */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-[2px] w-8 bg-primary" />
                                    <h2 className="text-xl font-black uppercase text-secondary tracking-tight">
                                        III. ACEPTACIÓN Y CAMBIO DE ESTA POLÍTICA
                                    </h2>
                                </div>
                                <p className="text-gray-600 leading-relaxed font-medium mb-4">
                                    Es necesario que la persona usuaria haya leído y esté conforme con estas condiciones. El uso del sitio implica su aceptación. PULLMAN CARGO S A se reserva el derecho a modificar esta política por criterios propios o cambios legislativos.
                                </p>
                                <div className="bg-primary/5 p-4 rounded-2xl inline-block">
                                    <p className="text-primary font-bold text-xs uppercase tracking-widest">
                                        Elaboración y actualización: 7 de julio de 2021
                                    </p>
                                </div>
                            </section>
                        </div>

                        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                                Pullman Cargo S.A. - Todos los derechos reservados
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    )
}

