const products = [
  {
    id: "pro-11-intel",
    name: "Surface Pro for Business 11th Edition (Intel)",
    image: "https://github.com/Cdesousa64/SurfaceSC/raw/main/Surface%20Pro.png",
    shortDesc: "Ultra-light, ultra-flexible business tablet with Intel Core Ultra 7.",
    longDesc: "The Surface Pro 11th Edition (Intel) delivers top-tier performance and versatility for business users. It features a stunning 13\" PixelSense Flow touchscreen, enhanced security, and long battery life, making it perfect for productivity on the go.",
    specs: {
      Processor: "Intel Core Ultra 7 165U",
      RAM: "16GB LPDDR5x",
      Storage: "256GB SSD",
      Display: "13\" PixelSense Flow 2880x1920 Touch",
      Graphics: "Intel Graphics",
      Ports: "2 x USB-C Thunderbolt 4, Surface Connect, Surface Keyboard, Headphone Jack",
      Wireless: "WiFi 6E, Bluetooth 5.3",
      Battery: "Up to 15 hours",
      Dimensions: "287 x 209 x 9.3 mm",
      Weight: "879g (1.94 lbs)",
      OS: "Windows 11 Pro",
      Camera: "5MP front, 10MP rear",
      Security: "TPM 2.0, Windows Hello Face",
      Warranty: "1 Year"
    }
  },
  {
    id: "laptop-7-intel",
    name: "Surface Laptop for Business 7th Edition (Intel)",
    image: "https://github.com/Cdesousa64/SurfaceSC/raw/main/Surface%20laptop%20image.png",
    shortDesc: "Premium Intel-powered laptop with all-day battery life.",
    longDesc: "The Surface Laptop 7th Edition (Intel) combines sleek design with powerful performance. Featuring a 15\" PixelSense touchscreen, next-gen Intel Core Ultra 7 processor, and advanced security features, it's built for professionals on the move.",
    specs: {
      Processor: "Intel Core Ultra 7 165H",
      RAM: "16GB LPDDR5x",
      Storage: "512GB SSD",
      Display: "15\" PixelSense 2496x1664 Touch",
      Graphics: "Intel Graphics",
      Ports: "2 x USB-C Thunderbolt 4, 1 x USB-A, Surface Connect, Headphone Jack",
      Wireless: "WiFi 6E, Bluetooth 5.3",
      Battery: "Up to 18 hours",
      Dimensions: "308 x 223 x 17.5 mm",
      Weight: "1.56 kg (3.44 lbs)",
      OS: "Windows 11 Pro",
      Camera: "1080p HD front camera",
      Security: "TPM 2.0, Windows Hello Face",
      Warranty: "1 Year"
    }
  },
  {
    id: "pro-12-arm",
    name: "New Surface Pro for Business 12\" (ARM)",
    image: "https://github.com/Cdesousa64/SurfaceSC/raw/main/Surface%20Pro%2012.png",
    shortDesc: "Next-gen ARM device with Snapdragon X Elite for AI workloads.",
    longDesc: "Surface Pro 12\" (ARM) redefines mobile productivity with Snapdragon X Elite and exceptional battery life. Enjoy advanced connectivity, robust security, and a brilliant PixelSense touchscreen, all in an ultra-portable design.",
    specs: {
      Processor: "Snapdragon X Elite",
      RAM: "16GB LPDDR5x",
      Storage: "512GB SSD",
      Display: "12.3\" PixelSense Flow 2880x1920 Touch",
      Graphics: "Qualcomm Adreno GPU",
      Ports: "2 x USB-C, Surface Connect, Surface Keyboard, Headphone Jack",
      Wireless: "WiFi 7, Bluetooth 5.4",
      Battery: "Up to 16 hours",
      Dimensions: "287 x 209 x 8.9 mm",
      Weight: "865g (1.91 lbs)",
      OS: "Windows 11 Pro (ARM)",
      Camera: "5MP front, 10MP rear",
      Security: "TPM 2.0, Windows Hello Face",
      Warranty: "1 Year"
    }
  },
  {
    id: "laptop-13-arm",
    name: "New Surface Laptop for Business 13\" (ARM)",
    image: "https://github.com/Cdesousa64/SurfaceSC/raw/main/Surface%20Laptop%2013.png",
    shortDesc: "Fast, efficient ARM laptop with modern connectivity.",
    longDesc: "The Surface Laptop 13\" (ARM) offers powerful Snapdragon X Elite performance, long battery life, and enterprise-grade security. Its 13.8\" PixelSense touchscreen and premium build are ideal for business users who require mobility and speed.",
    specs: {
      Processor: "Snapdragon X Elite",
      RAM: "16GB LPDDR5x",
      Storage: "512GB SSD",
      Display: "13.8\" PixelSense 2256x1504 Touch",
      Graphics: "Qualcomm Adreno GPU",
      Ports: "2 x USB-C, 1 x USB-A, Surface Connect, Headphone Jack",
      Wireless: "WiFi 7, Bluetooth 5.4",
      Battery: "Up to 19 hours",
      Dimensions: "297 x 220 x 15.5 mm",
      Weight: "1.37 kg (3.02 lbs)",
      OS: "Windows 11 Pro (ARM)",
      Camera: "1080p HD front camera",
      Security: "TPM 2.0, Windows Hello Face",
      Warranty: "1 Year"
    }
  }
];

// Expose products globally for main.js
window.products = products;
