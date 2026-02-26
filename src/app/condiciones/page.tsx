"use client"

import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FileText, ShieldCheck, ChevronRight } from "lucide-react"

export default function CondicionesPage() {
    const clauses = [
        {
            title: "CLÁUSULA PRIMERA",
            content: "Remitente: Toda persona que conforme la Ley es hábil para contratar. Envío: Todos los sobres, bultos, valijas y cargas en general que se transportan bajo una orden de transporte (ODT) y que el remitente certifica que los datos señalados son completos, exactos y suficientes para ubicar el domicilio del destinatario."
        },
        {
            title: "CLÁUSULA SEGUNDA",
            subtitle: "Envíos no aceptados:",
            content: "Son aquellos restringidos por IATA (International Air Transport Association) por ICAO (International Civil Aviation Organization). Se considerarán asimismo, aquellos que no se puedan transportar en forma segura, entendiéndose por tales sin que su enunciación se exclusiva los explosivos, gases comprimidos, inflamables, sólidos inflamables, sustancias carburantes, sustancias tóxicas infecciosas, materiales radioactivos, corrosivos, sustancias peligrosas varias, documentos al portador, dinero, joyas o especies preciosas, obras de arte, vidrio y/o lozas, cerámicas, mármol muebles, líquidos de cualquier perecibles que requieran refrigeración, estupefacientes, pornografía, seres vivos, restos mortales y/o partes de ser humano. Asimismo, no serán aceptadas mercaderías nuevas sin documentación legal (Guía de despacho, factura totalizadas); mercadería usada sin declaración de contenido. Lo anterior, sin perjuicio de la declaración del remitente exceptuándose de la prohibición señalada. En caso de contravenir lo señalado en los párrafos anteriores, el remitente asume su total responsabilidad por cualquier avería, pérdida, deterioro que puedan sufrir las especies, bultos, mercadería y/o carga enviada, eximiendo desde ya a Pullman Cargo S.A de cualquier tipo de responsabilidad."
        },
        {
            title: "CLÁUSULA TERCERA",
            subtitle: "Inspección:",
            content: "Se faculta y autoriza para que Pullman Cargo S.A. pueda abrir e inspeccionar el bulto, mercadería, especies enviadas a su solo arbitrio y en cualquier momento. En caso de alguna negativa por parte del remitente, Pullman Cargo S.A. tendrá la facultad para no transportar el bulto, carga, mercadería o especies sin que ello importe infracción a la Ley 19.496 sobre Protección a los Derechos del Consumidor."
        },
        {
            title: "CLÁUSULA CUARTA",
            subtitle: "Fijación de precio:",
            content: "El precio se fija según tarifado vigente en base al peso real o volumétrico, lo que resulte superior. Medida de conversión 1m3 = 250kg. (Un metro cúbico equivale a doscientos cincuenta kilogramos)."
        },
        {
            title: "CLÁUSULA QUINTA",
            subtitle: "Envíos:",
            content: "El remitente deberá pagar el precio y costos de embarque, regreso, devolución, almacenaje, bodegaje o redirección, así como los aranceles y tributos correspondientes al envío. En caso que la mercadería, bulto, especies, correspondencia u otro no sea entregada al destinatario o tercero, por causas no imputables a Pullman Cargo S.A, se notificará telefónicamente o por escrito al remitente de dicha circunstancia, quien deberá pagar todos los costos de embarque o devolución, en su caso si procediere, agregándose adicionalmente por cada día o fracción de día, el precio de almacenaje o bodegaje, a razón de 0,04 unidades de fomento por cada kilo de la carga, según tarifa lista vigente al momento del envío, salvo que ésta sea retirada por el remitente dentro de los 3 días siguientes a la fecha de su notificación, caso en el cual, el costo de almacenaje o bodegaje será cero."
        },
        {
            title: "CLÁUSULA SEXTA",
            subtitle: "Reclamos:",
            content: "Debe ser presentada por escrito. El reclamo por pérdida, carga faltante, daño total o parcial, debe ser resuelto dentro de los 30 corridos a contar de la fecha de recepción del reclamo, siempre que el destinatario haya dejado una constancia u observación por escrito al momento de su recepción en la ODT (Orden de Transportes) respectiva. Se determina que la recepción en conformidad del envío, a través de la firma del cliente en destino, exime a Pullman Cargo S.A. de cualquier responsabilidad e indemnización futura. Lo anterior, sin perjuicio de los derechos que establece la normativa aplicable."
        },
        {
            title: "CLÁUSULA SÉPTIMA",
            subtitle: "Límites de responsabilidad: (Con sujeción a condiciones 11 y 12).",
            content: "La pérdida o daño se limita al valor real del envío, lo que no incluye el valor comercial o el valor que pueda otorgarle el remitente. La responsabilidad de Pullman Cargo S.A. se extiende desde la recepción hasta la entrega del bulto, mercedaria, encomienda, sobre y carga en general."
        },
        {
            title: "CLÁUSULA OCTAVA",
            subtitle: "Por valor real se entiende:",
            content: "El valor determinado en documento fidedigno o informado al momento de contratar los servicios de transportes de carga. Dicho valor corresponderá al indicado en la boleta y/o factura de compra que acredite que lo enviado es nuevo. Para el caso de artículos usados, corresponderá al valor del mercado menos su depreciación."
        },
        {
            title: "CLÁUSULA NOVENA",
            subtitle: "Declaración e indemnización:",
            content: "Será obligación del remitente declarar y acreditar el valor de las mercaderías cuando éstas excedan las 5 UF. En caso contrario, la responsabilidad de Pullman Cargo S.A., por pérdida o daño total se limita a dicho monto como máximo. En caso de avería, deterioro o daño parcial, el valor será proporcional conforme su precio de mercado. En el caso de correspondencia, la no declaración limita la responsabilidad de Pullman Cargo S.A. por pérdida a dos veces el valor del envío. Lo anterior, sin perjuicio de lo establecido en la Ley sobre Protección a los Derechos del Consumidor y demás leyes aplicables."
        },
        {
            title: "CLÁUSULA DÉCIMA",
            subtitle: "Responsabilidad legal:",
            content: "Cualquier otro siniestro, no especificado en los puntos 7 y 9, limita responsabilidad de Pullman Cargo S.A. a lo establecido en el Código Aeronáutico y Código de Comercio, sin perjuicio a lo señalado en la Ley 19.496, sobre Protección de los Derechos del Consumidor, en lo que fuera aplicable."
        },
        {
            title: "CLÁUSULA UNDÉCIMA",
            content: "Demora en el retiro: En caso que la empresa no efectúe el servicio contratado dentro del día y rango horario señalado, el cliente podrá a su arbitrio desistirse del mismo. En dicho caso, la empresa deberá realizar el reembolso de lo pagado dentro del plazo de 5 días hábiles siguientes al reclamo. Demora en los envíos: Pullman Cargo S.A. hará todos los esfuerzos posibles para entregar el envío en los horarios y día establecido de reparto, pero los mismos no son garantizados."
        },
        {
            title: "CLÁUSULA DUODÉCIMA",
            subtitle: "Eximentes:",
            content: "Pullman Cargo S.A. no es responsable por la pérdida, daño, atraso o entrega errónea de un envío debido a circunstancias ajenas a su voluntad, lo que incluye: \"Desastres Naturales\", como por ejemplo, terremoto, ciclón, huracán, o inundación. \"Fuerza Mayor\", como por ejemplo, guerra, accidente aéreo o embargo. Cualquier incumplimiento por parte del remitente a lo establecido en la cláusula segunda; a mayor detalle cualquier siniestro, pérdida o daño, total o parcial asociado a envíos no aceptados. Cualquier acción u omisión por un hecho que no dependa de Pullman Cargo S.A., por ejemplo: actos o hechos del remitente y/o destinatario del envío, agentes de aduanas, Sag, u otros funcionarios de Gobierno, del Servicio Postal de otro transportador o de un tercero a quien contratamos para dar el servicio a los lugares que no atendemos directamente. No se responderá por daños técnicos, mecánicos, eléctricos, electrónicos, magnéticos ni por borraduras de imágenes electrónicas, fotográficas o grabaciones que no provengan de hechos o actos imputables a Pullman Cargo S.A. Las circunstancias referidas, deberán acreditarse en su oportunidad si se requiere."
        },
        {
            title: "CLAUSULA DECIMA TERCERA",
            content: "El cliente no podrá poner término unilateralmente al contrato celebrado con Pullman GO, es decir, no aplica derecho de retracto. Lo anterior sin perjuicio de los derechos establecidas en la Ley 19.496 sobre Protección a los Derechos del Consumidor."
        },
        {
            title: "CLÁUSULA DÉCIMA CUARTA",
            content: "El cliente podrá desistirse de la prestación del servicio hasta las 23:59 horas del día anterior al retiro del producto. En dicho caso la devolución del dinero se hará dentro de los 10 días hábiles siguientes a la fecha de anulación del servicio. La devolución será del 100% de lo pagado sin recargo alguno."
        },
        {
            title: "CLÁUSULA DÉCIMA QUINTA",
            content: "Lo señalado en las cláusulas anteriores es sin perjuicio de los derechos y deberes de los consumidores establecidas en la Ley 19.496 sobre Protección a los Derechos del consumidor."
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <ScrollReveal animation="fade-in">
                    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-[#003fa2]/10 rounded-2xl flex items-center justify-center">
                                <ShieldCheck className="w-8 h-8 text-[#003fa2]" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black uppercase text-secondary tracking-tight">
                                    Condiciones Generales <br />
                                    <span className="text-primary">del Servicio</span>
                                </h1>
                            </div>
                        </div>

                        <div className="space-y-10">
                            {clauses.map((clause, index) => (
                                <div key={index} className="group">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="h-[2px] w-8 bg-primary rounded-full transition-all group-hover:w-12" />
                                        <h2 className="text-xs font-black uppercase tracking-widest text-[#003fa2]">
                                            {clause.title}
                                        </h2>
                                    </div>
                                    {clause.subtitle && (
                                        <p className="font-bold text-secondary mb-2 uppercase text-sm">
                                            {clause.subtitle}
                                        </p>
                                    )}
                                    <p className="text-gray-600 leading-relaxed text-base font-medium">
                                        {clause.content}
                                    </p>
                                </div>
                            ))}
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
