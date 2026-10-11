/* Archivo: js/main.js | Acción: REEMPLAZAR */
/* Funcionalidad interactiva: Menú móvil, catálogo de flota del brochure y apertura simultánea de 2 pestañas (WhatsApp y Correo)[cite: 32, 33, 34, 35] */

document.addEventListener('DOMContentLoaded', () => {
    const CONTACT_CONFIG = {
        email: 'Pulmarconstruccionesca@gmail.com',
        whatsappNumber: '584120936783',
        displayPhone: '0412-0936783',
        formSubmitAjaxUrl: 'https://formsubmit.co/ajax/Pulmarconstruccionesca@gmail.com',
        formSubmitTabUrl: 'https://formsubmit.co/Pulmarconstruccionesca@gmail.com'
    };

    // 1. Año dinámico en el footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Control de Header en Scroll y Menú Móvil
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Catálogo Interactivo de Unidades Verificadas en el Brochure[cite: 32, 33, 34, 35]
    const FLEET_DATA = {
        encava: {
            title: 'SERVICIO DE 32 PUESTOS (UNIDADES ENCAVA)',
            desc: 'Rutas empresariales diarias y transporte para eventos corporativos en unidades Encava de 32 puestos, garantizando la puntualidad de sus colaboradores.',
            unitValue: 'Unidades Encava de 32 Puestos',
            serviceValue: 'Traslado de Personal Corporativo e Institucional'
        },
        pickup: {
            title: 'UNIDADES PICK-UP DOBLE CABINA',
            desc: 'Alquiler de camionetas Pick-Up Doble Cabina para supervisión de obras, operaciones en terrenos de difícil acceso, movimiento de carga ligera y traslados ejecutivos.',
            unitValue: 'Unidades Pick-Up Doble Cabina',
            serviceValue: 'Logística y Transporte para Sectores Industriales'
        },
        sportwagon: {
            title: 'UNIDADES SPORT WAGON (SUV)',
            desc: 'Servicio de alquiler de unidades Sport Wagon para ejecutivos, directivos, invitados especiales, traslados de protocolo al aeropuerto y supervisión de proyectos.',
            unitValue: 'Unidades Sport Wagon',
            serviceValue: 'Traslados Ejecutivos y Protocolo VIP'
        }
    };

    const stripTabs = document.querySelectorAll('.strip-tab');
    const specTitle = document.getElementById('spec-title');
    const specDesc = document.getElementById('spec-desc');
    const specCta = document.getElementById('spec-cta');

    stripTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const key = tab.getAttribute('data-Spec');
            const info = FLEET_DATA[key];
            if (!info) return;

            stripTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            if (specTitle) specTitle.textContent = info.title;
            if (specDesc) specDesc.textContent = info.desc;
            if (specCta) {
                specCta.setAttribute('data-unit', info.unitValue);
                specCta.setAttribute('data-service', info.serviceValue);
            }
        });
    });

    // Compatibilidad adicional por si existen pestañas .fleet-tab en el DOM
    const fleetTabs = document.querySelectorAll('.fleet-tab');
    const fleetCards = document.querySelectorAll('.fleet-unit-card, .fleet-card');

    fleetTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');

            fleetTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            fleetCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Autoselección inteligente en el formulario al pulsar cualquier servicio o unidad
    const serviceSelect = document.getElementById('service-type');
    const vehicleSelect = document.getElementById('vehicle-type');
    const prefillLinks = document.querySelectorAll('[data-service], [data-unit]');

    prefillLinks.forEach(item => {
        item.addEventListener('click', () => {
            const targetService = item.getAttribute('data-service');
            const targetUnit = item.getAttribute('data-unit');

            if (targetService && serviceSelect) {
                serviceSelect.value = targetService;
            }
            if (targetUnit && vehicleSelect) {
                vehicleSelect.value = targetUnit;
            }
        });
    });

    // 5. Envío del Formulario Abriendo 2 Pestañas (Pestaña 1: WhatsApp / Pestaña 2: Correo)
    const quoteForm = document.getElementById('quote-builder-form');
    const errorMsg = document.getElementById('form-error-msg');
    const outputPanel = document.getElementById('quote-output-panel');
    const summaryPre = document.getElementById('quote-summary-text');
    const copyBtn = document.getElementById('btn-copy-quote');
    const printBtn = document.getElementById('btn-print-quote');
    const copyFeedback = document.getElementById('copy-feedback');
    const directWaLink = document.getElementById('direct-wa-link');
    const directGmailLink = document.getElementById('direct-gmail-link');
    const hiddenSubject = document.getElementById('hidden-email-subject');

    // Sincronizar el action del formulario y los enlaces visibles de correo en la página hacia Pulmarconstruccionesca@gmail.com
    if (quoteForm) {
        quoteForm.action = CONTACT_CONFIG.formSubmitTabUrl;
    }
    document.querySelectorAll('a[href^="mailto:"]').forEach(mailAnchor => {
        if (mailAnchor.id !== 'direct-gmail-link') {
            mailAnchor.href = `mailto:${CONTACT_CONFIG.email}`;
            const textNode = mailAnchor.querySelector('.contact-direct-text, .channel-value');
            if (textNode) {
                textNode.textContent = CONTACT_CONFIG.email;
            }
        }
    });

    // Función auxiliar que crea y envía un formulario POST en una nueva pestaña hacia el correo
    const submitEmailInNewTab = (fieldsObj) => {
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = CONTACT_CONFIG.formSubmitTabUrl;
        tempForm.target = '_blank';
        tempForm.style.display = 'none';

        Object.entries(fieldsObj).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            tempForm.appendChild(input);
        });

        document.body.appendChild(tempForm);
        tempForm.submit();
        setTimeout(() => {
            if (document.body.contains(tempForm)) {
                document.body.removeChild(tempForm);
            }
        }, 1000);
    };

    if (quoteForm) {
        quoteForm.addEventListener('submit', async (event) => {
            // Detenemos el submit por defecto para garantizar la validación y abrir las 2 pestañas de forma controlada
            event.preventDefault();

            const companyName = document.getElementById('company-name').value.trim();
            const contactPerson = document.getElementById('contact-person').value.trim();
            const serviceType = document.getElementById('service-type').value;
            const vehicleType = document.getElementById('vehicle-type').value;
            const modalityType = document.getElementById('modality-type').value;
            const unitsCount = document.getElementById('units-count').value || '1';
            const operationDetails = document.getElementById('operation-details').value.trim();

            if (!companyName || !contactPerson || !operationDetails) {
                if (errorMsg) errorMsg.hidden = false;
                return;
            }

            if (errorMsg) errorMsg.hidden = true;

            const currentDate = new Date().toLocaleDateString('es-VE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const emailSubject = `Solicitud de Cotización Corporativa - ${companyName} | Pulmar Construcciones, C.A.`;
            if (hiddenSubject) {
                hiddenSubject.value = emailSubject;
            }

            const summaryDocument = [
                'SOLICITUD DE COTIZACIÓN CORPORATIVA',
                'PARA: PULMAR CONSTRUCCIONES, C.A. (RIF: J-40651947-2)',
                `FECHA: ${currentDate}`,
                '------------------------------------------------------------',
                `• Empresa / Institución: ${companyName}`,
                `• Persona de Contacto: ${contactPerson}`,
                `• Servicio Solicitado: ${serviceType}`,
                `• Unidad de la Flota: ${vehicleType}`,
                `• Aplicación Operativa: ${modalityType}`,
                `• Cantidad de Unidades: ${unitsCount}`,
                '------------------------------------------------------------',
                'RUTA, DESTINO Y ESPECIFICACIONES:',
                operationDetails,
                '------------------------------------------------------------',
                `Atención Comercial: ${CONTACT_CONFIG.displayPhone} | ${CONTACT_CONFIG.email}`
            ].join('\n');

            const whatsappMessage = [
                '*SOLICITUD DE COTIZACIÓN - PULMAR CONSTRUCCIONES, C.A.*',
                `Fecha: ${currentDate}`,
                '',
                '*1. Datos del Cliente:*',
                `• Empresa: ${companyName}`,
                `• Contacto: ${contactPerson}`,
                '',
                '*2. Servicio y Flota:*',
                `• Servicio: ${serviceType}`,
                `• Unidad: ${vehicleType}`,
                `• Modalidad: ${modalityType}`,
                `• Cantidad: ${unitsCount} unidad(es)`,
                '',
                '*3. Ruta y Especificaciones:*',
                operationDetails
            ].join('\n');

            const whatsappUrl = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_CONFIG.email)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(summaryDocument)}`;

            if (directWaLink) directWaLink.href = whatsappUrl;
            if (directGmailLink) directGmailLink.href = gmailWebUrl;

            if (summaryPre) summaryPre.textContent = summaryDocument;
            if (outputPanel) {
                outputPanel.hidden = false;
                outputPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            if (copyFeedback) {
                copyFeedback.hidden = false;
                copyFeedback.textContent = `Se han abierto las 2 pestañas: WhatsApp (${CONTACT_CONFIG.displayPhone}) y envío de correo a ${CONTACT_CONFIG.email}.`;
            }

            const emailPayload = {
                _subject: emailSubject,
                _template: 'table',
                _captcha: 'false',
                Empresa_o_Institucion: companyName,
                Persona_de_Contacto: contactPerson,
                Servicio_Solicitado: serviceType,
                Unidad_de_la_Flota: vehicleType,
                Aplicacion_Operativa: modalityType,
                Cantidad_de_Unidades: unitsCount,
                Ruta_y_Especificaciones: operationDetails,
                Fecha_de_Solicitud: currentDate
            };

            // PESTAÑA 1: Apertura de WhatsApp con el mensaje estructurado
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

            // PESTAÑA 2: Envío POST en pestaña nueva hacia FormSubmit (Pulmarconstruccionesca@gmail.com)
            submitEmailInNewTab(emailPayload);

            // Envío adicional silencioso vía AJAX si se ejecuta desde un servidor web (http/https)
            if (window.location.protocol.startsWith('http')) {
                try {
                    await fetch(CONTACT_CONFIG.formSubmitAjaxUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(emailPayload)
                    });
                } catch (_) {
                    // La pestaña principal POST ya procesa el envío
                }
            }
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const textToCopy = summaryPre ? summaryPre.textContent : '';
            if (!textToCopy) return;

            try {
                await navigator.clipboard.writeText(textToCopy);
                if (copyFeedback) {
                    copyFeedback.textContent = '¡Resumen copiado exitosamente al portapapeles!';
                    copyFeedback.hidden = false;
                }
            } catch (err) {
                const tempArea = document.createElement('textarea');
                tempArea.value = textToCopy;
                document.body.appendChild(tempArea);
                tempArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempArea);
                if (copyFeedback) {
                    copyFeedback.textContent = '¡Resumen copiado exitosamente al portapapeles!';
                    copyFeedback.hidden = false;
                }
            }
        });
    }

    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
});