import { Layout } from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const lastUpdated = "27 de abril de 2026";
const lastUpdatedEN = "April 27, 2026";

const SectionES = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="mb-10">
    <h2 className="text-xl font-bold text-primary mb-3">{title}</h2>
    <div className="space-y-3 text-foreground/80 leading-relaxed">{children}</div>
  </section>
);

const SectionEN = SectionES;

const PolicyES = () => (
  <div>
    <p className="text-sm text-foreground/60 mb-8">Última actualización: {lastUpdated}</p>

    <p className="mb-6 text-foreground/80 leading-relaxed">
      Esta Política de Privacidad de <strong>Etnia Sh Viajes S.A.S</strong> ("nosotros", "nuestro" o "nos")
      describe cómo accedemos, recopilamos, almacenamos, usamos y/o compartimos ("procesamos") su información
      personal cuando utiliza nuestros servicios ("Servicios"), que incluyen:
    </p>
    <ul className="list-disc list-inside mb-6 space-y-1 text-foreground/80">
      <li>Visitar nuestro sitio web <strong>etniaviajes.com.ar</strong> o cualquier sitio que enlace a esta política.</li>
      <li>Utilizar nuestra plataforma CRM en <strong>crmetniaviajes.online</strong> (herramienta interna de gestión de la agencia de viajes).</li>
      <li>Contactarnos a través de otros medios relacionados, incluyendo WhatsApp y redes sociales.</li>
    </ul>
    <p className="mb-8 text-foreground/80 leading-relaxed">
      ¿Preguntas o inquietudes? Contáctenos en{" "}
      <a href="mailto:ventas@etniaviajes.com" className="text-primary underline">ventas@etniaviajes.com</a>.
    </p>

    {/* TOC */}
    <div className="bg-muted/50 rounded-lg p-6 mb-10">
      <h2 className="font-bold mb-3">Tabla de contenidos</h2>
      <ol className="list-decimal list-inside space-y-1 text-sm text-primary">
        {[
          "¿Qué información recopilamos?",
          "¿Cómo procesamos su información?",
          "¿Cuándo y con quién compartimos su información personal?",
          "¿Usamos cookies y otras tecnologías de seguimiento?",
          "¿Cuánto tiempo conservamos su información?",
          "¿Cómo protegemos su información?",
          "¿Recopilamos información de menores?",
          "¿Cuáles son sus derechos de privacidad?",
          "Controles de Do-Not-Track",
          "¿Actualizamos esta política?",
          "¿Cómo puede contactarnos?",
          "¿Cómo puede revisar, actualizar o eliminar sus datos?",
        ].map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    </div>

    <SectionES id="info" title="1. ¿Qué información recopilamos?">
      <p className="font-semibold">Información que usted nos proporciona (solo aplica a usuarios del CRM)</p>
      <p>
        En el contexto de nuestra plataforma CRM (<em>crmetniaviajes.online</em>), recopilamos información que
        los usuarios registrados ingresan voluntariamente, que puede incluir:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Números de teléfono</li>
        <li>Direcciones de correo electrónico</li>
        <li>Direcciones postales</li>
        <li>Preferencias de contacto</li>
        <li>Datos financieros (cuando sea necesario para gestionar viajes)</li>
      </ul>
      <p className="font-semibold mt-4">Información recopilada automáticamente</p>
      <p>
        Al visitar nuestro sitio web, recopilamos automáticamente cierta información técnica que no revela
        su identidad específica, como dirección IP, tipo de navegador y dispositivo, sistema operativo,
        páginas visitadas y la fecha/hora de acceso. Esta información se utiliza para mantener la seguridad
        y el funcionamiento de nuestros servicios.
      </p>
      <p className="font-semibold mt-4">Datos de ubicación</p>
      <p>
        Podemos recopilar datos de ubicación aproximados (basados en su dirección IP) para mejorar la
        experiencia del usuario. Puede desactivar esta opción en la configuración de su dispositivo.
      </p>
      <p className="font-semibold mt-4">API de Google</p>
      <p>
        Nuestro uso de la información recibida de las APIs de Google cumple con la{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline">
          Política de Datos de Usuario de los Servicios API de Google
        </a>
        , incluidos los requisitos de Uso Limitado.
      </p>
    </SectionES>

    <SectionES id="proceso" title="2. ¿Cómo procesamos su información?">
      <p>Procesamos su información personal para los siguientes fines:</p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong>Brindar nuestros servicios:</strong> para gestionar y facilitar la entrega de los servicios de viaje solicitados.</li>
        <li><strong>Comunicaciones de marketing:</strong> para enviarle información sobre ofertas y promociones, siempre de acuerdo con sus preferencias. Puede darse de baja en cualquier momento.</li>
        <li><strong>Análisis de uso:</strong> para entender cómo se utilizan nuestros servicios y mejorarlos continuamente.</li>
        <li><strong>Seguridad y cumplimiento legal:</strong> para prevenir fraudes y cumplir con las leyes aplicables.</li>
      </ul>
    </SectionES>

    <SectionES id="compartir" title="3. ¿Cuándo y con quién compartimos su información personal?">
      <p>Podemos compartir su información personal en las siguientes situaciones:</p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>
          <strong>Transferencias comerciales:</strong> en caso de fusión, venta, financiamiento o adquisición total o parcial de nuestra empresa.
        </li>
        <li>
          <strong>APIs de Google Maps:</strong> cuando utilizamos servicios de Google Maps Platform para mostrar información de ubicación, podemos compartir ciertos datos con Google conforme a su política de privacidad.
        </li>
      </ul>
      <p>No vendemos su información personal a terceros.</p>
    </SectionES>

    <SectionES id="cookies" title="4. ¿Usamos cookies y otras tecnologías de seguimiento?">
      <p>
        Podemos utilizar cookies y tecnologías similares (como píxeles de rastreo) para recopilar información
        cuando interactúa con nuestros servicios. Algunas tecnologías de rastreo ayudan a mantener la seguridad
        del sitio, corregir errores y guardar preferencias básicas.
      </p>
      <p className="font-semibold mt-4">Google Analytics</p>
      <p>
        Podemos compartir información con Google Analytics para analizar el uso de nuestros servicios. Puede
        optar por no ser rastreado visitando{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary underline">
          https://tools.google.com/dlpage/gaoptout
        </a>.
      </p>
    </SectionES>

    <SectionES id="retencion" title="5. ¿Cuánto tiempo conservamos su información?">
      <p>
        Conservamos su información personal únicamente durante el tiempo necesario para los fines descritos
        en esta política, a menos que la ley exija o permita un período de retención más prolongado (por
        ejemplo, por obligaciones impositivas, contables u otras legales).
      </p>
      <p>
        Cuando ya no existe una necesidad legítima de procesar su información, la eliminamos o anonimizamos.
        Si esto no es posible (por ejemplo, porque está almacenada en copias de seguridad), la almacenamos
        de forma segura y la aislamos hasta que sea posible eliminarla.
      </p>
    </SectionES>

    <SectionES id="seguridad" title="6. ¿Cómo protegemos su información?">
      <p>
        Hemos implementado medidas de seguridad técnicas y organizativas razonables para proteger su
        información personal. Sin embargo, ninguna transmisión electrónica por Internet ni tecnología de
        almacenamiento puede garantizarse como 100% segura. Aunque haremos todo lo posible para proteger
        su información, la transmisión de datos a y desde nuestros servicios es bajo su propio riesgo.
        Le recomendamos acceder a los servicios solo desde entornos seguros.
      </p>
    </SectionES>

    <SectionES id="menores" title="7. ¿Recopilamos información de menores?">
      <p>
        No recopilamos, solicitamos datos ni comercializamos intencionalmente hacia personas menores de 18
        años. Al utilizar nuestros servicios, usted declara tener al menos 18 años o ser el padre, madre o
        tutor legal del menor y consentir su uso. Si tomamos conocimiento de que hemos recopilado información
        de un menor de 18 años, tomaremos medidas razonables para eliminar dichos datos. Para reportar este
        tipo de situación, contáctenos en{" "}
        <a href="mailto:ventas@etniaviajes.com" className="text-primary underline">ventas@etniaviajes.com</a>.
      </p>
    </SectionES>

    <SectionES id="derechos" title="8. ¿Cuáles son sus derechos de privacidad?">
      <p>
        Dependiendo de su ubicación geográfica, la ley de privacidad aplicable puede otorgarle ciertos
        derechos sobre su información personal, incluyendo:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong>Retirar su consentimiento</strong> en cualquier momento, contactándonos mediante los datos provistos a continuación.</li>
        <li><strong>Darse de baja de comunicaciones de marketing</strong> en cualquier momento, contactándonos directamente.</li>
        <li><strong>Gestionar cookies</strong> configurando su navegador para rechazarlas, aunque esto podría afectar ciertas funciones.</li>
      </ul>
      <p>
        Para consultas sobre sus derechos, escríbanos a{" "}
        <a href="mailto:ventas@etniaviajes.com" className="text-primary underline">ventas@etniaviajes.com</a>.
      </p>
    </SectionES>

    <SectionES id="dnt" title="9. Controles de Do-Not-Track">
      <p>
        La mayoría de los navegadores web incluyen una función "Do-Not-Track" (DNT). Actualmente no existe
        un estándar tecnológico uniforme para reconocer e implementar señales DNT, por lo que no respondemos
        a dichas señales. Si se adopta en el futuro un estándar que debamos cumplir, lo informaremos en una
        versión revisada de esta política.
      </p>
    </SectionES>

    <SectionES id="actualizaciones" title="10. ¿Actualizamos esta política?">
      <p>
        Podemos actualizar esta Política de Privacidad periódicamente. La versión actualizada se indicará con
        una fecha de "Última actualización" al inicio del documento. Si realizamos cambios significativos,
        se lo notificaremos publicando un aviso destacado o enviándole una notificación directa.
        Le recomendamos revisar esta política con frecuencia.
      </p>
    </SectionES>

    <SectionES id="contacto" title="11. ¿Cómo puede contactarnos?">
      <p>Si tiene preguntas o comentarios sobre esta política, puede contactarnos:</p>
      <div className="bg-muted/50 rounded-lg p-4 mt-2 space-y-1 text-sm">
        <p><strong>Etnia Sh Viajes S.A.S</strong></p>
        <p>Córdoba, Córdoba 5000</p>
        <p>Argentina</p>
        <p>
          Email:{" "}
          <a href="mailto:ventas@etniaviajes.com" className="text-primary underline">
            ventas@etniaviajes.com
          </a>
        </p>
      </div>
    </SectionES>

    <SectionES id="eliminar" title="12. ¿Cómo puede revisar, actualizar o eliminar sus datos?">
      <p>
        De acuerdo con las leyes aplicables de su país, puede tener derecho a solicitar acceso a la
        información personal que recopilamos sobre usted, conocer cómo la hemos procesado, corregir
        inexactitudes o solicitar su eliminación. También puede tener derecho a retirar su consentimiento
        para el procesamiento de su información. Estos derechos pueden estar limitados en ciertas
        circunstancias por la ley aplicable. Para ejercer estos derechos, contáctenos en{" "}
        <a href="mailto:ventas@etniaviajes.com" className="text-primary underline">ventas@etniaviajes.com</a>.
      </p>
    </SectionES>
  </div>
);

const PolicyEN = () => (
  <div>
    <p className="text-sm text-foreground/60 mb-8">Last updated: {lastUpdatedEN}</p>

    <p className="mb-6 text-foreground/80 leading-relaxed">
      This Privacy Policy for <strong>Etnia Sh Viajes S.A.S</strong> ("we," "us," or "our") describes how
      we access, collect, store, use, and/or share ("process") your personal information when you use our
      services ("Services"), including when you:
    </p>
    <ul className="list-disc list-inside mb-6 space-y-1 text-foreground/80">
      <li>Visit our website <strong>etniaviajes.com.ar</strong> or any website that links to this policy.</li>
      <li>Use our CRM platform at <strong>crmetniaviajes.online</strong> (an internal management tool for our travel agency).</li>
      <li>Engage with us through other related means, including WhatsApp and social media.</li>
    </ul>
    <p className="mb-8 text-foreground/80 leading-relaxed">
      Questions or concerns? Contact us at{" "}
      <a href="mailto:ventas@etniaviajes.com" className="text-primary underline">ventas@etniaviajes.com</a>.
    </p>

    {/* TOC */}
    <div className="bg-muted/50 rounded-lg p-6 mb-10">
      <h2 className="font-bold mb-3">Table of Contents</h2>
      <ol className="list-decimal list-inside space-y-1 text-sm text-primary">
        {[
          "What information do we collect?",
          "How do we process your information?",
          "When and with whom do we share your personal information?",
          "Do we use cookies and other tracking technologies?",
          "How long do we keep your information?",
          "How do we keep your information safe?",
          "Do we collect information from minors?",
          "What are your privacy rights?",
          "Controls for Do-Not-Track features",
          "Do we make updates to this notice?",
          "How can you contact us?",
          "How can you review, update, or delete your data?",
        ].map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    </div>

    <SectionEN id="info-en" title="1. What information do we collect?">
      <p className="font-semibold">Information you provide to us (applies to CRM users only)</p>
      <p>
        In the context of our CRM platform (<em>crmetniaviajes.online</em>), we collect information that
        registered users voluntarily enter, which may include:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>Phone numbers</li>
        <li>Email addresses</li>
        <li>Mailing addresses</li>
        <li>Contact preferences</li>
        <li>Financial data (when necessary to manage travel bookings)</li>
      </ul>
      <p className="font-semibold mt-4">Information collected automatically</p>
      <p>
        When you visit our website, we automatically collect certain technical information that does not
        reveal your specific identity, such as IP address, browser and device type, operating system,
        pages visited, and access date/time. This information is used to maintain the security and
        operation of our services.
      </p>
      <p className="font-semibold mt-4">Location data</p>
      <p>
        We may collect approximate location data (based on your IP address) to improve the user
        experience. You can disable this in your device settings.
      </p>
      <p className="font-semibold mt-4">Google API</p>
      <p>
        Our use of information received from Google APIs will adhere to the{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline">
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>
    </SectionEN>

    <SectionEN id="process-en" title="2. How do we process your information?">
      <p>We process your personal information for the following purposes:</p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong>Providing our services:</strong> to manage and facilitate the delivery of requested travel services.</li>
        <li><strong>Marketing communications:</strong> to send you offers and promotions, always in accordance with your preferences. You may opt out at any time.</li>
        <li><strong>Usage analysis:</strong> to understand how our services are used and continuously improve them.</li>
        <li><strong>Security and legal compliance:</strong> to prevent fraud and comply with applicable laws.</li>
      </ul>
    </SectionEN>

    <SectionEN id="share-en" title="3. When and with whom do we share your personal information?">
      <p>We may share your personal information in the following situations:</p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>
          <strong>Business transfers:</strong> in connection with a merger, sale, financing, or full or partial acquisition of our business.
        </li>
        <li>
          <strong>Google Maps Platform APIs:</strong> when using Google Maps Platform services to display location information, we may share certain data with Google in accordance with their privacy policy.
        </li>
      </ul>
      <p>We do not sell your personal information to third parties.</p>
    </SectionEN>

    <SectionEN id="cookies-en" title="4. Do we use cookies and other tracking technologies?">
      <p>
        We may use cookies and similar technologies (such as tracking pixels) to collect information when
        you interact with our services. Some tracking technologies help maintain site security, fix bugs,
        and save basic preferences.
      </p>
      <p className="font-semibold mt-4">Google Analytics</p>
      <p>
        We may share information with Google Analytics to track and analyze use of our services. You can
        opt out of being tracked by visiting{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary underline">
          https://tools.google.com/dlpage/gaoptout
        </a>.
      </p>
    </SectionEN>

    <SectionEN id="retention-en" title="5. How long do we keep your information?">
      <p>
        We retain your personal information only for as long as necessary for the purposes described in
        this policy, unless a longer retention period is required or permitted by law (e.g., for tax,
        accounting, or other legal requirements).
      </p>
      <p>
        When we no longer have a legitimate business need to process your information, we will delete or
        anonymize it. If this is not possible (for example, because it has been stored in backup archives),
        we will securely store it and isolate it from further processing until deletion is possible.
      </p>
    </SectionEN>

    <SectionEN id="safety-en" title="6. How do we keep your information safe?">
      <p>
        We have implemented reasonable technical and organizational security measures to protect your
        personal information. However, no electronic transmission over the Internet or information storage
        technology can be guaranteed to be 100% secure. While we will do our best to protect your personal
        information, transmission of data to and from our services is at your own risk. We recommend
        accessing our services only from secure environments.
      </p>
    </SectionEN>

    <SectionEN id="minors-en" title="7. Do we collect information from minors?">
      <p>
        We do not knowingly collect, solicit data from, or market to children under 18 years of age. By
        using our services, you represent that you are at least 18, or that you are the parent or legal
        guardian of a minor and consent to their use of the services. If we learn that we have collected
        information from a child under 18, we will take reasonable steps to delete such data. To report
        this type of situation, contact us at{" "}
        <a href="mailto:ventas@etniaviajes.com" className="text-primary underline">ventas@etniaviajes.com</a>.
      </p>
    </SectionEN>

    <SectionEN id="rights-en" title="8. What are your privacy rights?">
      <p>
        Depending on your geographical location, applicable privacy law may grant you certain rights
        regarding your personal information, including:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li><strong>Withdrawing your consent</strong> at any time by contacting us using the details below.</li>
        <li><strong>Opting out of marketing communications</strong> at any time by contacting us directly.</li>
        <li><strong>Managing cookies</strong> by configuring your browser to reject them, although this may affect certain features.</li>
      </ul>
      <p>
        For inquiries about your rights, write to us at{" "}
        <a href="mailto:ventas@etniaviajes.com" className="text-primary underline">ventas@etniaviajes.com</a>.
      </p>
    </SectionEN>

    <SectionEN id="dnt-en" title="9. Controls for Do-Not-Track features">
      <p>
        Most web browsers include a Do-Not-Track (DNT) feature. Currently, no uniform technology standard
        for recognizing and implementing DNT signals has been finalized. As such, we do not currently
        respond to DNT signals. If a standard is adopted in the future that we must follow, we will inform
        you in a revised version of this policy.
      </p>
    </SectionEN>

    <SectionEN id="updates-en" title="10. Do we make updates to this notice?">
      <p>
        We may update this Privacy Policy from time to time. The updated version will be indicated by an
        updated "Last updated" date at the top of this document. If we make material changes, we will
        notify you by posting a prominent notice or sending a direct notification. We encourage you to
        review this policy frequently.
      </p>
    </SectionEN>

    <SectionEN id="contact-en" title="11. How can you contact us?">
      <p>If you have questions or comments about this policy, you may contact us:</p>
      <div className="bg-muted/50 rounded-lg p-4 mt-2 space-y-1 text-sm">
        <p><strong>Etnia Sh Viajes S.A.S</strong></p>
        <p>Córdoba, Córdoba 5000</p>
        <p>Argentina</p>
        <p>
          Email:{" "}
          <a href="mailto:ventas@etniaviajes.com" className="text-primary underline">
            ventas@etniaviajes.com
          </a>
        </p>
      </div>
    </SectionEN>

    <SectionEN id="delete-en" title="12. How can you review, update, or delete your data?">
      <p>
        Based on the applicable laws of your country, you may have the right to request access to the
        personal information we collect about you, details about how we have processed it, correct
        inaccuracies, or request its deletion. You may also have the right to withdraw your consent to
        our processing of your personal information. These rights may be limited by applicable law. To
        exercise these rights, contact us at{" "}
        <a href="mailto:ventas@etniaviajes.com" className="text-primary underline">ventas@etniaviajes.com</a>.
      </p>
    </SectionEN>
  </div>
);

const PoliticaPrivacidad = () => {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
            Política de Privacidad
          </h1>
          <p className="text-primary-foreground/80 text-lg">Privacy Policy</p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12 max-w-4xl">
        <Tabs defaultValue="es">
          <TabsList className="mb-8">
            <TabsTrigger value="es">Español</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>
          <TabsContent value="es">
            <PolicyES />
          </TabsContent>
          <TabsContent value="en">
            <PolicyEN />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PoliticaPrivacidad;
