function organizeInventory(inventory) {
  const organizedInventory = {};

  // Iteramos sobre cada objeto del inventario
  inventory.forEach((item) => {
    const { name, quantity, category } = item;

    // Si la categoría no existe, inicializarla
    if (!organizedInventory[category]) {
      organizedInventory[category] = {};
    }

    // Si el nombre del juguete ya existe en la categoría, sumar la cantidad
    if (organizedInventory[category][name]) {
      organizedInventory[category][name] += quantity;
    } else {
      // Si no existe, inicializarlo con la cantidad actual
      organizedInventory[category][name] = quantity;
    }
  });

  return organizedInventory;
}

function printInventory(inventory) {
  console.log(JSON.stringify(inventory, null, 2));
}

const organizedInventory = organizeInventory([
  { name: 'doll', quantity: 5, category: 'toys' },
  { name: 'car', quantity: 3, category: 'toys' },
  { name: 'ball', quantity: 2, category: 'sports' },
  { name: 'car', quantity: 2, category: 'toys' },
  { name: 'racket', quantity: 4, category: 'sports' }
]);

console.log(printInventory(organizedInventory));
