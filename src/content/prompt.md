Actúa como un ingeniero de software senior especializado en aplicaciones web móviles. Quiero que construyas una aplicación funcional llamada “Progresión”, para mi uso personal en el gimnasio. Soy principiante programando, así que debes crear el código real, probarlo y guiarme paso a paso cuando necesite realizar tareas manuales.

OBJETIVO
Crear una aplicación web móvil instalable como PWA en mi iPhone para registrar mi rutina personalizada, pesos, repeticiones, descansos e historial de sobrecarga progresiva. También debe funcionar en mi computadora.

TECNOLOGÍA
- React, TypeScript y Vite.
- Diseño mobile-first y PWA instalable.
- Supabase para autenticación y base de datos PostgreSQL.
- GitHub para versionado y Vercel para despliegue.
- No integrar la API de Claude ni ningún servicio de IA de pago. Ya tengo mi rutina y solo me falta registrarla y analizar su evolución.

FUNCIONALIDADES

1. RUTINA PERSONALIZADA
- Permitir crear y editar los días de entrenamiento.
- Cada ejercicio debe tener nombre, orden, series de trabajo, rango objetivo de repeticiones, descanso objetivo en segundos, notas, incrementos de carga y regla de progresión cuando se conozcan.
- Permitir importar una rutina mediante un archivo JSON validado, exportar la rutina y también editarla manualmente.
- No inventar ejercicios, series, repeticiones ni tiempos de descanso que no aparezcan en la rutina original.
- Si falta un dato, permitir configurarlo o dejarlo sin especificar.

2. SESIÓN DE ENTRENAMIENTO
- Interfaz rápida, legible y cómoda para manejar con una sola mano.
- Mostrar el ejercicio actual, las series completadas, el objetivo y el rendimiento de la última sesión.
- Permitir registrar el peso usado y las repeticiones de cada serie.
- Permitir registrar RIR opcional (repeticiones en reserva), comentarios y series de calentamiento separadas de las series efectivas.
- Botón grande “Terminé la serie”. Al pulsarlo, guardar inmediatamente la serie e iniciar automáticamente el cronómetro con el descanso prescrito para ese ejercicio, cuando corresponda.
- Mostrar cuenta regresiva, tiempo objetivo, tiempo restante y botones para añadir 15 segundos, saltar el descanso o detenerlo.
- Al terminar, proporcionar aviso visual y un sonido breve si el navegador lo permite. Utilizar vibración únicamente si el dispositivo la admite.
- Calcular el tiempo restante a partir de una marca de tiempo final para que el cronómetro no se desajuste si el navegador suspende la página.
- Permitir pausar y reanudar la sesión, regresar a ejercicios anteriores y guardar el entrenamiento sin perder registros.
- Registrar la fecha y hora de cada sesión y de sus series.

3. SOBRECARGA PROGRESIVA
- Al abrir un ejercicio, mostrar el peso y las repeticiones de la sesión anterior.
- Permitir consultar las sesiones previas sin abandonar el entrenamiento.
- Mostrar si estoy progresando en carga, repeticiones o rendimiento.
- Respetar primero las instrucciones de progresión de mi rutina.
- Si no existe una regla específica, ofrecer como sugerencia configurable la doble progresión: mantener la carga hasta completar el extremo superior del rango de repeticiones en todas las series efectivas y entonces sugerir un incremento de peso razonable según el incremento configurado.
- No cambiar automáticamente la rutina ni la carga programada: mostrar la recomendación y permitir que yo la acepte o rechace.
- No afirmar que una sesión fue mejor solo por utilizar más peso si hice menos repeticiones o cambiaron las condiciones de ejecución.

4. HISTORIAL Y ESTADÍSTICAS
- Historial de entrenamientos por fecha, día de rutina y ejercicio.
- Gráficas de evolución de carga y repeticiones.
- Récords personales por ejercicio.
- Evolución del volumen de entrenamiento, calculado como suma de peso por repeticiones de las series efectivas, dejando claras las limitaciones de esta métrica.
- Comparación de la última sesión con la anterior.
- Resumen semanal de sesiones y ejercicios realizados.
- No confundir el peso total levantado en movimientos con mancuernas o ejercicios unilaterales: especificar claramente qué representa cada métrica.

5. GUARDADO Y SEGURIDAD
- Usar Supabase para persistir los datos entre sesiones y dispositivos.
- Autenticación para mi cuenta personal.
- Habilitar Row Level Security (RLS) y crear políticas que permitan a cada usuario acceder únicamente a sus propios datos. No dejar las tablas públicas.
- Nunca exponer una clave secreta de servidor o service_role en el frontend.
- Añadir un respaldo mediante exportación e importación de JSON y exportación del historial a CSV.
- Guardar localmente los cambios de la sesión para que un corte temporal de internet no haga perder una serie; sincronizar los cambios pendientes cuando vuelva la conexión y evitar duplicados.
- Proporcionar estados visibles de guardado, sincronización y errores.

6. DISEÑO Y USABILIDAD
- Estética deportiva minimalista, profesional y oscura, con alto contraste.
- Diseñada primero para una pantalla de iPhone.
- Botones grandes, inputs numéricos sencillos y navegación inferior entre Entrenar, Rutinas e Historial.
- Evitar pantallas innecesarias, animaciones pesadas y formularios extensos durante el entrenamiento.
- Mostrar siempre las unidades de carga y permitir configurar kilogramos como unidad predeterminada.
- Incluir manifiesto PWA e iconos para instalar la aplicación en la pantalla de inicio.

7. CALIDAD Y ENTREGA
- Inspecciona primero los archivos y el estado del proyecto. Conserva lo que ya funcione y no sobrescribas archivos importantes sin revisarlos.
- Organiza el trabajo en fases: estructura y diseño; rutina; sesión y cronómetro; historial; persistencia y seguridad; PWA; pruebas y despliegue.
- Crea el código real, ejecuta las pruebas disponibles y corrige los errores de compilación.
- Verifica que registrar una serie, actualizar una rutina, terminar un entrenamiento y recargar la página no provoquen pérdida ni duplicación de datos.
- Comprueba las políticas de acceso de la base de datos y el funcionamiento del cronómetro.
- Crea un README en español con las instrucciones de instalación, ejecución, configuración y despliegue.
- Crea un archivo .env.example, configura .gitignore y nunca subas secretos al repositorio.
- Si un paso requiere que yo cree una cuenta, copie una clave o realice una acción en una página web, detente únicamente en ese paso y dime exactamente dónde entrar, qué botón pulsar y qué dato copiar. Nunca inventes credenciales.
- No afirmes que una funcionalidad está terminada o probada si no lo has verificado.

Empieza inspeccionando el proyecto y detectando qué hay disponible. Después construye la aplicación por fases, priorizando primero una versión que pueda utilizar en el gimnasio y cuyos datos se guarden de manera fiable. Guíame de forma concreta, sin dar por hecho que conozco Git, terminales, bases de datos o despliegues.
