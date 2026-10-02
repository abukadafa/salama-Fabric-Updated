/**
 * SALAMA Fabrics & Bedding - Product Catalog
 * Curated high-resolution luxury photography & specifications
 * Currency: Nigerian Naira (₦)
 * WhatsApp Contact: +234 814 770 9019
 */

const PRODUCTS = [
  {
    id: "bed-001",
    name: "1000TC Royal Egyptian Cotton Duvet Set",
    category: "bedding",
    categoryName: "Luxury Bedding",
    price: 45000,
    oldPrice: 52000,
    badge: "BEST SELLER",
    rating: 5.0,
    reviewsCount: 48,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
    description: "Woven from 100% certified long-staple Egyptian cotton with an exquisite 1000 thread count sateen weave. Exceptionally silky, breathable, and designed to soften with every wash.",
    specs: {
      material: "100% Long-Staple Egyptian Cotton",
      weave: "Lustrous Sateen Weave",
      threadCount: "1000 TC",
      included: "1 Duvet Cover, 1 Fitted Sheet, 2 Oxford Pillowcases",
      care: "Machine wash cold on gentle cycle; tumble dry low"
    },
    sizes: ["Queen (6x6 ft)", "King (6x7 ft)", "Super King (7x7 ft)"],
    colors: [
      { name: "Ivory Pearl", hex: "#F7F5EC" },
      { name: "Royal Navy", hex: "#071D40" },
      { name: "Champagne Gold", hex: "#D4AF37" }
    ],
    inStock: true
  },
  {
    id: "bed-002",
    name: "Pure Mulberry Silk Satin Sheet Set",
    category: "bedding",
    categoryName: "Luxury Bedding",
    price: 68000,
    oldPrice: 75000,
    badge: "PREMIUM",
    rating: 5.0,
    reviewsCount: 32,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85",
    description: "Indulge in pure natural luxury with our 22-momme Grade 6A Mulberry Silk set. Hypoallergenic, friction-reducing for hair and skin, and featuring temperature-regulating properties for peaceful sleep.",
    specs: {
      material: "100% Grade 6A Mulberry Silk",
      mommeWeight: "22 Momme",
      included: "1 Flat Sheet, 1 Fitted Sheet, 2 Envelope Pillowcases",
      care: "Hand wash or gentle silk cycle with pH-neutral detergent"
    },
    sizes: ["King (6x7 ft)", "Queen (6x6 ft)"],
    colors: [
      { name: "Champagne Cream", hex: "#E8DEC8" },
      { name: "Midnight Navy", hex: "#09172B" },
      { name: "Blush Rose", hex: "#D9AAB0" }
    ],
    inStock: true
  },
  {
    id: "bed-003",
    name: "Crisp Washed European Linen Bedding Set",
    category: "bedding",
    categoryName: "Luxury Bedding",
    price: 42000,
    oldPrice: 48000,
    badge: "SALE",
    rating: 4.8,
    reviewsCount: 26,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85",
    description: "Crafted from natural European flax, stonewashed for lived-in softness from day one. Naturally thermoregulating and antibacterial, ideal for warm tropical nights.",
    specs: {
      material: "100% Certified European Flax Linen",
      finish: "Pre-washed vintage stone finish",
      included: "1 Linen Duvet Cover, 2 Pillow Shams",
      care: "Machine wash warm; air dry or tumble dry low"
    },
    sizes: ["Queen (6x6 ft)", "King (6x7 ft)"],
    colors: [
      { name: "Oatmeal Natural", hex: "#D6C7B2" },
      { name: "Terracotta Sand", hex: "#C68263" },
      { name: "Olive Mist", hex: "#8A947A" }
    ],
    inStock: true
  },
  {
    id: "bed-004",
    name: "Luxury Goose Down Alternative Pillow Pair",
    category: "bedding",
    categoryName: "Luxury Bedding",
    price: 18500,
    oldPrice: 22000,
    badge: "POPULAR",
    rating: 4.9,
    reviewsCount: 59,
    image: "https://images.unsplash.com/photo-1584100936750-13ee27e85295?auto=format&fit=crop&w=900&q=85",
    description: "Plush hotel-grade micro-cluster fill enveloped in a 400TC Egyptian cotton shell. Provides cloud-like neck support without flattening or triggering allergies.",
    specs: {
      material: "400TC 100% Cotton Jacquard Casing",
      fill: "Hypoallergenic Micro-Cluster Poly Fiber",
      included: "Set of 2 Pillows (Standard/King size)",
      firmness: "Medium-Plush Support"
    },
    sizes: ["Standard (20x26 in)", "King (20x36 in)"],
    colors: [
      { name: "Pure White", hex: "#FFFFFF" }
    ],
    inStock: true
  },
  {
    id: "fab-001",
    name: "Royal Damask Brocade Fabric (per metre)",
    category: "fabrics",
    categoryName: "Premium Fabrics",
    price: 8500,
    oldPrice: 10000,
    badge: "NEW",
    rating: 4.9,
    reviewsCount: 34,
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=85",
    description: "Intricately woven damask brocade featuring raised metallic gold and navy floral motifs. Heavy drape, durable, and ideal for bespoke upholstery, luxury cushions, and formal garments.",
    specs: {
      material: "Silk Blend with Lurex Metallic Thread",
      width: "58 inches (147 cm)",
      weight: "320 gsm (Heavyweight)",
      unit: "Sold per running metre",
      suitability: "Upholstery, Heavy Drapes, Cushions, Bespoke Fashion"
    },
    sizes: ["1 Metre", "3 Metres Bundle", "5 Metres Roll"],
    colors: [
      { name: "Gold on Deep Navy", hex: "#071D40" },
      { name: "Gold on Champagne Ivory", hex: "#E9DCBF" },
      { name: "Emerald & Gold", hex: "#16382C" }
    ],
    inStock: true
  },
  {
    id: "fab-002",
    name: "Textured Heavy Jacquard Fabric (per metre)",
    category: "fabrics",
    categoryName: "Premium Fabrics",
    price: 6500,
    oldPrice: null,
    badge: null,
    rating: 4.8,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
    description: "Richly tactile woven jacquard with a subtle geometric embossed relief. High abrasion resistance makes it perfect for sofas, headboards, and statement accent pieces.",
    specs: {
      material: "Polyester-Cotton Jacquard Blend",
      width: "55 inches (140 cm)",
      weight: "360 gsm",
      unit: "Sold per running metre",
      durability: "35,000 Martindale rubs"
    },
    sizes: ["1 Metre", "3 Metres Bundle", "5 Metres Roll"],
    colors: [
      { name: "Warm Sand", hex: "#C5B396" },
      { name: "Charcoal Slate", hex: "#2B2E35" },
      { name: "Muted Ochre", hex: "#B88E3E" }
    ],
    inStock: true
  },
  {
    id: "fab-003",
    name: "Architectural Heavyweight Upholstery Velvet",
    category: "fabrics",
    categoryName: "Premium Fabrics",
    price: 9200,
    oldPrice: 11000,
    badge: "POPULAR",
    rating: 5.0,
    reviewsCount: 51,
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=900&q=85",
    description: "Deep plush pile velvet with a soft matte luster. Water-repellent, stain-resistant, and luxurious to the touch for chairs, bed frames, and luxury drapery.",
    specs: {
      material: "Premium High-Density Poly-Velvet",
      width: "56 inches (142 cm)",
      weight: "420 gsm",
      finish: "Water-repellent protective coating",
      unit: "Sold per running metre"
    },
    sizes: ["1 Metre", "3 Metres Bundle", "5 Metres Roll"],
    colors: [
      { name: "Salama Sapphire Navy", hex: "#081E3F" },
      { name: "Antique Gold", hex: "#BA8C2A" },
      { name: "Forest Emerald", hex: "#1C3B2B" },
      { name: "Burgundy Wine", hex: "#4A121A" }
    ],
    inStock: true
  },
  {
    id: "curt-001",
    name: "Custom Blackout Velvet Curtain Pair",
    category: "curtains",
    categoryName: "Curtains",
    price: 32000,
    oldPrice: 38000,
    badge: "SALE",
    rating: 4.9,
    reviewsCount: 74,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=85",
    description: "Custom-tailored heavyweight blackout velvet curtains with thermal insulating lining. Blocks 99% of sunlight and heat, ensuring absolute privacy and energy efficiency.",
    specs: {
      material: "Triple-Weave Blackout Velvet",
      lining: "Thermal acoustic blackout backing",
      heading: "Eyelet Grommet or Pinch Pleat (Selectable)",
      included: "Pair of 2 panels with matching tiebacks"
    },
    sizes: ["Drop 240cm x Width 140cm", "Drop 270cm x Width 200cm", "Custom Length"],
    colors: [
      { name: "Midnight Navy", hex: "#071D40" },
      { name: "Soft Ivory Cream", hex: "#ECE4D3" },
      { name: "Smoky Charcoal", hex: "#2D313A" }
    ],
    inStock: true
  },
  {
    id: "curt-002",
    name: "Tailored Sheer Linen Window Dressing",
    category: "curtains",
    categoryName: "Curtains",
    price: 24000,
    oldPrice: null,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef8?auto=format&fit=crop&w=900&q=85",
    description: "Light, airy semi-sheer linen drapes that filter natural sunlight into a gentle, warm glow while preserving daytime privacy. Beautiful fluid movement and slub texture.",
    specs: {
      material: "Fine Slub Linen & Cotton Blend",
      transparency: "Semi-sheer light filtering",
      heading: "Rod pocket + Hidden back tabs",
      included: "Pair of 2 flowing panels"
    },
    sizes: ["Drop 240cm x Width 140cm", "Drop 270cm x Width 180cm"],
    colors: [
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Warm Natural Flax", hex: "#DFD5C2" }
    ],
    inStock: true
  },
  {
    id: "curt-003",
    name: "Embroidered Metallic Gold Jacquard Curtains",
    category: "curtains",
    categoryName: "Curtains",
    price: 48000,
    oldPrice: 55000,
    badge: "LUXURY",
    rating: 5.0,
    reviewsCount: 28,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=85",
    description: "Fit for a palace: ornate damask pattern woven with shimmering gold metallic thread over an indigo blue canvas. Fully lined with satin for maximum volume and majestic drape.",
    specs: {
      material: "Jacquard Silk Brocade with Metallic Lurex",
      lining: "100% Cotton Satin Lining",
      heading: "Handcrafted Triple Pinch Pleat",
      included: "2 Panels with handcrafted brass-accent tiebacks"
    },
    sizes: ["Drop 260cm x Width 160cm", "Drop 300cm x Width 220cm"],
    colors: [
      { name: "Royal Navy & Gold", hex: "#071D40" },
      { name: "Ivory & Champagne", hex: "#E7DCBF" }
    ],
    inStock: true
  },
  {
    id: "acc-001",
    name: "Silk-Feel Embroidered Throw Pillow Set (2pcs)",
    category: "accessories",
    categoryName: "Home Accessories",
    price: 15000,
    oldPrice: 18000,
    badge: "BEST SELLER",
    rating: 4.9,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=900&q=85",
    description: "Set of 2 luxury accent cushion covers adorned with geometric gold piped embroidery and discreet hidden zippers. Filled with plush bounce-back inserts.",
    specs: {
      material: "Satin Silk Blend with Gold Piping",
      dimensions: "18 x 18 inches (45 x 45 cm)",
      included: "2 Covers + 2 High-Loft Hollowfibre Inserts",
      closure: "Concealed invisible zip"
    },
    sizes: ["18x18 inches", "20x20 inches"],
    colors: [
      { name: "Navy & Gold Border", hex: "#071D40" },
      { name: "Cream & Bronze", hex: "#E8DFC5" },
      { name: "Emerald & Gold", hex: "#16382C" }
    ],
    inStock: true
  },
  {
    id: "acc-002",
    name: "Hand-Quilted Velvet Bed Runner & Cushion Trio",
    category: "accessories",
    categoryName: "Home Accessories",
    price: 26000,
    oldPrice: 30000,
    badge: "SET",
    rating: 4.9,
    reviewsCount: 39,
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=900&q=85",
    description: "Transform your master bedroom into a 5-star presidential suite. Includes one generous quilted plush velvet bed runner and two matching bolster/throw cushions.",
    specs: {
      material: "Quilted Microvelvet with Gold Foil Accent",
      runnerSize: "240 x 50 cm (fits Queen/King)",
      cushionSizes: "2x 40 x 40 cm",
      finish: "Diamond stitched quilting"
    },
    sizes: ["Queen/King Set (240x50cm)", "Super King Set (260x50cm)"],
    colors: [
      { name: "Midnight Navy", hex: "#071D40" },
      { name: "Rich Gold Ochre", hex: "#B58A22" },
      { name: "Dusty Rose Pink", hex: "#C7959E" }
    ],
    inStock: true
  },
  {
    id: "fab-004",
    name: "Royal Swiss Voile Lace with Hand-Cut Embroidery & Stones (5 Yards)",
    category: "fabrics",
    categoryName: "Premium Fabrics",
    price: 55000,
    oldPrice: 62000,
    badge: "NEW ARRIVAL",
    rating: 5.0,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=900&q=85",
    description: "Authentic premium Swiss cotton voile lace featuring exquisite hand-cut eyelet borders and radiant Austrian crystal stone embellishments. Soft on the skin, majestic in drape, and ideal for Aso-Ebi, bridal, and luxury Nigerian celebrations.",
    specs: {
      material: "100% Pure Swiss Cotton Voile",
      embroidery: "Hand-Cut Eyelet with Crystal Stones",
      width: "52 inches (132 cm)",
      unit: "Sold as complete 5 Yards (4.57m) bundle",
      suitability: "Aso-Ebi, Owambe, Luxury Iro & Buba, Traditional Ceremonies"
    },
    sizes: ["5 Yards Bundle", "10 Yards (2 Bundles)"],
    colors: [
      { name: "Royal Navy & Gold", hex: "#071D40" },
      { name: "Pure White & Silver", hex: "#FFFFFF" },
      { name: "Emerald Green & Gold", hex: "#16382C" },
      { name: "Champagne Gold", hex: "#D4AF37" }
    ],
    inStock: true
  },
  {
    id: "fab-005",
    name: "French Beaded Guipure Cord Lace (5 Yards)",
    category: "fabrics",
    categoryName: "Premium Fabrics",
    price: 72000,
    oldPrice: 80000,
    badge: "LUXURY",
    rating: 5.0,
    reviewsCount: 36,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=85",
    description: "Opulent French corded guipure lace adorned with hand-stitched seed pearls and delicate gold lurex filament. Substantial weight and rich floral relief make it the crown jewel of high-society occasions.",
    specs: {
      material: "Corded Cotton & Silk Blend with Seed Pearls",
      embroidery: "3D Floral Guipure Relief",
      width: "50 inches (127 cm)",
      unit: "Sold as complete 5 Yards (4.57m) bundle",
      care: "Dry clean only or delicate hand wash"
    },
    sizes: ["5 Yards Bundle", "10 Yards (2 Bundles)"],
    colors: [
      { name: "Powder Blue & Gold", hex: "#8DA9C4" },
      { name: "Rose Gold & Blush", hex: "#D4A5A5" },
      { name: "Midnight Black & Gold", hex: "#11141A" }
    ],
    inStock: true
  },
  {
    id: "fab-006",
    name: "Embellished Regal George Wrapper & Blouse Set (7 Yards)",
    category: "fabrics",
    categoryName: "Premium Fabrics",
    price: 85000,
    oldPrice: 95000,
    badge: "BEST SELLER",
    rating: 5.0,
    reviewsCount: 47,
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=85",
    description: "Timeless traditional Nigerian prestige attire. Heavy raw-silk base embellished with scalloped gold bullion borders, intricate sequins, and matching blouse fabric for grand ceremonies, chieftaincies, and weddings.",
    specs: {
      material: "Heavyweight Raw Silk with Gold Embroidery",
      included: "5 Yards Wrapper Fabric + 2 Yards Blouse Fabric (7 Yards Total)",
      border: "Heavy scalloped gold metallic edge",
      origin: "Authentic Indian George Craftsmanship"
    },
    sizes: ["Complete Set (5 Yds Wrapper + 2 Yds Blouse)", "Double Set (10 Yds Wrapper + 4 Yds Blouse)"],
    colors: [
      { name: "Deep Wine Burgundy", hex: "#4A121A" },
      { name: "Royal Sapphire Blue", hex: "#0C2340" },
      { name: "Forest Emerald Green", hex: "#16382C" }
    ],
    inStock: true
  },
  {
    id: "fab-007",
    name: "Original Austrian Bazin Riche Brocade (Shadda - 10 Yards)",
    category: "fabrics",
    categoryName: "Premium Fabrics",
    price: 65000,
    oldPrice: 72000,
    badge: "AUTHENTIC",
    rating: 4.9,
    reviewsCount: 63,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85",
    description: "The gold standard in West African luxury: genuine 100% super-combed Egyptian cotton Guinea brocade with signature oil-glaze sheen, crisp hand-feel, and aromatic perfumed finish. Designed for dignified Babanriga, Kaftans, and wrapper styles.",
    specs: {
      material: "100% Super-Combed Egyptian Cotton",
      finish: "High-Luster Calendered Glaze & Perfumed",
      width: "63 inches (160 cm Super-Wide)",
      unit: "Sold as complete 10 Yards (9.14m) full piece",
      durability: "Colorfast and retains crisp body after laundering"
    },
    sizes: ["5 Yards Half Piece", "10 Yards Full Piece"],
    colors: [
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Jet Black", hex: "#0F1115" },
      { name: "Royal Indigo", hex: "#081E3F" },
      { name: "Golden Bronze", hex: "#8F6B21" }
    ],
    inStock: true
  },
  {
    id: "fab-008",
    name: "Superfine Italian Cashmere Wool Senator Material (4 Yards)",
    category: "fabrics",
    categoryName: "Premium Fabrics",
    price: 38000,
    oldPrice: 44000,
    badge: "POPULAR",
    rating: 4.9,
    reviewsCount: 55,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85",
    description: "Premium Italian 180s wool and cashmere blend suiting fabric. Delivers crisp sharp creases, supreme breathability for Nigerian weather, and a flawless silhouette for bespoke Senator, Kaftan, and Agbada tailoring.",
    specs: {
      material: "85% Fine Wool, 15% Cashmere Blend",
      width: "58 inches (147 cm)",
      weight: "280 gsm (Year-Round Medium-Weight)",
      unit: "Sold as 4 Yards (Standard Senator cut)",
      characteristics: "Wrinkle-resistant with natural matte finish"
    },
    sizes: ["4 Yards (Standard Senator / Kaftan)", "7 Yards (Complete 3-Piece Agbada)"],
    colors: [
      { name: "Midnight Navy", hex: "#071D40" },
      { name: "Charcoal Slate", hex: "#2F333A" },
      { name: "Tan Camel", hex: "#A88758" },
      { name: "Jet Black", hex: "#111317" }
    ],
    inStock: true
  },
  {
    id: "fab-009",
    name: "Pure Mulberry Silk Damask Wrapper Fabric (5 Yards)",
    category: "fabrics",
    categoryName: "Premium Fabrics",
    price: 48000,
    oldPrice: 54000,
    badge: "PREMIUM",
    rating: 4.8,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=85",
    description: "Silky fluid brocade woven from natural mulberry silk fibers. Features subtle tone-on-tone botanical reliefs that catch sunlight with an understated royal glow. Perfect for luxury wrapper pairings and flowing boubou gowns.",
    specs: {
      material: "100% Pure Mulberry Silk Brocade",
      width: "54 inches (137 cm)",
      unit: "Sold as complete 5 Yards (4.57m) bundle",
      care: "Dry clean or gentle hand wash with silk shampoo"
    },
    sizes: ["5 Yards Bundle", "10 Yards (2 Bundles)"],
    colors: [
      { name: "Champagne Ivory", hex: "#EADDC6" },
      { name: "Royal Navy", hex: "#071D40" },
      { name: "Ruby Coral", hex: "#9E3242" }
    ],
    inStock: true
  },
  {
    id: "bed-005",
    name: "1200TC Presidential Hotel Grandeur Embroidered Duvet Set",
    category: "bedding",
    categoryName: "Luxury Bedding",
    price: 58000,
    oldPrice: 65000,
    badge: "HOTEL GRADE",
    rating: 5.0,
    reviewsCount: 44,
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=900&q=85",
    description: "The pinnacle of bedtime luxury. Double-mercerized 1200TC Egyptian cotton sateen adorned with classic double-line satin cordonnet embroidery on duvet cover and pillow flanges.",
    specs: {
      material: "1200TC Double-Mercerized Giza Egyptian Cotton",
      finish: "Silky Luster Sateen with Cord Embroidery",
      included: "1 Duvet Cover, 1 Deep-Pocket Fitted Sheet, 4 Oxford Pillowcases",
      care: "Machine wash cold on gentle cycle; tumble dry low"
    },
    sizes: ["Queen (6x6 ft)", "King (6x7 ft)", "Super King (7x7 ft)"],
    colors: [
      { name: "Crisp White with Navy Cordonnet", hex: "#FFFFFF" },
      { name: "Crisp White with Gold Cordonnet", hex: "#FAF8F2" },
      { name: "Ivory Pearl with Champagne Cordonnet", hex: "#F3EBDD" }
    ],
    inStock: true
  },
  {
    id: "bed-006",
    name: "Pure Organic Cotton Waffle Weave Summer Blanket & Throw",
    category: "bedding",
    categoryName: "Luxury Bedding",
    price: 24000,
    oldPrice: 28000,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=85",
    description: "Woven from 100% GOTS-certified organic cotton in a dimensional honeycomb waffle structure. Lightweight, breathable, and provides cozy insulation without overheating.",
    specs: {
      material: "100% Certified Organic Long-Staple Cotton",
      weave: "Dimensional Honeycomb Thermal Waffle",
      weight: "380 gsm All-Season Weight",
      included: "1 King-Size Multi-Purpose Bed Blanket"
    },
    sizes: ["Queen (200x230 cm)", "King (230x250 cm)"],
    colors: [
      { name: "Warm Natural Linen", hex: "#D8CCB8" },
      { name: "Slate Charcoal", hex: "#323740" },
      { name: "Ivory Cloud", hex: "#F7F5EE" }
    ],
    inStock: true
  },
  {
    id: "curt-004",
    name: "Dual-Layer Luxury Blackout Velvet & Sheer Wave-Fold Drapery Set",
    category: "curtains",
    categoryName: "Curtains",
    price: 54000,
    oldPrice: 62000,
    badge: "BEST VALUE",
    rating: 5.0,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=85",
    description: "Complete luxury window dressing solution. Includes two heavyweight thermal blackout velvet drapes paired with two airy sheer linen panels for daytime illumination and nighttime privacy.",
    specs: {
      material: "Plush High-Density Velvet + Fine Slub Linen",
      included: "2 Blackout Panels + 2 Sheer Panels + 2 Matching Tiebacks (4 Panels Total)",
      heading: "Universal Heading: Wave-fold tape & rod pocket",
      blocking: "100% Light & Thermal heat obstruction"
    },
    sizes: ["Drop 260cm x Width 160cm", "Drop 300cm x Width 200cm"],
    colors: [
      { name: "Midnight Navy & Pure White Sheer", hex: "#071D40" },
      { name: "Warm Sand Champagne & Linen Sheer", hex: "#C5B396" },
      { name: "Charcoal Slate & White Sheer", hex: "#2B2E35" }
    ],
    inStock: true
  },
  {
    id: "curt-005",
    name: "Embossed Moroccan Trellis Damask Blackout Panels",
    category: "curtains",
    categoryName: "Curtains",
    price: 36000,
    oldPrice: 42000,
    badge: "POPULAR",
    rating: 4.9,
    reviewsCount: 46,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85",
    description: "Subtle tone-on-tone Moroccan geometric damask relief embossed onto triple-weave blackout fabric. Blocks intrusive glare and outside heat while lending architectural depth to your windows.",
    specs: {
      material: "Triple-Weave Textured Poly-Damask",
      finish: "Embossed Trellis Jacquard Pattern",
      included: "Pair of 2 panels with grommet eyelets",
      care: "Machine washable cold gentle cycle"
    },
    sizes: ["Drop 240cm x Width 140cm", "Drop 270cm x Width 200cm"],
    colors: [
      { name: "Antique Gold", hex: "#BA8C2A" },
      { name: "Midnight Navy", hex: "#071D40" },
      { name: "Soft Silver Cream", hex: "#E6DFD3" }
    ],
    inStock: true
  },
  {
    id: "acc-003",
    name: "Bespoke Hand-Embroidered Velvet Dining & Console Runner (2.2m)",
    category: "accessories",
    categoryName: "Home Accessories",
    price: 18500,
    oldPrice: 22000,
    badge: "HANDMADE",
    rating: 4.9,
    reviewsCount: 33,
    image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=900&q=85",
    description: "Handcrafted from heavyweight midnight plush velvet with intricate gold bullion metallic embroidery. Padded with a smooth satin backing to protect and elevate dining tables, credenzas, and consoles.",
    specs: {
      material: "Microvelvet with Bullion Gold Thread",
      dimensions: "220 cm Length x 40 cm Width",
      backing: "Smooth Cotton Satin Non-Slip Lining",
      embroidery: "Handcrafted traditional acanthus and geometric motifs"
    },
    sizes: ["Standard Table (220 x 40 cm)", "Grand Table (260 x 45 cm)"],
    colors: [
      { name: "Royal Navy & Bullion Gold", hex: "#071D40" },
      { name: "Emerald & Gold", hex: "#16382C" },
      { name: "Champagne Cream & Gold", hex: "#ECE2CD" }
    ],
    inStock: true
  },
  {
    id: "acc-004",
    name: "Luxury Cylindrical Silk Bolster Cushion Pair with Brass Aglets",
    category: "accessories",
    categoryName: "Home Accessories",
    price: 22000,
    oldPrice: 26000,
    badge: "EXCLUSIVE",
    rating: 5.0,
    reviewsCount: 27,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=85",
    description: "Pair of firm, cylindrical accent bolsters crafted in lustrous mulberry silk. Features hand-gathered rosette ends and braided gold ties with weighted solid brass aglet hardware.",
    specs: {
      material: "100% Mulberry Silk Blend Casing",
      fill: "High-Resilience Micro-Cluster Fiber Core",
      hardware: "Solid Brass Polished End Caps",
      dimensions: "60 cm Length x 20 cm Diameter (Set of 2)"
    },
    sizes: ["Pair (60 x 20 cm)"],
    colors: [
      { name: "Navy & Brass", hex: "#071D40" },
      { name: "Gold Ochre & Brass", hex: "#B58A22" },
      { name: "Ivory Cream & Brass", hex: "#F3EBDD" }
    ],
    inStock: true
  }
];

function formatNaira(amount) {
  return "₦" + Number(amount).toLocaleString("en-NG");
}

function getMergedProducts() {
  try {
    const saved = localStorage.getItem("salama_custom_products");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error loading custom products", e);
  }
  return PRODUCTS;
}

function getMergedHeroSlides() {
  const defaultSlides = [
    {
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85",
      title: "Where Comfort Meets<br><span class=\"gold\">Timeless Elegance</span>",
      subtitle: "Transform your sanctuary with 1000TC Egyptian cotton bedding, royal Guinea brocades, and opulent velvet draperies curated for refined living."
    },
    {
      image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1600&q=85",
      title: "Royal Guinea Brocades &<br><span class=\"gold\">Italian Damasks</span>",
      subtitle: "Hand-curated luxury textiles and Bazin Riche Guinea brocades tailored to perfection for special occasions."
    },
    {
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
      title: "Velvet Blackout Drapery &<br><span class=\"gold\">Custom Sheers</span>",
      subtitle: "Bespoke window treatments, thermal blackout velvets, and floor-to-ceiling drops for your living space."
    },
    {
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=85",
      title: "Pure Mulberry Silk &<br><span class=\"gold\">1000TC Cotton</span>",
      subtitle: "Experience hotel-suite luxury with breathable sateen duvets and hypoallergenic silk pillowcases."
    }
  ];

  try {
    const saved = localStorage.getItem("salama_custom_hero_slides");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error loading custom hero slides", e);
  }
  return defaultSlides;
}
