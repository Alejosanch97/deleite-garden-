/* ═══════════════════════════════════════════════════════════
   DELEITE GARDEN · Carta digital
   Precios en miles de pesos (32 = $32.000)
   tags: "mar" · "veggie" · "firma" · "picante" · "compartir" · "autor"
   img: foto del plato (opcional) · cover: foto de la sección
   👉 Para cambiar una foto por una de Cloudinary, reemplaza el import
      por la URL: img: "https://res.cloudinary.com/..."
   ═══════════════════════════════════════════════════════════ */
import picada from "../assets/img/picada.jpg";
import tacos from "../assets/img/tacos.jpg";
import carbonara from "../assets/img/carbonara.jpg";
import bolonesa from "../assets/img/bolonesa.jpg";
import salon from "../assets/img/salon.jpg";
import mesaTacos from "../assets/img/mesa-tacos.jpg";
import muleMesa from "../assets/img/mule-mesa.jpg";
import bites from "../assets/img/bites.jpg";
import coctelRosa from "../assets/img/coctel-rosa.jpg";
import crispy from "../assets/img/crispy.jpg";
import carne from "../assets/img/carne.jpg";
import patacon from "../assets/img/patacon.jpg";
import camarones from "../assets/img/camarones.jpg";
import mule from "../assets/img/mule.jpg";
import gin from "../assets/img/gin.jpg";
import langostinos from "../assets/img/langostinos.jpg";
import pastaMule from "../assets/img/pasta-mule.jpg";

export const PHOTOS = { picada, tacos, carbonara, bolonesa, salon, mesaTacos, muleMesa, bites, coctelRosa, crispy, carne, patacon, camarones, mule, gin, langostinos, pastaMule };

export const TAGS = {
	firma: { label: "Firma de la casa", icon: "✦" },
	mar: { label: "Del mar", icon: "🐚" },
	veggie: { label: "Vegetariano", icon: "🌱" },
	picante: { label: "Picante", icon: "🌶" },
	compartir: { label: "Para compartir", icon: "🤍" },
	autor: { label: "Coctel de autor", icon: "🍸" },
};

export const WELCOME = [
	"Un rincón donde el amor, la dedicación y la entrega se funden en la cocina, creando platos que son pura poesía para los sentidos.",
	"Ir a un restaurante es como asistir a un concierto: cada plato es una nota, cada menú una sinfonía.",
];

export const MENU = [
	{
		id: "entradas",
		title: "Entradas",
		subtitle: "Para abrir el apetito",
		emoji: "🌿",
		cover: picada,
		tone: "sage",
		items: [
			{ id: "langostinos-dg", name: "Langostinos Deleite Garden", price: 32, tags: ["firma", "mar"], img: langostinos, desc: "Langostinos perfectamente cocidos con chips de plátano crujientes y salsa tártara casera: lo marino y lo terrestre en cada bocado." },
			{ id: "chicharrones-romero", name: "Chicharrones al Romero", price: 36, tags: ["compartir"], desc: "Sorpréndete con una explosión de sabores." },
			{ id: "patacon-bosque", name: "Patacón del Bosque", price: 30, tags: ["firma", "compartir"], img: patacon, desc: "Base crujiente de patacón con ropa vieja deshilachada, salsa napolitana vibrante y queso de temporada." },
			{ id: "tacos-primavera", name: "Tacos Primavera", price: 32, tags: ["compartir"], img: tacos, desc: "Tortilla de maíz, tiras de cerdo jugosas y piña glaseada, rematados con pico de gallo y crema de aguacate sedosa." },
			{ id: "explosion-camarones", name: "Explosión de Camarones", price: 38, tags: ["mar"], img: camarones, desc: "Déjate sorprender con nuestra versión de un clásico caribeño." },
			{ id: "crispy-chicken", name: "Crispy Chicken", price: 25, tags: ["compartir"], img: crispy, desc: "Lomitos de pollo en empanado dorado y crujiente, con salsa agridulce que equilibra el crujido y la suavidad." },
			{ id: "esparragos", name: "Espárragos Gratinados", price: 28, tags: ["veggie"], desc: "Espárragos a la parrilla bañados en una rica salsa de tres quesos, cremosa y ligeramente ahumada." },
			{ id: "mini-empanadita", name: "Mini Empanadita de Carne Desmechada", price: 24, tags: ["compartir"], desc: "Déjate sorprender con nuestra versión de un clásico caribeño." },
			{ id: "crema-jardin", name: "Crema del Jardín", price: 17, tags: ["veggie"], desc: "Crema de verduras de temporada: un abrazo en cada cucharada, perfecta para iniciar o acompañar." },
		],
	},
	{
		id: "pastas",
		title: "Pastas",
		subtitle: "Fuertes",
		emoji: "🍝",
		cover: pastaMule,
		tone: "blush",
		note: "Todas nuestras pastas están acompañadas con tajadas de pan de ajo.",
		items: [
			{ id: "pasta-carbonara", name: "Pasta Carbonara", price: 42, img: carbonara, desc: "Clásico italiano: salsa blanca cremosa, cebolla brunoise y la riqueza de la tocineta ahumada." },
			{ id: "pasta-camaron", name: "Pasta Camarón", price: 60, tags: ["mar"], desc: "Camarones salteados al vino y vegetales frescos en una delicada salsa blanca. Mar y tierra en equilibrio." },
			{ id: "pasta-vegetariana", name: "Pasta Vegetariana", price: 42, tags: ["veggie"], desc: "Zucchini, pimentón, brócoli, champiñón y raíces chinas en una salsa de soya que abraza cada ingrediente." },
			{ id: "pasta-bolonesa", name: "Pasta Boloñesa", price: 42, img: bolonesa, desc: "Salsa boloñesa rica y condimentada, cocinada lentamente para desarrollar profundidad de sabor." },
			{ id: "pasta-pollo-champinon", name: "Pasta Pollo Champiñón", price: 42, desc: "Tierno pollo y champiñones en una salsa cremosa. Reconfortante y delicioso." },
			{ id: "pasta-filetto", name: "Pasta Filetto", price: 58, desc: "Trozos de lomo fino, salsa napolitana, pesto y tomates confitados. Pura indulgencia." },
			{ id: "pasta-deleite", name: "Pasta Deleite Garden", price: 65, tags: ["firma", "mar"], desc: "El plato estrella del menú: una celebración de los frutos del mar para una experiencia excepcional." },
		],
	},
	{
		id: "pescados",
		title: "Pescados",
		subtitle: "Fuertes",
		emoji: "🐟",
		cover: salon,
		tone: "sage",
		note: "Todos nuestros pescados se sirven con vegetales salteados o puré de papa.",
		items: [
			{ id: "salmon-maracuya", name: "Salmón en Salsa de Maracuyá", price: 70, tags: ["mar", "firma"], desc: "Filete de salmón tierno y jugoso en una innovadora salsa de maracuyá, entre lo dulce y lo ácido. Con vegetales salteados y puré de papa." },
			{ id: "trucha", name: "Trucha", price: 60, tags: ["mar"], desc: "Trucha rellena de jamón serrano, manzana verde y tomates confitados, bañada en nuestra salsa alfredo." },
			{ id: "cazuela-mariscos", name: "Cazuela de Mariscos", price: 70, tags: ["mar"], desc: "Preparación tradicional del Caribe colombiano con arroz de coco y patacones." },
			{ id: "pargo-rojo", name: "Pargo Rojo", price: 90, tags: ["mar", "compartir"], desc: "Desde los mares del Caribe: pargo rojo frito con arroz de coco, patacones de popocho y ensalada caribeña." },
			{ id: "adicion-camarones", name: "Adición de Camarones en Salsa Alfredo", price: 20, tags: ["mar"], desc: "Súmale camarones en salsa alfredo a tu plato favorito." },
		],
	},
	{
		id: "carnes-blancas",
		title: "Carnes Blancas",
		subtitle: "Fuertes",
		emoji: "🍗",
		cover: muleMesa,
		tone: "cream",
		note: "Todas nuestras carnes blancas están acompañadas de elotes a la mexicana y ensalada fresca.",
		items: [
			{ id: "pollo-napolitano", name: "Pollo Napolitano", price: 55, desc: "Pechuga a la parrilla en salsa napolitana, mozzarella fundida y tomates confitados." },
			{ id: "pollo-monterrey", name: "Pollo Monterrey", price: 55, desc: "Pechuga jugosa por dentro y crujiente por fuera, en salsa blanca cremosa con jamón premium y mozzarella." },
			{ id: "pechuga-grille", name: "Pechuga Grillé", price: 50, desc: "Churrasco de pollo asado a la parrilla hasta su punto perfecto de doratura." },
			{ id: "pollo-finas-hierbas", name: "Pollo a las Finas Hierbas", price: 54, desc: "Churrasco de pollo adobado en nuestra exquisita mezcla de finas hierbas." },
			{ id: "pollo-naranja", name: "Pollo a la Naranja", price: 54, desc: "Churrasco de pollo en salsa aromática de naranja, entre dulzura y acidez." },
			{ id: "pollo-miel-picante", name: "Pollo Miel Picante", price: 54, tags: ["picante"], desc: "Churrasco de pollo a la parrilla bañado en nuestra salsa miel picante." },
		],
	},
	{
		id: "cerdo",
		title: "Carnes de Cerdo",
		subtitle: "Fuertes",
		emoji: "🍖",
		cover: bites,
		tone: "blush",
		note: "Todas nuestras carnes de cerdo están acompañadas con verduras salteadas y puré de papa.",
		items: [
			{ id: "costillas", name: "Costillas", price: 60, tags: ["firma"], desc: "Costillas de cerdo horneadas lentamente y bañadas en nuestra exclusiva salsa BBQ." },
			{ id: "bife-mariposa", name: "Bife Ancho tipo Mariposa", price: 54, desc: "Corte de cerdo ancho a la parrilla en salsa agridulce de pimentón." },
			{ id: "lomo-agridulce", name: "Lomo Agridulce", price: 56, desc: "Medallones de lomo de cerdo a la parrilla con salsa agridulce, lo dulce y lo ácido en armonía." },
		],
	},
	{
		id: "carnes-rojas",
		title: "Carnes Rojas",
		subtitle: "Fuertes",
		emoji: "🥩",
		cover: carne,
		tone: "sage",
		note: "Todas nuestras carnes rojas se sirven con ensalada fresca y papa country.",
		items: [
			{ id: "baby-beef", name: "Baby Beef", price: 74, desc: "Corte de lomo de res a la parrilla que resalta su sabor natural y suavidad." },
			{ id: "lomo-capresa", name: "Lomo Capresa", price: 78, desc: "Lomo asado con salsa napolitana, pesto, mozzarella derretida y tomates confitados." },
			{ id: "new-york", name: "New York Steak", price: 65, desc: "Corte de la parte media del lomo ancho, a la parrilla, equilibrio entre textura y sabor." },
			{ id: "churrasco", name: "Churrasco", price: 65, desc: "Lomo ancho en mariposa a la parrilla: un clásico con toque de maestría." },
			{ id: "rib-eye", name: "Rib Eye", price: 65, desc: "Corte delantero del lomo ancho, jugoso y lleno de sabor." },
			{ id: "filet-mignon", name: "Filet Mignon", price: 85, tags: ["firma"], desc: "Medallones de lomo envueltos en tocineta con suave salsa de champiñones." },
			{ id: "t-bone", name: "T-Bone Steak", price: 80, desc: "Corte con hueso: lo mejor del solomillo y el bife ancho." },
			{ id: "steak-pimienta", name: "Steak Pimienta", price: 85, tags: ["picante"], desc: "Medallones de lomo en salsa de pimienta, picante y sofisticada." },
			{ id: "bistec-caballo", name: "Bistec a Caballo", price: 78, desc: "Lomo de res en hogao tradicional, coronado con dos huevos fritos, papas a la francesa y aguacate." },
		],
	},
	{
		id: "algo-diferente",
		title: "Algo Diferente",
		subtitle: "Comidas rápidas",
		emoji: "🍔",
		cover: mesaTacos,
		tone: "cream",
		note: "Todas nuestras comidas rápidas van con papas casco y salsa de la casa.",
		items: [
			{ id: "hamburguesa-dg", name: "Hamburguesa Deleite Garden con Cheddar", price: 40, tags: ["firma"], desc: "Carne 100% artesanal, cheddar fundido, vegetales frescos y pepinillos en pan artesano único." },
			{ id: "alitas-cielo", name: "Alitas del Cielo", price: 40, tags: ["compartir"], desc: "Alitas horneadas hasta la textura perfecta, bañadas en nuestra BBQ casera." },
			{ id: "fish-chips", name: "Fish and Chips", price: 40, tags: ["mar"], desc: "Filete de pescado blanco tempurizado con papas artesanales, salsa tártara y limón." },
			{ id: "menu-infantil", name: "Menú Infantil", price: 30, desc: "Mini hot dogs al estilo coreano con papa francesa y una dulce sorpresa." },
			{ id: "adiciones", name: "Adiciones", price: 12, desc: "Vegetales salteados, puré de papa, ensalada fresca o papa country para personalizar tu plato." },
		],
	},
	{
		id: "postres",
		title: "Postres",
		subtitle: "Dulces",
		emoji: "🍰",
		tone: "blush",
		note: "Nuestras porciones de ponqué, hechas especialmente para ti.",
		items: [
			{ id: "red-velvet", name: "Red Velvet", price: 16, desc: "Textura aterciopelada, cacao y vainilla, coronada con crema de queso suave y sedosa." },
			{ id: "torta-limon", name: "Torta de Limón y Arándanos", price: 16, desc: "Ligera y refrescante: la acidez del limón con la dulzura de los arándanos en bizcocho húmedo." },
			{ id: "torta-familiar", name: "Torta Familiar (10 porciones)", price: 130, tags: ["compartir"], desc: "Una celebración de sabores y texturas, ideal para compartir en cualquier reunión." },
			{ id: "malteadas", name: "Malteadas", price: 18, desc: "Leche fresca y helado de calidad en sabores clásicos y originales, con toque gourmet." },
			{ id: "copa-helado", name: "Copa de Helado", price: 15, desc: "Helados artesanales en copa elegante. Combina o déjate recomendar." },
			{ id: "brownie-helado", name: "Brownie con Helado", price: 16, desc: "Brownie de chocolate con una bola de helado que se funde lentamente." },
			{ id: "cupcake", name: "Porción de Cupcake de Cumpleaños", price: 16, desc: "Bizcocho decorado con frosting colorido. ¡Felicidad garantizada!" },
			{ id: "malteada-cheesecake", name: "Malteada de Cheesecake de Frutos Rojos", price: 18, desc: "Cremosa, frutal y con todo el sabor del cheesecake." },
			{ id: "malteada-brownie", name: "Malteada de Brownie con Helado", price: 22, desc: "Para los que quieren el postre… en vaso." },
		],
	},
	{
		id: "sin-alcohol",
		title: "Sin Alcohol",
		subtitle: "Bebidas",
		emoji: "🍋",
		cover: mule,
		tone: "sage",
		items: [
			{ id: "agua-gas", name: "Agua con Gas", price: 10 },
			{ id: "soda", name: "Soda", price: 10 },
			{ id: "agua-mineral", name: "Agua Mineral", price: 9 },
			{ id: "limonada-natural", name: "Limonada Natural", price: 10 },
			{ id: "limonada-cereza", name: "Limonada de Cereza", price: 14 },
			{ id: "limonada-coco", name: "Limonada de Coco", price: 16 },
			{ id: "limonada-mango", name: "Limonada Mango Biche", price: 14 },
			{ id: "limonada-hierbabuena", name: "Limonada Hierbabuena", price: 13 },
			{ id: "jugos-agua", name: "Jugos en Agua", price: 12 },
			{ id: "jugos-leche", name: "Jugos en Leche", price: 14 },
			{ id: "coca-cola", name: "Coca-Cola", price: 9 },
			{ id: "soda-italiana", name: "Soda Italiana", price: 18 },
		],
	},
	{
		id: "cocteles",
		title: "Cocteles",
		subtitle: "Con alcohol",
		emoji: "🍸",
		cover: coctelRosa,
		tone: "blush",
		items: [
			{ id: "daiquiri-fresa", name: "Daiquiri de Fresa", price: 35, tags: ["autor"], desc: "Ron blanco macerado, licuado con fresa y zumo de limón." },
			{ id: "margarita", name: "Margarita", price: 38, desc: "Tequila José Cuervo, triple sec y zumo de limón." },
			{ id: "margarita-blue", name: "Margarita Blue", price: 40, tags: ["autor"], desc: "Tequila blanco Jimador, curazao azul y zumo de limón." },
			{ id: "martini", name: "Martini", price: 42, desc: "Ginebra, vermut seco y aceitunas." },
			{ id: "moscow-mule", name: "Moscow Mule", price: 42, img: mule, desc: "Vodka, ginger beer, hierbabuena y zumo de limón." },
			{ id: "gin-tonic", name: "Gin Tonic", price: 38, img: gin, desc: "Ginebra, agua tónica y un toque aromático." },
			{ id: "mojito", name: "Mojito", price: 38, desc: "Ron blanco, limón, azúcar, hierbabuena y ginger ale." },
			{ id: "julep-maracuya", name: "Julep de Maracuyá", price: 42, tags: ["autor"], desc: "Ron blanco, hierbabuena, sirope de maracuyá y ginger ale." },
			{ id: "red-whiskey", name: "Red Whiskey", price: 45, tags: ["autor"], desc: "Red Label, moras maceradas, miel y un toque refrescante." },
			{ id: "honey-lemon", name: "Honey Lemon", price: 47, tags: ["autor"], desc: "Jack Daniel's Honey, miel, limón deshidratado y ginger ale." },
			{ id: "cremoso-whiskey", name: "Cremoso de Whiskey", price: 47, tags: ["autor"], desc: "Crema de whiskey, helado de vainilla, salsa de chocolate y un toque de canela." },
			{ id: "pina-colada", name: "Piña Colada", price: 42, tags: ["autor"], desc: "Ron blanco, piña y crema de coco." },
			{ id: "buena-vibra", name: "Buena Vibra", price: 55, tags: ["autor", "firma"], desc: "¡Déjate sorprender!" },
		],
	},
	{
		id: "otras-bebidas",
		title: "Cervezas, Vinos & Más",
		subtitle: "Bebidas",
		emoji: "🍷",
		cover: picada,
		tone: "cream",
		items: [
			{ id: "corona", name: "Cerveza Corona", price: 15 },
			{ id: "budweiser", name: "Cerveza Budweiser", price: 10 },
			{ id: "club", name: "Cerveza Club Dorada o Roja", price: 13 },
			{ id: "stella", name: "Cerveza Stella Artois", price: 15 },
			{ id: "sangria-jarra", name: "Sangría en Jarra (tinto, rosado o blanco)", price: 110, tags: ["compartir"] },
			{ id: "sangria-copa", name: "Sangría en Copa", price: 28 },
			{ id: "tinto-verano", name: "Copa Tinto de Verano o Mimosa", price: 32 },
			{ id: "copa-sangria", name: "Copa Sangría", price: 32 },
			{ id: "botella-vino", name: "Botella de Vino", price: 130, tags: ["compartir"] },
			{ id: "jp-chenet", name: "JP Chenet", price: 140, tags: ["compartir"] },
			{ id: "norton-malbec", name: "Norton Malbec", price: 130, tags: ["compartir"] },
			{ id: "chandon", name: "Chandon", price: 170, tags: ["compartir"] },
			{ id: "cafe", name: "Café", price: 7 },
			{ id: "aromatica", name: "Aromática de Frutas", price: 10 },
			{ id: "infusion", name: "Infusión", price: 7 },
			{ id: "decoracion", name: "Decoración + vela volcán para celebrar", price: 50, tags: ["firma"], desc: "Sorprende a quien más quieres: decoramos la mesa y llevamos la vela volcán. 🎉" },
		],
	},
];

// 🖼️ Fotos de cada sección (la que va junto al título), en orden
const COVERS = {
	"entradas": "https://i.pinimg.com/736x/87/98/4d/87984da80541fee3eea0e81958da77fc.jpg",
	"pastas": "https://i.pinimg.com/1200x/c2/be/98/c2be982a529af92b6c806ad36bcc09d8.jpg",
	"pescados": "https://i.pinimg.com/1200x/f8/16/70/f816708fe059ba917f5e0c69d94214cd.jpg",
	"carnes-blancas": "https://i.pinimg.com/736x/3a/6f/80/3a6f80a8cfcc7bf1f14f043149cadf91.jpg",
	"cerdo": "https://i.pinimg.com/1200x/5a/39/42/5a39426e11885cf61c92e5989fccfcf2.jpg",
	"carnes-rojas": "https://i.pinimg.com/1200x/9b/51/e7/9b51e78522611709e0dd859f5bde2101.jpg",
	"algo-diferente": "https://i.pinimg.com/1200x/6d/e3/17/6de317fc36e279be74a2cbb81ab5c452.jpg",
	"postres": "https://i.pinimg.com/736x/ab/a8/d9/aba8d9a2a7d163ddfccdfe2b76545a85.jpg",
	"sin-alcohol": "https://i.pinimg.com/736x/10/64/74/106474f41850ab121f144483e904ab55.jpg",
	"cocteles": "https://i.pinimg.com/736x/5f/05/10/5f0510d49a2ab77ba51dc44d4678d296.jpg",
	"otras-bebidas": "https://i.pinimg.com/736x/4a/00/39/4a0039fc91aff60a1fbf4c34a04d658a.jpg",
};

// 📸 Fotos nuevas de "Favoritos del jardín"
const DISH_IMG = {
	"langostinos-dg": "https://i.pinimg.com/1200x/c9/78/98/c978984feacf0160d97622d5ba4299e7.jpg",
	"patacon-bosque": "https://i.pinimg.com/736x/33/68/f8/3368f8000a2274b42f959c8a656f1fe7.jpg",
	"tacos-primavera": "https://i.pinimg.com/1200x/45/97/4e/45974e92cce4b3e9287baf7893f78a57.jpg",
	"explosion-camarones": "https://i.pinimg.com/1200x/8b/a5/98/8ba5987daca89977a7e24b141d80a6eb.jpg",
	"crispy-chicken": "https://i.pinimg.com/1200x/3c/22/ea/3c22ea8d7c5b0cbbca7178f95c834f06.jpg",
	"pasta-carbonara": "https://i.pinimg.com/736x/29/77/94/297794aa9fb58ef321d2af24c3163761.jpg",
	"pasta-bolonesa": "https://i.pinimg.com/1200x/cf/27/d9/cf27d937412f81298eaea75c544ef060.jpg",
	"moscow-mule": "https://i.pinimg.com/1200x/0e/c5/66/0ec566c449eb350b9476d499bab2b908.jpg",
	"gin-tonic": "https://i.pinimg.com/1200x/d9/33/de/d933de4cdfa1ac603ee5487485c6b917.jpg",
};

MENU.forEach((s) => {
	if (COVERS[s.id]) s.cover = COVERS[s.id];
	s.items.forEach((it) => { if (DISH_IMG[it.id]) it.img = DISH_IMG[it.id]; });
});

export const ALL_ITEMS = MENU.flatMap((s) => s.items.map((it) => ({ ...it, section: s.id, sectionTitle: s.title })));

export const formatCOP = (k) => `$${(k * 1000).toLocaleString("es-CO")}`;